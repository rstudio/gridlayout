// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils-misc.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = exports.get_css_value = exports.get_css_unit = exports.update_rect_with_delta = exports.boxes_overlap = exports.get_bounding_rect = exports.max_w_missing = exports.min_w_missing = exports.compare_w_missing = exports.as_array = exports.concat_sp = exports.concat_nl = exports.concat = void 0;

function concat(string_vec, collapse_char) {
  if (collapse_char === void 0) {
    collapse_char = " ";
  }

  return string_vec.reduce(function (concatted, current, i) {
    return concatted + (i > 0 ? collapse_char : "") + current;
  }, "");
}

exports.concat = concat;

function concat_nl() {
  var component_strings = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    component_strings[_i] = arguments[_i];
  }

  return concat(component_strings, "\n");
}

exports.concat_nl = concat_nl;

function concat_sp() {
  var component_strings = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    component_strings[_i] = arguments[_i];
  }

  return concat(component_strings, " ");
}

exports.concat_sp = concat_sp;

function as_array(content) {
  if (content instanceof Array) {
    return content;
  } else {
    return [content];
  }
}

exports.as_array = as_array; // Passing an undefined value to a compare like min or max will always give undefined
// These functions let you default to the second option in the case the first is falsy

function compare_w_missing(compare_fn, maybe_a, b) {
  return maybe_a ? compare_fn(maybe_a, b) : b;
}

exports.compare_w_missing = compare_w_missing;

function min_w_missing(maybe_a, b) {
  return compare_w_missing(Math.min, maybe_a, b);
}

exports.min_w_missing = min_w_missing;

function max_w_missing(maybe_a, b) {
  return compare_w_missing(Math.max, maybe_a, b);
}

exports.max_w_missing = max_w_missing; // Produce bounding rectangle relative to parent of any element

function get_bounding_rect(el) {
  if (el.offsetParent === null) {
    return null;
  }

  var top = el.offsetTop;
  var left = el.offsetLeft;
  var height = el.offsetHeight;
  var width = el.offsetWidth;
  return {
    left: left,
    right: left + width,
    top: top,
    bottom: top + height
  };
}

exports.get_bounding_rect = get_bounding_rect;

function boxes_overlap(box_a, box_b) {
  var horizontal_overlap = intervals_overlap([box_a.left, box_a.right], [box_b.left, box_b.right]);
  var vertical_overlap = intervals_overlap([box_a.top, box_a.bottom], [box_b.top, box_b.bottom]);
  return horizontal_overlap && vertical_overlap; // Figure out of two intervals overlap eachother

  function intervals_overlap(_a, _b) {
    var a_start = _a[0],
        a_end = _a[1];
    var b_start = _b[0],
        b_end = _b[1]; //   aaaaaaaaaa
    // bbbbbb
    //         bbbbbb

    var a_contains_b_endpoint = a_start >= b_start && a_start <= b_end || a_end >= b_start && a_end <= b_end; //   aaaaaa
    // bbbbbbbbbb

    var b_covers_a = a_start <= b_start && a_end >= b_end;
    return a_contains_b_endpoint || b_covers_a;
  }
}

exports.boxes_overlap = boxes_overlap;

function update_rect_with_delta(rect, delta, dir) {
  // Need to destructure down to numbers to avoid copy
  var new_rect = __assign({}, rect); // The bounding here means that we dont let the user drag the box "inside-out"


  if (dir === "top-left") {
    new_rect.left = new_rect.left + delta.x;
    new_rect.top = new_rect.top + delta.y;
  } else if (dir === "bottom-right") {
    new_rect.right = new_rect.right + delta.x, new_rect.left;
    new_rect.bottom = new_rect.bottom + delta.y, new_rect.top;
  } else {
    // Just move the box
    new_rect.left += delta.x;
    new_rect.top += delta.y;
    new_rect.right += delta.x;
    new_rect.bottom += delta.y;
  } // Make sure positions are proper for bounding box (in case box was flipped inside out)


  if (new_rect.left > new_rect.right) {
    var left = new_rect.left,
        right = new_rect.right;
    new_rect.right = left;
    new_rect.left = right;
  }

  if (new_rect.top > new_rect.bottom) {
    var top = new_rect.top,
        bottom = new_rect.bottom;
    new_rect.bottom = top;
    new_rect.top = bottom;
  }

  return new_rect;
}

exports.update_rect_with_delta = update_rect_with_delta;

function get_css_unit(css_size) {
  return css_size.match(/[^ \d | \.]+$/g)[0] || "px";
}

exports.get_css_unit = get_css_unit;

function get_css_value(css_size) {
  return Number(css_size.match(/^[\d | \.]+/g)[0]);
}

exports.get_css_value = get_css_value;

function flatten(arr) {
  return [].concat.apply([], arr);
}

exports.flatten = flatten;
},{}],"utils-grid.ts":[function(require,module,exports) {
"use strict"; // Functions related to grid construction, editings, etc

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set_gap_size = exports.get_gap_size = exports.gen_code_for_layout = exports.get_pos_on_grid = exports.set_element_in_grid = exports.sizes_to_template_def = exports.make_template_start_end = exports.get_cols = exports.get_rows = void 0;

var utils_misc_1 = require("./utils-misc");

function get_rows(grid_container) {
  return grid_container.style.gridTemplateRows.split(" ");
}

exports.get_rows = get_rows;

function get_cols(grid_container) {
  return grid_container.style.gridTemplateColumns.split(" ");
}

exports.get_cols = get_cols; // Builds the start/end css string for a grid-{row,column}

function make_template_start_end(start, end) {
  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  var negative_index = start < 0; // Grid works with lines so if we want an element to end at the 4th column we
  // need to tell it to end at the (4+1)5th line, so we add one

  end = end ? end + 1 : start + (negative_index ? -1 : 1); // end = end ? +end + 1 : start + (negative_index ? -1 : 1);

  return start + " / " + end;
}

exports.make_template_start_end = make_template_start_end; // grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for

function sizes_to_template_def(defs) {
  return utils_misc_1.concat(defs, " ");
}

exports.sizes_to_template_def = sizes_to_template_def;

function set_element_in_grid(el, grid_bounds, el_styles) {
  if (grid_bounds.start_row) {
    el.style.gridRowStart = grid_bounds.start_row.toString();
  }

  if (grid_bounds.end_row) {
    el.style.gridRowEnd = (grid_bounds.end_row + 1).toString();
  }

  if (grid_bounds.start_col) {
    el.style.gridColumnStart = grid_bounds.start_col.toString();
  }

  if (grid_bounds.end_col) {
    el.style.gridColumnEnd = (grid_bounds.end_col + 1).toString();
  }

  el.style.display = "block"; // make sure we can see the element
}

exports.set_element_in_grid = set_element_in_grid;

function get_pos_on_grid(grid_el) {
  var el_styles = getComputedStyle(grid_el);
  return {
    start_row: +el_styles.gridRowStart,
    start_col: +el_styles.gridColumnStart,
    end_row: +el_styles.gridRowEnd - 1,
    end_col: +el_styles.gridColumnEnd - 1
  };
}

exports.get_pos_on_grid = get_pos_on_grid;

function gen_code_for_layout(elements, grid_styles) {
  var container_selector = "#container";
  var element_defs = elements.map(function (el) {
    return utils_misc_1.concat_nl("#" + el.id + " {", "  grid-column: " + make_template_start_end(el.start_col, el.end_col) + ";", "  grid-row: " + make_template_start_end(el.start_row, el.end_row) + ";", "}");
  });
  var css_code = utils_misc_1.concat_nl.apply(void 0, __spreadArray([container_selector + " {", "  display: grid;", "  grid-template-columns: " + grid_styles.gridTemplateColumns + ";", "  grid-template-rows: " + grid_styles.gridTemplateRows + ";", "  gap: " + get_gap_size(grid_styles), "}"], element_defs));
  var html_code = utils_misc_1.concat_nl.apply(void 0, __spreadArray(__spreadArray(["<div id = " + container_selector + ">"], elements.map(function (el) {
    return utils_misc_1.concat_nl("  <div id = \"#" + el.id + "\">", "  </div>");
  })), ["</div>"]));
  return [{
    type: "css",
    code: css_code
  }, {
    type: "html",
    code: html_code
  }];
}

exports.gen_code_for_layout = gen_code_for_layout;

function get_gap_size(container_styles) {
  // Older browsers give back both row-gap and column-gap in same query
  // so we need to reduce to a single value before returning
  var gap_size_vec = container_styles.gap.split(" ");
  return gap_size_vec[0];
}

exports.get_gap_size = get_gap_size;

function set_gap_size(container_styles, new_val) {
  container_styles.gap = new_val;
  return new_val;
}

exports.set_gap_size = set_gap_size;
},{"./utils-misc":"utils-misc.ts"}],"make-elements.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text_El = exports.Block_El = exports.Shadow_El = exports.remove_elements = exports.make_el = exports.parse_selector_text = void 0;

