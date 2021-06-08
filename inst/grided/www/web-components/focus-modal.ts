import {close_icon} from "../utils-icons";
import "./copy-code.ts";

const modal_template = document.createElement("template");
modal_template.innerHTML = `
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
      max-width: 450px;
      background: white;
      padding: 1.5rem 2.2rem;
      position: relative;
    }

    #footer {
      padding-top: 1rem;
    }
    
    #title {
      margin: 0;
    }

    #code {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }

    #code > textarea {
      font-family: monospace;
      width: 100%;
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
    <h2 id = "title"></h2>
    <button id = 'close'> ${close_icon} </button>
    <div id = "description"></div>
    <div id = "code"></div>
  </div>
`;

type Focus_Modal_Options = {
  title: string;
  description?: string;
  on_cancel?: () => void;
  code_content?: string;
};

class FocusModal extends HTMLElement {
  _on_close: () => void;
  content: HTMLElement;
  close_btn: HTMLElement;

  constructor(opts: Focus_Modal_Options) {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      modal_template.content.cloneNode(true)
    );

    this.shadowRoot.getElementById("title").innerHTML = opts.title;
    this.content = this.shadowRoot.getElementById("content");
    this.close_btn = this.shadowRoot.getElementById("close");

    if (opts.description) {
      this.shadowRoot.getElementById("description").innerHTML = opts.description;
    }
    if (opts.code_content) {
      const code_el = document.createElement("copy-code");
      code_el.innerHTML = opts.code_content;
      this.shadowRoot.getElementById("code").appendChild(code_el);
    }
  }

  add_element(el: HTMLElement) {
    this.content.appendChild(el);
    return this;
  }

  on_close(callback: () => void) {
    this._on_close = callback;
    return this;
  }

  // Allows us to make an element focused for immediate action such as typing
  // in a value etc. 
  focus_on(el_id: string){
    this.shadowRoot.getElementById(el_id).focus();
    return this;
  }

  setup_close_callbacks() {
    // Setup close callbacks for close button and off-modal click
    const exit_fn = () => {
      this._on_close?.();
      this.remove()
    };
    this.close_btn.addEventListener("click", exit_fn);
    this.addEventListener("click", exit_fn);
    // Stop propigation of click events in the modal content so selecting text
    // or clicking the copy code button doesnt close the modal
    this.content.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  connectedCallback() {
    this.setup_close_callbacks();
  }

  adoptedCallback() {
    console.log("Adopted callback called");
  }
}

customElements.define("focus-modal", FocusModal);

export function create_focus_modal(opts: Focus_Modal_Options) {
  const modal = new FocusModal(opts);
  document.body.appendChild(modal);
  return modal;
}
