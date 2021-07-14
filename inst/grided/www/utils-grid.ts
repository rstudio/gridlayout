// Functions related to grid construction, editings, etc

import { GridPos } from "./GridItem";
import { TractDir } from "./GridLayout";
import { LayoutEditor } from "./LayoutEditor";
import {
  boxesOverlap,
  getBoundingRect,
  maxWithMissing,
  minWithMissing,
  SelectionRect,
} from "./utils-misc";

export function findFirstGridNode(): HTMLElement {
  // Do a BFS for a grid layout element in the page
  let gridNode: HTMLElement;
  let currentNode = document.body;
  let nodeQueue: Element[] = [...currentNode.children];
  // We dont want to go too deep into the dom.
  let numChecks = 0;
  const checkMax = 100;
  while (
    typeof gridNode === "undefined" &&
    nodeQueue.length > 0 &&
    numChecks++ < checkMax
  ) {
    currentNode = nodeQueue.shift() as HTMLElement;
    nodeQueue = [...nodeQueue, ...currentNode.children];
    if (getComputedStyle(currentNode).display === "grid") {
      gridNode = currentNode;
    }
  }

  if (typeof gridNode === "undefined" && numChecks < checkMax) {
    // If we didnt find a grid node lets make one as a first child
    const gridNode = document.createElement("div");
    // gridNode.style.display = "grid";
    currentNode.appendChild(gridNode);
  } else if (numChecks === checkMax) {
    alert("Could not find a grid-layout element to edit -- Sorry!");
  }

  gridNode.classList.add("wrapped-existing-app");

  return gridNode;
}

export function setElementInGrid(el: HTMLElement, gridBounds: GridPos) {
  if (gridBounds.start_row) {
    el.style.gridRowStart = gridBounds.start_row.toString();
  }
  if (gridBounds.end_row) {
    el.style.gridRowEnd = (gridBounds.end_row + 1).toString();
  }
  if (gridBounds.start_col) {
    el.style.gridColumnStart = gridBounds.start_col.toString();
  }
  if (gridBounds.end_col) {
    el.style.gridColumnEnd = (gridBounds.end_col + 1).toString();
  }
}

export function getPosOnGrid(gridEl: HTMLElement): GridPos {
  const elStyles = getComputedStyle(gridEl);
  return {
    start_row: +elStyles.gridRowStart,
    start_col: +elStyles.gridColumnStart,
    end_row: +elStyles.gridRowEnd - 1,
    end_col: +elStyles.gridColumnEnd - 1,
  };
}

export function getDragExtentOnGrid(
  appState: LayoutEditor,
  selectionRect: SelectionRect
): GridPos {
  // Reset bounding box definitions so we only use current selection extent
  const selBounds: GridPos = {
    start_col: null,
    end_col: null,
    start_row: null,
    end_row: null,
  };

  appState.currentCells.forEach(function (el) {
    // Cell is overlapped by selection box
    if (boxesOverlap(getBoundingRect(el), selectionRect)) {
      const elRow: number = +el.dataset.row;
      const elCol: number = +el.dataset.col;
      selBounds.start_row = minWithMissing(selBounds.start_row, elRow);
      selBounds.end_row = maxWithMissing(selBounds.end_row, elRow);
      selBounds.start_col = minWithMissing(selBounds.start_col, elCol);
      selBounds.end_col = maxWithMissing(selBounds.end_col, elCol);
    }
  });

  return selBounds;
}

export function boundingRectToCssPos(rect: SelectionRect) {
  return {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.right - rect.left}px`,
    height: `${rect.bottom - rect.top}px`,
  };
}

export function getGapSize(style: CSSStyleDeclaration | string) {
  // Older browsers give back both row-gap and column-gap in same query
  // so we need to reduce to a single value before returning

  const gapSizeVec = (typeof style === "string" ? style : style.gap).split(" ");

  return gapSizeVec[0];
}

export function makeStartEndForDir(dir: TractDir) {
  if (dir === "cols") {
    return {
      startId: "start_col",
      endId: "end_col",
    };
  } else {
    return {
      startId: "start_row",
      endId: "end_row",
    };
  }
}
