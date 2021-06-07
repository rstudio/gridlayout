
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
    
    #title {
    }

    #code > textarea {
      font-family: monospace;
      width: 100%;
    }
  </style>
  <div id="content">
    <h2 id = "title">
      <slot name='title'>Modal title</slot>
    </h2>
    <div id = "code">
    </div>
    <button id = 'close'> Close </button>
  </div>
`;

type Focus_Modal_Options = {
  title: string;
  on_cancel?: () => void;
  code_content?: string;
};

class FocusModal extends HTMLElement {
  
  _on_remove: () => void;
  
  constructor(opts: Focus_Modal_Options) {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      modal_template.content.cloneNode(true)
    );

    const content = this.shadowRoot.getElementById("content");

    const title_el = document.createElement("span");
    title_el.slot = "title";
    title_el.innerHTML = opts.title;
    content.appendChild(title_el);

    if (opts.code_content) {
      const code_el = document.createElement('copy-code');
      code_el.innerHTML = opts.code_content;
      content.querySelector("#code").appendChild(code_el);
    }
  }
  
  on_remove(callback: () => void){
    this._on_remove = callback;
    return this;
  }

  connectedCallback() {
    this.shadowRoot.getElementById("close").addEventListener("click", () => {
      this.remove();
    });
  }

  disconnectedCallback() {
    console.log("Focus modal has been removed");
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
