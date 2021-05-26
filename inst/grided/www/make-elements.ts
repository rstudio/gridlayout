import { App_State } from "./App_State";
import { Grid_Pos } from "./Grid_Item";
import { Tract_Dir } from "./Grid_Layout";
import { set_element_in_grid } from "./utils-grid";
import { plus_icon, minus_icon, trashcan_icon } from "./utils-icons";
import { as_array } from "./utils-misc";

export type Event_Listener = {
  event: string;
  func: (event: Event) => void;
};

type Element_Contents = {
  sel_txt: string;
  text?: string;
  children?: HTMLElement[];
};

export type Element_Opts = {
  event_listener?: Event_Listener | Event_Listener[];
  styles?: object;
  innerHTML?: string;
  data_props?: object;
  grid_pos?: Grid_Pos;
  props?: object;
};

// Safari doesn't support lookbehinds for regex so we have to make it manually
function extract_id(sel_txt: string): string | null {
  const id_match: RegExpMatchArray = sel_txt.match(/#([^\.]+)/g);
  return id_match ? id_match[0].replace("#", "") : null;
}

function extract_classes(sel_txt: string): Array<string> | null {
  const class_list: RegExpMatchArray = sel_txt.match(/\.([^\.#]+)/g);
  return class_list ? [...class_list].map((c) => c.replace(".", "")) : null;
}

export function parse_selector_text(sel_txt: string) {
  return {
    tag_type: sel_txt.match(/^([^#\.]+)+/g)[0],
    el_id: extract_id(sel_txt),
    class_list: extract_classes(sel_txt),
  };
}

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
export function make_el(
  parent: HTMLElement,
  sel_txt: string,
  opts: Element_Opts = {}
) {
  let el: HTMLElement = parent.querySelector(sel_txt);
  if (!el) {
    // Element doesn't exists so we need to make it
    el = El({ sel_txt });

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

// Given a list of elements from a query selector, remove them all
export function remove_elements(
  els_to_remove: NodeListOf<Element> | Element[]
): void {
  els_to_remove.forEach((e) => e.remove());
}

export function Shadow_El(sel_txt: string, ...children: HTMLElement[]) {
  const shadow_holder = Block_El(sel_txt);
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

export function Block_El(sel_txt: string, ...children: HTMLElement[]) {
  return El({
    sel_txt,
    children,
  });
}

export function Text_El(sel_txt: string, text: string) {
  return El({
    sel_txt,
    text,
  });
}

export function tract_add_or_remove_button(
  app_state: App_State,
  opts: {
    parent_el: HTMLElement;
    add_or_remove: "add" | "remove";
    dir: Tract_Dir;
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
    `button.incrementer-button.${add_or_remove}-${dir_singular}.${dir}_${tract_index}`,
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
