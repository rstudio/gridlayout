// JS entry point
import { Event_Listener, make_el, remove_elements } from "./make_el";
import { draw_browser_header } from "./draw_browser_header";
import { make_incrementer } from "./make_incrementer";
import { focused_modal } from "./focused_modal";
import { make_css_unit_input, CSS_Input } from "./make_css_unit_input";
import {
  make_template_start_end,
  sizes_to_template_def,
  set_element_in_grid,
  concat_nl,
  as_array,
  max_w_missing,
  min_w_missing,
  boxes_overlap,
  get_bounding_rect,
  get_css_unit,
  get_css_value,
  Selection_Rect,
  update_rect_with_delta,
  XY_Pos,
  Drag_Type,
} from "./misc-helpers";
import { trashcan_icon, drag_icon, se_arrow, nw_arrow } from "./icons";
import { find_rules_by_selector } from "./find_rules_by_selector";

export const Shiny = (window as any).Shiny;

interface Grid_Settings {
  num_rows: (new_value: number) => void;
  num_cols: (new_value: number) => void;
  gap: CSS_Input;
}

export interface Grid_Pos {
  start_col?: number;
  end_col?: number;
  start_row?: number;
  end_row?: number;
}

interface Drag_Res {
  xy: XY_Pos;
  grid: Grid_Pos;
}

interface Drag_Options {
  watching_element: HTMLElement;
  drag_dir: Drag_Type;
  grid_element?: HTMLElement;
  on_start?: (start_loc: XY_Pos) => void;
  on_drag?: (drag_info: Drag_Res) => void;
  on_end?: (drag_info: Drag_Res) => void;
}

