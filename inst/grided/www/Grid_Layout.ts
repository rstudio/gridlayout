import { Grid_Pos } from "./Grid_Item";

export type Tract_Dir = "rows" | "cols";
type Grid_Attr = "rows" | "cols" | "gap";

export type Layout_State = {
  rows: string[];
  cols: string[];
  gap: string;
};

export class Grid_Layout {
  styles: CSSStyleDeclaration;

  constructor(public container: HTMLElement) {
    this.styles = container.style;
    console.log("Initialized Grid_Layout");
  }

  set rows(new_rows: string[]) {
    if (typeof new_rows === "undefined") return;
    this.styles.gridTemplateRows = new_rows.join(" ");
  }
  get rows(): string[] {
    return this.styles.gridTemplateRows.split(" ");
  }
  get num_rows() {
    return this.rows.length;
  }

  set cols(new_cols: string[]) {
    if (typeof new_cols === "undefined") return;
    this.styles.gridTemplateColumns = new_cols.join(" ");
  }
  get cols(): string[] {
    return this.styles.gridTemplateColumns.split(" ");
  }
  get num_cols() {
    return this.cols.length;
  }

  set gap(new_gap: string) {
    if (typeof new_gap === "undefined") return;
    // This sets the --grid-gap variable so that the controls that need the
    // info can use it to keep a constant distance from the grid holder
    this.container.parentElement.style.setProperty("--grid-gap", new_gap);
    // We dont use css variables in the exported css that existing apps used
    // so we need to modify both gap and padding
    this.styles.gap = new_gap;
    this.styles.padding = new_gap;
  }
  get gap(): string {
    return this.styles.gap;
  }

  get attrs(): Layout_State {
    return {
      rows: this.rows,
      cols: this.cols,
      gap: this.gap,
    };
  }

  is_updated_val(attr: Grid_Attr, values?: string | string[]) {
    // Assume no value passed means no update. This allows us to call and check
    // on objects that may not have the attribute in them.
    if (typeof values === "undefined") return false;
    if (attr === "gap") {
      return values !== this.gap;
    } else if (typeof values === "object") {
      return !equal_arrays(this[attr], values);
    }
  }

  sizes_for_tract(item_pos: Grid_Pos, dir: "row" | "col"): string[] {
    const start_index: number =
      item_pos[`start_${dir}`] ?? item_pos[`end_${dir}`];
    const end_index: number =
      item_pos[`end_${dir}`] ?? item_pos[`start_${dir}`];

    const tract_sizes = dir === "row" ? this.rows : this.cols;
    return tract_sizes.filter(
      (val: string, i: number) => i + 1 >= start_index && i + 1 <= end_index
    );
  }

  item_row_sizes(item_pos: Grid_Pos) {
    return this.sizes_for_tract(item_pos, "row");
  }
}

function equal_arrays<Type>(a: Type[], b: Type[]) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