var utils_grid_1 = require("./utils-grid");

var utils_misc_1 = require("./utils-misc"); // Safari doesn't support lookbehinds for regex so we have to make it manually


function extract_id(sel_txt) {
  var id_match = sel_txt.match(/#([^\.]+)/g);
  return id_match ? id_match[0].replace("#", "") : null;
}

function extract_classes(sel_txt) {
  var class_list = sel_txt.match(/\.([^\.#]+)/g);
  return class_list ? __spreadArray([], class_list).map(function (c) {
    return c.replace("\.", "");
  }) : null;
}

function parse_selector_text(sel_txt) {
  return {
    tag_type: sel_txt.match(/^([^#\.]+)+/g)[0],
    el_id: extract_id(sel_txt),
    class_list: extract_classes(sel_txt)
  };
}

exports.parse_selector_text = parse_selector_text; // This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.

function make_el(parent, sel_txt, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var el = parent.querySelector(sel_txt);

  if (!el) {
    // Element doesn't exists so we need to make it
    el = El({
      sel_txt: sel_txt
    });

    if (opts.props) {
      Object.assign(el, opts.props);
    }

    parent.appendChild(el);
  }

  if (opts.event_listener) {
    utils_misc_1.as_array(opts.event_listener).forEach(function (listener) {
      return el["on" + listener.event] = listener.func;
    });
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
    utils_grid_1.set_element_in_grid(el, opts.grid_pos);
  }

  return el;
}

exports.make_el = make_el; // Given a list of elements from a query selector, remove them all

function remove_elements(els_to_remove) {
  els_to_remove.forEach(function (e) {
    return e.remove();
  });
}

exports.remove_elements = remove_elements;

function Shadow_El(sel_txt) {
  var children = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    children[_i - 1] = arguments[_i];
  }

  var shadow_holder = Block_El(sel_txt);
  shadow_holder.attachShadow({
    mode: "open"
  });
  var style_sheet = document.createElement("style");
  shadow_holder.shadowRoot.appendChild(style_sheet);
  children.forEach(function (child_el) {
    return shadow_holder.shadowRoot.appendChild(child_el);
  });
  return {
    el: shadow_holder,
    style_sheet: style_sheet
  };
}

exports.Shadow_El = Shadow_El;

function El(opts) {
  var _a = parse_selector_text(opts.sel_txt),
      tag_type = _a.tag_type,
      el_id = _a.el_id,
      class_list = _a.class_list;

  var el = document.createElement(tag_type);
  if (el_id) el.id = el_id;

  if (class_list) {
    class_list.forEach(function (x) {
      return el.classList.add(x);
    });
  }

  if (opts.text) {
    el.innerHTML = opts.text;
  }

  if (opts.children) {
    opts.children.forEach(function (child_el) {
      return el.appendChild(child_el);
    });
  }

  return el;
}

function Block_El(sel_txt) {
  var children = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    children[_i - 1] = arguments[_i];
  }

  return El({
    sel_txt: sel_txt,
    children: children
  });
}

exports.Block_El = Block_El;

function Text_El(sel_txt, text) {
  return El({
    sel_txt: sel_txt,
    text: text
  });
}

exports.Text_El = Text_El;
},{"./utils-grid":"utils-grid.ts","./utils-misc":"utils-misc.ts"}],"make-focused_modal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show_code = exports.focused_modal = void 0;

var make_elements_1 = require("./make-elements");

var utils_misc_1 = require("./utils-misc");

function focused_modal(opts) {
  var background = make_elements_1.make_el(document.querySelector("#grided__holder"), "div.background-blurrer", {
    event_listener: opts.background_callbacks
  });
  var modal = make_elements_1.make_el(background, "div.focused_modal", {
    event_listener: opts.modal_callbacks
  });

  if (opts.header_text) {
    make_elements_1.make_el(modal, "div.focused_modal_header", {
      innerHTML: opts.header_text,
      styles: {
        paddingBottom: "1rem"
      }
    });
  }

  return {
    background: background,
    modal: modal,
    remove: function remove() {
      return background.remove();
    }
  };
}

exports.focused_modal = focused_modal;

function show_code(message, code_blocks) {
  var code_modal = focused_modal({
    header_text: "" + message,
    modal_callbacks: {
      event: "click",
      func: function func(event) {
        // This is needed to stop clicks on modal from triggering the cancel
        // event that is attached to the background
        event.stopPropagation();
      }
    },
    background_callbacks: {
      event: "click",
      func: close_modal
    }
  });
  utils_misc_1.as_array(code_blocks).forEach(function (code_to_show) {
    var num_of_lines = code_to_show.code.match(/\n/g).length;
    var code_section = make_elements_1.make_el(code_modal.modal, "div#" + code_to_show.type + ".code_chunk", {
      styles: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "1fr, auto",
        gap: "4px",
        gridTemplateAreas: utils_misc_1.concat_nl("\"code_type copy_btn\"", "\"code_text code_text\"")
      }
    });
    var code_text;
    make_elements_1.make_el(code_section, "strong", {
      innerHTML: code_to_show.type,
      styles: {
        gridArea: "code_type"
      }
    });
    make_elements_1.make_el(code_section, "button#copy_code", {
      innerHTML: "Copy to clipboard",
      styles: {
        gridArea: "copy_btn"
      },
      event_listener: {
        event: "click",
        func: function func() {
          code_text.select();
          document.execCommand("copy");
        }
      }
    });
    code_text = make_elements_1.make_el(code_section, "textarea#code_for_layout", {
      innerHTML: code_to_show.code,
      props: {
        rows: num_of_lines + 3
      },
      styles: {
        width: "100%",
        background: "#f3f2f2",
        fontFamily: "monospace",
        display: "block",
        padding: "0.75rem",
        marginBottom: "10px",
        borderRadius: "5px",
        gridArea: "code_text"
      }
    });
  });
  var action_buttons = make_elements_1.make_el(code_modal.modal, "div#action_buttons", {
    styles: {
      display: "flex",
      justifyContent: "space-around"
    }
  });
  make_elements_1.make_el(action_buttons, "button#close_code_model", {
    innerHTML: "Close",
    event_listener: {
      event: "click",
      func: close_modal
    }
  });

  function close_modal() {
    code_modal.remove();
  }
}

exports.show_code = show_code;
},{"./make-elements":"make-elements.ts","./utils-misc":"utils-misc.ts"}],"utils-icons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browser_header_html = exports.elements_icon = exports.instructions_icon = exports.settings_icon = exports.minus_icon = exports.plus_icon = exports.drag_icon = exports.top_left_arrow = exports.nw_arrow = exports.se_arrow = exports.bottom_right_arrow = exports.trashcan_icon = exports.horizontal_drag_icon = exports.vertical_drag_icon = void 0;
exports.vertical_drag_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M21 11H3V9H21V11M21 13H3V15H21V13Z\" />\n</svg>";
exports.horizontal_drag_icon = "<svg style=\"width:24px;height:24px;max-height:100%;\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M11 21H9V3H11V21M15 3H13V21H15V3Z\" />\n</svg>";
exports.trashcan_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" />\n</svg>";
exports.bottom_right_arrow = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z\" />\n</svg>";
exports.se_arrow = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z\" />\n</svg>";
exports.nw_arrow = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z\" />\n</svg>";
exports.top_left_arrow = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z\" />\n</svg>";
exports.drag_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z\" />\n</svg>";
exports.plus_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z\" />\n</svg>";
exports.minus_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M19,13H5V11H19V13Z\" />\n</svg>";
exports.settings_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z\" />\n</svg>";
exports.instructions_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z\" />\n</svg>";
exports.elements_icon = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n<path fill=\"currentColor\" d=\"M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z\" />\n</svg>";
exports.browser_header_html = "<div id=\"buttons-container\">\n  <div></div>\n  <div></div>\n  <div></div>\n</div>\n<div id=\"url-box\">\n  <span> www.myShinyApp.com </span>\n</div>";
},{}],"make-css_unit_input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_css_unit_input = void 0;

