// Functions related to grid construction

// Builds the start/end css string for a grid-{row,column}
export function make_template_start_end(pos: Array<number>): string {
  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  const start : number = pos[0];
  const negative_index : boolean = start < 0;

  // Grid works with lines so if we want an element to end at the 4th column we
  // need to tell it to end at the (4+1)5th line, so we add one
  const end: number = pos[1] ? pos[1] + 1 : start + (negative_index ? -1 : 1);
  // end = end ? +end + 1 : start + (negative_index ? -1 : 1);

  return `${start} / ${end}`;
}

export function set_element_in_grid(el: HTMLElement, grid_bounds) {
  el.style.gridRow = make_template_start_end(grid_bounds.row);
  el.style.gridColumn = make_template_start_end(grid_bounds.col);
}

// grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for
export function sizes_to_template_def(defs: Array<string>) {
  return defs.reduce((css, curr) => `${css} ${curr}`, "");
}
