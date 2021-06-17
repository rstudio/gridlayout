import { LayoutElement, LayoutInfo } from "..";
import { LayoutState } from "../GridLayout";

export class GridPreview extends HTMLElement {
  grid: LayoutState;
  RenderSize: number;
  ShownSize: number;
  name: string;
  elements: LayoutElement[];
  hoverAnimation: boolean;
  OnSelect: (info: LayoutInfo) => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.grid = { rows: ["1fr"], cols: ["1fr"], gap: "1rem" };
    this.elements = [];
    this.RenderSize = 1250;
    this.ShownSize = 250;
    this.OnSelect = () => console.log(`Selected ${this.name}`);
    this.hoverAnimation = true;
  }

  connectedCallback() {
    const scale = this.RenderSize / this.ShownSize;

    const scaleUnits = (unit: string) => {
      // Dont calc with relative units ()
      if (unit.includes("fr") || unit.includes("auto")) return unit;
      return `calc(${unit}/ ${scale})`;
    };

    const buildTractDefinition = (tractSizing: string | string[]) => {
      // If we have a single tract then json serialization will not keep it
      // as an array and we need to convert it back to one.
      if (!(tractSizing instanceof Array)) {
        tractSizing = [tractSizing];
      }
      return tractSizing.map((x) => scaleUnits(x) ).join(" ");
    }

    const cornerRadius = `${20 / scale}px`;
    this.shadowRoot.innerHTML = `
    <style>
      * { box-sizing: border-box; }

      #layout {
        box-shadow: rgb(50 50 93 / 25%) 0px 2px 8px 1px;
        border-radius: ${cornerRadius};
        width: ${this.ShownSize}px;
        height: ${this.ShownSize}px;
        display: grid;
        grid-template-rows: ${buildTractDefinition(this.grid.rows)};
        grid-template-columns: ${buildTractDefinition(this.grid.cols)};
        gap: ${scaleUnits(this.grid.gap)};
        padding: ${30 / scale}px;
        background-color: white;
        margin-left: auto;
        margin-right: auto;
        overflow: scroll;
      }
      ${
        this.hoverAnimation
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
        border-radius: ${cornerRadius};
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
    <div id="layout"> ${this.elementDivs} </div>
    `;

    this.shadowRoot
      .getElementById("layout")
      .addEventListener("click", (event) => {
        // Dont let the gallery background pickup event and kill selection
        event.stopPropagation();
        this.OnSelect({
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

  renderSize(newSize: number) {
    this.RenderSize = newSize;
    return this;
  }

  shownSize(newSize: number) {
    this.ShownSize = newSize;
    return this;
  }

  onSelect(onSelect: (info: LayoutInfo) => void) {
    this.OnSelect = onSelect;
    return this;
  }

  hideName() {
    this.name = null;
    return this;
  }
  turnoffAnimation() {
    this.hoverAnimation = false;
    return this;
  }

  get elementDivs() {
    let elementDivs = "";
    this.elements.forEach(
      ({ id, start_row, start_col, end_row, end_col, flipId = false }) => {
        const gridArea = [start_row, start_col, end_row + 1, end_col + 1].join(
          "/"
        );
        elementDivs += `
      <div style='grid-area:${gridArea}'>
        <div ${flipId ? `class=flipped` : ``}>${id}</div>
      </div>
    `;
      }
    );

    return elementDivs;
  }
}

export function gridPreview() {
  return new GridPreview();
}

customElements.define("grid-preview", GridPreview);
