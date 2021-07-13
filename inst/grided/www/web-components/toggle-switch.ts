export class ToggleSwitch extends HTMLElement {
  offText: string;
  onText: string;
  onChange: (isOn: boolean) => void;
  startOn: boolean;
  constructor(opts: {
    offText: string;
    onText: string;
    onChange: (isOn: boolean) => void;
    startOn: boolean;
  }) {
    super();
    this.attachShadow({ mode: "open" });
    this.offText = opts.offText;
    this.onText = opts.onText;
    this.onChange = opts.onChange;
    this.startOn = opts.startOn;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        height: auto;
      }
      #container {
        display: inline-grid;
        grid-template-columns: 1fr auto 1fr;
        grid-gap: 4px;
        width: 100%;
        height: auto;
        align-items: center;
        justify-items: center;
        padding-left: 4px;
        padding-right: 4px;
      }

      .disabled {
        opacity: 0.2;
      }    

      #off-text {
        text-align: end;
        justify-self: end;
      }
      #on-text {
        justify-self: start;
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
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 34px;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
      .disabled #slider {
        cursor: not-allowed;
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

    const switchValue = this.shadowRoot.getElementById(
      "switch-value"
    ) as HTMLInputElement;

    switchValue.checked = this.startOn;

    switchValue.addEventListener("change", (event) =>
      this.onChange((event.target as HTMLInputElement).checked)
    );
  }

  toggleEnabled(enable: boolean, msg?: string) {
    const container = this.shadowRoot.getElementById("container");
    container.title = msg;
    (this.shadowRoot.getElementById(
      "switch-value"
    ) as HTMLInputElement).disabled = !enable;

    container.classList[enable ? "remove" : "add"]("disabled");
  }

  disable(msg: string) {
    this.toggleEnabled(false, msg);
  }
  enable() {
    this.toggleEnabled(true);
  }
}

customElements.define("toggle-switch", ToggleSwitch);
