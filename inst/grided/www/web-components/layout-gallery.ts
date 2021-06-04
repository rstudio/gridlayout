import { Layout_Element, Layout_Info } from "..";
import { Layout_State } from "../Grid_Layout";
import { GridPreview, grid_preview } from "./grid-preview";

type Select_Fn = (info: Layout_Info) => void;
export class LayoutGallery extends HTMLElement {
  layouts: Layout_Info[];

  layouts_holder: HTMLElement;
  chooser_modal: HTMLElement;
  on_edit_fn: Select_Fn;
  on_go_fn: Select_Fn;

  constructor(layouts: Layout_Info[]) {
    super();
    this.attachShadow({ mode: "open" });
    this.layouts = layouts;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      #layouts {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        grid-gap: 1rem;
        justify-items: center;
      }
      #chooser-modal {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: grid;
        grid-template-areas: 
          "main main"
          "go   edit";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(2, auto);
        gap: 1rem;
        justify-items: center;
        align-content: center;
        background-color: white;
        opacity: 0.9;
      }
      
      #chooser-modal > button {
        width: 150px;
      }
      #chooser-modal > grid-preview {
        grid-area: main;
      }
      #chooser-modal > .go {
        grid-area: go;
        justify-self: end;
      }
      #chooser-modal > .edit {
        grid-area: edit;
        justify-self: start;
      }
      
      #chooser-modal.hidden {
        display: none;
      }
    </style>
   
    <h2> Select the layout for your app: </h2>
    <div id = "layouts"></div>
    <div id = "chooser-modal" class = "hidden"> </div>
    `;

    this.chooser_modal = this.shadowRoot.getElementById("chooser-modal");
    this.layouts_holder = this.shadowRoot.getElementById("layouts");
    this.layouts.forEach((layout) => {
      this.layouts_holder.appendChild(
        grid_preview()
          .layout(layout)
          .on_select((x: Layout_Info) => this.select_a_grid(x))
      );
    });
  }

  on_edit(on_edit_fn: Select_Fn) {
    this.on_edit_fn = on_edit_fn;
    return this;
  }

  on_go(on_go_fn: Select_Fn) {
    this.on_go_fn = on_go_fn;
    return this;
  }

  hide_chooser_modal() {
    this.chooser_modal.classList.add("hidden");
  }

  select_a_grid(selected_layout: Layout_Info) {
    this.chooser_modal.innerHTML = "";
    this.chooser_modal.classList.remove("hidden");
    this.chooser_modal.appendChild(
      grid_preview().layout(selected_layout).shown_size(500).turnoff_animation()
    );

    this.chooser_modal.onclick = () => this.hide_chooser_modal();

    const go_btn = document.createElement("button");
    go_btn.classList.add("go");
    go_btn.innerHTML = "Create app with this layout";
    this.chooser_modal.appendChild(go_btn);
    if (this.on_go_fn) {
      go_btn.onclick = (event) => {
        event.stopPropagation();
        this.remove();
        this.on_go_fn(selected_layout);
      };
    }

    const edit_btn = document.createElement("button");
    edit_btn.classList.add("edit");
    edit_btn.innerHTML = "Edit this layout";
    this.chooser_modal.appendChild(edit_btn);
    if (this.on_edit_fn) {
      edit_btn.onclick = (event) => {
        event.stopPropagation();
        this.remove();
        this.on_edit_fn(selected_layout);
      };
    }
  }
}

export function layout_gallery(layouts: Layout_Info[]) {
  return new LayoutGallery(layouts);
}

customElements.define("layout-gallery", LayoutGallery);