const enum App_Mode {
  ShinyNew,
  ShinyExisting,
  ClientSide,
}
window.onload = function () {
  draw_browser_header();
  // Keep track of the grid controls here. Tradeoff of a global variable
  // feels worth it for direct access to the values without doing a dom query
  const grid_controls = { rows: [], cols: [] };
  // All the currently existing cells making up the grid
  let current_cells = [];

  // This holds the grid element dom node. Gets filled in the onload callback
  // I am using a global variable here because we query inside this so much that
  // it felt silly to regrab it every time as it never moves.
  const grid_holder: HTMLElement = document.querySelector("#grid_page");

  const settings_panel: HTMLElement = document.querySelector(
    "#settings .card-body"
  );

  const grid_settings: Grid_Settings = {
    num_rows: make_incrementer({
      parent_el: settings_panel,
      id: "num_rows",
      start_val: 2,
      label: "Number of rows",
      on_increment: (x) => update_num_rows_or_cols("rows", x),
    }),
    num_cols: make_incrementer({
      parent_el: settings_panel,
      id: "num_cols",
      start_val: 2,
      label: "Number of cols",
      on_increment: (x) => update_num_rows_or_cols("cols", x),
    }),
    gap: make_css_unit_input({
      parent_el: make_el(
        settings_panel,
        "div#gap_size_chooser.plus_minus_input.settings-grid",
        {
          innerHTML: `<span class = "label">Panel gap size</span>`,
        }
      ),
      selector: "#gap_size_chooser",
      on_change: (x) => update_grid({ gap: x }),
      allowed_units: ["px", "rem"],
    }),
  };

  function update_num_rows_or_cols(dir, new_count) {
    const current_vals =
      dir === "rows" ? get_current_rows() : get_current_cols();

    if (new_count > current_vals.length) {
      current_vals.push("1fr");
    } else if (new_count < current_vals.length) {
      current_vals.pop();
    } else {
      // No change, shouldn't happen but maybe...
    }
    update_grid({ [dir]: current_vals });
  }

  const app_mode: App_Mode = grid_holder.hasChildNodes()
    ? App_Mode.ShinyExisting
    : Shiny
    ? App_Mode.ShinyNew
    : App_Mode.ClientSide;

  if (app_mode === App_Mode.ShinyExisting) {
    
    // Container styles are in this object
    const styles_for_container = find_rules_by_selector("#grid_page");

    const current_rows = styles_for_container.gridTemplateRows.split(" ");
    const current_cols = styles_for_container.gridTemplateColumns.split(" ");
    // I dont know why this is just .gap and not gridGap
    const current_gap = styles_for_container.gap;

    // If grided is running on an existing app, we need to parse the children and
    // add them as elements;
    const children = [...grid_holder.children];
    
    children.forEach(function (el) {
      add_element({
        id: el.id,
        grid_pos: get_grid_pos(el as HTMLElement),
        existing_element: el as HTMLElement,
      });
    });
    
    // Make sure grid matches the one the app is working with
    update_grid({
      rows: current_rows,
      cols: current_cols,
      gap: current_gap,
    });

    // Make grid cells transparent so the app is seen beneath them
    find_rules_by_selector(".grid-cell").background = "none";
  } else if (app_mode === App_Mode.ShinyNew) {
    Shiny.addCustomMessageHandler("update-grid", function (opts) {
      update_grid(opts);
    });

    interface Shiny_Element_Msg {
      id: string;
      start_row: number;
      end_row: number;
      start_col: number;
      end_col: number;
    }
    Shiny.addCustomMessageHandler("add-elements", function (elements_to_add: Shiny_Element_Msg[]) {
      elements_to_add.forEach((el: Shiny_Element_Msg) => {
        add_element({
          id: el.id,
          grid_pos: el,
        });
      });
    });

    Shiny.addCustomMessageHandler("code_modal", function (code_to_show) {
      show_code("Paste the following code into your app to update the layout", {
        type: "R",
        code: code_to_show,
      });
    });
  } else {
    // If in pure-client-side mode we need to provide a default grid and also wireup the code button
    update_grid({
      rows: ["1fr", "1fr"],
      cols: ["1fr", "1fr"],
      gap: "1rem",
    });

    document.getElementById("get_code").addEventListener("click", function () {
      const current_layout = gen_code_for_layout();
      show_code("Place the following in your CSS:", current_layout);
    });
  }
  interface Code_Text {
    type: string;
    code: string;
  }
  function show_code(
    message: string,
    code_blocks: Code_Text | Array<Code_Text>
  ) {
    const code_modal = focused_modal({
      header_text: `${message}`,
      modal_callbacks: {
        event: "click",
        func: function (event) {
          // This is needed to stop clicks on modal from triggering the cancel
          // event that is attached to the background
          event.stopPropagation();
        },
      },
      background_callbacks: {
        event: "click",
        func: close_modal,
      },
    });

    as_array(code_blocks).forEach(function (code_to_show) {
      const num_of_lines: number = code_to_show.code.match(/\n/g).length;

      const code_section = make_el(
        code_modal.modal,
        `div#${code_to_show.type}.code_chunk`,
        {
          styles: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "1fr, auto",
            gridGap: "4px",
            gridTemplateAreas: concat_nl(
              `"code_type copy_btn"`,
              `"code_text code_text"`
            ),
          },
        }
      );

      let code_text: HTMLInputElement;

      make_el(code_section, "strong", {
        innerHTML: code_to_show.type,
        styles: { gridArea: "code_type" },
      });

      make_el(code_section, "button#copy_code", {
        innerHTML: "Copy to clipboard",
        styles: { gridArea: "copy_btn" },
        event_listener: {
          event: "click",
          func: function () {
            code_text.select();
            document.execCommand("copy");
          },
        },
      });

      code_text = make_el(code_section, "textarea#code_for_layout", {
        innerHTML: code_to_show.code,
        props: { rows: num_of_lines + 3 },
        styles: {
          width: "100%",
          background: "#f3f2f2",
          fontFamily: "monospace",
          display: "block",
          padding: "0.75rem",
          marginBottom: "10px",
          borderRadius: "5px",
          gridArea: "code_text",
        },
      }) as HTMLInputElement;
    });

    const action_buttons = make_el(code_modal.modal, "div#action_buttons", {
      styles: {
        display: "flex",
        justifyContent: "space-around",
      },
    });
    make_el(action_buttons, "button#close_code_model", {
      innerHTML: "Close",
      event_listener: {
        event: "click",
        func: close_modal,
      },
    });

    function close_modal() {
      code_modal.remove();
    }
  }

  function fill_grid_cells() {
    const grid_dims = { rows: get_current_rows(), cols: get_current_cols() };
    const num_rows = grid_dims.rows.length;
    const num_cols = grid_dims.cols.length;
    // Grab currently drawn cells (if any) so we can check if we need to redraw
    // or if this was simply a column/row sizing update
    current_cells = [];
    const need_to_reset_cells = current_cells.length != num_rows * num_cols;

    if (need_to_reset_cells) {
      remove_elements(grid_holder.querySelectorAll(".grid-cell"));
      for (let row_i = 1; row_i <= num_rows; row_i++) {
        for (let col_i = 1; col_i <= num_cols; col_i++) {
          current_cells.push(
            make_el(grid_holder, `div.r${row_i}.c${col_i}.grid-cell`, {
              data_props: { row: row_i, col: col_i },
              grid_pos: { start_row: row_i, start_col: col_i },
            })
          );
        }
      }

      // Build each column and row's sizing controler
      for (let type in grid_controls) {
        // Get rid of old ones to start with fresh slate
        remove_elements(grid_holder.querySelectorAll(`.${type}-controls`));
        grid_controls[type] = grid_dims[type].map(function (
          size: string,
          i: number
        ) {
          // The i + 1 is because grid is indexed at 1, not zero
          const grid_i = i + 1;

          return make_css_unit_input({
            parent_el: grid_holder,
            selector: `#control_${type}${grid_i}.${type}-controls`,
            start_val: get_css_value(size),
            start_unit: get_css_unit(size),
            on_change: () => update_grid(get_layout_from_controls()),
            form_styles: {
              [`grid${
                type === "rows" ? "Row" : "Column"
              }`]: make_template_start_end(grid_i),
            },
            drag_dir: type === "rows" ? "y" : "x",
          });
        });
      }
      const current_selection_box = make_el(
        grid_holder,
        "div#current_selection_box.added-element"
      );
      const drag_canvas = make_el(grid_holder, "div#drag_canvas");

      drag_on_grid({
        watching_element: drag_canvas,
        grid_element: current_selection_box,
        drag_dir: Drag_Type.bottom_right,
        on_start: () => {
          current_selection_box.style.borderColor = get_next_color();
        },
        on_end: ({ grid }) => {
          name_new_element({
            grid_pos: grid,
            selection_box: current_selection_box,
          });
        },
      });

      // Make sure any added elements sit on top by re-appending them to grid holder
      // Make sure that the drag detector sits over everything
      [
        drag_canvas,
        ...grid_holder.querySelectorAll(".added-element"),
      ].forEach((el) => grid_holder.appendChild(el));
    } else {
    }
  }
  function get_drag_extent_on_grid(selection_rect: Selection_Rect): Grid_Pos {
    // Reset bounding box definitions so we only use current selection extent
    const sel_bounds: Grid_Pos = { start_col: null, start_row: null };

    current_cells.forEach(function (el) {
      // Cell is overlapped by selection box
      if (boxes_overlap(get_bounding_rect(el), selection_rect)) {
        const el_row: number = +el.dataset.row;
        const el_col: number = +el.dataset.col;
        sel_bounds.start_row = min_w_missing(sel_bounds.start_row, el_row);
        sel_bounds.end_row = max_w_missing(sel_bounds.end_row, el_row);
        sel_bounds.start_col = min_w_missing(sel_bounds.start_col, el_col);
        sel_bounds.end_col = max_w_missing(sel_bounds.end_col, el_col);
      }
    });

    return sel_bounds;
  }

  interface Grid_Update_Options {
    rows?: Array<string>;
    cols?: Array<string>;
    gap?: string;
  }
  function update_grid(opts: Grid_Update_Options) {
    const old_num_rows = get_current_rows().length;
    const old_num_cols = get_current_cols().length;
    const old_gap = grid_holder.style.getPropertyValue("--grid-gap");
    const new_gap = opts.gap || old_gap;
    const new_num_rows = opts.rows ? opts.rows.length : old_num_rows;
    const new_num_cols = opts.cols ? opts.cols.length : old_num_cols;

    // Make sure settings panel is up-to-date
    grid_settings.num_rows(new_num_rows);
    grid_settings.num_cols(new_num_cols);
    grid_settings.gap.update_value(new_gap);

    const grid_numbers_changed =
      old_num_rows !== new_num_rows || old_num_cols !== new_num_cols;
    if (grid_numbers_changed) {
      // Check for elements that may get dropped
      const all_els = current_elements();
      let in_danger_els = [];
      let auto_removed_el_ids = [];

      all_els.forEach(function (el) {
        const sits_outside_grid =
          el.end_row > new_num_rows || el.end_col > new_num_cols;
        const completely_outside_grid =
          el.start_row > new_num_rows || el.start_col > new_num_cols;

        if (completely_outside_grid) {
          auto_removed_el_ids.push(el.id);
        } else if (sits_outside_grid) {
          in_danger_els.push(el);
        }
      });

      remove_added_elements(auto_removed_el_ids);

      if (in_danger_els.length > 0) {
        const fix_els_modal = focused_modal({
          header_text: `
        <h2>The following elements dont fit on the new grid layout.</h2>
        <p>Below, choose to either remove the element or to shink its bounds to the new grid sizing</p>
        `,
        });

        const radio_inputs_html = in_danger_els.reduce(
          (radio_group, el) =>
            `
          ${radio_group}
          <div class = "radio-set-group">
            <div class = "radio-set-label"> ${el.id} </div>
            <div class = "radio-set-options">
              <input type="radio" id = "delete_${el.id}" name="${el.id}" value="delete" checked>
              <label for="delete_${el.id}">Delete</label>
              <input type="radio" id = "shrink_${el.id}" name="${el.id}" value="shrink">
              <label for="shrink_${el.id}">Shink</label>
            </div>
          </div>
        `,
          ""
        );

        const delete_or_edit_form = make_el(
          fix_els_modal.modal,
          "form#delete_or_fix_list",
          {
            innerHTML: `<div class = "update-action-form"> ${radio_inputs_html} </div>`,
            event_listener: {
              event: "submit",
              func: function () {
                const form = this;
                const to_delete = in_danger_els.filter(
                  (d) => form[d.id].value === "delete"
                );

                remove_added_elements(to_delete.map((d) => d.id));
                const to_edit = in_danger_els.filter(
                  (d) => form[d.id].value === "shrink"
                );
                to_edit.forEach((el) => {
                  const el_node: HTMLElement = grid_holder.querySelector(
                    `#${el.id}`
                  );

                  el_node.style.gridRow = make_template_start_end(
                    el.start_row,
                    Math.min(el.end_row, new_num_rows)
                  );
                  el_node.style.gridColumn = make_template_start_end(
                    el.start_col,
                    Math.min(el.end_col, new_num_cols)
                  );
                });

                fix_els_modal.remove();
                // Now that we've updated elements properly, we should be able to
                // just recall the function and it won't spit an error
                update_grid({
                  rows: opts.rows,
                  cols: opts.cols,
                  gap: opts.gap,
                });
              },
            },
          }
        );

        make_el(delete_or_edit_form, "input#name_submit", {
          props: { type: "submit" },
        });

        make_el(fix_els_modal.modal, "p.notice-text", {
          innerHTML:
            "Note that elements residing completely in the removed row or column are automatically deleted.",
        });

        return;
      }
    }

    if (opts.rows) {
      grid_holder.style.gridTemplateRows = sizes_to_template_def(opts.rows);
    }
    if (opts.cols) {
      grid_holder.style.gridTemplateColumns = sizes_to_template_def(opts.cols);
    }
    if (opts.gap) {
      // To give a consistant gap around everything we also add margin of same size
      grid_holder.style.setProperty("--grid-gap", opts.gap);
    }

    if (grid_numbers_changed) fill_grid_cells();

    if (app_mode == App_Mode.ShinyNew) {
      Shiny.setInputValue("grid_sizing", {
        rows: grid_holder.style.gridTemplateRows.split(" "),
        cols: grid_holder.style.gridTemplateColumns.split(" "),
        gap: grid_holder.style.getPropertyValue("--grid-gap"),
      });
    }

    return grid_holder;
  }

  function get_layout_from_controls() {
    const sizes = {};
    for (let type in grid_controls) {
      sizes[type] = grid_controls[type].map((unit_input) =>
        unit_input.current_value()
      );
    }
    return sizes;
  }

  function name_new_element({ grid_pos, selection_box }) {
    const modal_divs = focused_modal({
      background_callbacks: {
        // Clicking outside of the modal will cancel the naming. Seems natural
        event: "click",
        func: reset_el_creation,
      },
      modal_callbacks: {
        event: "click",
        func: function (event) {
          // This is needed to stop clicks on modal from triggering the cancel
          // event that is attached to the background
          event.stopPropagation();
        },
      },
    });

    const modal_div = modal_divs.modal;

    make_el(modal_div, "div.instructions", {
      innerHTML: `
      <h2>Name your element:</h2>
      <p>This name will be used to place items in your app.
      For instance if you want to place a plot in this element,
      this name will match the label of the plot output
      </p>
      `,
    });

    const name_form = make_el(modal_div, "form#name_form", {
      event_listener: {
        event: "submit",
        func: function (event) {
          event.preventDefault();
          const id = this["name_input"].value.replace(/\s/g, "_");

          const element_exists: boolean = !!current_elements().find(
            (el) => el.id === id
          );
          if (element_exists) {
            // Cant have duplicate ids!
            warn_about_bad_id(
              `You already have an element with the id ${id}, all ids need to be unique.`
            );
            return;
          }
          if (id.match(/^[^a-zA-Z]/g)) {
            warn_about_bad_id(`Valid ids need to start with a character.`);
            return;
          }

          // Add the new element in to grid
          add_element({
            id,
            color: selection_box.style.borderColor,
            grid_pos,
          });

          reset_el_creation();
        },
      },
    });
    make_el(name_form, "input#cancel_btn", {
      props: { type: "button", value: "cancel" },
      event_listener: { event: "click", func: reset_el_creation },
    });

    make_el(name_form, "input#name_input", {
      props: { type: "text" },
      event_listener: {
        // Don't leave warning message up while user is typing
        event: "input",
        func: hide_warning_msg,
      },
    }).focus(); // So user can immediately type in id

    make_el(name_form, "input#name_submit", {
      props: { type: "submit" },
    });

    function warn_about_bad_id(msg) {
      make_el(modal_div, "span#bad_id_msg.notice-text", {
        innerHTML: msg,
        styles: { color: "orangered" },
      });
    }
    function hide_warning_msg() {
      const warn_msg = modal_div.querySelector("span#bad_id_msg");
      if (warn_msg) {
        warn_msg.remove();
      }
    }
    function reset_el_creation() {
      // All done here so get rid of the whole interface.
      modal_divs.remove();
      // Remove the temporary dragged element
      selection_box.style.display = "none";
    }
  }

  // Adds a new element of a given id to the app. Both in the grid window
  // and the addeded elements panel
  interface New_Element{
    id: string;
    color?: string;
    grid_pos: Grid_Pos;
    existing_element?: HTMLElement;
  };

  function add_element(el_props: New_Element) {

    const {id, grid_pos, color = get_next_color(), existing_element} = el_props;

    const element_in_grid = make_el(
      grid_holder,
      `div#${id}.el_${id}.added-element`,
      {
        grid_pos,
        styles: {
          borderColor: color,
          position: "relative",
        },
      }
    );

    // Setup drag behavior
    [Drag_Type.top_left, Drag_Type.bottom_right, Drag_Type.center].forEach(
      function (handle_type) {
        drag_on_grid({
          watching_element: make_el(
            element_in_grid,
            `div.dragger.visible.${handle_type}`,
            {
              styles: { background: color },
              innerHTML:
                handle_type === "center"
                  ? drag_icon
                  : handle_type === Drag_Type.bottom_right
                  ? se_arrow
                  : nw_arrow,
            }
          ),
          grid_element: element_in_grid,
          drag_dir: handle_type,
          on_drag: (res) => {
            if(existing_element){
              set_element_in_grid(existing_element, res.grid);
            }
          },
          on_end: () => {
            send_elements_to_shiny();
          },
        });
      }
    );

    const element_in_list = make_el(
      document.querySelector("#added_elements"),
      `div.el_${id}.added-element`,
      {
        innerHTML: id,
        styles: {
          borderColor: color,
        },
        event_listener: [
          {
            event: "mouseover",
            func: function () {
              this.classList.add("hovered");
              element_in_grid.classList.add("hovered");
            },
          },
          {
            event: "mouseout",
            func: function () {
              this.classList.remove("hovered");
              element_in_grid.classList.remove("hovered");
            },
          },
        ],
      }
    );

    make_el(element_in_list, "button.remove_el", {
      innerHTML: trashcan_icon,
      event_listener: {
        event: "click",
        func: function () {
          remove_added_elements(id);
        },
      },
    });

    // Let shiny know we have a new element
    send_elements_to_shiny();
  }

  function get_grid_pos(grid_el: HTMLElement): Grid_Pos {
    const el_styles = getComputedStyle(grid_el);
    return {
      start_row: +el_styles.gridRowStart,
      start_col: +el_styles.gridColumnStart,
      end_row:   +el_styles.gridRowEnd - 1,
      end_col:   +el_styles.gridColumnEnd - 1,
    };
  }

  function drag_on_grid(opts: Drag_Options): void {
    let drag_feedback_rect: HTMLElement;
    let start_rect: Selection_Rect;
    let start_loc: XY_Pos;

    const editor_el: HTMLElement = document.querySelector("#editor");

    opts.watching_element.onmousedown = function (event: MouseEvent) {
      start_loc = event as DragEvent;

      // make sure dragged element is on top
      grid_holder.appendChild(opts.grid_element);

      // If this is a new element drag there wont be a bounding box for the grid
      // element yet, so we need to make a new zero-width/height one at start
      // of the drag
      start_rect = get_bounding_rect(opts.grid_element) || {
        left: event.offsetX,
        right: event.offsetX,
        top: event.offsetY,
        bottom: event.offsetY,
      };

      drag_feedback_rect = make_el(
        grid_holder.querySelector("#drag_canvas"),
        "div.drag-feedback-rect",
        {
          styles: {
            ...bounding_rect_to_css_pos(start_rect),
          },
        }
      );

      // We start grid position here in case user selects by simply clicking,
      // which would mean we never get to run the drag function
      update_grid_pos(opts.grid_element, start_rect);

      if (opts.on_start) opts.on_start(start_loc);

      // Add listener to editor so we can continue to track this drag
      editor_el.addEventListener("mousemove", drag);
      editor_el.addEventListener("mouseup", drag_end);
    };

    function update_grid_pos(
      element: HTMLElement,
      bounding_rect: Selection_Rect
    ): Grid_Pos {
      const grid_extent = get_drag_extent_on_grid(bounding_rect);
      set_element_in_grid(element, grid_extent);
      return grid_extent;
    }

    function drag(event: MouseEvent) {
      const curr_loc: XY_Pos = event;
      // Sometimes the drag event gets fired with nonsense zeros
      if (curr_loc.x === 0 && curr_loc.y === 0) return;

      const new_rect = update_rect_with_delta(
        start_rect,
        { x: curr_loc.x - start_loc.x, y: curr_loc.y - start_loc.y },
        opts.drag_dir
      );

      Object.assign(
        drag_feedback_rect.style,
        bounding_rect_to_css_pos(new_rect)
      );
      const grid_extent = update_grid_pos(opts.grid_element, new_rect);
      if (opts.on_drag) opts.on_drag({ xy: curr_loc, grid: grid_extent });
    }

    function drag_end(event: MouseEvent) {
      const end_loc: XY_Pos = event;
      drag_feedback_rect.remove();
      start_rect = null;
      start_loc = null;
      if (opts.on_end)
        opts.on_end({
          xy: end_loc,
          grid: get_grid_pos(opts.grid_element || this.parentElement),
        });

      editor_el.removeEventListener("mousemove", drag);
      editor_el.removeEventListener("mouseup", drag_end);
    }

    function bounding_rect_to_css_pos(rect: Selection_Rect) {
      return {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.right - rect.left}px`,
        height: `${rect.bottom - rect.top}px`,
      };
    }
  }

  interface Element_Info {
    id: string;
    start_row: number;
    end_row: number;
    start_col: number;
    end_col: number;
  }

  function current_elements(): Array<Element_Info> {
    let elements: Array<Element_Info> = [];

    (grid_holder.querySelectorAll(".added-element") as NodeListOf<
      HTMLElement
    >).forEach(function (el: HTMLElement) {
      // Ignore the selection box
      if (el.id === "current_selection_box") return;
      const grid_area = el.style.gridArea.split(" / ");
      elements.push({
        id: el.id,
        start_row: +grid_area[0],
        start_col: +grid_area[1],
        // Subtract one here because the end in css is the end line, not row
        end_row: +grid_area[2] - 1,
        end_col: +grid_area[3] - 1,
      });
    });

    return elements;
  }

  function send_elements_to_shiny() {
    if (app_mode == App_Mode.ShinyNew) {
      const elements_by_id = {};
      current_elements().forEach(function (el) {
        elements_by_id[el.id] = el;
      });
      Shiny.setInputValue("elements", elements_by_id);
    }
  }

  function gen_code_for_layout(): Array<Code_Text> {
    const container_selector = "#container";
    const elements = current_elements();

    const element_defs = elements.map((el) =>
      concat_nl(
        `#${el.id} {`,
        `  grid-column: ${make_template_start_end(el.start_col, el.end_col)};`,
        `  grid-row: ${make_template_start_end(el.start_row, el.end_row)};`,
        `}`
      )
    );

    const css_code = concat_nl(
      `${container_selector} {`,
      `  display: grid;`,
      `  grid-template-columns: ${grid_holder.style.gridTemplateColumns};`,
      `  grid-template-rows: ${grid_holder.style.gridTemplateRows};`,
      `  grid-gap: ${grid_holder.style.getPropertyValue("--grid-gap")}`,
      `}`,
      ...element_defs
    );

    const html_code = concat_nl(
      `<div id = ${container_selector}>`,
      ...elements.map((el) =>
        concat_nl(`  <div id = "#${el.id}">`, `  </div>`)
      ),
      `</div>`
    );

    return [
      { type: "css", code: css_code },
      { type: "html", code: html_code },
    ];
  }

  function get_current_rows() {
    return grid_holder.style.gridTemplateRows.split(" ");
  }

  function get_current_cols() {
    return grid_holder.style.gridTemplateColumns.split(" ");
  }

  // Get the next color in our list of colors.
  function get_next_color() {
    const colors = [
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#a65628",
      "#f781bf",
    ];
    const all_elements = grid_holder.querySelectorAll(".added-element");
    // If we have more elements than colors we simply recycle
    return colors[all_elements.length % colors.length];
  }

  // Removes elements the user has added to the grid by id
  function remove_added_elements(ids: string | Array<string>) {
    as_array(ids).forEach((el_id) => {
      remove_elements(
        document.querySelectorAll(`div.el_${el_id}.added-element`)
      );
    });

    send_elements_to_shiny();
  }
}; // End of the window.onload callback

window.onresize = function () {
  draw_browser_header();
};
