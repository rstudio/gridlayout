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
    const isFirst = this.hasAttribute("is_first");
    const isAdd = this.addOrRemove === "add";
    const isCol = this.rowOrCol === "col";

    const buttonTitle = `${isAdd ? "Add a" : "Remove"} ${this.rowOrCol}`;
    const buttonIcon = isAdd ? plusIcon : trashcanIcon;

    const fixedDir = isCol ? "bottom" : "right";
    const movedDir = isCol
      ? isFirst
        ? "left"
        : "right"
      : isFirst
      ? "top"
      : "bottom";

    // The 60px offset makes sure button is in right place after accounting for the
    // leading text identifying first column addition button
    const offset = `calc(-1em - var(--grid-gap) / 2${
      isFirst && isCol ? " - 60px" : ""
    })`;

    const addPositioning = `
      #container {
        position: absolute;
        ${fixedDir}: 2px;
        ${movedDir}: ${offset};
        ${
          isFirst
            ? `display: grid;
               grid-template-columns: 60px auto;
               `
            : ""
        }
      }
    `;
    this.shadowRoot.innerHTML = `
    <style>
    
      ${isAdd ? addPositioning : ""}
    
      button {
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

      button:hover {
        background-color: var(--dark-gray, gray);
        color: white;
      }

      svg {
        max-height: 100%;
        max-width: 100%;
      }
    </style>
    <div id='container' > 
    ${isFirst ? `Add ${this.rowOrCol} ` : ""}
    <button title = "${buttonTitle}"> ${buttonIcon}</button>
      </div>
   `;

    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this._onPress();
    });
  }
}

customElements.define("add-or-remove-button", AddOrRemoveButton);
