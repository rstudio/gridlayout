import { css } from "@emotion/css";
import { Grid_Pos } from "./GridItem";
import { TractDir } from "./GridLayout";
import { LayoutEditor } from "./Layout_Editor";
import { set_element_in_grid } from "./utils-grid";
import { plus_icon, trashcan_icon } from "./utils-icons";
import { as_array } from "./utils-misc";

export type EventListener = {
  event: string;
  func: (event: Event) => void;
};

type ElementContents = {
  sel_txt: string;
  text?: string;
  children?: HTMLElement[];
  styles?: object;
  props?: object;
  event_listener?: EventListener | EventListener[];
};

export type ElementOpts = {
  event_listener?: EventListener | EventListener[];
  styles?: object;
  innerHTML?: string;
  data_props?: object;
  grid_pos?: Grid_Pos;
  props?: object;
};


export function parse_selector_text(sel_txt: string) {
  // Safari doesn't support lookbehinds for regex so we have to make it manually
  const id_match: RegExpMatchArray = sel_txt.match(/#([^\.]+)/g);
  const el_id = id_match ? id_match[0].replace("#", "") : null;

  const all_classes: RegExpMatchArray = sel_txt.match(/\.([^\.#]+)/g);
  const class_list = all_classes
    ? [...all_classes].map((c) => c.replace(".", ""))
    : null;
  return {
    tag_type: sel_txt.match(/^([^#\.]+)+/g)[0],
    el_id,
    class_list,
  };
}

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
export function make_el(
  parent: HTMLElement,
  sel_txt: string,
  opts: ElementOpts = {}
) {
  let el: HTMLElement = parent.querySelector(sel_txt);
  if (!el) {
    // Element doesn't exists so we need to make it
    el = create_el({ sel_txt });

    if (opts.props) {
      Object.assign(el, opts.props);
    }

    parent.appendChild(el);
  }

  if (opts.event_listener) {
    as_array(opts.event_listener).forEach(
      (listener) => (el["on" + listener.event] = listener.func)
    );
  }

  if (opts.styles) {
    Object.assign(el.style, opts.styles);
  }

  if (opts.innerHTML) {
    el.innerHTML = opts.innerHTML;
  }

  if (opts.data_props) {
    Object.assign(el.dataset, opts.data_props);
  }

  if (opts.grid_pos) {
    set_element_in_grid(el, opts.grid_pos);
  }

  return el;
}


export function shadow_el(sel_txt: string, ...children: HTMLElement[]) {
  const shadow_holder = block_el(sel_txt);
  shadow_holder.attachShadow({ mode: "open" });
  const style_sheet = document.createElement("style");

  shadow_holder.shadowRoot.appendChild(style_sheet);
  children.forEach((child_el) =>
    shadow_holder.shadowRoot.appendChild(child_el)
  );
  return {
    el: shadow_holder,
    style_sheet,
  };
}

export function create_el(opts: ElementContents): HTMLElement {
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

  if (opts.styles) {
    Object.assign(el.style, opts.styles);
  }

  if (opts.props) {
    Object.assign(el, opts.props);
  }

  if (opts.event_listener) {
    as_array(opts.event_listener).forEach(
      (listener) => (el["on" + listener.event] = listener.func)
    );
  }

  return el;
}

export function block_el(sel_txt: string, ...children: HTMLElement[]) {
  return create_el({
    sel_txt,
    children,
  });
}

export function text_el(sel_txt: string, text: string) {
  return create_el({
    sel_txt,
    text,
  });
}
const incrementer_button_class = css`
  font-size: 15px;
  height: 2em;
  width: 2em;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 0);
  padding: 0;
  color: var(--dark-gray, gray);
  transition: color 0.2s, background-color 0.2s;

  &.remove-col {
    font-size: 12px;
  }

  &.add-row,
  &.add-col {
    /* This offset is enough to place the button on the outside of the row/column
      spanning div and centered in the grid tract */
    --incrementer-offset: calc(-1em - var(--grid-gap) / 2);
    position: absolute;
    right: 2px;
    bottom: 2px;
  }

  &.add-row {
    bottom: var(--incrementer-offset);
  }
  &.add-col {
    right: var(--incrementer-offset);
  }

  &:hover {
    background-color: var(--dark-gray);
    color: white;
  }

  & > svg {
    max-height: 100%;
    max-width: 100%;
  }
`;
export function tract_add_or_remove_button(
  app_state: LayoutEditor,
  opts: {
    parent_el: HTMLElement;
    add_or_remove: "add" | "remove";
    dir: TractDir;
    tract_index: number;
    additional_styles?: Record<string, string>;
  }
) {
  const {
    parent_el,
    add_or_remove,
    dir,
    tract_index,
    additional_styles,
  } = opts;
  const dir_singular = dir === "rows" ? "row" : "col";

  const label =
    add_or_remove === "add"
      ? `Add a ${dir_singular}`
      : `Remove ${dir_singular}`;

  const button = make_el(
    parent_el,
    `button.${incrementer_button_class}.${add_or_remove}-${dir_singular}.${dir}_${tract_index}`,
    {
      innerHTML: add_or_remove === "add" ? plus_icon : trashcan_icon,
      styles: additional_styles,
      event_listener: {
        event: "click",
        func: () => {
          if (add_or_remove === "add") {
            app_state.add_tract(dir, tract_index);
          } else {
            app_state.remove_tract(dir, tract_index);
          }
        },
      },
      props: {
        title: label,
      },
    }
  );

  return button;
}


export function click_button(selector: string, label: string, on_finish: (event?: MouseEvent) => void){
  const button = text_el(`button${selector}`, label);
  button.addEventListener("click", function (event) {
    on_finish(event);
  });
  return button;
}