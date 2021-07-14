import { LayoutElement } from ".";
import { GridLayout } from "./GridLayout";
import { getPosOnGrid, setElementInGrid } from "./utils-grid";
import { getBoundingRect } from "./utils-misc";

export type GridPos = {
  start_col: number;
  start_row: number;
  end_col: number;
  end_row: number;
};

export class GridItem {
  id: string;
  el: HTMLElement;
  mirroredElement?: HTMLElement;
  ui_function?: string;
  siblingElement?: HTMLElement;
  parentLayout: GridLayout;

  constructor(opts: {
    el: HTMLElement;
    id: string;
    mirroredElement?: HTMLElement;
    ui_function?: string;
    siblingElement?: HTMLElement;
    parentLayout: GridLayout;
  }) {
    Object.assign(this, opts);
  }

  set position(pos: GridPos) {
    setElementInGrid(this.el, pos);
    if (this.hasMirrored) {
      setElementInGrid(this.mirroredElement, pos);
    }
    this.fillIfInAutoRow();
  }

  get position() {
    return getPosOnGrid(this.el);
  }

  get boundingRect() {
    return getBoundingRect(this.el);
  }

  get hasMirrored() {
    return typeof this.mirroredElement !== "undefined";
  }

  get style() {
    return this.el.style;
  }

  get info(): LayoutElement {
    return {
      id: this.id,
      ...this.position,
      ui_function: this?.mirroredElement?.dataset?.gridedUiName,
    };
  }

  addMirroredEl(mirroredEl: HTMLElement) {
    this.mirroredElement = mirroredEl;
    const curr_pos = this.position;
    // Update the position so the mirrored element is properly placed
    this.position = curr_pos;
    $(this.mirroredElement).trigger("shown");
  }

  fillIfInAutoRow() {
    const inAutoRow = this.parentLayout
      .itemRowSizes(this.position)
      .includes("auto");

    if (inAutoRow && !this.hasMirrored) {
      this.el.classList.add("in-auto-row");
    } else {
      this.el.classList.remove("in-auto-row");
    }
  }

  remove() {
    this.el.remove();
    if (this.hasMirrored) {
      this.mirroredElement.remove();
    }
    if (this.siblingElement) {
      this.siblingElement.remove();
    }
  }
}
