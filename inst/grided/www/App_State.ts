import { Grid_Item, Grid_Pos } from "./Grid_Item";
import { Grid_Layout, Tract_Dir } from "./Grid_Layout";
import {
  CSS_Input,
  get_css_unit,
  get_css_value,
  make_css_unit_input,
  make_grid_tract_control,
} from "./make-css_unit_input";
import {
  Block_El,
  Element_Opts,
  make_el,
  remove_elements,
} from "./make-elements";
import { focused_modal } from "./make-focused_modal";
import { make_incrementer } from "./make-incrementer";
import { find_selector_by_property } from "./utils-cssom";
import {
  bounding_rect_to_css_pos,
  contains_element,
  get_drag_extent_on_grid,
  get_gap_size,
  get_pos_on_grid,
  grid_position_of_el,
  make_template_start_end,
  shrink_element_to_layout,
} from "./utils-grid";
import { drag_icon, nw_arrow, se_arrow, trashcan_icon } from "./utils-icons";
import {
  as_array,
  Drag_Type,
  Selection_Rect,
  set_class,
  update_rect_with_delta,
  XY_Pos,
} from "./utils-misc";
import {
  send_elements_to_shiny,
  send_grid_sizing_to_shiny,
} from "./utils-shiny";
import { wrap_in_grided } from "./wrap_in_grided";

