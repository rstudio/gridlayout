// Functions related to grid construction, editings, etc

import { GridPos } from "./GridItem";
import { TractDir } from "./GridLayout";
import { LayoutEditor } from "./LayoutEditor";
import {
  boxes_overlap,
  get_bounding_rect,
  max_w_missing,
  min_w_missing,
  SelectionRect
} from "./utils-misc";

export function find_first_grid_node(): HTMLElement {
  // Do a BFS for a grid layout element in the page
  let grid_node: HTMLElement;
  let current_node = document.body;
  let node_queue: Element[] = [...current_node.children];
  // We dont want to go too deep into the dom.
  let num_checks = 0;
  const check_max = 100;
  while (
    typeof grid_node === "undefined" &&
    node_queue.length > 0 &&
    num_checks++ < check_max
  ) {
    current_node = node_queue.shift() as HTMLElement;
    node_queue = [...node_queue, ...current_node.children];
    if (getComputedStyle(current_node).display === "grid") {
      grid_node = current_node;
    }
  }

  if (typeof grid_node === "undefined" && num_checks < check_max) {
    // If we didnt find a grid node lets make one as a first child
    const grid_node = document.createElement("div");
    // grid_node.style.display = "grid";
    current_node.appendChild(grid_node);
  } else if (num_checks === check_max) {
    alert("Could not find a grid-layout element to edit -- Sorry!");
  }

  grid_node.classList.add("wrapped-existing-app");

  return grid_node;
}

export function set_element_in_grid(el: HTMLElement, grid_bounds: GridPos) {
  if (grid_bounds.start_row) {
    el.style.gridRowStart = grid_bounds.start_row.toString();
  }
  if (grid_bounds.end_row) {
    el.style.gridRowEnd = (grid_bounds.end_row + 1).toString();
  }
  if (grid_bounds.start_col) {
    el.style.gridColumnStart = grid_bounds.start_col.toString();
  }
  if (grid_bounds.end_col) {
    el.style.gridColumnEnd = (grid_bounds.end_col + 1).toString();
  }

  el.style.display = "block"; // make sure we can see the element
}

export function get_pos_on_grid(grid_el: HTMLElement): GridPos {
  const el_styles = getComputedStyle(grid_el);
  return {
    start_row: +el_styles.gridRowStart,
    start_col: +el_styles.gridColumnStart,
    end_row: +el_styles.gridRowEnd - 1,
    end_col: +el_styles.gridColumnEnd - 1,
  };
}

export function get_drag_extent_on_grid(
  app_state: LayoutEditor,
  selection_rect: SelectionRect
): GridPos {
  // Reset bounding box definitions so we only use current selection extent
  const sel_bounds: GridPos = {
    start_col: null,
    end_col: null,
    start_row: null,
    end_row: null,
  };

  app_state.current_cells.forEach(function (el) {
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

export function bounding_rect_to_css_pos(rect: SelectionRect) {
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.right - rect.left}px`,
    height: `${rect.bottom - rect.top}px`,
  };
}

export function get_gap_size(style: CSSStyleDeclaration | string) {
  // Older browsers give back both row-gap and column-gap in same query
  // so we need to reduce to a single value before returning

  const gap_size_vec = (typeof style === "string" ? style : style.gap).split(
    " "
  );

  return gap_size_vec[0];
}

export function make_start_end_for_dir(dir: TractDir) {
  if (dir === "cols") {
    return {
      start_id: "start_col",
      end_id: "end_col",
    };
  } else {
    return {
      start_id: "start_row",
      end_id: "end_row",
    };
  }
}
