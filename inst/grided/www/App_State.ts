import { Element_Opts, make_el, remove_elements } from "./make-elements";
import {
  CSS_Input,
  get_css_unit,
  get_css_value,
  make_css_unit_input,
} from "./make-css_unit_input";
import {
  as_array,
  Drag_Type,
  filler_text,
  get_bounding_rect,
  Selection_Rect,
  update_rect_with_delta,
  XY_Pos,
} from "./utils-misc";
import {
  send_elements_to_shiny,
  send_grid_sizing_to_shiny,
} from "./utils-shiny";
import { Shiny, Element_Info } from "./index";
import {
  bounding_rect_to_css_pos,
  get_cols,
  get_drag_extent_on_grid,
  get_gap_size,
  get_pos_on_grid,
  get_rows,
  make_template_start_end,
  set_element_in_grid,
  set_gap_size,
  sizes_to_template_def,
} from "./utils-grid";
import { drag_icon, nw_arrow, se_arrow, trashcan_icon } from "./utils-icons";
import { focused_modal } from "./make-focused_modal";
import { make_incrementer } from "./make-incrementer";

type Grid_Settings = {
  num_rows: (new_value: number) => void;
  num_cols: (new_value: number) => void;
  gap: CSS_Input;
};

export type Grid_Pos = {
  start_col?: number;
  end_col?: number;
  start_row?: number;
  end_row?: number;
};

