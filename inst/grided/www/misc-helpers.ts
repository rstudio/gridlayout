import { Code_Text } from "./focused_modal";
import { Element_Info, Grid_Pos } from "./index";
// Functions related to grid construction

export type XY_Pos = {
  x: number;
  y: number;
};

export type Drag_Type = "top-left" | "bottom-right" | "center";

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

export function set_element_in_grid(
  el: HTMLElement,
  grid_bounds: Grid_Pos,
  el_styles?: CSSStyleDeclaration
) {
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

// grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for
export function sizes_to_template_def(defs: Array<string>) {
  return concat(defs, " ");
}

export function concat(
  string_vec: Array<string>,
  collapse_char: string = " "
): string {
  return string_vec.reduce(
    (concatted, current, i) =>
      concatted + (i > 0 ? collapse_char : "") + current,
    ""
  );
}

export function concat_nl(...component_strings: string[]) {
  return concat(component_strings, "\n");
}

export function concat_sp(...component_strings: string[]) {
  return concat(component_strings, " ");
}

export function as_array<T>(content: T | Array<T>): Array<T> {
  if (content instanceof Array) {
    return content;
  } else {
    return [content];
  }
}

// Passing an undefined value to a compare like min or max will always give undefined
// These functions let you default to the second option in the case the first is falsy
export function compare_w_missing(
  compare_fn: (...values: number[]) => number,
  maybe_a: number | null,
  b: number
) {
  return maybe_a ? compare_fn(maybe_a, b) : b;
}
export function min_w_missing(maybe_a: number | null, b: number) {
  return compare_w_missing(Math.min, maybe_a, b);
}
export function max_w_missing(maybe_a: number | null, b: number) {
  return compare_w_missing(Math.max, maybe_a, b);
}

export type Selection_Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

// Produce bounding rectangle relative to parent of any element
export function get_bounding_rect(el: HTMLElement): Selection_Rect | null {
  if (el.offsetParent === null) {
    return null;
  }
  const top = el.offsetTop;
  const left = el.offsetLeft;
  const height = el.offsetHeight;
  const width = el.offsetWidth;
  return { left: left, right: left + width, top: top, bottom: top + height };
}

export function boxes_overlap(
  box_a: Selection_Rect,
  box_b: Selection_Rect
): boolean {
  const horizontal_overlap = intervals_overlap(
    [box_a.left, box_a.right],
    [box_b.left, box_b.right]
  );
  const vertical_overlap = intervals_overlap(
    [box_a.top, box_a.bottom],
    [box_b.top, box_b.bottom]
  );

  return horizontal_overlap && vertical_overlap;

  // Figure out of two intervals overlap eachother
  function intervals_overlap([a_start, a_end], [b_start, b_end]) {
    //   aaaaaaaaaa
    // bbbbbb
    //         bbbbbb
    const a_contains_b_endpoint =
      (a_start >= b_start && a_start <= b_end) ||
      (a_end >= b_start && a_end <= b_end);

    //   aaaaaa
    // bbbbbbbbbb
    const b_covers_a = a_start <= b_start && a_end >= b_end;

    return a_contains_b_endpoint || b_covers_a;
  }
}

export function update_rect_with_delta(
  rect: Selection_Rect,
  delta: XY_Pos,
  dir: Drag_Type
): Selection_Rect {
  // Need to destructure down to numbers to avoid copy
  const new_rect: Selection_Rect = { ...rect };

  // The bounding here means that we dont let the user drag the box "inside-out"
  if (dir === "top-left") {
    new_rect.left = new_rect.left + delta.x;
    new_rect.top = new_rect.top + delta.y;
  } else if (dir === "bottom-right") {
    (new_rect.right = new_rect.right + delta.x), new_rect.left;
    (new_rect.bottom = new_rect.bottom + delta.y), new_rect.top;
  } else {
    // Just move the box
    new_rect.left += delta.x;
    new_rect.top += delta.y;
    new_rect.right += delta.x;
    new_rect.bottom += delta.y;
  }

  // Make sure positions are proper for bounding box (in case box was flipped inside out)
  if (new_rect.left > new_rect.right) {
    const { left, right } = new_rect;
    new_rect.right = left;
    new_rect.left = right;
  }
  if (new_rect.top > new_rect.bottom) {
    const { top, bottom } = new_rect;
    new_rect.bottom = top;
    new_rect.top = bottom;
  }

  return new_rect;
}

export function get_css_unit(css_size: string): string {
  return css_size.match(/[^ \d | \.]+$/g)[0] || "px";
}

export function get_css_value(css_size: string): number {
  return Number(css_size.match(/^[\d | \.]+/g)[0]);
}

export function flatten<Type>(arr: Type[][]): Type[] {
  return [].concat(...arr);
}

export function gen_code_for_layout(
  elements: Element_Info[],
  grid_styles: CSSStyleDeclaration
): Array<Code_Text> {
  const container_selector = "#container";

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

export function get_gap_size(container_styles: CSSStyleDeclaration) {
  // Older browsers give back both row-gap and column-gap in same query
  // so we need to reduce to a single value before returning
  const gap_size_vec = container_styles.gap.split(" ");

  return gap_size_vec[0];
}

export function set_gap_size(
  container_styles: CSSStyleDeclaration,
  new_val: string
) {
  container_styles.gap = new_val;
  return new_val;
}
