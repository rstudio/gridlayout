export type XYPos = {
  x: number;
  y: number;
};

export type DragType = "top-left" | "bottom-right" | "center";

export type SelectionRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

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

// Produce bounding rectangle relative to parent of any element
export function get_bounding_rect(el: HTMLElement): SelectionRect | null {
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
  box_a: SelectionRect,
  box_b: SelectionRect
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
  rect: SelectionRect,
  delta: XYPos,
  dir: DragType
): SelectionRect {
  // Need to destructure down to numbers to avoid copy
  const new_rect: SelectionRect = { ...rect };

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

export function flatten<Type>(arr: Type[][]): Type[] {
  return [].concat(...arr);
}

export function set_class(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  class_name: string
) {
  elements.forEach((el) => {
    el.classList.add(class_name);
  });
}

export const filler_text = `
<div class = "filler_text">
  This filler text demonstrates how the height of an element spanning an "auto"
  row is influenced by its content. While you're here...
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
  when an unknown printer took a galley of type and scrambled it to make a type 
  specimen book.
</div>`;

export function pos_relative_to_container(
  container: DOMRect,
  child_el: HTMLElement
) {
  const pos = child_el.getBoundingClientRect();

  return {
    top: pos.top - container.top,
    bottom: pos.bottom - container.bottom,
    left: pos.left - container.left,
    right: pos.right - container.right,
    height: pos.height,
    width: pos.width,
  };
}
