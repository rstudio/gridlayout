import { blockEl, makeEl, shadowEl } from "./make-elements";

export function makeToggleSwitch(
  offText: string,
  onText: string,
  onChange: (isOn: boolean) => void
) {
  const container = blockEl("div.toggle-switch");

  makeEl(container, "span.off-text", {
    innerHTML: offText,
  });
  const label = makeEl(container, "label.switch");
  makeEl(container, "span.on-text", {
    innerHTML: onText,
  });
  makeEl(label, "input", {
    props: { type: "checkbox" },
    eventListener: {
      event: "change",
      func: (event) => {
        onChange((event.target as HTMLInputElement).checked);
      },
    },
  });

  makeEl(label, "span.slider");

  const { el, styleSheet } = shadowEl("div.toggle-switch", container);

  // Add styles
  styleSheet.innerHTML = `
  div.toggle-switch {
    display: inline-grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 3px;
    width: 180px;
    align-items: center;
    justify-items: center;
    padding-left: 4px;
    padding-right: 4px;
  }
  
  .toggle-switch > span {
    font-size: 1rem;
  }
  
  .toggle-switch > .off-text {
    text-align: end;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
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
  
  .slider:before {
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
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  `;

  return el;
}