type Grid_Settings = {
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

type Drag_Res = {
  xy: XY_Pos;
  grid: Grid_Pos;
};

export type Element_Info = {
  id: string;
  grid_pos: Grid_Pos;
  grid_el: HTMLElement;
  list_el: HTMLElement;
  mirrored_element?: HTMLElement;
  grid_item: Grid_Item;
};

export type App_Mode = "Existing" | "New";

export class App_State {
  controls: { rows: CSS_Input[]; cols: CSS_Input[] };
  settings_panel: Grid_Settings;
  // All the currently existing cells making up the grid
  current_cells: HTMLElement[] = [];
  elements: Element_Info[] = [];

  container_selector: string;
  container: HTMLElement;
  grid_styles: CSSStyleDeclaration;
  mode: App_Mode;
  grid_layout: Grid_Layout;

  constructor() {
    const grid_layout_rule = find_selector_by_property("display", "grid");

    this.container_selector = grid_layout_rule.rule_exists
      ? grid_layout_rule.selector
      : "#grid_page";

    this.container = grid_layout_rule.rule_exists
      ? document.querySelector(this.container_selector)
      : Block_El("div#grid_page");

    this.controls = { rows: [], cols: [] };
    this.grid_styles = this.container.style;
    this.grid_layout = new Grid_Layout(this.container);

    const { settings_panel_el, grid_is_filled } = wrap_in_grided(this);
    this.settings_panel = make_settings_panel(this, settings_panel_el);
    this.mode = grid_is_filled ? "Existing" : "New";

    if (grid_is_filled) {
      const current_grid_props = grid_layout_rule.first_rule_w_prop.style;

      // Make sure grid matches the one the app is working with
      update_grid(this, {
        rows: current_grid_props.gridTemplateRows.split(" "),
        cols: current_grid_props.gridTemplateColumns.split(" "),
        gap: get_gap_size(current_grid_props.gap),
        force: true,
      });
    }
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

  get num_elements(): number {
    return this.elements.length;
  }

  get current_elements(): Element_Info[] {
    // Make sure grid position is current
    this.elements.forEach((el) => {
      el.grid_pos = grid_position_of_el(el.grid_el);
    });

    return this.elements;
  }

  add_element(el_props: {
    id: string;
    grid_pos: Grid_Pos;
    mirrored_element?: HTMLElement;
  }) {
    // If element ids were generated with the grid_container R function then
    // they have a prefix of the container name which we should remove so the
    // added elements list is not ugly looking
    if (el_props.mirrored_element) {
      el_props.id = el_props.id.replace(/^.+?__/g, "");
    }

    const grid_item = draw_elements(this, {
      id: el_props.id,
      mirrored_el: el_props.mirrored_element,
    });

    grid_item.position = el_props.grid_pos;

    const new_element_entry: Element_Info = {
      ...el_props,
      grid_el: grid_item.el,
      list_el: grid_item.sibling_el,
      grid_item,
    };

    this.elements.push(new_element_entry);

    // Let shiny know we have a new element
    send_elements_to_shiny(this.current_elements);
  }

  get_element(el: Element_Info | string) {
    const el_id: string = typeof el === "string" ? el : el.id;

    return this.elements.find((e) => e.id == el_id);
  }

  // Removes elements the user has added to the grid by id
  remove_elements(ids: string | Array<string>) {
    as_array(ids).forEach((el_id) => {
      const entry_index = this.elements.findIndex((el) => el.id === el_id);
      this.elements[entry_index].grid_item.remove();
      this.elements.splice(entry_index, 1);
    });

    send_elements_to_shiny(this.current_elements);
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

  update_settings_panel(opts: Grid_Update_Options) {
    if (opts.cols) {
      this.settings_panel.num_cols(opts.cols.length);
    }
    if (opts.rows) {
      this.settings_panel.num_rows(opts.rows.length);
    }
    if (opts.gap) {
      this.settings_panel.gap.update_value(opts.gap);
    }
  }

  // Just so we dont have to always say make_el(this.container...)
  make_el(sel_txt: string, opts?: Element_Opts) {
    return make_el(this.container, sel_txt, opts);
  }

  setup_drag(opts: {
    watching_element: HTMLElement;
    drag_dir: Drag_Type;
    grid_item?: Grid_Item;
    on_start?: (start_loc: XY_Pos) => void;
    on_drag?: (drag_info: Drag_Res) => void;
    on_end?: (drag_info: Drag_Res) => void;
  }) {
    let drag_feedback_rect: HTMLElement;
    let start_rect: Selection_Rect;
    let start_loc: XY_Pos;

    const editor_el: HTMLElement = document.querySelector("#grided__editor");

    const update_grid_pos = (
      grid_item: Grid_Item,
      bounding_rect: Selection_Rect
    ): Grid_Pos => {
      const grid_extent = get_drag_extent_on_grid(this, bounding_rect);
      grid_item.position = grid_extent;
      return grid_extent;
    };

    opts.watching_element.onmousedown = (event: MouseEvent) => {
      start_loc = event as DragEvent;

      // make sure dragged element is on top
      this.container.appendChild(opts.grid_item.el);

      // If this is a new element drag there wont be a bounding box for the grid
      // element yet, so we need to make a new zero-width/height one at start
      // of the drag
      start_rect = opts.grid_item?.bounding_rect || {
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
      update_grid_pos(opts.grid_item, start_rect);

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
      const grid_extent = update_grid_pos(opts.grid_item, new_rect);
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
          grid: opts.grid_item?.position || get_pos_on_grid(this.parentElement),
        });

      editor_el.removeEventListener("mousemove", drag);
      editor_el.removeEventListener("mouseup", drag_end);
    }
  }
} // End of class declaration

export function update_grid(app_state: App_State, opts: Grid_Update_Options) {
  const updated_attributes = app_state.grid_layout.changed_attributes(opts);
  if (updated_attributes.new_num_cells) {
    // Check for elements that may get dropped
    let danger_elements: {
      to_delete: Element_Info[];
      to_edit: Element_Info[];
      conflicting: Element_Info[];
    } = { to_delete: [], to_edit: [], conflicting: [] };

    app_state.current_elements.forEach((el) => {
      const element_position = contains_element(
        updated_attributes.new_attrs,
        el
      );
      // const element_position = el.grid_item.contained_in_layout(updated_attributes.new_attrs);

      if (element_position === "inside") return;

      if (element_position === "partially") {
        danger_elements.to_edit.push(el);
        return;
      }

      if (app_state.get_element(el.id).mirrored_element) {
        danger_elements.conflicting.push(el);
        return;
      }

      danger_elements.to_delete.push(el);
    });

    if (danger_elements.conflicting.length > 0) {
      show_conflict_popup(danger_elements.conflicting);
      // Make sure to switch back the control values to previous values
      app_state.update_settings_panel(app_state.grid_layout.attrs);
      // Stop this action from going further
      return;
    }

    if (danger_elements.to_edit.length > 0) {
      show_danger_popup(app_state, danger_elements.to_edit, (to_edit) => {
        to_edit.forEach((el) => {
          const el_node: HTMLElement = app_state.get_element(el.id).grid_el;
          shrink_element_to_layout(updated_attributes.new_attrs, el_node);
        });
        // Now that we've updated elements properly, we should be able to
        // just recall the function and it won't spit an error
        update_grid(app_state, {
          rows: opts.rows,
          cols: opts.cols,
          gap: opts.gap,
        });
      });

      return;
    }
    app_state.remove_elements(danger_elements.to_delete.map((el) => el.id));
  }

  app_state.update_settings_panel(opts);

  app_state.grid_layout.update_attrs(opts);

  // Put some filler text into items spanning auto rows so auto behavior
  // is clear to user
  app_state.current_elements.forEach((el) => {
    el.grid_item.fill_if_in_auto_row();
  });

  if (updated_attributes.new_num_cells || opts.force) {
    fill_grid_cells(app_state);
    setup_tract_controls(app_state);
    setup_new_item_drag(app_state);
  }

  if (!opts.dont_send_to_shiny) {
    send_grid_sizing_to_shiny(app_state.grid_layout.attrs);
  }
}

function fill_grid_cells(app_state: App_State) {
  // Grab currently drawn cells (if any) so we can check if we need to redraw
  // or if this was simply a column/row sizing update
  const need_to_reset_cells =
    app_state.current_cells.length !=
    app_state.grid_layout.num_rows * app_state.grid_layout.num_cols;

  if (need_to_reset_cells) {
    remove_elements(app_state.current_cells);
    app_state.current_cells = [];

    for (let row_i = 1; row_i <= app_state.grid_layout.num_rows; row_i++) {
      for (let col_i = 1; col_i <= app_state.grid_layout.num_cols; col_i++) {
        app_state.current_cells.push(
          app_state.make_el(`div.r${row_i}.c${col_i}.grid-cell`, {
            data_props: { row: row_i, col: col_i },
            grid_pos: {
              start_row: row_i,
              end_row: row_i,
              start_col: col_i,
              end_col: col_i,
            },
          })
        );
      }
    }

    if (app_state.mode === "Existing") {
      set_class(app_state.current_cells, "transparent");
    }
  }
}

function setup_new_item_drag(app_state: App_State) {
  const current_selection_box = new Grid_Item({
    el: app_state.make_el("div#current_selection_box.added-element"),
    parent_layout: app_state.grid_layout,
  });
  const drag_canvas = app_state.make_el("div#drag_canvas");

  app_state.setup_drag({
    watching_element: drag_canvas,
    grid_item: current_selection_box,
    drag_dir: "bottom-right",
    on_start: () => {
      current_selection_box.style.borderColor = app_state.next_color;
    },
    on_end: ({ grid }) => {
      element_naming_ui(app_state, {
        grid_pos: grid,
        selection_box: current_selection_box,
      });
    },
  });

  // Make sure any added elements sit on top by re-appending them to grid holder
  // Make sure that the drag detector sits over everything
  [
    drag_canvas,
    ...app_state.container.querySelectorAll(".added-element"),
  ].forEach((el) => app_state.container.appendChild(el));
}

function setup_tract_controls(app_state: App_State) {
  // Build each column and row's sizing controler
  for (let type in app_state.controls) {
    // Get rid of old ones to start with fresh slate
    remove_elements(app_state.container.querySelectorAll(`.${type}-controls`));
    app_state.controls[type] = app_state.grid_layout.attrs[type].map(
      (size: string, i: number) => {
        // The i + 1 is because grid is indexed at 1, not zero
        const grid_i = i + 1;

        return make_grid_tract_control(app_state, {
          size,
          dir: type as Tract_Dir,
          tract_index: grid_i,
        });
        // return make_css_unit_input({
        //   parent_el: app_state.container,
        //   selector: `#control_${type}${grid_i}.${type}-controls`,
        //   start_val: get_css_value(size),
        //   start_unit: get_css_unit(size),
        //   add_buttons: true,
        //   on_change: () =>
        //     update_grid(app_state, app_state.layout_from_controls),
        //   on_drag: () =>
        //     update_grid(app_state, {
        //       ...app_state.layout_from_controls,
        //       dont_send_to_shiny: true,
        //     }),
        //   form_styles: {
        //     [`grid${
        //       type === "rows" ? "Row" : "Column"
        //     }`]: make_template_start_end(grid_i),
        //   },
        //   drag_dir: type === "rows" ? "y" : "x",
        // });
      }
    );
  }
}

export function make_settings_panel(
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
      on_change: (x) => update_grid(app_state, { gap: x }),
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
    update_grid(app_state, { [dir]: current_vals });
  }
}

function element_naming_ui(app_state: App_State, { grid_pos, selection_box }) {
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
        app_state.add_element({ id, grid_pos });

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

function draw_elements(
  app_state: App_State,
  el_info: { id: string; mirrored_el: HTMLElement }
) {
  const { id, mirrored_el } = el_info;
  const el_color = app_state.next_color;
  const mirrors_existing = typeof mirrored_el !== "undefined";

  const grid_el = app_state.make_el(`div#${id}.el_${id}.added-element`, {
    styles: {
      borderColor: app_state.next_color,
      position: "relative",
    },
  });

  const list_el = make_el(
    document.querySelector("#added_elements"),
    `div.el_${id}.added-element`,
    {
      innerHTML: id,
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

  const grid_item = new Grid_Item({
    el: grid_el,
    mirrored_el,
    sibling_element: list_el,
    parent_layout: app_state.grid_layout,
  });

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
        grid_item: grid_item,
        drag_dir: handle_type,
        on_end: () => {
          send_elements_to_shiny(app_state.current_elements);
        },
      });
    }
  );

  if (!mirrors_existing) {
    // Turn of deleting if were editing an existing app
    // This means that if were in app editing mode and the user adds a new element
    // they can delete that new element but they can't delete the existing elements
    make_el(list_el, "button.remove_el", {
      innerHTML: trashcan_icon,
      event_listener: {
        event: "click",
        func: () => {
          app_state.remove_elements(id);
        },
      },
    });
  }

  return grid_item;
}

function show_conflict_popup(conflicting_elements: Element_Info[]) {
  const conflicting_elements_list: string =
    conflicting_elements.reduce(
      (id_list, el) =>
        `
    ${id_list}
    <li> ${el.id} </li>
    `,
      "<ul>"
    ) + "</ul>";
  const message_model = focused_modal({
    header_text: `
  <h2>Sorry! Can't make that update</h2> 
  <p> This is because it would result in the following elements being removed from your app:</p>
  ${conflicting_elements_list}
  <p> Either re-arrange these elements to not reside in the removed grid or column or remove them from your app before running grided.</p>
  `,
  });

  make_el(message_model.modal, "button#accept_result", {
    innerHTML: `Okay`,
    event_listener: {
      event: "click",
      func: function () {
        message_model.remove();
      },
    },
  });
}

function show_danger_popup(
  app_state: App_State,
  in_danger_els: Element_Info[],
  on_finish: (to_edit: Element_Info[]) => void
) {
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
