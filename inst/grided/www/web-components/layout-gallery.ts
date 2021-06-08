import { Layout_Info } from "..";
import { click_button, El } from "../make-elements";
import { grid_preview } from "./grid-preview";
import { create_focus_modal } from "./focus-modal";

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
    const modal = create_focus_modal()
      .set_title(selected_layout.name)
      .max_width("95%")
      .add_element(
        grid_preview()
          .layout(selected_layout)
          .shown_size(650)
          .turnoff_animation()
          .hide_name()
      );

    const close_gallery = (event: MouseEvent) => {
      // Stop propigation of click event down so it doesn't trigger the
      // background click-to-go-back behavior
      event.stopPropagation();
      this.remove();
      modal.remove();
    };

    modal.add_element(
      El({
        sel_txt: `div#footer`,
        children: [
          click_button(".go", "Create app with this layout", (event) => {
            close_gallery(event);
            this.on_go_fn(selected_layout);
          }),
          click_button(".edit", "Edit this layout", (event) => {
            close_gallery(event);
            this.on_edit_fn(selected_layout);
          }),
        ],
      })
    );

    modal.add_to_page();
  }
}

export function layout_gallery(layouts: Layout_Info[]) {
  return new LayoutGallery(layouts);
}

customElements.define("layout-gallery", LayoutGallery);