var utils_icons_1 = require("./utils-icons");

var make_elements_1 = require("./make-elements");

var utils_misc_1 = require("./utils-misc"); // =============================================================================
// From here on are a series of general purpose helper functions not
// specifically related to the app and its state
// Input with value text box on left and unit selector dropdown on right
// Used to make valid css sizes


function make_css_unit_input(_a) {
  var parent_el = _a.parent_el,
      _b = _a.selector,
      selector = _b === void 0 ? "" : _b,
      _c = _a.start_val,
      start_val = _c === void 0 ? 1 : _c,
      _d = _a.start_unit,
      start_unit = _d === void 0 ? "fr" : _d,
      _e = _a.on_change,
      on_change = _e === void 0 ? function (x) {
    return console.log("css unit change", x);
  } : _e,
      _f = _a.on_drag,
      on_drag = _f === void 0 ? on_change : _f,
      _g = _a.allowed_units,
      allowed_units = _g === void 0 ? ["fr", "px", "rem"] : _g,
      _h = _a.form_styles,
      form_styles = _h === void 0 ? {} : _h,
      _j = _a.drag_dir,
      drag_dir = _j === void 0 ? "none" : _j;
  var allow_drag = drag_dir !== "none";
  var form = make_elements_1.make_el(parent_el, "form" + selector + ".css-unit-input", {
    styles: form_styles,
    event_listener: [{
      event: "change",
      func: on_update
    }, {
      event: "submit",
      func: function func(e) {
        // Needed to stop pressing enter causing page to refresh
        e.preventDefault();
      }
    }]
  });
  var value_input = make_elements_1.make_el(form, "input.css-unit-input-value", {
    props: {
      type: "number",
      min: 0,
      value: start_val,
      step: 1,
      "aria-live": "polite"
    }
  });
  var unit_selector = make_elements_1.make_el(form, "select.css-unit-input-select", {
    props: {
      name: "units"
    }
  });
  var resizer = make_elements_1.make_el(form, "div.css-unit-input-dragger", {
    innerHTML: drag_dir === "y" ? utils_icons_1.vertical_drag_icon : utils_icons_1.horizontal_drag_icon
  }); // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.

  make_elements_1.make_el(resizer, "div.css-unit-input-drag-detector", {
    props: {
      draggable: true
    },
    event_listener: [{
      event: "dragstart",
      func: function func(event) {
        this.dataset.baseline = value_input.value;
        this.dataset.start = event[drag_dir];
      }
    }, {
      event: "drag",
      func: function func(event) {
        var drag_pos = event[drag_dir]; // At the end of the drag we get a drag event with 0 values that throws stuff off

        if (drag_pos === 0) return;
        var new_value = Math.max(0, +this.dataset.baseline + (event[drag_dir] - this.dataset.start));
        value_input.value = new_value.toString();
        on_drag();
      }
    }, {
      event: "dragend",
      func: function func(event) {
        on_change(current_value());
      }
    }]
  });
  allowed_units.forEach(function (unit_type) {
    var unit_option = make_elements_1.make_el(unit_selector, "option." + unit_type, {
      props: {
        value: unit_type
      },
      innerHTML: unit_type
    });

    if (unit_type === start_unit) {
      unit_option.selected = true;
    }
  });

  function current_value() {
    return "" + value_input.value + unit_selector.value;
  }

  function on_update() {
    var val = current_value();
    update_value(val);
    on_change(val);
  }

  function update_value(new_value) {
    value_input.value = utils_misc_1.get_css_value(new_value).toString();
    var new_unit = utils_misc_1.get_css_unit(new_value);

    for (var _i = 0, _a = unit_selector.children; _i < _a.length; _i++) {
      var opt = _a[_i];
      opt.selected = opt.value === new_unit;
    }

    if (new_unit === "px" && allow_drag) {
      form.classList.add("with-drag");
    } else {
      form.classList.remove("with-drag");
    }
  }

  update_value("" + start_val + start_unit);
  return {
    form: form,
    current_value: current_value,
    update_value: update_value
  };
}

