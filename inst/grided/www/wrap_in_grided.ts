import {
  browser_header_html,
  elements_icon,
  instructions_icon,
  settings_icon,
  trashcan_icon,
} from "./icons";
import { parse_selector_text } from "./make_el";

export function wrap_in_grided(grid_el: HTMLElement, setShinyInput: (input_id: string, input_value: any, is_event?: boolean) => void) {

  const get_code_btn = Text_El("button#get_code", "Get layout code");
  const update_code_btn = Text_El("button#update_code", "Update app");
  const grided_ui = Block_El(
    "div#grided__holder",
    Block_El(
      "div#grided__header",
      Text_El(
        "h2",
        "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"
      ),
      Block_El("div.code_btns", update_code_btn, get_code_btn)
    ),
    Block_El(
      "div#grided__settings",
      Text_El("h3", `${settings_icon} Settings`),
      Block_El("div.card-body")
    ),
    Block_El(
      "div#grided__instructions",
      Text_El("h3", `${instructions_icon} Instructions`),
      Text_El(
        "div.card-body",
        `
      <strong>Add an element:</strong>
      <ul>
        <li>Click and drag over the grid to define a region</li>
        <li>Enter id of element in popup</li>
      </ul>
      <strong>Edit an element:</strong>
      <ul>
        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>
      </ul>
      <strong>Remove an element:</strong>
      <ul>
        <li>Find element entry in "Added elements" panel and click the ${trashcan_icon} icon</li>
      </ul>`
      )
    ),
    Block_El(
      "div#grided__elements",
      Text_El("h3", `${elements_icon} Added elements`),
      Block_El("div.card-body", Block_El("div#added_elements"))
    ),
    Block_El(
      "div#grided__editor",
      Block_El(
        "div#editor-wrapper",
        Text_El("div#editor-browser-header", browser_header_html),
        Block_El("div#editor-app-window", grid_el)
      )
    )
  );

  // Make grided UI direct child of the body
  document.querySelector('body').appendChild(grided_ui);

  // Hook up buttons
  get_code_btn.addEventListener("click", function (event) {
    setShinyInput("get_code", 1, true);
  });

  update_code_btn.addEventListener("click", function (event) {
    setShinyInput("update_code", 1, true);
  });

  return {
    get_code_btn
  };
}

type Element_Contents = {
  sel_txt: string;
  text?: string;
  children?: HTMLElement[];
};

function El(opts: Element_Contents): HTMLElement {
  const { tag_type, el_id, class_list } = parse_selector_text(opts.sel_txt);

  const el: HTMLElement = document.createElement(tag_type);
  if (el_id) el.id = el_id;
  if (class_list) {
    class_list.forEach((x) => el.classList.add(x));
  }

  if (opts.text) {
    el.innerHTML = opts.text;
  }

  if (opts.children) {
    opts.children.forEach((child_el) => el.appendChild(child_el));
  }

  return el;
}

function Block_El(sel_txt: string, ...children: HTMLElement[]) {
  return El({
    sel_txt,
    children,
  });
}

function Text_El(sel_txt: string, text: string) {
  return El({
    sel_txt,
    text,
  });
}
