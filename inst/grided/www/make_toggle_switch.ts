import { Block_El, make_el } from "./make_el";

export function make_toggle_switch(
  off_text: string,
  on_text: string,
  on_change: (is_on: boolean) => void
) {

  const container = Block_El("div.toggle-switch");
  make_el(container, "span.off-text", {
    innerHTML: off_text,
  });
  const label = make_el(container, "label.switch");
  make_el(container, "span.on-text", {
    innerHTML: on_text,
  });
  make_el(label, "input", {
    props: { type: "checkbox" },
    event_listener: {
      event: "change",
      func: (event) => {
        on_change((event.target as HTMLInputElement).checked);
      },
    },
  });

  make_el(label, "span.slider");

  // Add styles
  const style_sheet: CSSStyleSheet = document.styleSheets[0];

  style_sheet.insertRule(`
    div.toggle-switch {
      display: inline-grid;
      grid-template-columns: 1fr auto 1fr;
      grid-gap: 3px;
      width: 180px;
      align-items: center;
      justify-items: center;
    }
  `);

  style_sheet.insertRule(`
  .toggle-switch > span {
    font-size: 0.85rem;
  }
`);
  style_sheet.insertRule(`
    .toggle-switch > .off-text {
      text-align: end;
    }
  `);

  style_sheet.insertRule(
    `.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }`,
    0
  );

  // Hide default HTML checkbox
  style_sheet.insertRule(
    `.switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }`,
    0
  );

  style_sheet.insertRule(
    `.slider {
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
  }`,
    0
  );
  style_sheet.insertRule(
    `.slider:before {
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
  }`,
    0
  );
  style_sheet.insertRule(
    `input:checked + .slider {
    background-color: #2196F3;
  }`,
    0
  );
  style_sheet.insertRule(
    `input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }`,
    0
  );
  style_sheet.insertRule(
    `input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }`,
    0
  );

  return container;
}