exports.make_css_unit_input = make_css_unit_input;
},{"./utils-icons":"utils-icons.ts","./make-elements":"make-elements.ts","./utils-misc":"utils-misc.ts"}],"utils-cssom.ts":[function(require,module,exports) {
"use strict"; // Assumes that only one stylesheet has rules for the given selector and
// that only one rule targeting that selector alone is defined
// If target_property is provided the function will chose the sheet that defines

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find_selector_by_property = exports.find_rules_by_selector = void 0;

var utils_misc_1 = require("./utils-misc"); // Combines every style rule contained in all the style sheets on page into
// a big array. Easier than navigating the nested structure of sheets => rules


function get_all_style_rules() {
  return utils_misc_1.flatten(__spreadArray([], document.styleSheets).map(function (x) {
    return __spreadArray([], x.cssRules);
  }));
} // that given property (if multiple exist)


function find_rules_by_selector(selector_text, target_property) {
  // Find the stylesheet which contains the containers styles
  var defines_ruleset = function defines_ruleset(selector_text) {
    return function (rule) {
      return rule.selectorText === selector_text;
    };
  };

  var all_sheets = __spreadArray([], document.styleSheets);

  var rules_for_selector = all_sheets.filter(function (style_sheet) {
    return __spreadArray([], style_sheet.rules).find(defines_ruleset(selector_text));
  }).map(function (x) {
    return __spreadArray([], x.cssRules).find(defines_ruleset(selector_text)).style;
  }).filter(function (x) {
    return target_property ? x[target_property] : true;
  });
  var n_sheets = rules_for_selector.length;

  if (n_sheets === 0) {
    // No rules declared so make a new rule and append to last style sheet
    var last_sheet = all_sheets[all_sheets.length - 1];
    last_sheet.insertRule(selector_text + " { }", 0);
    return __spreadArray([], last_sheet.cssRules).find(defines_ruleset(selector_text)).style;
  } else {
    // Take the latest style sheet and (hope) that's the correct one
    return rules_for_selector[n_sheets - 1];
  }
}

exports.find_rules_by_selector = find_rules_by_selector;

function find_selector_by_property(property_id, property_value) {
  var all_styles = get_all_style_rules();
  var first_rule_w_prop = all_styles.filter(function (rule) {
    return rule.style && rule.style[property_id] == property_value;
  }).find(function (rule) {
    return document.querySelector(rule.selectorText);
  });
  var rule_exists = Boolean(first_rule_w_prop);
  return {
    rule_exists: rule_exists,
    selector: rule_exists ? first_rule_w_prop.selectorText : ""
  };
}

exports.find_selector_by_property = find_selector_by_property;
},{"./utils-misc":"utils-misc.ts"}],"make-incrementer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_incrementer = void 0;

var utils_icons_1 = require("./utils-icons");

var make_elements_1 = require("./make-elements"); // Builds an up down button and value input


function make_incrementer(_a) {
  var parent_el = _a.parent_el,
      _b = _a.start_val,
      start_val = _b === void 0 ? 2 : _b,
      _c = _a.id,
      id = _c === void 0 ? "incrementer" : _c,
      _d = _a.label,
      label = _d === void 0 ? "my incrementer" : _d,
      _e = _a.on_increment,
      on_increment = _e === void 0 ? function (x) {
    return console.log(x);
  } : _e;
  var current_value = start_val;
  var plus_minus_div = make_elements_1.make_el(parent_el, "div#" + id + "_incrementer.plus-minus-input.settings-grid", {
    innerHTML: "<span class = \"input-label\">" + label + "</span>"
  });
  var inputs_div = make_elements_1.make_el(plus_minus_div, "div.plus-minus-input-controls");
  var minus_btn = make_elements_1.make_el(inputs_div, "button.plus-minus-input-btn.minus", {
    props: {
      name: "plus button"
    },
    innerHTML: utils_icons_1.minus_icon,
    event_listener: {
      event: "click",
      func: increment_counter(-1)
    }
  });
  var value_label = make_elements_1.make_el(inputs_div, "span.plus-minus-input-value", {
    innerHTML: start_val.toString()
  });
  make_elements_1.make_el(inputs_div, "button.plus-minus-input-btn.plus", {
    props: {
      name: "minus button"
    },
    innerHTML: utils_icons_1.plus_icon,
    event_listener: {
      event: "click",
      func: increment_counter(1)
    }
  });

  function update_value(new_value) {
    // Dont waste time if value hasn't changed
    if (current_value == new_value) return;
    value_label.innerHTML = new_value.toString();

    if (new_value === 1) {
      minus_btn.classList.add("disabled");
    } else {
      minus_btn.classList.remove("disabled");
    }

    current_value = new_value;
  }

  function increment_counter(amount) {
    return function () {
      var new_value = +value_label.innerHTML + amount;
      update_value(new_value);
      on_increment(new_value);
    };
  }

  return update_value;
}

exports.make_incrementer = make_incrementer;
},{"./utils-icons":"utils-icons.ts","./make-elements":"make-elements.ts"}],"make-toggle_switch.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_toggle_switch = void 0;

var make_elements_1 = require("./make-elements");

function make_toggle_switch(off_text, on_text, on_change) {
  var container = make_elements_1.Block_El("div.toggle-switch");
  make_elements_1.make_el(container, "span.off-text", {
    innerHTML: off_text
  });
  var label = make_elements_1.make_el(container, "label.switch");
  make_elements_1.make_el(container, "span.on-text", {
    innerHTML: on_text
  });
  make_elements_1.make_el(label, "input", {
    props: {
      type: "checkbox"
    },
    event_listener: {
      event: "change",
      func: function func(event) {
        on_change(event.target.checked);
      }
    }
  });
  make_elements_1.make_el(label, "span.slider");

  var _a = make_elements_1.Shadow_El("div.toggle-switch", container),
      el = _a.el,
      style_sheet = _a.style_sheet; // Add styles


  style_sheet.innerHTML = toggle_styles;
  return el;
}

exports.make_toggle_switch = make_toggle_switch;
var toggle_styles = "\ndiv.toggle-switch {\n  display: inline-grid;\n  grid-template-columns: 1fr auto 1fr;\n  grid-gap: 3px;\n  width: 180px;\n  align-items: center;\n  justify-items: center;\n  padding-left: 4px;\n  padding-right: 4px;\n}\n\n.toggle-switch > span {\n  font-size: 1.2rem;\n}\n\n.toggle-switch > .off-text {\n  text-align: end;\n}\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 34px;\n  background-color: #ccc;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  border-radius: 50%;\n  background-color: white;\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n";
},{"./make-elements":"make-elements.ts"}],"wrap_in_grided.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap_in_grided = void 0;

var utils_icons_1 = require("./utils-icons");

var make_elements_1 = require("./make-elements");

var make_incrementer_1 = require("./make-incrementer");

var make_css_unit_input_1 = require("./make-css_unit_input");

var make_toggle_switch_1 = require("./make-toggle_switch"); // Takes a grid element and wraps it in the grided ui. Also returns some useful
// information such as if the element passed was empty and if not, the children
// that it contains so they can be overlayed with editable element boxes 


