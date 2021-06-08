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
      padding: 5px 8px;
      display: inline-flex;
      align-items: center;
    }
  </style>
  <div id="content">
    <h2 id = "title"></h2>
    <div id = "code"></div>
    <div id = "footer">
      <button id = 'close'> ${close_icon} </button>
    </div>
  </div>
`;

type Focus_Modal_Options = {
  title: string;
  on_cancel?: () => void;
  code_content?: string;
};

class FocusModal extends HTMLElement {
  _on_remove: () => void;
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

    if (opts.code_content) {
      const code_el = document.createElement("copy-code");
      code_el.innerHTML = opts.code_content;
      this.shadowRoot.getElementById("code").appendChild(code_el);
    }
  }

  on_remove(callback: () => void) {
    this._on_remove = callback;
    return this;
  }

  setup_close_callbacks() {
    // Setup close callbacks for close button and off-modal click
    const exit_fn = () => this.remove();
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

  disconnectedCallback() {
    if (this._on_remove) {
      this._on_remove();
    }
  }
}

customElements.define("focus-modal", FocusModal);

export function create_focus_modal(opts: Focus_Modal_Options) {
  const modal = new FocusModal(opts);
  document.body.appendChild(modal);
}
