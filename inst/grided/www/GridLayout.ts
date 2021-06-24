import { GridPos } from "./GridItem";
import { getGapSize } from "./utils-grid";
import { asArray } from "./utils-misc";

export type TractDir = "rows" | "cols";
type GridAttr = "rows" | "cols" | "gap";

export type LayoutState = {
  rows: string[];
  cols: string[];
  gap: string;
};

export class GridLayout {
  styles: CSSStyleDeclaration;
  container: HTMLElement;
  constructor(container: HTMLElement) {
    this.container = container;
    this.styles = container.style;
  }

  set rows(newRows: string[] | string) {
    if (typeof newRows === "undefined") return;
    this.styles.gridTemplateRows = asArray(newRows).join(" ");
  }
  get rows(): string[] {
    return this.styles.gridTemplateRows.split(" ");
  }
  get numRows() {
    return this.rows.length;
  }

  set cols(newCols: string[] | string) {
    if (typeof newCols === "undefined") return;
    this.styles.gridTemplateColumns = asArray(newCols).join(" ");
  }
  get cols(): string[] {
    return this.styles.gridTemplateColumns.split(" ");
  }
  get numCols() {
    return this.cols.length;
  }

  set gap(newGap: string) {
    if (typeof newGap === "undefined") return;
    // This sets the --grid-gap variable so that the controls that need the
    // info can use it to keep a constant distance from the grid holder
    document.querySelector("body").style.setProperty("--grid-gap", newGap);
    // this.container.parentElement.style.setProperty("--grid-gap", newGap);
    // We dont use css variables in the exported css that existing apps used
    // so we need to modify both gap and padding
    this.styles.gap = newGap;
    this.styles.padding = newGap;
  }
  get gap(): string {
    return getGapSize(this.styles.gap);
  }

  get attrs(): LayoutState {
    return {
      rows: this.rows,
      cols: this.cols,
      gap: this.gap,
    };
  }

  isUpdatedVal(attr: GridAttr, values?: string | string[]) {
    // Assume no value passed means no update. This allows us to call and check
    // on objects that may not have the attribute in them.
    if (typeof values === "undefined") return false;
    if (attr === "gap") {
      return values !== this.gap;
    }
    return !equalArrays(this[attr], asArray(values));
  }

  sizesForTract(itemPos: GridPos, dir: "row" | "col"): string[] {
    const startIndex: number = itemPos[`start_${dir}`] ?? itemPos[`end_${dir}`];
    const endIndex: number = itemPos[`end_${dir}`] ?? itemPos[`start_${dir}`];

    const tractSizes = dir === "row" ? this.rows : this.cols;
    return tractSizes.filter(
      (val: string, i: number) => i + 1 >= startIndex && i + 1 <= endIndex
    );
  }

  itemRowSizes(itemPos: GridPos) {
    return this.sizesForTract(itemPos, "row");
  }
}

function equalArrays<Type>(a: Type[], b: Type[]) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
