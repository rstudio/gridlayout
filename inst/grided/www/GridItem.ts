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
  mirroredEl?: HTMLElement;
  siblingEl?: HTMLElement;
  parentLayout: GridLayout;

  constructor(opts: {
    el: HTMLElement;
    id: string;
    mirroredEl?: HTMLElement;
    siblingEl?: HTMLElement;
    parentLayout: GridLayout;
  }) {
    Object.assign(this, opts);
  }

  set position(pos: GridPos) {
    setElementInGrid(this.el, pos);
    if (this.hasMirrored) {
      setElementInGrid(this.mirroredEl, pos);
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
    return typeof this.mirroredEl !== "undefined";
  }

  get style() {
    return this.el.style;
  }

  get info(): LayoutElement {
    return {
      id: this.id,
      ...this.position,
      ui_function: this?.mirroredEl?.dataset?.gridedUiName,
    };
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
      this.mirroredEl.remove();
    }
    if (this.siblingEl) {
      this.siblingEl.remove();
    }
  }
}
