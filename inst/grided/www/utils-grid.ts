// Functions related to grid construction, editings, etc

import { App_State, Element_Info } from "./App_State";
import { Grid_Pos } from "./Grid_Item";
import { Layout_State, Tract_Dir } from "./Grid_Layout";
import { Code_Text } from "./make-focused_modal";
import {
  boxes_overlap,
  concat_nl,
  get_bounding_rect,
  max_w_missing,
  min_w_missing,
  Selection_Rect,
} from "./utils-misc";


export function find_first_grid_node(): HTMLElement {
  let current_node = document.body;

  let node_queue: Element[] = [...current_node.children];
  let overflow_counter = 0;

  while (node_queue.length != 0 && overflow_counter++ != 100) {
    current_node = node_queue.shift() as HTMLElement;
    if (getComputedStyle(current_node).display === "grid") {
      break;
    }
    node_queue = [...node_queue, ...current_node.children];
  }

  return current_node;
}

function get_styles(container: HTMLElement | CSSStyleDeclaration) {
  if (container instanceof HTMLElement) {
    return container.style;
  } else {
    return container;
  }
}

export function get_rows(grid_container: HTMLElement | CSSStyleDeclaration) {
  return get_styles(grid_container).gridTemplateRows.split(" ");
}

export function get_cols(grid_container: HTMLElement | CSSStyleDeclaration) {
  return get_styles(grid_container).gridTemplateColumns.split(" ");
}

// Builds the start/end css string for a grid-{row,column}
export function make_template_start_end(start: number, end?: number): string {
  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  const negative_index: boolean = start < 0;

  // Grid works with lines so if we want an element to end at the 4th column we
  // need to tell it to end at the (4+1)5th line, so we add one
  end = end ? end + 1 : start + (negative_index ? -1 : 1);
  // end = end ? +end + 1 : start + (negative_index ? -1 : 1);
  return `${start} / ${end}`;
}

export function set_element_in_grid(el: HTMLElement, grid_bounds: Grid_Pos) {
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

export function get_pos_on_grid(grid_el: HTMLElement): Grid_Pos {
  const el_styles = getComputedStyle(grid_el);
  return {
    start_row: +el_styles.gridRowStart,
    start_col: +el_styles.gridColumnStart,
    end_row: +el_styles.gridRowEnd - 1,
    end_col: +el_styles.gridColumnEnd - 1,
  };
}

export function get_drag_extent_on_grid(
  app_state: App_State,
  selection_rect: Selection_Rect
): Grid_Pos {
  // Reset bounding box definitions so we only use current selection extent
  const sel_bounds: Grid_Pos = {
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

export function bounding_rect_to_css_pos(rect: Selection_Rect) {
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.right - rect.left}px`,
    height: `${rect.bottom - rect.top}px`,
  };
}

export function gen_code_for_layout(
  elements: Element_Info[],
  grid_styles: CSSStyleDeclaration
): Array<Code_Text> {
  const container_selector = "#container";

  const element_defs = elements.map((el) => {
    const { start_row, end_row, start_col, end_col } = el.grid_pos;
    return concat_nl(
      `#${el.id} {`,
      `  grid-column: ${make_template_start_end(start_col, end_col)};`,
      `  grid-row: ${make_template_start_end(start_row, end_row)};`,
      `}`
    );
  });

  const css_code = concat_nl(
    `${container_selector} {`,
    `  display: grid;`,
    `  grid-template-columns: ${grid_styles.gridTemplateColumns};`,
    `  grid-template-rows: ${grid_styles.gridTemplateRows};`,
    `  gap: ${get_gap_size(grid_styles)}`,
    `}`,
    ...element_defs
  );

  const html_code = concat_nl(
    `<div id = ${container_selector}>`,
    ...elements.map((el) => concat_nl(`  <div id = "#${el.id}">`, `  </div>`)),
    `</div>`
  );

  return [
    { type: "css", code: css_code },
    { type: "html", code: html_code },
  ];
}

export function get_gap_size(style: CSSStyleDeclaration | string) {
  // Older browsers give back both row-gap and column-gap in same query
  // so we need to reduce to a single value before returning

  const gap_size_vec = (typeof style === "string" ? style : style.gap).split(
    " "
  );

  return gap_size_vec[0];
}

export function contains_element(
  layout: Layout_State,
  el: Element_Info
): "inside" | "partially" | "outside" {
  const num_rows = layout.rows.length;
  const num_cols = layout.cols.length;
  const { start_row, end_row, start_col, end_col } = el.grid_pos;

  if (start_row > num_rows || start_col > num_cols) {
    return "outside";
  }

  if (end_row > num_rows || end_col > num_cols) {
    return "partially";
  }

  return "inside";
}

export function shrink_element_to_layout(
  layout: Layout_State,
  el: HTMLElement
) {
  const { start_row, start_col, end_row, end_col } = grid_position_of_el(el);
  el.style.gridRow = make_template_start_end(
    start_row,
    Math.min(end_row, layout.rows.length)
  );
  el.style.gridColumn = make_template_start_end(
    start_col,
    Math.min(end_col, layout.cols.length)
  );
}

export function grid_position_of_el(el: HTMLElement): Grid_Pos {
  const grid_area = el.style.gridArea.split(" / ");
  return {
    start_row: +grid_area[0],
    start_col: +grid_area[1],
    // Subtract one here because the end in css is the end line, not row
    end_row: +grid_area[2] - 1,
    end_col: +grid_area[3] - 1,
  };
}

export function make_start_end_for_dir(dir: Tract_Dir) {
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
