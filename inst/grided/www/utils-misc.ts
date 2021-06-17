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

export function asArray<T>(content: T | Array<T>): Array<T> {
  if (content instanceof Array) {
    return content;
  } else {
    return [content];
  }
}

// Passing an undefined value to a compare like min or max will always give undefined
// These functions let you default to the second option in the case the first is falsy
function compareWithMissing(
  compareFn: (...values: number[]) => number,
  maybeA: number | null,
  b: number
) {
  return maybeA ? compareFn(maybeA, b) : b;
}

export function minWithMissing(maybeA: number | null, b: number) {
  return compareWithMissing(Math.min, maybeA, b);
}

export function maxWithMissing(maybeA: number | null, b: number) {
  return compareWithMissing(Math.max, maybeA, b);
}

// Produce bounding rectangle relative to parent of any element
export function getBoundingRect(el: HTMLElement): SelectionRect | null {
  if (el.offsetParent === null) {
    return null;
  }
  const top = el.offsetTop;
  const left = el.offsetLeft;
  const height = el.offsetHeight;
  const width = el.offsetWidth;
  return { left: left, right: left + width, top: top, bottom: top + height };
}

export function boxesOverlap(
  boxA: SelectionRect,
  boxB: SelectionRect
): boolean {
  const horizontalOverlap = intervalsOverlap(
    [boxA.left, boxA.right],
    [boxB.left, boxB.right]
  );
  const verticalOverlap = intervalsOverlap(
    [boxA.top, boxA.bottom],
    [boxB.top, boxB.bottom]
  );

  return horizontalOverlap && verticalOverlap;

  // Figure out of two intervals overlap eachother
  function intervalsOverlap([aStart, aEnd], [bStart, bEnd]) {
    //   aaaaaaaaaa
    // bbbbbb
    //         bbbbbb
    const aContainsBsEndpoint =
      (aStart >= bStart && aStart <= bEnd) ||
      (aEnd >= bStart && aEnd <= bEnd);

    //   aaaaaa
    // bbbbbbbbbb
    const bCoversA = aStart <= bStart && aEnd >= bEnd;

    return aContainsBsEndpoint || bCoversA;
  }
}

export function updateRectWithDelta(
  rect: SelectionRect,
  delta: XYPos,
  dir: DragType
): SelectionRect {
  // Need to destructure down to numbers to avoid copy
  const newRect: SelectionRect = { ...rect };

  // The bounding here means that we dont let the user drag the box "inside-out"
  if (dir === "top-left") {
    newRect.left = newRect.left + delta.x;
    newRect.top = newRect.top + delta.y;
  } else if (dir === "bottom-right") {
    (newRect.right = newRect.right + delta.x), newRect.left;
    (newRect.bottom = newRect.bottom + delta.y), newRect.top;
  } else {
    // Just move the box
    newRect.left += delta.x;
    newRect.top += delta.y;
    newRect.right += delta.x;
    newRect.bottom += delta.y;
  }

  // Make sure positions are proper for bounding box (in case box was flipped inside out)
  if (newRect.left > newRect.right) {
    const { left, right } = newRect;
    newRect.right = left;
    newRect.left = right;
  }
  if (newRect.top > newRect.bottom) {
    const { top, bottom } = newRect;
    newRect.bottom = top;
    newRect.top = bottom;
  }

  return newRect;
}

export function flatten<Type>(arr: Type[][]): Type[] {
  return [].concat(...arr);
}

export function setClass(
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  className: string
) {
  elements.forEach((el) => {
    el.classList.add(className);
  });
}

export const fillerText = `
<div class = "fillerText">
  This filler text demonstrates how the height of an element spanning an "auto"
  row is influenced by its content. While you're here...
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
  when an unknown printer took a galley of type and scrambled it to make a type 
  specimen book.
</div>`;

export function posRelativeToContainer(
  container: DOMRect,
  childEl: HTMLElement
) {
  const pos = childEl.getBoundingClientRect();

  return {
    top: pos.top - container.top,
    bottom: pos.bottom - container.bottom,
    left: pos.left - container.left,
    right: pos.right - container.right,
    height: pos.height,
    width: pos.width,
  };
}
