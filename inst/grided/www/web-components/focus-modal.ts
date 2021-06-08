import { close_icon } from "../utils-icons";
import "./copy-code.ts";

class FocusModal extends HTMLElement {
  _on_close: () => void;
  _title: string;
  _max_width: string = "450px";
  _children: HTMLElement[] = [];
  _description: string;
  has_rendered: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set_title(title: string) {
    this._title = title;
    return this;
  }

  description(description: string) {
    this._description = description;
    return this;
  }

  max_width(width: string) {
    this._max_width = width;
    return this;
  }

  add_element(el: HTMLElement) {
    if (this.has_rendered) {
      this.shadowRoot.getElementById("content").appendChild(el);
      return this;
    }
    this._children.push(el);
    return this;
  }

  on_close(callback: () => void) {
    this._on_close = callback;
    return this;
  }

  // Allows us to make an element focused for immediate action such as typing
  // in a value etc.
  focus_on(el_id: string) {
    this.shadowRoot.getElementById(el_id).focus();
    return this;
  }

  setup_close_callbacks() {
    // Setup close callbacks for close button and off-modal click
    const exit_fn = () => {
      this._on_close?.();
      this.remove();
    };
    this.shadowRoot.getElementById("close").addEventListener("click", exit_fn);
    this.addEventListener("click", exit_fn);
    // Stop propigation of click events in the modal content so selecting text
    // or clicking the copy code button doesnt close the modal
    this.shadowRoot
      .getElementById("content")
      .addEventListener("click", (event) => {
        event.stopPropagation();
      });
  }

  add_to_page() {
    document.body.appendChild(this);
    this.has_rendered = true;
    return this;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
       :host {
         position: absolute;
         top: 0;
         left: 0;
         display: grid;
         place-content: center;
         outline: 1px solid red;
         width: 100%;
         height: 100vh;
         background-color: rgba(255, 255, 255, .8);
         z-index: 990;
       }
   
       /* if backdrop-filter support: make transparent and blurred */
       @supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))) {
         :host {
           background-color: rgba(255, 255, 255, .05);
           -webkit-backdrop-filter: blur(4px);
           backdrop-filter: blur(4px);
         }
       }
   
       #content {
         outline: 1px solid black;
         width: 95%;
         min-width: 400px;
         max-width: ${this._max_width};
         background: white;
         padding: 1.5rem 2.2rem;
         position: relative;
       }
   
       #footer {
         padding-top: 1rem;
         display: grid;
         grid-template-columns: repeat(auto-fit, 150px);
         justify-content: center;
         gap: 2rem;
       }
       
       #title {
         margin: 0;
       }
   
       copy-code {
         margin-top: 0.5rem;
         margin-bottom: 0.5rem;
       }
   
       #close {
         padding: 0;
         display: inline-flex;
         align-items: center;
         position: absolute;
         right: 3px;
         top: 3px;
       }
   
       .centered {
         margin-left: auto;
         margin-right: auto;
       }
     </style>
     <div id="content">
       ${this._title ? `<h2 id = 'title'> ${this._title} </h2>` : ``}
       <button id = 'close'> ${close_icon} </button>
       ${
         this._description
           ? `<div id = "description">${this._description}</div>`
           : ``
       }
     </div>
   `;

    const content = this.shadowRoot.getElementById("content");
    this._children.forEach((el) => {
      content.appendChild(el);
    });

    this.setup_close_callbacks();
  }
}

customElements.define("focus-modal", FocusModal);

export function create_focus_modal() {
  return new FocusModal();
}
