import { Layout_Element, Layout_Info } from "..";
import { Layout_State } from "../Grid_Layout";

type On_Select_Fn = (info: {
  name: string;
  grid: Layout_State;
  elements: Layout_Element[];
}) => void;

export class GridPreview extends HTMLElement {
  grid: Layout_State;
  _render_size: number;
  _shown_size: number;
  name: string;
  elements: Layout_Element[];
  hover_animation: boolean;
  _on_select: On_Select_Fn

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.name = `default name`;
    this.grid = { rows: ["1fr"], cols: ["1fr"], gap: "1rem" };
    this.elements = [];
    this._render_size = 1250;
    this._shown_size = 250;
    this._on_select = () => console.log(`Selected ${this.name}`);
    this.hover_animation = true;
  }

  connectedCallback() {
    const scale_amnt = this._shown_size / this._render_size;
    const corner_radius = `${4 / scale_amnt}px`;
    this.shadowRoot.innerHTML = `
    <style>
      * { box-sizing: border-box; }
      #container {
        width: ${this._shown_size}px;
        height: ${this._shown_size}px 
      }
      
      #layout {
        box-shadow: 0px 0px ${corner_radius} 0px #626262;
        border-radius: ${corner_radius};
        width: ${this._render_size}px;
        height: ${this._render_size}px;
        display: grid;
        grid-template-rows: ${this.grid.rows.join(" ")};
        grid-template-columns: ${this.grid.cols.join(" ")};
        gap: ${this.grid.gap};
        padding: ${this.grid.gap};
        transform: scale(${scale_amnt});
        transform-origin: top left;
        font-size: ${1 / scale_amnt}rem;
        background-color: white;
      }
      ${
        this.hover_animation
          ? `
          #container:hover {
            animation: wiggle 1s ease;
            animation-iteration-count: 1;
            cursor: pointer;
          }
          @keyframes wiggle {
            33%  { transform: rotate(2deg)  scale(1.05);  }
            66%  { transform: rotate(-2deg) scale(1.05);  }
            100% { transform: rotate(0deg);  }
          }`
          : ``
      }
      #layout > div {
        width: 100%;
        height: 100%;
        border: ${1 / scale_amnt}px solid #bababa;
        border-radius: ${corner_radius};
        display: grid;
        place-content: center;
      }
      
      .flipped { transform: rotate(-90deg); }
    </style>
    <h3> ${this.name} </h3>
    <div id="container">
      <div id="layout"> ${this.element_divs} </div>
    </div>
    `;

    this.shadowRoot.getElementById("container").addEventListener("click", () =>
      this._on_select({
        name: this.name,
        elements: this.elements,
        grid: this.grid,
      })
    );
  }

  layout(layout: Layout_Info) {
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

  on_select(on_select: On_Select_Fn) {
    this._on_select = on_select;
    return this;
  }

  turnoff_animation() {
    this.hover_animation = false;
    return this;
  }

  get element_divs() {
    let element_divs = "";
    this.elements.forEach(({ id, start_row, start_col, end_row, end_col, flip_id = false }) => {
      const grid_area = `${start_row}/${start_col}/${end_row + 1}/${end_col + 1}`;
      element_divs += `
      <div style='grid-area:${grid_area}'>
        <div ${flip_id ? `class=flipped` : ``}>${id}</div>
      </div>
    `;
    });

    return element_divs;
  }
}

export function grid_preview() {
  return new GridPreview();
}

customElements.define("grid-preview", GridPreview);