function wrap_in_grided(grid_el, update_grid, setShinyInput) {
  var grid_is_filled = grid_el.hasChildNodes();
  var buttons = [action_button("get_code", "Get layout code"), action_button("update_code", "Update app")];

  if (grid_is_filled) {
    buttons.push(make_toggle_switch_1.make_toggle_switch("Edit layout", "Interact mode", toggle_interaction_mode));
  }

  var settings_panel = make_elements_1.Block_El("div.card-body");
  var grided_ui = make_elements_1.Block_El("div#grided__holder", make_elements_1.Block_El("div#grided__header", make_elements_1.Text_El("h2", "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"), make_elements_1.Block_El.apply(void 0, __spreadArray(["div.code_btns"], buttons))), make_elements_1.Block_El("div#grided__settings", make_elements_1.Text_El("h3", utils_icons_1.settings_icon + " Settings"), settings_panel), make_elements_1.Block_El("div#grided__instructions", make_elements_1.Text_El("h3", utils_icons_1.instructions_icon + " Instructions"), make_elements_1.Text_El("div.card-body", "\n      <strong>Add an element:</strong>\n      <ul>\n        <li>Click and drag over the grid to define a region</li>\n        <li>Enter id of element in popup</li>\n      </ul>\n      <strong>Edit an element:</strong>\n      <ul>\n        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>\n      </ul>\n      <strong>Remove an element:</strong>\n      <ul>\n        <li>Find element entry in \"Added elements\" panel and click the " + utils_icons_1.trashcan_icon + " icon</li>\n      </ul>")), make_elements_1.Block_El("div#grided__elements", make_elements_1.Text_El("h3", utils_icons_1.elements_icon + " Added elements"), make_elements_1.Block_El("div.card-body", make_elements_1.Block_El("div#added_elements"))), make_elements_1.Block_El("div#grided__editor", make_elements_1.Block_El("div#editor-wrapper", make_elements_1.Text_El("div#editor-browser-header", utils_icons_1.browser_header_html), make_elements_1.Block_El("div#editor-app-window", grid_el)))); // Make grided UI direct child of the body

  document.querySelector("body").appendChild(grided_ui); // Setup some basic styles for the container to make sure it fits into the
  // grided interface properly.

  grid_el.style.height = "100%";
  grid_el.style.width = "100%";
  grid_el.style.display = "grid"; // Sometimes RMD styles will put a max-width of some amount which can mess
  // stuff up on large screens. The tradeoff is that the app may appear wider
  // than it eventually is. I think it's worth it.

  grid_el.style.maxWidth = "100%";
  var grid_settings = {
    num_rows: make_incrementer_1.make_incrementer({
      parent_el: settings_panel,
      id: "num_rows",
      start_val: 2,
      label: "Number of rows",
      on_increment: function on_increment(x) {
        return update_num_rows_or_cols("rows", x);
      }
    }),
    num_cols: make_incrementer_1.make_incrementer({
      parent_el: settings_panel,
      id: "num_cols",
      start_val: 2,
      label: "Number of cols",
      on_increment: function on_increment(x) {
        return update_num_rows_or_cols("cols", x);
      }
    }),
    gap: make_css_unit_input_1.make_css_unit_input({
      parent_el: make_elements_1.make_el(settings_panel, "div#gap_size_chooser.plus_minus_input.settings-grid", {
        innerHTML: "<span class = \"input-label\">Panel gap size</span>"
      }),
      selector: "#gap_size_chooser",
      on_change: function on_change(x) {
        return update_grid({
          gap: x
        });
      },
      allowed_units: ["px", "rem"]
    })
  };

  function update_num_rows_or_cols(dir, new_count) {
    var _a;

    var current_vals = grid_el.style["gridTemplate" + (dir === "rows" ? "Rows" : "Columns")].split(" ");

    if (new_count > current_vals.length) {
      current_vals.push("1fr");
    } else if (new_count < current_vals.length) {
      current_vals.pop();
    } else {// No change, shouldn't happen but maybe...
    }

    update_grid((_a = {}, _a[dir] = current_vals, _a));
  }

  function toggle_interaction_mode(interact_is_on) {
    __spreadArray(__spreadArray(__spreadArray([], grid_el.querySelectorAll(".added-element")), grid_el.querySelectorAll(".grid-cell")), [settings_panel, grided_ui.querySelector("#added_elements"), grided_ui.querySelector("#drag_canvas")]).forEach(function (el) {
      if (interact_is_on) {
        el.classList.add("disabled");
      } else {
        el.classList.remove("disabled");
      }
    });
  }

  function action_button(id, label) {
    var button_el = make_elements_1.Text_El("button#" + id, label);
    button_el.addEventListener("click", function (event) {
      setShinyInput(id, 1, true);
    });
    return button_el;
  }

  var existing_children = __spreadArray([], grid_el.children).filter(function (node) {
    var bbox = node.getBoundingClientRect(); // Only keep visible elements. This will (hopefully) filter out and
    // script or style tags that find their way into the grid container

    return bbox.width !== 0 && bbox.height !== 0;
  });

  return {
    settings_panel: settings_panel,
    grid_settings: grid_settings,
    grid_is_filled: grid_is_filled,
    existing_children: existing_children
  };
}

exports.wrap_in_grided = wrap_in_grided;
},{"./utils-icons":"utils-icons.ts","./make-elements":"make-elements.ts","./make-incrementer":"make-incrementer.ts","./make-css_unit_input":"make-css_unit_input.ts","./make-toggle_switch":"make-toggle_switch.ts"}],"utils-shiny.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send_elements_to_shiny = exports.send_grid_sizing_to_shiny = exports.add_shiny_listener = exports.setShinyInput = void 0;

var index_1 = require("./index");

var utils_grid_1 = require("./utils-grid"); // These are functions for communicating with Shiny. They are all optional
// chained so they won't spit errors if Shiny isn't connected or initialized
// yet.


function setShinyInput(input_id, input_value, is_event) {
  var _a;

  if (is_event === void 0) {
    is_event = false;
  } // Sent input value to shiny but only if it's initialized


  (_a = index_1.Shiny === null || index_1.Shiny === void 0 ? void 0 : index_1.Shiny.setInputValue) === null || _a === void 0 ? void 0 : _a.call(index_1.Shiny, input_id, input_value, is_event ? {
    priority: "event"
  } : {});
}

exports.setShinyInput = setShinyInput;

function add_shiny_listener(event_id, callback_func) {
  index_1.Shiny === null || index_1.Shiny === void 0 ? void 0 : index_1.Shiny.addCustomMessageHandler(event_id, callback_func);
}

exports.add_shiny_listener = add_shiny_listener;

function send_grid_sizing_to_shiny(grid_styles) {
  setShinyInput("grid_sizing", {
    rows: grid_styles.gridTemplateRows.split(" "),
    cols: grid_styles.gridTemplateColumns.split(" "),
    gap: utils_grid_1.get_gap_size(grid_styles)
  });
}

exports.send_grid_sizing_to_shiny = send_grid_sizing_to_shiny;

function send_elements_to_shiny(elements) {
  var elements_by_id = {};
  elements.forEach(function (el) {
    elements_by_id[el.id] = el;
  });
  setShinyInput("elements", elements_by_id);
}

exports.send_elements_to_shiny = send_elements_to_shiny;
},{"./index":"index.ts","./utils-grid":"utils-grid.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = this && this.__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) {
    to[j] = from[i];
  }

  return to;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shiny = void 0; // JS entry point

var make_elements_1 = require("./make-elements");

var make_focused_modal_1 = require("./make-focused_modal");

var make_css_unit_input_1 = require("./make-css_unit_input");

var utils_misc_1 = require("./utils-misc");

var utils_grid_1 = require("./utils-grid");

var utils_icons_1 = require("./utils-icons");

var utils_cssom_1 = require("./utils-cssom");

var wrap_in_grided_1 = require("./wrap_in_grided");

var utils_shiny_1 = require("./utils-shiny");

var utils_grid_2 = require("./utils-grid");

exports.Shiny = window.Shiny;
var debug_messages = true;

