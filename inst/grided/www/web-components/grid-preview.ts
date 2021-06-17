import { LayoutElement, LayoutInfo } from "..";
import { LayoutState } from "../GridLayout";

export class GridPreview extends HTMLElement {
  grid: LayoutState;
  _render_size: number;
  _shown_size: number;
  name: string;
  elements: LayoutElement[];
  hover_animation: boolean;
  _on_select: (info: LayoutInfo) => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.grid = { rows: ["1fr"], cols: ["1fr"], gap: "1rem" };
    this.elements = [];
    this._render_size = 1250;
    this._shown_size = 250;
    this._on_select = () => console.log(`Selected ${this.name}`);
    this.hover_animation = true;
  }

  connectedCallback() {
    const scale = this._render_size / this._shown_size;

    const scale_units = (unit: string) => {
      // Dont calc with relative units ()
      if (unit.includes("fr") || unit.includes("auto")) return unit;
      return `calc(${unit}/ ${scale})`;
    };

    const build_tract_definition = (tract_sizing: string | string[]) => {
      // If we have a single tract then json serialization will not keep it
      // as an array and we need to convert it back to one.
      if (!(tract_sizing instanceof Array)) {
        tract_sizing = [tract_sizing];
      }
      return tract_sizing.map((x) => scale_units(x) ).join(" ");
    }

    const corner_radius = `${20 / scale}px`;
    this.shadowRoot.innerHTML = `
    <style>
      * { box-sizing: border-box; }

      #layout {
        box-shadow: rgb(50 50 93 / 25%) 0px 2px 8px 1px;
        border-radius: ${corner_radius};
        width: ${this._shown_size}px;
        height: ${this._shown_size}px;
        display: grid;
        grid-template-rows: ${build_tract_definition(this.grid.rows)};
        grid-template-columns: ${build_tract_definition(this.grid.cols)};
        gap: ${scale_units(this.grid.gap)};
        padding: ${30 / scale}px;
        background-color: white;
        margin-left: auto;
        margin-right: auto;
        overflow: scroll;
      }
      ${
        this.hover_animation
          ? `
          #layout:hover {
            transition: transform 1s ease;
            transform: rotate(1deg)  scale(1.05);
            cursor: pointer;
          }
          @keyframes wiggle {
            50%  { transform: rotate(1deg)  scale(1.05);  }
            100%  { transform: rotate(-1deg) scale(1.05);  }
          }`
          : ``
      }
      #layout > div {
        width: 100%;
        height: 100%;
        border: 1px solid #bababa;
        border-radius: ${corner_radius};
        display: grid;
        place-content: center;
        background-color: darksalmon;
      }

      #layout > div > div {
        display: none;
      }
      
      .flipped { transform: rotate(-90deg); }
    </style>
      ${
        this.name 
          ? `<h3> ${this.name} </h3>`
          : ``
      }
    <div id="layout"> ${this.element_divs} </div>
    `;

    this.shadowRoot
      .getElementById("layout")
      .addEventListener("click", (event) => {
        // Dont let the gallery background pickup event and kill selection
        event.stopPropagation();
        this._on_select({
          name: this.name,
          elements: this.elements,
          grid: this.grid,
        });
      });
  }

  layout(layout: LayoutInfo) {
    Object.assign(this.grid, layout.grid);
    this.elements = layout.elements ?? [];
    this.name = layout.name ?? this.name;
    return this;
  }

  render_size(new_size: number) {
    this._render_size = new_size;
    return this;
  }

  shown_size(new_size: number) {
    this._shown_size = new_size;
    return this;
  }

  on_select(on_select: (info: LayoutInfo) => void) {
    this._on_select = on_select;
    return this;
  }

  hide_name() {
    this.name = null;
    return this;
  }
  turnoff_animation() {
    this.hover_animation = false;
    return this;
  }

  get element_divs() {
    let element_divs = "";
    this.elements.forEach(
      ({ id, start_row, start_col, end_row, end_col, flip_id = false }) => {
        const grid_area = [start_row, start_col, end_row + 1, end_col + 1].join(
          "/"
        );
        element_divs += `
      <div style='grid-area:${grid_area}'>
        <div ${flip_id ? `class=flipped` : ``}>${id}</div>
      </div>
    `;
      }
    );

    return element_divs;
  }
}

export function grid_preview() {
  return new GridPreview();
}

customElements.define("grid-preview", GridPreview);
