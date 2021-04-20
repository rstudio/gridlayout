// JS entry point
import { Block_El, make_el, remove_elements } from "./make-elements";
import { focused_modal, show_code } from "./make-focused_modal";
import { make_css_unit_input, CSS_Input } from "./make-css_unit_input";
import {
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
  set_class,
} from "./utils-misc";
import {
  sizes_to_template_def,
  set_element_in_grid,
  get_pos_on_grid,
  gen_code_for_layout,
  set_gap_size,
  get_gap_size,
  make_template_start_end,
} from "./utils-grid";
import { trashcan_icon, drag_icon, se_arrow, nw_arrow } from "./utils-icons";
import {
  find_selector_by_property,
  get_css_props_by_selector,
} from "./utils-cssom";
import { wrap_in_grided } from "./wrap_in_grided";
import {
  add_shiny_listener,
  send_elements_to_shiny,
  send_grid_sizing_to_shiny,
  setShinyInput,
} from "./utils-shiny";
import { get_cols, get_rows } from "./utils-grid";

export const Shiny = (window as any).Shiny;

export type Grid_Settings = {
  num_rows: (new_value: number) => void;
  num_cols: (new_value: number) => void;
  gap: CSS_Input;
};

export type Grid_Update_Options = {
  rows?: string[];
  cols?: string[];
  gap?: string;
  force?: boolean;
  dont_send_to_shiny?: boolean;
};

export type Grid_Pos = {
  start_col?: number;
  end_col?: number;
  start_row?: number;
  end_row?: number;
};

type Drag_Res = {
  xy: XY_Pos;
  grid: Grid_Pos;
};

type Drag_Options = {
  watching_element: HTMLElement;
  drag_dir: Drag_Type;
  grid_element?: HTMLElement;
  on_start?: (start_loc: XY_Pos) => void;
  on_drag?: (drag_info: Drag_Res) => void;
  on_end?: (drag_info: Drag_Res) => void;
};

export type Element_Info = {
  id: string;
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
};

const debug_messages = true;

