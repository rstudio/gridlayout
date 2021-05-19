type Grid_Attr = "rows" | "cols" | "gap";

export type Layout_State = {
  rows: string[];
  cols: string[];
  gap: string;
};

export class Grid_Layout {
  container: HTMLElement;
  styles: CSSStyleDeclaration;

  constructor(container: HTMLElement) {
    this.container = container;
    this.styles = container.style;
    console.log("Initialized Grid_Layout");
  }

  set rows(new_rows: string[]) {
    if (typeof new_rows === "undefined") return;
    this.styles.gridTemplateRows = sizes_to_template_def(new_rows);
  }
  get rows(): string[] {
    return this.styles.gridTemplateRows.split(" ");
  }
  get num_rows() {
    return this.rows.length;
  }

  set cols(new_cols: string[]) {
    if (typeof new_cols === "undefined") return;
    this.styles.gridTemplateColumns = sizes_to_template_def(new_cols);
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

  is_updated_val(attr: Grid_Attr, values: string | string[]) {
    if (attr === "gap") {
      return values !== this.gap;
    } else if (typeof values === "object") {
      return !equal_arrays(this[attr], values);
    }
  }

  // Given a new set of attributes, tells you which ones are different from
  // current values
  changed_attributes(attrs: {
    rows?: string[];
    cols?: string[];
    gap?: string;
  }) {
    const changed: Grid_Attr[] = [];
    const new_attrs: Layout_State = this.attrs;

    if (attrs.rows) new_attrs.rows = attrs.rows;
    if (attrs.cols) new_attrs.cols = attrs.cols;
    if (attrs.gap) new_attrs.gap = attrs.gap;

    let new_num_cells = false;
    if (attrs.rows && this.is_updated_val("rows", attrs.rows)) {
      changed.push("rows");
      new_num_cells = true;
    }
    if (attrs.cols && this.is_updated_val("cols", attrs.cols)) {
      changed.push("cols");
      new_num_cells = true;
    }
    if (attrs.gap && this.is_updated_val("gap", attrs.gap)) {
      changed.push("gap");
    }

    return {
      changed,
      new_num_cells,
      new_attrs,
    };
  }

  update_attrs(attrs: { rows?: string[]; cols?: string[]; gap?: string }) {
    this.rows = attrs.rows;
    this.cols = attrs.cols;
    this.gap = attrs.gap;
  }
}

// grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for
function sizes_to_template_def(defs: Array<string>) {
  return defs.join(" ");
}

function equal_arrays<Type>(a: Type[], b: Type[]) {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}