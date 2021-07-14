import { closeIcon } from "../utils-icons";
import "./copy-code.ts";

class FocusModal extends HTMLElement {
  OnClose: () => void;
  Title: string;
  MaxWidth: string = "450px";
  Children: HTMLElement[] = [];
  Description: string;
  hasRendered: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setTitle(title: string) {
    this.Title = title;
    return this;
  }

  description(description: string) {
    this.Description = description;
    return this;
  }

  maxWidth(width: string) {
    this.MaxWidth = width;
    return this;
  }

  addElement(el: HTMLElement) {
    if (this.hasRendered) {
      this.shadowRoot.getElementById("content").appendChild(el);
      return this;
    }
    this.Children.push(el);
    return this;
  }

  onClose(callback: () => void) {
    this.OnClose = callback;
    return this;
  }

  // Allows us to make an element focused for immediate action such as typing
  // in a value etc.
  focusOn(elId: string) {
    this.shadowRoot.getElementById(elId).focus();
    return this;
  }

  setupCloseCallbacks() {
    // Setup close callbacks for close button and off-modal click
    const exitFn = () => {
      this.OnClose?.();
      this.remove();
    };
    this.shadowRoot.getElementById("close").addEventListener("click", exitFn);
    this.addEventListener("click", exitFn);
    // Stop propigation of click events in the modal content so selecting text
    // or clicking the copy code button doesnt close the modal
    this.shadowRoot
      .getElementById("content")
      .addEventListener("click", (event) => {
        event.stopPropagation();
      });
  }

  addToPage() {
    document.body.appendChild(this);
    this.hasRendered = true;
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
         border: 1px solid #bababa;
         border-radius: 4px;
         width: 95%;
         min-width: 400px;
         max-width: ${this.MaxWidth};
         background: white;
         padding: 2rem 3rem;
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
         right: 4px;
         top: 4px;
       }
   
       .centered {
         margin-left: auto;
         margin-right: auto;
       }
     </style>
     <div id="content">
       ${this.Title ? `<h2 id = 'title'> ${this.Title} </h2>` : ``}
       <button id = 'close'> ${closeIcon} </button>
       ${
         this.Description
           ? `<div id = "description">${this.Description}</div>`
           : ``
       }
     </div>
   `;

    const content = this.shadowRoot.getElementById("content");
    this.Children.forEach((el) => {
      content.appendChild(el);
    });

    this.setupCloseCallbacks();
  }
}

customElements.define("focus-modal", FocusModal);

export function createFocusModal() {
  return new FocusModal();
}
