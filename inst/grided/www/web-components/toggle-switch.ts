export class ToggleSwitch extends HTMLElement {
  offText: string;
  onText: string;
  onChange: (isOn: boolean) => void;
  constructor(
    offText: string,
    onText: string,
    onChange: (isOn: boolean) => void
  ) {
    super();
    this.attachShadow({ mode: "open" });
    this.offText = offText;
    this.onText = onText;
    this.onChange = onChange;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      #container {
        display: inline-grid;
        grid-template-columns: 1fr auto 1fr;
        grid-gap: 1px;
        width: 180px;
        align-items: center;
        justify-items: center;
        padding-left: 4px;
        padding-right: 4px;
      }

      span {
        font-size: 1rem;
      }

      #off-text {
        text-align: end;
      }

      label {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      #slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 34px;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }

      #slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        border-radius: 50%;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }

      input:checked + #slider {
        background-color: #2196F3;
      }

      input:focus + #slider {
        box-shadow: 0 0 1px #2196F3;
      }

      input:checked + #slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    </style>
    <div id = "container">
      <span id = "off-text">${this.offText}</span>
      <label id = "switch">
        <input id = "switch-value" type = "checkbox"> </input>
        <span id = "slider"> </span>
      </label>
      <span id = "on-text">${this.onText}</span>
    </div>
   `;

    this.shadowRoot
      .getElementById("switch-value")
      .addEventListener("change", (event) =>
        this.onChange((event.target as HTMLInputElement).checked)
      );
  }
}

customElements.define("toggle-switch", ToggleSwitch);
