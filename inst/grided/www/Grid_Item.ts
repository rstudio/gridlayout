import { get_pos_on_grid, set_element_in_grid } from "./utils-grid";
import { filler_text, get_bounding_rect } from "./utils-misc";
import { Grid_Layout } from "./Grid_Layout";

export type Grid_Pos = {
  start_col: number;
  start_row: number;
  end_col: number;
  end_row: number;
};

export class Grid_Item {
  constructor(public el: HTMLElement, public mirrored_el?: HTMLElement) {}

  set position(pos: Grid_Pos) {
    set_element_in_grid(this.el, pos);
    if (this.has_mirrored) {
      set_element_in_grid(this.mirrored_el, pos);
    }
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

  fill_if_in_auto_row(parent_layout: Grid_Layout) {
    const in_auto_row = parent_layout
      .item_row_sizes(this.position)
      .includes("auto");

    if (in_auto_row) {
      this.el.innerHTML = filler_text;
    }
  }

  remove() {
    this.el.remove();
    if (this.has_mirrored) {
      this.mirrored_el.remove();
    }
  }
}
