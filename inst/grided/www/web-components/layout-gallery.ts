import { Layout_Element, Layout_Info } from "..";
import { Layout_State } from "../Grid_Layout";
import { GridPreview, grid_preview } from "./grid-preview";


export class LayoutGallery extends HTMLElement {

  layouts: Layout_Info[];

  constructor(layouts: Layout_Info[]) {
    super();
    this.attachShadow({ mode: "open" });
    this.layouts = layouts;
  }

  connectedCallback() {
  
    this.shadowRoot.innerHTML = `
    <style>
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


    const layouts_holder = this.shadowRoot.getElementById("layouts");
    this.layouts.forEach((layout) => {
      layouts_holder.appendChild(grid_preview().layout(layout).on_select(this.select_a_grid));
    });
  }

  select_a_grid(layout_info: Layout_Info){
    console.log(`selected`, layout_info);
    // const chooser_modal = document.getElementById("chooser-modal");
    // chooser_modal.innerHTML = "";
    // chooser_modal.classList.remove('hidden');
    // const layout_confirm = document
    //     .createElement("grid-preview")
    //     .set_options(layout_info)
    //     .shown_size(500)
    //     .turnoff_animation();
    // chooser_modal.appendChild(layout_confirm);
    // const go_btn = document.createElement('button');
    // go_btn.classList.add("go");
    // go_btn.innerHTML = "Create app with this layout";
    // chooser_modal.appendChild(go_btn);
    
    // const edit_btn = document.createElement('button');
    // edit_btn.classList.add("edit");
    // edit_btn.innerHTML = "Edit this layout";
    // chooser_modal.appendChild(edit_btn);
  };
}

customElements.define("layout-gallery", LayoutGallery);


