import { plusIcon, trashcanIcon } from "../utils-icons";

export class AddOrRemoveButton extends HTMLElement {
  _onPress: () => void;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get addOrRemove() {
    return this.getAttribute("add_or_remove");
  }
  setAddOrRemove(newValue: "add" | "remove") {
    this.setAttribute("add_or_remove", newValue);
    return this;
  }

  get rowOrCol() {
    return this.getAttribute("row_or_col");
  }
  setRowOrCol(newValue: "row" | "rows" | "col" | "cols") {
    // If plural directions were passed, convert them to singular to avoid
    // awkwardly doing this on the calling side
    if (newValue === "rows") newValue = "row";
    if (newValue === "cols") newValue = "col";

    this.setAttribute("row_or_col", newValue);
    return this;
  }

  setFirst() {
    this.setAttribute("is_first", "");
    return this;
  }

  onPress(fn: () => void) {
    this._onPress = fn;
    return this;
  }

  connectedCallback() {
    const firstButton = this.hasAttribute("is_first");
    const buttonClass =
      this.addOrRemove === "add"
        ? this.rowOrCol === "row"
          ? "add-row"
          : "add-col"
        : "remove";
    this.shadowRoot.innerHTML = `
    <style>
      button {
        --incrementer-offset: calc(-1em - var(--grid-gap) / 2);
        font-size: 15px;
        height: 2em;
        width: 2em;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0);
        border: 1px solid rgba(255, 255, 255, 0);
        padding: 0;
        color: var(--dark-gray, gray);
        transition: color 0.2s, background-color 0.2s;
      }

      .add-row, .add-col {position: absolute;}
      .add-row {
        ${firstButton ? "top" : "bottom"}: var(--incrementer-offset);
        right: 2px;
      }
      .add-col {
        ${firstButton ? "left" : "right"}: var(--incrementer-offset);
        bottom: 2px;
      }

      button:hover {
        background-color: var(--dark-gray, gray);
        color: white;
      }

      svg {
        max-height: 100%;
        max-width: 100%;
      }
    </style>
      <button 
        class = ${buttonClass}
        title = "${this.addOrRemove === "add" ? "Add a" : "Remove"} ${
      this.rowOrCol
    }">
        ${this.addOrRemove === "add" ? plusIcon : trashcanIcon}
      </button>
   `;

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this._onPress();
    });
  }
}

customElements.define("add-or-remove-button", AddOrRemoveButton);
