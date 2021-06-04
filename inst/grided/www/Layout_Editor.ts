import { css } from "@emotion/css";
import { Layout_Element, Layout_Info } from ".";
import { add_shiny_listeners } from "./add_shiny_listeners";
import { Grid_Item, Grid_Pos } from "./Grid_Item";
import { Grid_Layout, Tract_Dir } from "./Grid_Layout";
import { build_controls_for_dir, CSS_Input } from "./make-css_unit_input";
import {
  Block_El,
  Element_Opts,
  make_el,
  remove_elements,
} from "./make-elements";
import { focused_modal } from "./make-focused_modal";
import { get_styles_for_selector_with_targets } from "./utils-cssom";
import {
  bounding_rect_to_css_pos,
  find_first_grid_node,
  get_drag_extent_on_grid,
  get_gap_size,
  get_pos_on_grid,
  grid_position_of_el,
  make_start_end_for_dir,
} from "./utils-grid";
import { drag_icon, nw_arrow, se_arrow, trashcan_icon } from "./utils-icons";
import {
  as_array,
  Drag_Type,
  filler_text,
  pos_relative_to_container,
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

export class Layout_Editor {
  gap_size_setting: CSS_Input;
  // All the currently existing cells making up the grid
  current_cells: HTMLElement[] = [];
  elements: Element_Info[] = [];

  container_selector: string;
  container: HTMLElement;
  grid_styles: CSSStyleDeclaration;
  mode: App_Mode;
  grid_layout: Grid_Layout;
  tract_controls: {
    update_positions: () => void;
  };
  constructor({
    container,
    starting_layout,
  }: {
    container?: HTMLElement;
    starting_layout?: Layout_Info;
  }) {
    this.container =
      container ?? find_first_grid_node() ?? Block_El("div#grid_page");

    this.grid_styles = this.container.style;

    this.grid_layout = new Grid_Layout(this.container);

    const { grid_is_filled, gap_size_setting } = wrap_in_grided(this);
    this.gap_size_setting = gap_size_setting;
    this.mode = grid_is_filled ? "Existing" : "New";

    if (starting_layout) {
      this.update_grid(starting_layout.grid);

      starting_layout.elements.forEach((el_msg: Layout_Element) => {
        const { start_row, end_row, start_col, end_col } = el_msg;
        this.add_element({
          id: el_msg.id,
          grid_pos: { start_row, end_row, start_col, end_col },
        });
      });
    } else if (grid_is_filled) {
      // We need to go into the style sheets to get the starting grid properties
      // because they arent reflected in the `.style` property and sizes are
      // directly computed if we use getComputedStyle()
      const current_grid_props = get_styles_for_selector_with_targets(
        `#${this.container.id}`,
        ["gridTemplateColumns", "gridTemplateRows"]
      );

      // Make sure grid matches the one the app is working with
      this.update_grid({
        rows: current_grid_props.gridTemplateRows.split(" "),
        cols: current_grid_props.gridTemplateColumns.split(" "),
        gap: get_gap_size(current_grid_props.gap),
        force: true,
      });
    } else {
      console.error(
        "Neither starting layout was provided nor is there an existing grid app"
      );
    }

    add_shiny_listeners(this);
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
    return colors[this.elements.length % colors.length];
  }

  get_current_elements(): Element_Info[] {
    // Make sure grid position is current
    this.elements.forEach((el) => {
      el.grid_pos = grid_position_of_el(el.grid_el);
    });

    return this.elements;
  }
  get current_elements(): Element_Info[] {
    return this.get_current_elements();
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

  // Removes elements the user has added to the grid by id
  remove_elements(ids: string | Array<string>) {
    as_array(ids).forEach((el_id) => {
      const entry_index = this.elements.findIndex((el) => el.id === el_id);
      this.elements[entry_index].grid_item.remove();
      this.elements.splice(entry_index, 1);
    });

    send_elements_to_shiny(this.current_elements);
  }

  add_tract(dir: Tract_Dir, new_index: number) {
    this.elements.forEach((el) => {
      const start_id = dir === "rows" ? "start_row" : "start_col";
      const end_id = dir === "rows" ? "end_row" : "end_col";
      const el_position = el.grid_item.position;

      if (new_index >= el_position[end_id]) {
        // no change needed
      } else if (new_index < el_position[start_id]) {
        // Before item span means everything is shifted up
        el_position[start_id]++;
        el_position[end_id]++;
      } else {
        // Within item span: just end is shifted up
        el.grid_item[end_id] = el_position[end_id]++;
      }
      el.grid_item.position = el_position;
    });

    const tract_sizes = this.grid_layout[dir];
    tract_sizes.splice(new_index, 0, "1fr");

    this.update_grid({ [dir]: tract_sizes });
  }

  remove_tract(dir: Tract_Dir, index: number) {
    // First check for trouble elements before proceeding so we can error out
    // and tell the user why
    const trouble_elements: Element_Info[] = this.elements.filter((el) => {
      const { start_id, end_id } = make_start_end_for_dir(dir);
      const el_position = el.grid_item.position;

      return (
        el_position[start_id] === el_position[end_id] &&
        el_position[start_id] === index
      );
    });

    if (trouble_elements.length > 0) {
      show_conflict_popup(trouble_elements);
      // End early
      return;
    }

    this.elements.forEach((el) => {
      const { start_id, end_id } = make_start_end_for_dir(dir);
      const el_position = el.grid_item.position;

      if (el_position[start_id] > index) {
        el_position[start_id]--;
      }
      if (el_position[end_id] >= index) {
        el_position[end_id]--;
      }
      el.grid_item.position = el_position;
    });

    const tract_sizes = this.grid_layout[dir];
    tract_sizes.splice(index - 1, 1);

    this.update_grid({ [dir]: tract_sizes });
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

  update_tract(opts: {
    tract_index: number;
    dir: Tract_Dir;
    new_value: string;
    dont_send_to_shiny?: boolean;
  }) {
    const { tract_index, dir, new_value, dont_send_to_shiny = false } = opts;

    const tract_values = this.grid_layout[dir];
    tract_values[tract_index - 1] = new_value;

    this.update_grid({ [dir]: tract_values, dont_send_to_shiny });
  }

  update_grid(opts: Grid_Update_Options) {
    // Given a new set of attributes, finds which ones changed and updates the
    // corresponding portions of the grid
    let new_num_cells = opts.force ?? false;
    let rows_and_cols_updated = opts.force ?? false;

    if (this.grid_layout.is_updated_val("rows", opts.rows)) {
      if (this.grid_layout.num_rows !== opts.rows.length) new_num_cells = true;
      rows_and_cols_updated = true;
      this.grid_layout.rows = opts.rows;
    }

    if (this.grid_layout.is_updated_val("cols", opts.cols)) {
      if (this.grid_layout.num_cols !== opts.cols.length) new_num_cells = true;
      rows_and_cols_updated = true;
      this.grid_layout.cols = opts.cols;
    }

    if (this.grid_layout.is_updated_val("gap", opts.gap)) {
      this.grid_layout.gap = opts.gap;
      this.gap_size_setting.update_value(opts.gap);
    }

    if (new_num_cells) {
      fill_grid_cells(this);
      setup_new_item_drag(this);
    }

    if (rows_and_cols_updated) {
      // Put some filler text into items spanning auto rows so auto behavior
      // is clear to user
      this.current_elements.forEach((el) => {
        el.grid_item.fill_if_in_auto_row();
      });
    }

    this.tract_controls.update_positions();

    if (!opts.dont_send_to_shiny) {
      send_grid_sizing_to_shiny(this.grid_layout.attrs);
    }
  }
} // End of class declaration

const grid_cell_styles = css`
  background: var(--off-white, grey);
  border: 1px solid var(--gray, grey);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: var(--element_roundness);

  &.transparent {
    background: none;
  }

  &.selected {
    background: currentColor;
    border: 2px solid var(--light-gray);
  }
`;

function fill_grid_cells(app_state: Layout_Editor) {
  remove_elements(app_state.current_cells);
  app_state.current_cells = [];

  for (let row_i = 1; row_i <= app_state.grid_layout.num_rows; row_i++) {
    for (let col_i = 1; col_i <= app_state.grid_layout.num_cols; col_i++) {
      app_state.current_cells.push(
        app_state.make_el(
          `div.r${row_i}.c${col_i}.grid-cell.${grid_cell_styles}`,
          {
            data_props: { row: row_i, col: col_i },
            grid_pos: {
              start_row: row_i,
              end_row: row_i,
              start_col: col_i,
              end_col: col_i,
            },
          }
        )
      );
    }
  }

  if (app_state.mode === "Existing") {
    set_class(app_state.current_cells, "transparent");
  }

  app_state.tract_controls = setup_tract_controls(app_state);
}

const added_element_styles = css`
  border-radius: var(--element_roundness);
  border-width: 3px;
  border-style: solid;
  transition: border-width 0.2s ease-in-out;
  background: none;
  position: relative;

  &.in-list {
    height: 35px;
    margin: 0 0 5px 0;
    padding: 0.65rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hovered {
    border-width: 7px;
  }

  &.in-list.hovered {
    /* Emphasize by making a bit bigger */
    transform: scale(1.05);
  }

  /* This is filler text to make auto sizing work. It's invisible to the user
     so it doesn't distract. Not sure if this is the best way to do it but I think
     it's worth a go. 
  */
  .filler_text {
    color: rgba(128, 128, 128, 0.5);
    user-select: none;
    display: none;
  }

  &.in-auto-row .filler_text {
    display: block;
  }
`;

const dragger_handle = css`
  --radius: 18px;
  font-size: 12px;
  position: absolute;
  height: var(--radius);
  width: var(--radius);
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--off-white);
  opacity: 0.5;

  & > svg {
    transform: scale(0.85);
  }

  &.top-left {
    top: -2px;
    left: -2px;
    cursor: nw-resize;
  }
  &.bottom-right {
    bottom: -2px;
    right: -2px;
    cursor: se-resize;
  }

  &.center {
    top: calc(50% - var(--radius) / 2);
    right: calc(50% - var(--radius) / 2);
    border-radius: var(--element_roundness);
    cursor: grab;
  }
  &.center:active {
    cursor: grabbing;
  }

  i {
    display: inline-block;
  }

  &.top-left i {
    transform: rotate(315deg);
  }
  &.bottom-right i {
    transform: rotate(135deg);
  }

  &.top-left,
  &.bottom-right {
    border-radius: var(--element_roundness) 0;
  }
`;

const current_sel_box = css`
  border-style: dashed;
  display: none;
  pointer-events: none;
`;

const drag_canvas_styles = css`
  margin-left: calc(-1 * var(--grid-gap));
  margin-top: calc(-1 * var(--grid-gap));
  width: calc(100% + 2 * var(--grid-gap));
  height: calc(100% + 2 * var(--grid-gap));
  grid-row: 1/-1;
  grid-column: 1/-1;
  position: relative;

  .drag-feedback-rect {
    pointer-events: none;
    position: absolute;
    background: linear-gradient(90deg, var(--dark-gray) 50%, transparent 50%),
      linear-gradient(90deg, var(--dark-gray) 50%, transparent 50%),
      linear-gradient(0deg, var(--dark-gray) 50%, transparent 50%),
      linear-gradient(0deg, var(--dark-gray) 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 4px, 15px 4px, 4px 15px, 4px 15px;
    animation: border-dance 16s infinite linear;
  }

  @keyframes border-dance {
    0% {
      background-position: 0 0, 100% 100%, 0 100%, 100% 0;
    }
    100% {
      background-position: 100% 0, 0 100%, 0 0, 100% 100%;
    }
  }
`;

function setup_new_item_drag(app_state: Layout_Editor) {
  const current_selection_box = new Grid_Item({
    el: app_state.make_el(
      `div.drag_selection_box.${added_element_styles}.${current_sel_box}`
    ),
    parent_layout: app_state.grid_layout,
  });
  const drag_canvas = app_state.make_el(
    `div#drag_canvas.${drag_canvas_styles}`
  );

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

function setup_tract_controls(app_state: Layout_Editor) {
  const editor_container = document.querySelector(
    "#grided__editor"
  ) as HTMLElement;

  const controls: Record<
    Tract_Dir,
    {
      matched_cell: HTMLElement;
      el: HTMLElement;
      controller: CSS_Input;
    }[]
  > = {
    rows: build_controls_for_dir(app_state, "rows", editor_container),
    cols: build_controls_for_dir(app_state, "cols", editor_container),
  };

  update_positions();

  // Make sure when we scroll or resize the editor window the controls follow
  (editor_container.querySelector(
    "#editor-app-window"
  ) as HTMLElement).onscroll = () => update_positions(["rows"]);

  // Use a timeout trick to debounce the tract updating on resizing to only
  // fire after resize is done
  let resize_timeout: number;
  window.addEventListener("resize", () => {
    clearTimeout(resize_timeout);
    resize_timeout = window.setTimeout(() => update_positions(), 300);
  });

  function update_positions(which_dirs: Tract_Dir[] = ["rows", "cols"]) {
    const editor_pos = editor_container.getBoundingClientRect();
    const wrapper_pos = pos_relative_to_container(
      editor_pos,
      editor_container.querySelector("#editor-wrapper")
    );

    for (const dir of which_dirs) {
      controls[dir].forEach(({ matched_cell, el }) => {
        const bounding_rect = pos_relative_to_container(
          editor_pos,
          matched_cell
        );

        Object.assign(
          el.style,
          dir === "cols"
            ? {
                left: `calc(${bounding_rect.left}px)`,
                width: `calc(${bounding_rect.width}px)`,
                top: `calc(${wrapper_pos.top}px - var(--editor-top-pad))`,
              }
            : {
                top: `calc(${bounding_rect.top}px)`,
                height: `calc(${bounding_rect.height}px)`,
                left: `calc(${bounding_rect.left}px - var(--editor-left-pad) - ${app_state.grid_layout.attrs.gap} - 2px)`,
              }
        );
      });
    }
  }

  return {
    update_positions,
  };
}

const name_form_styles = css`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;

  input[type="text"] {
    width: 50%;
  }
`;

function element_naming_ui(
  app_state: Layout_Editor,
  { grid_pos, selection_box }
) {
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

  const name_form = make_el(modal_div, `form#name_form.${name_form_styles}`, {
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
    make_el(modal_div, "span#bad_id_msg", {
      innerHTML: msg,
      styles: {
        color: "orangered",
        fontStyle: "italic",
        fontWeight: "lighter",
        fontSize: "0.9rem",
      },
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
  app_state: Layout_Editor,
  el_info: { id: string; mirrored_el: HTMLElement }
) {
  const { id, mirrored_el } = el_info;
  const el_color = app_state.next_color;
  const mirrors_existing = typeof mirrored_el !== "undefined";

  const grid_el = app_state.make_el(
    `div#${id}.el_${id}.added-element.${added_element_styles}`,
    {
      innerHTML: filler_text,
      styles: {
        borderColor: app_state.next_color,
        position: "relative",
      },
    }
  );

  const list_el = make_el(
    document.querySelector("#added_elements"),
    `div.el_${id}.added-element.${added_element_styles}.in-list`,
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
    sibling_el: list_el,
    parent_layout: app_state.grid_layout,
  });

  // Setup drag behavior
  (["top-left", "bottom-right", "center"] as Drag_Type[]).forEach(
    (handle_type: Drag_Type) => {
      app_state.setup_drag({
        watching_element: make_el(
          grid_el,
          `div.dragger.visible.${dragger_handle}.${handle_type}`,
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

export function start_layout_editor(opts: {
  container?: HTMLElement;
  starting_layout?: Layout_Info;
}){
  new Layout_Editor(opts);
}