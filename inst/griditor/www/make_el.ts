import { Grid_Pos } from ".";
import {
  as_array,
  make_template_start_end,
  set_element_in_grid,
} from "./misc-helpers";

export interface Event_Listener {
  event: string;
  func: (event: Event) => void;
}

interface Element_Opts {
  event_listener?: Event_Listener | Array<Event_Listener>;
  styles?: object;
  innerHTML?: string;
  data_props?: object;
  grid_pos?: Grid_Pos;
  props?: object;
}

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
export function make_el(
  parent: HTMLElement,
  sel_txt: string,
  opts: Element_Opts = {}
) {
  const get_tag_regex = /^([^#\.]+)+/g;
  const get_id_regex = /(?<=#)([^\.]+)/g;
  const get_class_regex = /(?<=\.)([^\.#]+)/g;

  const tag_type: string = sel_txt.match(get_tag_regex)[0];
  const el_id: RegExpMatchArray = sel_txt.match(get_id_regex);
  const class_list: RegExpMatchArray = sel_txt.match(get_class_regex);

  let el: HTMLElement = parent.querySelector(sel_txt);
  if (!el) {
    // Element doesn't exists so we need to make it
    el = document.createElement(tag_type);
    if (el_id) {
      el.id = el_id[0];
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
