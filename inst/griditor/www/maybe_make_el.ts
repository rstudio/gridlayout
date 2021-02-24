import { make_template_start_end } from "./grid-helpers";

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
export function maybe_make_el(
  parent,
  sel_txt,
  {
    event_listener,
    styles,
    innerHTML,
    data_props,
    grid_rows,
    grid_cols,
    props,
  } = {}
) {
  const get_tag_regex = /^([^#\.]+)+/g;
  const get_id_regex = /(?<=#)([^\.]+)/g;
  const get_class_regex = /(?<=\.)([^\.#]+)/g;

  const tag_type = sel_txt.match(get_tag_regex);
  const el_id = sel_txt.match(get_id_regex);
  const class_list = sel_txt.match(get_class_regex);

  let el = parent.querySelector(sel_txt);
  if (!el) {
    // Element doesn't exists so we need to make it
    el = document.createElement(tag_type);
    if (el_id) {
      el.id = el_id[0];
    }

    if (class_list) {
      class_list.forEach((x) => el.classList.add(x));
    }

    if (props) {
      Object.assign(el, props);
    }

    parent.appendChild(el);
  }

  if (event_listener) {
    const listeners =
      event_listener instanceof Array ? event_listener : [event_listener];

    listeners.forEach(
      (listener) => (el["on" + listener.event] = listener.func)
    );
  }

  if (styles) {
    Object.assign(el.style, styles);
  }

  if (innerHTML) {
    el.innerHTML = innerHTML;
  }

  if (data_props) {
    Object.assign(el.dataset, data_props);
  }

  if (grid_rows) {
    el.style.gridRow = make_template_start_end(grid_rows);
  }
  if (grid_cols) {
    el.style.gridColumn = make_template_start_end(grid_cols);
  }

  return el;
}

// Given a list of elements from a query selector, remove them all
export function remove_elements(els_to_remove) {
  els_to_remove.forEach((e) => e.remove());
}