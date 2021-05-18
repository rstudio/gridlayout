import { make_el, remove_elements } from "./make-elements";
import { CSS_Input } from "./make-css_unit_input";
import {
  as_array,
  Drag_Type,
  filler_text,
  get_bounding_rect,
  get_next_color,
  Selection_Rect,
  update_rect_with_delta,
  XY_Pos,
} from "./utils-misc";
import { send_elements_to_shiny } from "./utils-shiny";
import { Shiny, Element_Info, Grid_Pos } from "./index";
import {
  get_drag_extent_on_grid,
  get_pos_on_grid,
  set_element_in_grid,
} from "./utils-grid";
import { drag_icon, nw_arrow, se_arrow, trashcan_icon } from "./utils-icons";

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
}

export class App_State {
  controls: { rows: CSS_Input[]; cols: CSS_Input[] };
  // All the currently existing cells making up the grid
  current_cells: HTMLElement[] = [];
  elements: Record<string, Element_Entries> = {};

  container: HTMLElement;
  mode: "ShinyExisting" | "ShinyNew" | "ClientSide";

  constructor(opts: {
    controls: { rows: CSS_Input[]; cols: CSS_Input[] };
    container: HTMLElement;
    grid_is_filled: boolean;
  }) {
    this.controls = opts.controls;
    this.container = opts.container;
    this.mode = opts.grid_is_filled
      ? "ShinyExisting"
      : Shiny
      ? "ShinyNew"
      : "ClientSide";
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

  get current_elements(): Element_Info[] {
    console.log("Getting elements")
    const all_elements = [...Object.values(this.elements)]
    .map( ({grid_el})  => {

      const grid_area = grid_el.style.gridArea.split(" / ");
      return {
        id: grid_el.id,
        start_row: +grid_area[0],
        start_col: +grid_area[1],
        // Subtract one here because the end in css is the end line, not row
        end_row: +grid_area[2] - 1,
        end_col: +grid_area[3] - 1,
      };
      debugger;
    });

    console.log(`Returning the ${all_elements.length} elements`);
    return all_elements;
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
    const app_state = this;
    let drag_feedback_rect: HTMLElement;
    let start_rect: Selection_Rect;
    let start_loc: XY_Pos;

    const editor_el: HTMLElement = document.querySelector("#grided__editor");

    opts.watching_element.onmousedown = function (event: MouseEvent) {
      start_loc = event as DragEvent;

      // make sure dragged element is on top
      app_state.container.appendChild(opts.grid_element);

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
        app_state.container.querySelector("#drag_canvas"),
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
      const grid_extent = get_drag_extent_on_grid(app_state, bounding_rect);
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

  add_element(el_props: New_Element) {
    console.log("Adding an element");
    this.elements[el_props.id] = add_element(this, el_props);
  }
}

function add_element(app_state: App_State, el_props: New_Element): Element_Entries {
  const grid_container = app_state.container;
  const {
    grid_pos,
    color = get_next_color(grid_container),
    existing_element,
  } = el_props;
  const mirrors_existing_element = existing_element !== undefined;
  // If element ids were generated with the grid_container R function then
  // they have a prefix of the container name which we should remove so the
  // added elements list is not ugly looking
  const id = mirrors_existing_element
    ? el_props.id.replace(/^.+?__/g, "")
    : el_props.id;

  const grid_el = make_el(
    grid_container,
    `div#${id}.el_${id}.added-element`,
    {
      grid_pos,
      // Add filler text for new elements so that auto-height will work
      innerHTML: mirrors_existing_element ? "" : filler_text,
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
    app_state.setup_drag({
      watching_element: make_el(
        grid_el,
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
      grid_element: grid_el,
      drag_dir: handle_type,
      on_drag: (res) => {
        if (mirrors_existing_element) {
          set_element_in_grid(existing_element, res.grid);
        }
      },
      on_end: () => {
        send_elements_to_shiny(app_state.current_elements);
      },
    });
  });

  const list_el = make_el(
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

  if (!mirrors_existing_element) {
    // Turn of deleting if were editing an existing app
    // This means that if were in app editing mode and the user adds a new element
    // they can delete that new element but they can't delete the existing elements
    make_el(list_el, "button.remove_el", {
      innerHTML: trashcan_icon,
      event_listener: {
        event: "click",
        func: function () {
          app_state.remove_elements(id);
        },
      },
    });
  }

  // Let shiny know we have a new element
  send_elements_to_shiny(app_state.current_elements);

  return {
    grid_el,
    list_el
  }
}
