export class IconButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      #container {
        outline: 1px solid red;
      }
    </style>
    <div id = "container">
    </div>
   `;
  }
}

customElements.define("icon-button", IconButton);
