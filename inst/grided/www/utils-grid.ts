// Functions related to grid construction, editings, etc


import { Code_Text } from "./make-focused_modal";
import { Element_Info, Grid_Pos } from "./index";
import { concat, concat_nl } from "./utils-misc";


export function get_rows(grid_container: HTMLElement) {
  return grid_container.style.gridTemplateRows.split(" ");
}

export function get_cols(grid_container: HTMLElement) {
  return grid_container.style.gridTemplateColumns.split(" ");
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

// grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for
export function sizes_to_template_def(defs: Array<string>) {
  return concat(defs, " ");
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
