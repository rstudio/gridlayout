import { Layout_Element } from ".";
import { Grid_Layout } from "./Grid_Layout";
import { get_pos_on_grid, set_element_in_grid } from "./utils-grid";
import { get_bounding_rect } from "./utils-misc";

export type Grid_Pos = {
  start_col: number;
  start_row: number;
  end_col: number;
  end_row: number;
};

export class Grid_Item {
  id: string;
  el: HTMLElement;
  mirrored_el?: HTMLElement;
  sibling_el?: HTMLElement;
  parent_layout: Grid_Layout;

  constructor(opts: {
    el: HTMLElement;
    id: string;
    mirrored_el?: HTMLElement;
    sibling_el?: HTMLElement;
    parent_layout: Grid_Layout;
  }) {
    Object.assign(this, opts);
  }

  set position(pos: Grid_Pos) {
    set_element_in_grid(this.el, pos);
    if (this.has_mirrored) {
      set_element_in_grid(this.mirrored_el, pos);
    }
    this.fill_if_in_auto_row();
  }

  get position() {
    return get_pos_on_grid(this.el);
  }

  get bounding_rect() {
    return get_bounding_rect(this.el);
  }

  get has_mirrored() {
    return typeof this.mirrored_el !== "undefined";
  }

  get style() {
    return this.el.style;
  }

  get info(): Layout_Element {
    return {
      id: this.id,
      ...this.position,
    };
  }

  fill_if_in_auto_row() {
    const in_auto_row = this.parent_layout
      .item_row_sizes(this.position)
      .includes("auto");

    if (in_auto_row && !this.has_mirrored) {
      this.el.classList.add("in-auto-row");
    } else {
      this.el.classList.remove("in-auto-row");
    }
  }

  remove() {
    this.el.remove();
    if (this.has_mirrored) {
      this.mirrored_el.remove();
    }
    if (this.sibling_el) {
      this.sibling_el.remove();
    }
  }
}