window.onload = function () {
  // Keep track of the grid controls here. Tradeoff of a global variable
  // feels worth it for direct access to the values without doing a dom query
  var grid_controls = {
    rows: [],
    cols: []
  }; // All the currently existing cells making up the grid

  var current_cells = []; // Do we already have a div with id grid_page in our app? Aka the grided UI
  // has been already added?

  var grid_layout_rule = utils_cssom_1.find_selector_by_property("display", "grid");
  var grid_container_selector = grid_layout_rule.rule_exists ? grid_layout_rule.selector : "#grid_page"; // This holds the grid element dom node. Gets filled in the onload callback
  // I am using a global variable here because we query inside this so much that
  // it felt silly to regrab it every time as it never moves.

  var grid_container = grid_layout_rule.rule_exists ? document.querySelector(grid_container_selector) : make_elements_1.Block_El("div#grid_page");

  var _a = wrap_in_grided_1.wrap_in_grided(grid_container, update_grid, utils_shiny_1.setShinyInput),
      grid_settings = _a.grid_settings,
      grid_is_filled = _a.grid_is_filled,
      existing_children = _a.existing_children;

  var app_mode = grid_is_filled ? "ShinyExisting" : exports.Shiny ? "ShinyNew" : "ClientSide"; // Only set a default gap sizing if it isn't already provided

  if (app_mode !== "ShinyExisting") {
    utils_grid_1.set_gap_size(grid_container.style, "1rem");
    grid_container.style.padding = "1rem";
  }

  utils_shiny_1.add_shiny_listener("shiny-loaded", function (event) {
    if (debug_messages) console.log("connected to shiny"); // Send elements to Shiny so app is aware of what it's working with

    utils_shiny_1.send_elements_to_shiny(current_elements());
    utils_shiny_1.send_grid_sizing_to_shiny(grid_container.style);
  });

  if (app_mode === "ShinyExisting") {
    // Container styles are in this object
    var grid_container_stylesheet = utils_cssom_1.find_rules_by_selector(grid_container_selector, "gridTemplateColumns");
    var current_rows = utils_grid_2.get_rows(grid_container);
    var current_cols = utils_grid_2.get_cols(grid_container);
    var current_gap = utils_grid_1.get_gap_size(grid_container_stylesheet); // If grided is running on an existing app, we need to parse the children and
    // add them as elements;

    existing_children.forEach(function (el) {
      add_element(grid_container, {
        id: el.id,
        grid_pos: utils_grid_1.get_pos_on_grid(el),
        existing_element: el
      });
    }); // Make sure grid matches the one the app is working with

    update_grid({
      rows: current_rows,
      cols: current_cols,
      gap: current_gap,
      force: true
    }); // Make grid cells transparent so the app is seen beneath them

    utils_cssom_1.find_rules_by_selector(".grid-cell").background = "none";
  } else if (app_mode === "ShinyNew") {
    utils_shiny_1.add_shiny_listener("update-grid", update_grid);
    utils_shiny_1.add_shiny_listener("add-elements", function (elements_to_add) {
      elements_to_add.forEach(function (el) {
        add_element(grid_container, {
          id: el.id,
          grid_pos: el
        });
      });
    });
  } else {
    // If in pure-client-side mode we need to provide a default grid and also wireup the code button
    update_grid({
      rows: ["1fr", "1fr"],
      cols: ["1fr", "1fr"],
      gap: "1rem"
    });
    document.getElementById("get_code").addEventListener("click", function () {
      make_focused_modal_1.show_code("Place the following in your CSS:", utils_grid_1.gen_code_for_layout(current_elements(), grid_container.style));
    });
  }

  utils_shiny_1.add_shiny_listener("code_modal", function (code_to_show) {
    make_focused_modal_1.show_code("Paste the following code into your app to update the layout", {
      type: "R",
      code: code_to_show
    });
  });
  utils_shiny_1.add_shiny_listener("code_update_problem", function (code_to_show) {
    make_focused_modal_1.show_code("Sorry, Couldn't find your layout to update. Make sure it's in the foreground of RStudio. Here's the code to paste in case all else fails.", {
      type: "R",
      code: code_to_show
    });
  });

  function fill_grid_cells() {
    var grid_dims = {
      rows: utils_grid_2.get_rows(grid_container),
      cols: utils_grid_2.get_cols(grid_container)
    };
    var num_rows = grid_dims.rows.length;
    var num_cols = grid_dims.cols.length; // Grab currently drawn cells (if any) so we can check if we need to redraw
    // or if this was simply a column/row sizing update

    current_cells = [];
    var need_to_reset_cells = current_cells.length != num_rows * num_cols;

    if (need_to_reset_cells) {
      make_elements_1.remove_elements(grid_container.querySelectorAll(".grid-cell"));

      for (var row_i = 1; row_i <= num_rows; row_i++) {
        for (var col_i = 1; col_i <= num_cols; col_i++) {
          current_cells.push(make_elements_1.make_el(grid_container, "div.r" + row_i + ".c" + col_i + ".grid-cell", {
            data_props: {
              row: row_i,
              col: col_i
            },
            grid_pos: {
              start_row: row_i,
              start_col: col_i
            }
          }));
        }
      }

      var _loop_1 = function _loop_1(type) {
        // Get rid of old ones to start with fresh slate
        make_elements_1.remove_elements(grid_container.querySelectorAll("." + type + "-controls"));
        grid_controls[type] = grid_dims[type].map(function (size, i) {
          var _a; // The i + 1 is because grid is indexed at 1, not zero


          var grid_i = i + 1;
          return make_css_unit_input_1.make_css_unit_input({
            parent_el: grid_container,
            selector: "#control_" + type + grid_i + "." + type + "-controls",
            start_val: utils_misc_1.get_css_value(size),
            start_unit: utils_misc_1.get_css_unit(size),
            on_change: function on_change() {
              return update_grid(get_layout_from_controls());
            },
            on_drag: function on_drag() {
              return update_grid(__assign(__assign({}, get_layout_from_controls()), {
                dont_send_to_shiny: true
              }));
            },
            form_styles: (_a = {}, _a["grid" + (type === "rows" ? "Row" : "Column")] = utils_grid_1.make_template_start_end(grid_i), _a),
            drag_dir: type === "rows" ? "y" : "x"
          });
        });
      }; // Build each column and row's sizing controler


      for (var type in grid_controls) {
        _loop_1(type);
      }

      var current_selection_box_1 = make_elements_1.make_el(grid_container, "div#current_selection_box.added-element");
      var drag_canvas = make_elements_1.make_el(grid_container, "div#drag_canvas");
      drag_on_grid({
        watching_element: drag_canvas,
        grid_element: current_selection_box_1,
        drag_dir: "bottom-right",
        on_start: function on_start() {
          current_selection_box_1.style.borderColor = get_next_color();
        },
        on_end: function on_end(_a) {
          var grid = _a.grid;
          name_new_element({
            grid_pos: grid,
            selection_box: current_selection_box_1
          });
        }
      }); // Make sure any added elements sit on top by re-appending them to grid holder
      // Make sure that the drag detector sits over everything

      __spreadArray([drag_canvas], grid_container.querySelectorAll(".added-element")).forEach(function (el) {
        return grid_container.appendChild(el);
      });
    } else {}
  }

  function get_drag_extent_on_grid(selection_rect) {
    // Reset bounding box definitions so we only use current selection extent
    var sel_bounds = {
      start_col: null,
      start_row: null
    };
    current_cells.forEach(function (el) {
      // Cell is overlapped by selection box
      if (utils_misc_1.boxes_overlap(utils_misc_1.get_bounding_rect(el), selection_rect)) {
        var el_row = +el.dataset.row;
        var el_col = +el.dataset.col;
        sel_bounds.start_row = utils_misc_1.min_w_missing(sel_bounds.start_row, el_row);
        sel_bounds.end_row = utils_misc_1.max_w_missing(sel_bounds.end_row, el_row);
        sel_bounds.start_col = utils_misc_1.min_w_missing(sel_bounds.start_col, el_col);
        sel_bounds.end_col = utils_misc_1.max_w_missing(sel_bounds.end_col, el_col);
      }
    });
    return sel_bounds;
  }

  function update_grid(opts) {
    var old_num_rows = utils_grid_2.get_rows(grid_container).length;
    var old_num_cols = utils_grid_2.get_cols(grid_container).length;
    var old_gap = utils_grid_1.get_gap_size(grid_container.style);
    var new_gap = opts.gap || old_gap;
    var new_num_rows = opts.rows ? opts.rows.length : old_num_rows;
    var new_num_cols = opts.cols ? opts.cols.length : old_num_cols; // Make sure settings panel is up-to-date

    grid_settings.num_rows(new_num_rows);
    grid_settings.num_cols(new_num_cols);
    grid_settings.gap.update_value(new_gap);
    var grid_numbers_changed = old_num_rows !== new_num_rows || old_num_cols !== new_num_cols;

    if (grid_numbers_changed) {
      // Check for elements that may get dropped
      var all_els = current_elements();
      var in_danger_els_1 = [];
      var auto_removed_el_ids_1 = [];
      all_els.forEach(function (el) {
        var sits_outside_grid = el.end_row > new_num_rows || el.end_col > new_num_cols;
        var completely_outside_grid = el.start_row > new_num_rows || el.start_col > new_num_cols;

        if (completely_outside_grid) {
          auto_removed_el_ids_1.push(el.id);
        } else if (sits_outside_grid) {
          in_danger_els_1.push(el);
        }
      });
      remove_added_elements(auto_removed_el_ids_1);

      if (in_danger_els_1.length > 0) {
        var fix_els_modal_1 = make_focused_modal_1.focused_modal({
          header_text: "\n        <h2>The following elements dont fit on the new grid layout.</h2>\n        <p>Below, choose to either remove the element or to shink its bounds to the new grid sizing</p>\n        "
        });
        var radio_inputs_html = in_danger_els_1.reduce(function (radio_group, el) {
          return "\n          " + radio_group + "\n          <div class = \"radio-set-group\">\n            <div class = \"radio-set-label\"> " + el.id + " </div>\n            <div class = \"radio-set-options\">\n              <input type=\"radio\" id = \"delete_" + el.id + "\" name=\"" + el.id + "\" value=\"delete\" checked>\n              <label for=\"delete_" + el.id + "\">Delete</label>\n              <input type=\"radio\" id = \"shrink_" + el.id + "\" name=\"" + el.id + "\" value=\"shrink\">\n              <label for=\"shrink_" + el.id + "\">Shink</label>\n            </div>\n          </div>\n        ";
        }, "");
        var delete_or_edit_form = make_elements_1.make_el(fix_els_modal_1.modal, "form#delete_or_fix_list", {
          innerHTML: "<div class = \"update-action-form\"> " + radio_inputs_html + " </div>",
          event_listener: {
            event: "submit",
            func: function func() {
              var form = this;
              var to_delete = in_danger_els_1.filter(function (d) {
                return form[d.id].value === "delete";
              });
              remove_added_elements(to_delete.map(function (d) {
                return d.id;
              }));
              var to_edit = in_danger_els_1.filter(function (d) {
                return form[d.id].value === "shrink";
              });
              to_edit.forEach(function (el) {
                var el_node = grid_container.querySelector("#" + el.id);
                el_node.style.gridRow = utils_grid_1.make_template_start_end(el.start_row, Math.min(el.end_row, new_num_rows));
                el_node.style.gridColumn = utils_grid_1.make_template_start_end(el.start_col, Math.min(el.end_col, new_num_cols));
              });
              fix_els_modal_1.remove(); // Now that we've updated elements properly, we should be able to
              // just recall the function and it won't spit an error

              update_grid({
                rows: opts.rows,
                cols: opts.cols,
                gap: opts.gap
              });
            }
          }
        });
        make_elements_1.make_el(delete_or_edit_form, "input#name_submit", {
          props: {
            type: "submit"
          }
        });
        make_elements_1.make_el(fix_els_modal_1.modal, "p.notice-text", {
          innerHTML: "Note that elements residing completely in the removed row or column are automatically deleted."
        });
        return;
      }
    }

    if (opts.rows) {
      grid_container.style.gridTemplateRows = utils_grid_1.sizes_to_template_def(opts.rows);
    }

    if (opts.cols) {
      grid_container.style.gridTemplateColumns = utils_grid_1.sizes_to_template_def(opts.cols);
    }

    if (opts.gap) {
      // This sets the --grid-gap variable so that the controls that need the
      // info can use it to keep a constant distance from the grid holder
      grid_container.parentElement.style.setProperty("--grid-gap", opts.gap); // We dont use css variables in the exported css that existing apps used
      // so we need to modify both gap and padding

      utils_grid_1.set_gap_size(grid_container.style, opts.gap);
      grid_container.style.padding = opts.gap;
    }

    if (grid_numbers_changed || opts.force) {
      fill_grid_cells();
    }

    if (!opts.dont_send_to_shiny) {
      utils_shiny_1.send_grid_sizing_to_shiny(grid_container.style);
    }

    return grid_container;
  }

  function get_layout_from_controls() {
    var sizes = {};

    for (var type in grid_controls) {
      sizes[type] = grid_controls[type].map(function (unit_input) {
        return unit_input.current_value();
      });
    }

    return sizes;
  }

  function name_new_element(_a) {
    var grid_pos = _a.grid_pos,
        selection_box = _a.selection_box;
    var modal_divs = make_focused_modal_1.focused_modal({
      background_callbacks: {
        // Clicking outside of the modal will cancel the naming. Seems natural
        event: "click",
        func: reset_el_creation
      },
      modal_callbacks: {
        event: "click",
        func: function func(event) {
          // This is needed to stop clicks on modal from triggering the cancel
          // event that is attached to the background
          event.stopPropagation();
        }
      }
    });
    var modal_div = modal_divs.modal;
    make_elements_1.make_el(modal_div, "div.instructions", {
      innerHTML: "\n      <h2>Name your element:</h2>\n      <p>This name will be used to place items in your app.\n      For instance if you want to place a plot in this element,\n      this name will match the label of the plot output\n      </p>\n      "
    });
    var name_form = make_elements_1.make_el(modal_div, "form#name_form", {
      event_listener: {
        event: "submit",
        func: function func(event) {
          event.preventDefault();
          var id = this["name_input"].value.replace(/\s/g, "_");
          var element_exists = !!current_elements().find(function (el) {
            return el.id === id;
          });

          if (element_exists) {
            // Cant have duplicate ids!
            warn_about_bad_id("You already have an element with the id " + id + ", all ids need to be unique.");
            return;
          }

          if (id.match(/^[^a-zA-Z]/g)) {
            warn_about_bad_id("Valid ids need to start with a character.");
            return;
          } // Add the new element in to grid


          add_element(grid_container, {
            id: id,
            color: selection_box.style.borderColor,
            grid_pos: grid_pos
          });
          reset_el_creation();
        }
      }
    });
    make_elements_1.make_el(name_form, "input#cancel_btn", {
      props: {
        type: "button",
        value: "cancel"
      },
      event_listener: {
        event: "click",
        func: reset_el_creation
      }
    });
    make_elements_1.make_el(name_form, "input#name_input", {
      props: {
        type: "text"
      },
      event_listener: {
        // Don't leave warning message up while user is typing
        event: "input",
        func: hide_warning_msg
      }
    }).focus(); // So user can immediately type in id

    make_elements_1.make_el(name_form, "input#name_submit", {
      props: {
        type: "submit"
      }
    });

    function warn_about_bad_id(msg) {
      make_elements_1.make_el(modal_div, "span#bad_id_msg.notice-text", {
        innerHTML: msg,
        styles: {
          color: "orangered"
        }
      });
    }

    function hide_warning_msg() {
      var warn_msg = modal_div.querySelector("span#bad_id_msg");

      if (warn_msg) {
        warn_msg.remove();
      }
    }

    function reset_el_creation() {
      // All done here so get rid of the whole interface.
      modal_divs.remove(); // Remove the temporary dragged element

      selection_box.style.display = "none";
    }
  }

  function add_element(grid_container, el_props) {
    var grid_pos = el_props.grid_pos,
        _a = el_props.color,
        color = _a === void 0 ? get_next_color() : _a,
        existing_element = el_props.existing_element;
    var mirrors_existing_element = existing_element !== undefined; // If element ids were generated with the grid_container R function then
    // they have a prefix of the container name which we should remove so the
    // added elements list is not ugly looking

    var id = mirrors_existing_element ? el_props.id.replace(/^.+?__/g, "") : el_props.id;
    var element_in_grid = make_elements_1.make_el(grid_container, "div#" + id + ".el_" + id + ".added-element", {
      grid_pos: grid_pos,
      styles: {
        borderColor: color,
        position: "relative"
      }
    }); // Setup drag behavior

    ["top-left", "bottom-right", "center"].forEach(function (handle_type) {
      drag_on_grid({
        watching_element: make_elements_1.make_el(element_in_grid, "div.dragger.visible." + handle_type, {
          styles: {
            background: color
          },
          innerHTML: handle_type === "center" ? utils_icons_1.drag_icon : handle_type === "bottom-right" ? utils_icons_1.se_arrow : utils_icons_1.nw_arrow
        }),
        grid_element: element_in_grid,
        drag_dir: handle_type,
        on_drag: function on_drag(res) {
          if (mirrors_existing_element) {
            utils_grid_1.set_element_in_grid(existing_element, res.grid);
          }
        },
        on_end: function on_end() {
          utils_shiny_1.send_elements_to_shiny(current_elements());
        }
      });
    });
    var element_in_list = make_elements_1.make_el(document.querySelector("#added_elements"), "div.el_" + id + ".added-element", {
      innerHTML: id,
      styles: {
        borderColor: color
      },
      event_listener: [{
        event: "mouseover",
        func: function func() {
          this.classList.add("hovered");
          element_in_grid.classList.add("hovered");
        }
      }, {
        event: "mouseout",
        func: function func() {
          this.classList.remove("hovered");
          element_in_grid.classList.remove("hovered");
        }
      }]
    });

    if (!mirrors_existing_element) {
      // Turn of deleting if were editing an existing app
      // This means that if were in app editing mode and the user adds a new element
      // they can delete that new element but they can't delete the existing elements
      make_elements_1.make_el(element_in_list, "button.remove_el", {
        innerHTML: utils_icons_1.trashcan_icon,
        event_listener: {
          event: "click",
          func: function func() {
            remove_added_elements(id);
          }
        }
      });
    } // Let shiny know we have a new element


    utils_shiny_1.send_elements_to_shiny(current_elements());
  }

  function drag_on_grid(opts) {
    var drag_feedback_rect;
    var start_rect;
    var start_loc;
    var editor_el = document.querySelector("#grided__editor");

    opts.watching_element.onmousedown = function (event) {
      start_loc = event; // make sure dragged element is on top

      grid_container.appendChild(opts.grid_element); // If this is a new element drag there wont be a bounding box for the grid
      // element yet, so we need to make a new zero-width/height one at start
      // of the drag

      start_rect = utils_misc_1.get_bounding_rect(opts.grid_element) || {
        left: event.offsetX,
        right: event.offsetX,
        top: event.offsetY,
        bottom: event.offsetY
      };
      drag_feedback_rect = make_elements_1.make_el(grid_container.querySelector("#drag_canvas"), "div.drag-feedback-rect", {
        styles: __assign({}, bounding_rect_to_css_pos(start_rect))
      }); // We start grid position here in case user selects by simply clicking,
      // which would mean we never get to run the drag function

      update_grid_pos(opts.grid_element, start_rect);
      if (opts.on_start) opts.on_start(start_loc); // Add listener to editor so we can continue to track this drag

      editor_el.addEventListener("mousemove", drag);
      editor_el.addEventListener("mouseup", drag_end);
    };

    function update_grid_pos(element, bounding_rect) {
      var grid_extent = get_drag_extent_on_grid(bounding_rect);
      utils_grid_1.set_element_in_grid(element, grid_extent);
      return grid_extent;
    }

    function drag(event) {
      var curr_loc = event; // Sometimes the drag event gets fired with nonsense zeros

      if (curr_loc.x === 0 && curr_loc.y === 0) return;
      var new_rect = utils_misc_1.update_rect_with_delta(start_rect, {
        x: curr_loc.x - start_loc.x,
        y: curr_loc.y - start_loc.y
      }, opts.drag_dir);
      Object.assign(drag_feedback_rect.style, bounding_rect_to_css_pos(new_rect));
      var grid_extent = update_grid_pos(opts.grid_element, new_rect);
      if (opts.on_drag) opts.on_drag({
        xy: curr_loc,
        grid: grid_extent
      });
    }

    function drag_end(event) {
      var end_loc = event;
      drag_feedback_rect.remove();
      start_rect = null;
      start_loc = null;
      if (opts.on_end) opts.on_end({
        xy: end_loc,
        grid: utils_grid_1.get_pos_on_grid(opts.grid_element || this.parentElement)
      });
      editor_el.removeEventListener("mousemove", drag);
      editor_el.removeEventListener("mouseup", drag_end);
    }

    function bounding_rect_to_css_pos(rect) {
      return {
        left: rect.left + "px",
        top: rect.top + "px",
        width: rect.right - rect.left + "px",
        height: rect.bottom - rect.top + "px"
      };
    }
  }

  function current_elements() {
    var elements = [];
    grid_container.querySelectorAll(".added-element").forEach(function (el) {
      // Ignore the selection box
      if (el.id === "current_selection_box") return;
      var grid_area = el.style.gridArea.split(" / ");
      elements.push({
        id: el.id,
        start_row: +grid_area[0],
        start_col: +grid_area[1],
        // Subtract one here because the end in css is the end line, not row
        end_row: +grid_area[2] - 1,
        end_col: +grid_area[3] - 1
      });
    });
    return elements;
  } // Get the next color in our list of colors.


  function get_next_color() {
    var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#a65628", "#f781bf"];
    var all_elements = grid_container.querySelectorAll(".added-element"); // If we have more elements than colors we simply recycle

    return colors[all_elements.length % colors.length];
  } // Removes elements the user has added to the grid by id


  function remove_added_elements(ids) {
    utils_misc_1.as_array(ids).forEach(function (el_id) {
      make_elements_1.remove_elements(document.querySelectorAll("div.el_" + el_id + ".added-element"));
    });
    utils_shiny_1.send_elements_to_shiny(current_elements());
  }
}; // End of the window.onload callback
},{"./make-elements":"make-elements.ts","./make-focused_modal":"make-focused_modal.ts","./make-css_unit_input":"make-css_unit_input.ts","./utils-misc":"utils-misc.ts","./utils-grid":"utils-grid.ts","./utils-icons":"utils-icons.ts","./utils-cssom":"utils-cssom.ts","./wrap_in_grided":"wrap_in_grided.ts","./utils-shiny":"utils-shiny.ts"}],"../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52390" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map