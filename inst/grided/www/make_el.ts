import { Grid_Pos } from ".";
import {
  as_array,
  set_element_in_grid,
} from "./misc-helpers";

export type Event_Listener = {
  event: string;
  func: (event: Event) => void;
}

type Element_Opts = {
  event_listener?: Event_Listener | Event_Listener[];
  styles?: object;
  innerHTML?: string;
  data_props?: object;
  grid_pos?: Grid_Pos;
  props?: object;
}

// Safari doesn't support lookbehinds for regex so we have to make it manually
function extract_id(sel_txt: string): string|null {
  const id_match: RegExpMatchArray = sel_txt.match(/#([^\.]+)/g);
  return id_match ? id_match[0].replace("#", ""): null;
}

function extract_classes(sel_txt:string): Array<string>|null {
  const class_list: RegExpMatchArray = sel_txt.match(/\.([^\.#]+)/g);
  return class_list 
    ? [...class_list].map(c => c.replace("\.", ""))
    : null;
}

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
export function make_el(
  parent: HTMLElement,
  sel_txt: string,
  opts: Element_Opts = {}
  ) {  

  const tag_type: string = sel_txt.match(/^([^#\.]+)+/g)[0];
  const el_id = extract_id(sel_txt);
  const class_list = extract_classes(sel_txt);

  let el: HTMLElement = parent.querySelector(sel_txt);
  if (!el) {
    // Element doesn't exists so we need to make it
    el = document.createElement(tag_type);
    if (el_id) {
      // debugger;
      el.id = el_id;
    }

    if (class_list) {
      class_list.forEach((x) => el.classList.add(x));
    }

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
export function remove_elements(els_to_remove: NodeListOf<Element>): void {
  els_to_remove.forEach((e) => e.remove());
}