type Grid_Update_Options = {
  rows?: string[];
  cols?: string[];
  gap?: string;
  force?: boolean;
  dont_send_to_shiny?: boolean;
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

type New_Element = {
  id: string;
  color?: string;
  grid_pos: Grid_Pos;
  existing_element?: HTMLElement;
};

type Element_Entries = {
  grid_el: HTMLElement;
  list_el: HTMLElement;
};

export class App_State {
  controls: { rows: CSS_Input[]; cols: CSS_Input[] };
  settings_panel: Grid_Settings;
  // All the currently existing cells making up the grid
  current_cells: HTMLElement[] = [];
  elements: Record<string, Element_Entries> = {};

  container: HTMLElement;
  grid_styles: CSSStyleDeclaration;
  mode: "ShinyExisting" | "ShinyNew" | "ClientSide";

  constructor(opts: {
    controls: { rows: CSS_Input[]; cols: CSS_Input[] };
    settings_panel: HTMLElement;
    container: HTMLElement;
    grid_is_filled: boolean;
  }) {
    this.controls = opts.controls;
    this.container = opts.container;
    this.grid_styles = this.container.style;
    this.mode = opts.grid_is_filled
      ? "ShinyExisting"
      : Shiny
      ? "ShinyNew"
      : "ClientSide";
    this.settings_panel = make_settings_panel(this, opts.settings_panel);

    console.log("Hi app state");
  }

  get layout_from_controls() {
    const sizes = {};
    for (let type in this.controls) {
      sizes[type] = this.controls[type].map((unit_input: CSS_Input) =>
        unit_input.current_value()
      );
    }
    return sizes;
  }

  get row_sizes() { return get_rows(this.container); }
  get col_sizes() { return get_cols(this.container); }
  get num_rows() { return this.row_sizes.length; }
  get num_cols() { return this.col_sizes.length; }

  get gap_size() {return get_gap_size(this.grid_styles);}

  get grid_dims() {
    return {
      rows: this.row_sizes,
      cols: this.col_sizes,
    };
  }

  get num_elements(): number {
    return Object.keys(this.elements).length;
  }

  get current_elements(): Element_Info[] {
    const all_elements = [...Object.values(this.elements)].map(
      ({ grid_el }) => {
        const grid_area = grid_el.style.gridArea.split(" / ");
        return {
          id: grid_el.id,
          start_row: +grid_area[0],
          start_col: +grid_area[1],
          // Subtract one here because the end in css is the end line, not row
          end_row: +grid_area[2] - 1,
          end_col: +grid_area[3] - 1,
        };
      }
    );

    return all_elements;
  }

  // Get the next color in our list of colors.
  get next_color() {
    const colors = [
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#a65628",
      "#f781bf",
    ];
    // If we have more elements than colors we simply recycle
    return colors[this.num_elements % colors.length];
  }

  // Just so we dont have to always say make_el(this.container...)
  make_el(sel_txt: string, opts?: Element_Opts) {
    return make_el(this.container, sel_txt, opts);
  }

  // Removes elements the user has added to the grid by id
  remove_elements(ids: string | Array<string>) {
    as_array(ids).forEach((el_id) => {
      remove_elements(
        document.querySelectorAll(`div.el_${el_id}.added-element`)
      );
    });

    send_elements_to_shiny(this.current_elements);
  }

  setup_drag(opts: Drag_Options) {
    let drag_feedback_rect: HTMLElement;
    let start_rect: Selection_Rect;
    let start_loc: XY_Pos;

    const editor_el: HTMLElement = document.querySelector("#grided__editor");

    const update_grid_pos = (
      element: HTMLElement,
      bounding_rect: Selection_Rect
    ): Grid_Pos => {
      const grid_extent = get_drag_extent_on_grid(this, bounding_rect);
      set_element_in_grid(element, grid_extent);
      return grid_extent;
    };

    opts.watching_element.onmousedown = (event: MouseEvent) => {
      start_loc = event as DragEvent;

      // make sure dragged element is on top
      this.container.appendChild(opts.grid_element);

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
        this.container.querySelector("#drag_canvas"),
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
  }

  add_element(el_props: New_Element) {
    // If element ids were generated with the grid_container R function then
    // they have a prefix of the container name which we should remove so the
    // added elements list is not ugly looking
    if (el_props.existing_element) {
      el_props.id = el_props.id.replace(/^.+?__/g, "");
    }

    this.elements[el_props.id] = draw_elements(this, el_props);

    // Let shiny know we have a new element
    send_elements_to_shiny(this.current_elements);
  }

  update_grid(opts: Grid_Update_Options) {

    const new_num_rows = opts.rows ? opts.rows.length : this.num_rows;
    const new_num_cols = opts.cols ? opts.cols.length : this.num_cols;
  
    // Make sure settings panel is up-to-date
    this.settings_panel.num_rows(new_num_rows);
    this.settings_panel.num_cols(new_num_cols);
    this.settings_panel.gap.update_value(opts.gap || this.gap_size);
  
    const grid_numbers_changed =
    this.num_rows !== new_num_rows || this.num_cols !== new_num_cols;
    if (grid_numbers_changed) {
      // Check for elements that may get dropped
      let in_danger_els: Element_Info[] = [];
      let auto_removed_el_ids: string[] = [];
  
      this.current_elements.forEach(function (el) {
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
  
      this.remove_elements(auto_removed_el_ids);
  
      if (in_danger_els.length > 0) {

        show_danger_popup(this, in_danger_els, (to_edit) => {
          to_edit.forEach((el) => {
            const el_node: HTMLElement = this.container.querySelector(
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
          // Now that we've updated elements properly, we should be able to
          // just recall the function and it won't spit an error
          this.update_grid({
            rows: opts.rows,
            cols: opts.cols,
            gap: opts.gap,
          });
        });

        return;
      }
    }
  
    if (opts.rows) {
      this.grid_styles.gridTemplateRows = sizes_to_template_def(
        opts.rows
      );
    }
    if (opts.cols) {
      this.grid_styles.gridTemplateColumns = sizes_to_template_def(
        opts.cols
      );
    }
    if (opts.gap) {
      // This sets the --grid-gap variable so that the controls that need the
      // info can use it to keep a constant distance from the grid holder
      this.container.parentElement.style.setProperty("--grid-gap", opts.gap);
      // We dont use css variables in the exported css that existing apps used
      // so we need to modify both gap and padding
      set_gap_size(this.grid_styles, opts.gap);
      this.grid_styles.padding = opts.gap;
    }
  
    if (grid_numbers_changed || opts.force) {
      this.fill_grid_cells();
    }
  
    if (!opts.dont_send_to_shiny) {
      send_grid_sizing_to_shiny(this.grid_styles);
    }  
  }

  fill_grid_cells() {
    // Grab currently drawn cells (if any) so we can check if we need to redraw
    // or if this was simply a column/row sizing update
    const need_to_reset_cells =
      this.current_cells.length != this.num_rows * this.num_cols;

    if (need_to_reset_cells) {
      remove_elements(this.current_cells);
      this.current_cells = [];

      for (let row_i = 1; row_i <= this.num_rows; row_i++) {
        for (let col_i = 1; col_i <= this.num_cols; col_i++) {
          this.current_cells.push(
            this.make_el(`div.r${row_i}.c${col_i}.grid-cell`, {
              data_props: { row: row_i, col: col_i },
              grid_pos: { start_row: row_i, start_col: col_i },
            })
          );
        }
      }

      // Build each column and row's sizing controler
      for (let type in this.controls) {
        // Get rid of old ones to start with fresh slate
        remove_elements(this.container.querySelectorAll(`.${type}-controls`));
        this.controls[type] = this.grid_dims[type].map(
          (size: string, i: number) => {
            // The i + 1 is because grid is indexed at 1, not zero
            const grid_i = i + 1;

            return make_css_unit_input({
              parent_el: this.container,
              selector: `#control_${type}${grid_i}.${type}-controls`,
              start_val: get_css_value(size),
              start_unit: get_css_unit(size),
              on_change: () => this.update_grid(this.layout_from_controls),
              on_drag: () =>
                this.update_grid({
                  ...this.layout_from_controls,
                  dont_send_to_shiny: true,
                }),
              form_styles: {
                [`grid${
                  type === "rows" ? "Row" : "Column"
                }`]: make_template_start_end(grid_i),
              },
              drag_dir: type === "rows" ? "y" : "x",
            });
          }
        );
      }
      const current_selection_box = this.make_el(
        "div#current_selection_box.added-element"
      );
      const drag_canvas = this.make_el("div#drag_canvas");

      this.setup_drag({
        watching_element: drag_canvas,
        grid_element: current_selection_box,
        drag_dir: "bottom-right",
        on_start: () => {
          current_selection_box.style.borderColor = this.next_color;
        },
        on_end: ({ grid }) => {
          name_new_element(this, {
            grid_pos: grid,
            selection_box: current_selection_box,
          });
        },
      });

      // Make sure any added elements sit on top by re-appending them to grid holder
      // Make sure that the drag detector sits over everything
      [
        drag_canvas,
        ...this.container.querySelectorAll(".added-element"),
      ].forEach((el) => this.container.appendChild(el));
    } else {
    }
  }
} // End of class declaration

function make_settings_panel(
  app_state: App_State,
  panel_el: HTMLElement
): Grid_Settings {
  return {
    num_rows: make_incrementer({
      parent_el: panel_el,
      id: "num_rows",
      start_val: 2,
      label: "Number of rows",
      on_increment: (x) => update_num_rows_or_cols("rows", x),
    }),
    num_cols: make_incrementer({
      parent_el: panel_el,
      id: "num_cols",
      start_val: 2,
      label: "Number of cols",
      on_increment: (x) => update_num_rows_or_cols("cols", x),
    }),
    gap: make_css_unit_input({
      parent_el: make_el(
        panel_el,
        "div#gap_size_chooser.plus_minus_input.settings-grid",
        {
          innerHTML: `<span class = "input-label">Panel gap size</span>`,
        }
      ),
      selector: "#gap_size_chooser",
      on_change: (x) => app_state.update_grid({ gap: x }),
      allowed_units: ["px", "rem"],
    }),
  };

  function update_num_rows_or_cols(dir, new_count) {
    const current_vals = app_state.container.style[
      `gridTemplate${dir === "rows" ? "Rows" : "Columns"}`
    ].split(" ");

    if (new_count > current_vals.length) {
      current_vals.push("1fr");
    } else if (new_count < current_vals.length) {
      current_vals.pop();
    } else {
      // No change, shouldn't happen but maybe...
    }
    app_state.update_grid({ [dir]: current_vals });
  }
}

function name_new_element(app_state: App_State, { grid_pos, selection_box }) {
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

        // Can be replaced with better function operating directly on elements dict
        const element_exists: boolean = !!app_state.current_elements.find(
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
        app_state.add_element({
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

function draw_elements(app_state: App_State, el_props: New_Element) {
  const el_color = app_state.next_color;
  const grid_el = app_state.make_el(
    `div#${el_props.id}.el_${el_props.id}.added-element`,
    {
      grid_pos: el_props.grid_pos,
      // Add filler text for new elements so that auto-height will work
      innerHTML: el_props.existing_element ? "" : filler_text,
      styles: {
        borderColor: el_color,
        position: "relative",
      },
    }
  );

  // Setup drag behavior
  (["top-left", "bottom-right", "center"] as Drag_Type[]).forEach(
    (handle_type: Drag_Type) => {
      app_state.setup_drag({
        watching_element: make_el(
          grid_el,
          `div.dragger.visible.${handle_type}`,
          {
            styles: { background: el_color },
            innerHTML:
              handle_type === "center"
                ? drag_icon
                : handle_type === "bottom-right"
                ? se_arrow
                : nw_arrow,
          }
        ),
        grid_element: grid_el,
        drag_dir: handle_type,
        on_drag: (res) => {
          if (el_props.existing_element) {
            set_element_in_grid(el_props.existing_element, res.grid);
          }
        },
        on_end: () => {
          send_elements_to_shiny(app_state.current_elements);
        },
      });
    }
  );

  const list_el = make_el(
    document.querySelector("#added_elements"),
    `div.el_${el_props.id}.added-element`,
    {
      innerHTML: el_props.id,
      styles: { borderColor: el_color },
      event_listener: [
        {
          event: "mouseover",
          func: function () {
            this.classList.add("hovered");
            grid_el.classList.add("hovered");
          },
        },
        {
          event: "mouseout",
          func: function () {
            this.classList.remove("hovered");
            grid_el.classList.remove("hovered");
          },
        },
      ],
    }
  );

  if (!el_props) {
    // Turn of deleting if were editing an existing app
    // This means that if were in app editing mode and the user adds a new element
    // they can delete that new element but they can't delete the existing elements
    make_el(list_el, "button.remove_el", {
      innerHTML: trashcan_icon,
      event_listener: {
        event: "click",
        func: () => {
          this.remove_elements(el_props.id);
        },
      },
    });
  }

  return { grid_el, list_el };
}

function show_danger_popup(
  app_state: App_State, 
  in_danger_els: Element_Info[],
  on_finish: (to_edit: Element_Info[]) => void){
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

          app_state.remove_elements(to_delete.map((d) => d.id));
          const to_edit = in_danger_els.filter(
            (d) => form[d.id].value === "shrink"
          );

          on_finish(to_edit);

          fix_els_modal.remove();
          
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
}