window.onload = function () {
  // Keep track of the grid controls here. Tradeoff of a global variable
  // feels worth it for direct access to the values without doing a dom query
  const grid_controls = { rows: [], cols: [] };
  // All the currently existing cells making up the grid
  let current_cells = [];
  // Do we already have a div with id grid_page in our app? Aka the grided UI
  // has been already added?
  const grid_layout_rule = find_selector_by_property("display", "grid");

  const grid_container_selector = grid_layout_rule.rule_exists
    ? grid_layout_rule.selector
    : "#grid_page";

  // This holds the grid element dom node. Gets filled in the onload callback
  // I am using a global variable here because we query inside this so much that
  // it felt silly to regrab it every time as it never moves.
  const grid_container: HTMLElement = grid_layout_rule.rule_exists
    ? document.querySelector(grid_container_selector)
    : Block_El("div#grid_page");

  const { grid_settings, grid_is_filled, existing_children } = wrap_in_grided(
    grid_container,
    update_grid,
    setShinyInput
  );

  const app_mode = grid_is_filled
    ? "ShinyExisting"
    : Shiny
    ? "ShinyNew"
    : "ClientSide";

  // Only set a default gap sizing if it isn't already provided
  if (app_mode !== "ShinyExisting") {
    set_gap_size(grid_container.style, "1rem");
    grid_container.style.padding = "1rem";
  }

  add_shiny_listener("shiny-loaded", function (event) {
    if (debug_messages) console.log("connected to shiny");
    // Send elements to Shiny so app is aware of what it's working with
    send_elements_to_shiny(current_elements());
    send_grid_sizing_to_shiny(grid_container.style);
  });

  add_shiny_listener( "finish-button-text", function(label_text: string){
    document.querySelector("button#update_code").innerHTML = label_text;
  })

  if (app_mode === "ShinyExisting") {
    // If grided is running on an existing app, we need to parse the children and
    // add them as elements;
    existing_children.forEach(function (el) {
      add_element(grid_container, {
        id: el.id,
        grid_pos: get_pos_on_grid(el as HTMLElement),
        existing_element: el as HTMLElement,
      });
    });

    // Container styles are in this object
    const current_grid_props: {
      gridTemplateRows?: string;
      gridTemplateColumns?: string;
      gap?: string;
    } = get_css_props_by_selector(grid_container_selector, [
      "gridTemplateColumns",
      "gridTemplateRows",
      "gap",
    ]);

    // Make sure grid matches the one the app is working with
    update_grid({
      rows: current_grid_props.gridTemplateRows.split(" "),
      cols: current_grid_props.gridTemplateColumns.split(" "),
      gap: get_gap_size(current_grid_props.gap),
      force: true,
    });

    // Make grid cells transparent so the app is seen beneath them
    set_class(grid_container.querySelectorAll(".grid-cell"), "transparent");
    
  } else if (app_mode === "ShinyNew") {
    add_shiny_listener("update-grid", update_grid);

    type Shiny_Element_Msg = {
      id: string;
      start_row: number;
      end_row: number;
      start_col: number;
      end_col: number;
    };
    add_shiny_listener("add-elements", function (
      elements_to_add: Shiny_Element_Msg[]
    ) {
      elements_to_add.forEach((el: Shiny_Element_Msg) => {
        add_element(grid_container, {
          id: el.id,
          grid_pos: el,
        });
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
      show_code(
        "Place the following in your CSS:",
        gen_code_for_layout(current_elements(), grid_container.style)
      );
    });
  }

  add_shiny_listener("code_modal", function (code_to_show) {
    show_code("Paste the following code into your app to update the layout", {
      type: "R",
      code: code_to_show,
    });
  });

  add_shiny_listener("code_update_problem", function (code_to_show) {
    show_code(
      "Sorry, Couldn't find your layout to update. Make sure it's in the foreground of RStudio. Here's the code to paste in case all else fails.",
      {
        type: "R",
        code: code_to_show,
      }
    );
  });

  function fill_grid_cells() {
    const grid_dims = {
      rows: get_rows(grid_container),
      cols: get_cols(grid_container),
    };
    const num_rows = grid_dims.rows.length;
    const num_cols = grid_dims.cols.length;
    // Grab currently drawn cells (if any) so we can check if we need to redraw
    // or if this was simply a column/row sizing update
    current_cells = [];
    const need_to_reset_cells = current_cells.length != num_rows * num_cols;

    if (need_to_reset_cells) {
      remove_elements(grid_container.querySelectorAll(".grid-cell"));
      for (let row_i = 1; row_i <= num_rows; row_i++) {
        for (let col_i = 1; col_i <= num_cols; col_i++) {
          current_cells.push(
            make_el(grid_container, `div.r${row_i}.c${col_i}.grid-cell`, {
              data_props: { row: row_i, col: col_i },
              grid_pos: { start_row: row_i, start_col: col_i },
            })
          );
        }
      }

      // Build each column and row's sizing controler
      for (let type in grid_controls) {
        // Get rid of old ones to start with fresh slate
        remove_elements(grid_container.querySelectorAll(`.${type}-controls`));
        grid_controls[type] = grid_dims[type].map(function (
          size: string,
          i: number
        ) {
          // The i + 1 is because grid is indexed at 1, not zero
          const grid_i = i + 1;

          return make_css_unit_input({
            parent_el: grid_container,
            selector: `#control_${type}${grid_i}.${type}-controls`,
            start_val: get_css_value(size),
            start_unit: get_css_unit(size),
            on_change: () => update_grid(get_layout_from_controls()),
            on_drag: () =>
              update_grid({
                ...get_layout_from_controls(),
                dont_send_to_shiny: true,
              }),
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
        grid_container,
        "div#current_selection_box.added-element"
      );
      const drag_canvas = make_el(grid_container, "div#drag_canvas");

      drag_on_grid({
        watching_element: drag_canvas,
        grid_element: current_selection_box,
        drag_dir: "bottom-right",
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
        ...grid_container.querySelectorAll(".added-element"),
      ].forEach((el) => grid_container.appendChild(el));
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

  function update_grid(opts: Grid_Update_Options) {
    const old_num_rows = get_rows(grid_container).length;
    const old_num_cols = get_cols(grid_container).length;
    const old_gap = get_gap_size(grid_container.style);
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
                  const el_node: HTMLElement = grid_container.querySelector(
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
      grid_container.style.gridTemplateRows = sizes_to_template_def(opts.rows);
    }
    if (opts.cols) {
      grid_container.style.gridTemplateColumns = sizes_to_template_def(
        opts.cols
      );
    }
    if (opts.gap) {
      // This sets the --grid-gap variable so that the controls that need the
      // info can use it to keep a constant distance from the grid holder
      grid_container.parentElement.style.setProperty("--grid-gap", opts.gap);
      // We dont use css variables in the exported css that existing apps used
      // so we need to modify both gap and padding
      set_gap_size(grid_container.style, opts.gap);
      grid_container.style.padding = opts.gap;
    }

    if (grid_numbers_changed || opts.force) {
      fill_grid_cells();
    }

    if (!opts.dont_send_to_shiny) {
      send_grid_sizing_to_shiny(grid_container.style);
    }

    return grid_container;
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
          add_element(grid_container, {
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
  type New_Element = {
    id: string;
    color?: string;
    grid_pos: Grid_Pos;
    existing_element?: HTMLElement;
  };

  function add_element(grid_container: HTMLElement, el_props: New_Element) {
    const { grid_pos, color = get_next_color(), existing_element } = el_props;
    const mirrors_existing_element = existing_element !== undefined;
    // If element ids were generated with the grid_container R function then
    // they have a prefix of the container name which we should remove so the
    // added elements list is not ugly looking
    const id = mirrors_existing_element
      ? el_props.id.replace(/^.+?__/g, "")
      : el_props.id;

    const element_in_grid = make_el(
      grid_container,
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
    (["top-left", "bottom-right", "center"] as Drag_Type[]).forEach(function (
      handle_type: Drag_Type
    ) {
      drag_on_grid({
        watching_element: make_el(
          element_in_grid,
          `div.dragger.visible.${handle_type}`,
          {
            styles: { background: color },
            innerHTML:
              handle_type === "center"
                ? drag_icon
                : handle_type === "bottom-right"
                ? se_arrow
                : nw_arrow,
          }
        ),
        grid_element: element_in_grid,
        drag_dir: handle_type,
        on_drag: (res) => {
          if (mirrors_existing_element) {
            set_element_in_grid(existing_element, res.grid);
          }
        },
        on_end: () => {
          send_elements_to_shiny(current_elements());
        },
      });
    });

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

    if (!mirrors_existing_element) {
      // Turn of deleting if were editing an existing app
      // This means that if were in app editing mode and the user adds a new element
      // they can delete that new element but they can't delete the existing elements
      make_el(element_in_list, "button.remove_el", {
        innerHTML: trashcan_icon,
        event_listener: {
          event: "click",
          func: function () {
            remove_added_elements(id);
          },
        },
      });
    }

    // Let shiny know we have a new element
    send_elements_to_shiny(current_elements());
  }

  function drag_on_grid(opts: Drag_Options): void {
    let drag_feedback_rect: HTMLElement;
    let start_rect: Selection_Rect;
    let start_loc: XY_Pos;

    const editor_el: HTMLElement = document.querySelector("#grided__editor");

    opts.watching_element.onmousedown = function (event: MouseEvent) {
      start_loc = event as DragEvent;

      // make sure dragged element is on top
      grid_container.appendChild(opts.grid_element);

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
        grid_container.querySelector("#drag_canvas"),
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
          grid: get_pos_on_grid(opts.grid_element || this.parentElement),
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

  function current_elements(): Array<Element_Info> {
    let elements: Array<Element_Info> = [];

    (grid_container.querySelectorAll(".added-element") as NodeListOf<
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
    const all_elements = grid_container.querySelectorAll(".added-element");
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

    send_elements_to_shiny(current_elements());
  }
}; // End of the window.onload callback
