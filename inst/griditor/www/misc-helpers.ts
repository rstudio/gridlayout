// Functions related to grid construction

// Builds the start/end css string for a grid-{row,column}
export function make_template_start_end(pos: Array<number>): string {
  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  const start: number = pos[0];
  const negative_index: boolean = start < 0;

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
  if(content instanceof Array){
    return content;
  } else {
    return [content];
  }
};

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