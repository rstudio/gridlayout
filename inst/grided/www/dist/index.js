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
})({"misc-helpers.ts":[function(require,module,exports) {
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
exports.get_css_value = exports.get_css_unit = exports.update_rect_with_delta = exports.boxes_overlap = exports.get_bounding_rect = exports.max_w_missing = exports.min_w_missing = exports.compare_w_missing = exports.as_array = exports.concat_sp = exports.concat_nl = exports.concat = exports.sizes_to_template_def = exports.set_element_in_grid = exports.make_template_start_end = exports.Drag_Type = void 0;
var Drag_Type;

(function (Drag_Type) {
  Drag_Type["top_left"] = "top-left";
  Drag_Type["bottom_right"] = "bottom-right";
  Drag_Type["center"] = "center";
})(Drag_Type = exports.Drag_Type || (exports.Drag_Type = {})); // Builds the start/end css string for a grid-{row,column}


function make_template_start_end(start, end) {
  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  var negative_index = start < 0; // Grid works with lines so if we want an element to end at the 4th column we
  // need to tell it to end at the (4+1)5th line, so we add one

  end = end ? end + 1 : start + (negative_index ? -1 : 1); // end = end ? +end + 1 : start + (negative_index ? -1 : 1);

  return start + " / " + end;
}

exports.make_template_start_end = make_template_start_end;

function set_element_in_grid(el, grid_bounds) {
  if (grid_bounds.start_row) {
    el.style.gridRow = make_template_start_end(grid_bounds.start_row, grid_bounds.end_row);
  }

  if (grid_bounds.start_col) {
    el.style.gridColumn = make_template_start_end(grid_bounds.start_col, grid_bounds.end_col);
  }

  el.style.display = "block"; // make sure we can see the element
}

exports.set_element_in_grid = set_element_in_grid; // grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for

function sizes_to_template_def(defs) {
  return concat(defs, " ");
}

exports.sizes_to_template_def = sizes_to_template_def;

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


  if (dir === Drag_Type.top_left) {
    new_rect.left = new_rect.left + delta.x;
    new_rect.top = new_rect.top + delta.y;
  } else if (dir === Drag_Type.bottom_right) {
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
},{}],"make_el.ts":[function(require,module,exports) {
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
exports.remove_elements = exports.make_el = void 0;

var misc_helpers_1 = require("./misc-helpers"); // Safari doesn't support lookbehinds for regex so we have to make it manually


function extract_id(sel_txt) {
  var id_match = sel_txt.match(/#([^\.]+)/g);
  return id_match ? id_match[0].replace("#", "") : null;
}

function extract_classes(sel_txt) {
  var class_list = sel_txt.match(/\.([^\.#]+)/g);
  return class_list ? __spreadArray([], class_list).map(function (c) {
    return c.replace("\.", "");
  }) : null;
} // This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.


function make_el(parent, sel_txt, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var tag_type = sel_txt.match(/^([^#\.]+)+/g)[0];
  var el_id = extract_id(sel_txt);
  var class_list = extract_classes(sel_txt);
  var el = parent.querySelector(sel_txt);

  if (!el) {
    // Element doesn't exists so we need to make it
    el = document.createElement(tag_type);

    if (el_id) {
      // debugger;
      el.id = el_id;
    }

    if (class_list) {
      class_list.forEach(function (x) {
        return el.classList.add(x);
      });
    }

    if (opts.props) {
      Object.assign(el, opts.props);
    }

    parent.appendChild(el);
  }

  if (opts.event_listener) {
    misc_helpers_1.as_array(opts.event_listener).forEach(function (listener) {
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
    misc_helpers_1.set_element_in_grid(el, opts.grid_pos);
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
},{"./misc-helpers":"misc-helpers.ts"}],"draw_browser_header.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw_browser_header = void 0;

var index_1 = require("./index");

function draw_browser_header() {
  var header_svg = document.getElementById("editor-browser-header");

  var _a = header_svg.getBoundingClientRect(),
      width_of_bar = _a.width,
      height_of_bar = _a.height; // Clear out anything that may be in the svg already


  header_svg.innerHTML = ""; // First make the buttons for closing, minimizing and maximizing window

  var button_r = height_of_bar / 4.5;

  for (var i = 1; i <= 3; i++) {
    header_svg.innerHTML += "\n    <circle cx=" + i * button_r * 3 + "px\n            cy = 50%\n            r = " + button_r + "px\n    > </circle>";
  } // Next make the browser url bar


  var url_bar_start = 4 * button_r * 3; // Bar is takes up middle 65% of header area

  var url_bar_rel_height = 0.65;
  var url_bar_height = height_of_bar * url_bar_rel_height;
  var url_bar_margin = (height_of_bar - url_bar_height) / 2;
  header_svg.innerHTML += "\n  <rect x = " + url_bar_start + "px\n        y = " + url_bar_margin + "px\n        width = " + (width_of_bar - url_bar_start - 10) + "px\n        height = " + height_of_bar * url_bar_rel_height + "px\n        stroke = \"black\"\n        stroke-width: 3px\n        fill = \"none\"\n        rx = " + url_bar_height / 2 + "px\n        ry = " + url_bar_height / 2 + "px\n  ></rect>";
  var url_address = index_1.Shiny ? "www.myShinyApp.com" : "www.myGridApp.com";
  header_svg.innerHTML += "\n  <text x = " + (url_bar_start + 13) + "px\n        y = " + height_of_bar / 2 + "px\n        alignment-baseline = \"central\"\n  >\n    " + url_address + "\n  </text>\n";
}

exports.draw_browser_header = draw_browser_header;
},{"./index":"index.ts"}],"icons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minus_icon = exports.plus_icon = exports.drag_icon = exports.top_left_arrow = exports.nw_arrow = exports.se_arrow = exports.bottom_right_arrow = exports.trashcan_icon = exports.horizontal_drag_icon = exports.vertical_drag_icon = void 0;
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
},{}],"make_incrementer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_incrementer = void 0;

var icons_1 = require("./icons");

var make_el_1 = require("./make_el"); // Builds an up down button and value input


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
  var plus_minus_div = make_el_1.make_el(parent_el, "div#" + id + "_incrementer.plus-minus-input.settings-grid", {
    innerHTML: "<span class = \"label\">" + label + "</span>"
  });
  var inputs_div = make_el_1.make_el(plus_minus_div, "div.plus-minus-input-controls");
  var minus_btn = make_el_1.make_el(inputs_div, "button.plus-minus-input-btn.minus", {
    props: {
      name: "plus button"
    },
    innerHTML: icons_1.minus_icon,
    event_listener: {
      event: "click",
      func: increment_counter(-1)
    }
  });
  var current_value = make_el_1.make_el(inputs_div, "span.plus-minus-input-value", {
    innerHTML: start_val.toString()
  });
  make_el_1.make_el(inputs_div, "button.plus-minus-input-btn.plus", {
    props: {
      name: "minus button"
    },
    innerHTML: icons_1.plus_icon,
    event_listener: {
      event: "click",
      func: increment_counter(1)
    }
  });

  function update_value(new_value) {
    current_value.innerHTML = new_value.toString();

    if (new_value === 1) {
      minus_btn.classList.add("disabled");
    } else {
      minus_btn.classList.remove("disabled");
    }
  }

  function increment_counter(amount) {
    return function () {
      var new_value = +current_value.innerHTML + amount;
      update_value(new_value);
      on_increment(new_value);
    };
  }

  return update_value;
}

exports.make_incrementer = make_incrementer;
},{"./icons":"icons.ts","./make_el":"make_el.ts"}],"focused_modal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focused_modal = void 0;

var make_el_1 = require("./make_el");

function focused_modal(opts) {
  var background = make_el_1.make_el(document.querySelector("body"), "div.background-blurrer", {
    event_listener: opts.background_callbacks
  });
  var modal = make_el_1.make_el(background, "div.modal", {
    event_listener: opts.modal_callbacks
  });

  if (opts.header_text) {
    make_el_1.make_el(modal, "div.modal_header", {
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
},{"./make_el":"make_el.ts"}],"make_css_unit_input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_css_unit_input = void 0;

var icons_1 = require("./icons");

var make_el_1 = require("./make_el");

var misc_helpers_1 = require("./misc-helpers"); // =============================================================================
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
      _f = _a.allowed_units,
      allowed_units = _f === void 0 ? ["fr", "px", "rem"] : _f,
      _g = _a.form_styles,
      form_styles = _g === void 0 ? {} : _g,
      _h = _a.drag_dir,
      drag_dir = _h === void 0 ? "none" : _h;
  var allow_drag = drag_dir !== "none";
  var form = make_el_1.make_el(parent_el, "form" + selector + ".css-unit-input", {
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
  var value_input = make_el_1.make_el(form, "input.css-unit-input-value", {
    props: {
      type: "number",
      min: 0,
      value: start_val,
      step: 1,
      "aria-live": "polite"
    }
  });
  var unit_selector = make_el_1.make_el(form, "select.css-unit-input-select", {
    props: {
      name: "units"
    }
  });
  var resizer = make_el_1.make_el(form, "div.css-unit-input-dragger", {
    innerHTML: drag_dir === "y" ? icons_1.vertical_drag_icon : icons_1.horizontal_drag_icon
  }); // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.

  make_el_1.make_el(resizer, "div.css-unit-input-drag-detector", {
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
        on_change(current_value());
      }
    }]
  });
  allowed_units.forEach(function (unit_type) {
    var unit_option = make_el_1.make_el(unit_selector, "option." + unit_type, {
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
    value_input.value = misc_helpers_1.get_css_value(new_value).toString();
    var new_unit = misc_helpers_1.get_css_unit(new_value);

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
},{"./icons":"icons.ts","./make_el":"make_el.ts","./misc-helpers":"misc-helpers.ts"}],"find_rules_by_selector.ts":[function(require,module,exports) {
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
exports.find_rules_by_selector = void 0; // Assumes that only one stylesheet has rules for the given selector and 
// that only one rule targeting that selector alone is defined

function find_rules_by_selector(selector_text) {
  // Find the stylesheet which contains the containers styles
  var defines_ruleset = function defines_ruleset(selector_text) {
    return function (rule) {
      return rule.selectorText === selector_text;
    };
  };

  var stylesheet_w_selector = __spreadArray([], document.styleSheets).find(function (style_sheet) {
    return __spreadArray([], style_sheet.rules).find(defines_ruleset(selector_text));
  });

  return __spreadArray([], stylesheet_w_selector.cssRules).find(defines_ruleset(selector_text)).style;
}

exports.find_rules_by_selector = find_rules_by_selector;
},{}],"index.ts":[function(require,module,exports) {
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

var make_el_1 = require("./make_el");

var draw_browser_header_1 = require("./draw_browser_header");

var make_incrementer_1 = require("./make_incrementer");

var focused_modal_1 = require("./focused_modal");

var make_css_unit_input_1 = require("./make_css_unit_input");

var misc_helpers_1 = require("./misc-helpers");

var icons_1 = require("./icons");

var find_rules_by_selector_1 = require("./find_rules_by_selector");

exports.Shiny = window.Shiny;
var App_Mode;

(function (App_Mode) {
  App_Mode[App_Mode["ShinyNew"] = 0] = "ShinyNew";
  App_Mode[App_Mode["ShinyExisting"] = 1] = "ShinyExisting";
  App_Mode[App_Mode["ClientSide"] = 2] = "ClientSide";
})(App_Mode || (App_Mode = {}));

window.onload = function () {
  draw_browser_header_1.draw_browser_header(); // Keep track of the grid controls here. Tradeoff of a global variable
  // feels worth it for direct access to the values without doing a dom query

  var grid_controls = {
    rows: [],
    cols: []
  }; // All the currently existing cells making up the grid

  var current_cells = []; // This holds the grid element dom node. Gets filled in the onload callback
  // I am using a global variable here because we query inside this so much that
  // it felt silly to regrab it every time as it never moves.

  var grid_holder = document.querySelector("#grid_page");
  var settings_panel = document.querySelector("#settings .card-body");
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
      parent_el: make_el_1.make_el(settings_panel, "div#gap_size_chooser.plus_minus_input.settings-grid", {
        innerHTML: "<span class = \"label\">Panel gap size</span>"
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

    var current_vals = dir === "rows" ? get_current_rows() : get_current_cols();

    if (new_count > current_vals.length) {
      current_vals.push("1fr");
    } else if (new_count < current_vals.length) {
      current_vals.pop();
    } else {// No change, shouldn't happen but maybe...
    }

    update_grid((_a = {}, _a[dir] = current_vals, _a));
  }

  var app_mode = grid_holder.hasChildNodes() ? App_Mode.ShinyExisting : exports.Shiny ? App_Mode.ShinyNew : App_Mode.ClientSide;

  if (app_mode === App_Mode.ShinyExisting) {
    // Container styles are in this object
    var styles_for_container = find_rules_by_selector_1.find_rules_by_selector("#grid_page");
    var current_rows = styles_for_container.gridTemplateRows.split(" ");
    var current_cols = styles_for_container.gridTemplateColumns.split(" "); // I dont know why this is just .gap and not gridGap

    var current_gap = styles_for_container.gap; // If grided is running on an existing app, we need to parse the children and
    // add them as elements;

    var children = __spreadArray([], grid_holder.children);

    var child_ids = children.map(function (el) {
      return el.id;
    });
    update_grid({
      rows: current_rows,
      cols: current_cols,
      gap: current_gap
    }); // Make grid cells transparent so the app is seen beneath them

    find_rules_by_selector_1.find_rules_by_selector(".grid-cell").background = "none";
  } else if (app_mode === App_Mode.ShinyNew) {
    exports.Shiny.addCustomMessageHandler("update-grid", function (opts) {
      update_grid(opts);
    });
    exports.Shiny.addCustomMessageHandler("add-elements", function (elements_to_add) {
      elements_to_add.forEach(function (el) {
        add_element({
          id: el.id,
          grid_pos: el
        });
      });
    });
    exports.Shiny.addCustomMessageHandler("code_modal", function (code_to_show) {
      show_code("Paste the following code into your app to update the layout", {
        type: "R",
        code: code_to_show
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
      var current_layout = gen_code_for_layout();
      show_code("Place the following in your CSS:", current_layout);
    });
  }

  function show_code(message, code_blocks) {
    var code_modal = focused_modal_1.focused_modal({
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
    misc_helpers_1.as_array(code_blocks).forEach(function (code_to_show) {
      var num_of_lines = code_to_show.code.match(/\n/g).length;
      var code_section = make_el_1.make_el(code_modal.modal, "div#" + code_to_show.type + ".code_chunk", {
        styles: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "1fr, auto",
          gridGap: "4px",
          gridTemplateAreas: misc_helpers_1.concat_nl("\"code_type copy_btn\"", "\"code_text code_text\"")
        }
      });
      var code_text;
      make_el_1.make_el(code_section, "strong", {
        innerHTML: code_to_show.type,
        styles: {
          gridArea: "code_type"
        }
      });
      make_el_1.make_el(code_section, "button#copy_code", {
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
      code_text = make_el_1.make_el(code_section, "textarea#code_for_layout", {
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
    var action_buttons = make_el_1.make_el(code_modal.modal, "div#action_buttons", {
      styles: {
        display: "flex",
        justifyContent: "space-around"
      }
    });
    make_el_1.make_el(action_buttons, "button#close_code_model", {
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

  function fill_grid_cells() {
    var grid_dims = {
      rows: get_current_rows(),
      cols: get_current_cols()
    };
    var num_rows = grid_dims.rows.length;
    var num_cols = grid_dims.cols.length; // Grab currently drawn cells (if any) so we can check if we need to redraw
    // or if this was simply a column/row sizing update

    current_cells = [];
    var need_to_reset_cells = current_cells.length != num_rows * num_cols;

    if (need_to_reset_cells) {
      make_el_1.remove_elements(grid_holder.querySelectorAll(".grid-cell"));

      for (var row_i = 1; row_i <= num_rows; row_i++) {
        for (var col_i = 1; col_i <= num_cols; col_i++) {
          current_cells.push(make_el_1.make_el(grid_holder, "div.r" + row_i + ".c" + col_i + ".grid-cell", {
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
        make_el_1.remove_elements(grid_holder.querySelectorAll("." + type + "-controls"));
        grid_controls[type] = grid_dims[type].map(function (size, i) {
          var _a; // The i + 1 is because grid is indexed at 1, not zero


          var grid_i = i + 1;
          return make_css_unit_input_1.make_css_unit_input({
            parent_el: grid_holder,
            selector: "#control_" + type + grid_i + "." + type + "-controls",
            start_val: misc_helpers_1.get_css_value(size),
            start_unit: misc_helpers_1.get_css_unit(size),
            on_change: function on_change() {
              return update_grid(get_layout_from_controls());
            },
            form_styles: (_a = {}, _a["grid" + (type === "rows" ? "Row" : "Column")] = misc_helpers_1.make_template_start_end(grid_i), _a),
            drag_dir: type === "rows" ? "y" : "x"
          });
        });
      }; // Build each column and row's sizing controler


      for (var type in grid_controls) {
        _loop_1(type);
      }

      var current_selection_box_1 = make_el_1.make_el(grid_holder, "div#current_selection_box.added-element");
      var drag_canvas = make_el_1.make_el(grid_holder, "div#drag_canvas");
      drag_on_grid({
        watching_element: drag_canvas,
        grid_element: current_selection_box_1,
        drag_dir: misc_helpers_1.Drag_Type.bottom_right,
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

      __spreadArray([drag_canvas], grid_holder.querySelectorAll(".added-element")).forEach(function (el) {
        return grid_holder.appendChild(el);
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
      if (misc_helpers_1.boxes_overlap(misc_helpers_1.get_bounding_rect(el), selection_rect)) {
        var el_row = +el.dataset.row;
        var el_col = +el.dataset.col;
        sel_bounds.start_row = misc_helpers_1.min_w_missing(sel_bounds.start_row, el_row);
        sel_bounds.end_row = misc_helpers_1.max_w_missing(sel_bounds.end_row, el_row);
        sel_bounds.start_col = misc_helpers_1.min_w_missing(sel_bounds.start_col, el_col);
        sel_bounds.end_col = misc_helpers_1.max_w_missing(sel_bounds.end_col, el_col);
      }
    });
    return sel_bounds;
  }

  function update_grid(opts) {
    var old_num_rows = get_current_rows().length;
    var old_num_cols = get_current_cols().length;
    var old_gap = grid_holder.style.getPropertyValue("--grid-gap");
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
        var fix_els_modal_1 = focused_modal_1.focused_modal({
          header_text: "\n        <h2>The following elements dont fit on the new grid layout.</h2>\n        <p>Below, choose to either remove the element or to shink its bounds to the new grid sizing</p>\n        "
        });
        var radio_inputs_html = in_danger_els_1.reduce(function (radio_group, el) {
          return "\n          " + radio_group + "\n          <div class = \"radio-set-group\">\n            <div class = \"radio-set-label\"> " + el.id + " </div>\n            <div class = \"radio-set-options\">\n              <input type=\"radio\" id = \"delete_" + el.id + "\" name=\"" + el.id + "\" value=\"delete\" checked>\n              <label for=\"delete_" + el.id + "\">Delete</label>\n              <input type=\"radio\" id = \"shrink_" + el.id + "\" name=\"" + el.id + "\" value=\"shrink\">\n              <label for=\"shrink_" + el.id + "\">Shink</label>\n            </div>\n          </div>\n        ";
        }, "");
        var delete_or_edit_form = make_el_1.make_el(fix_els_modal_1.modal, "form#delete_or_fix_list", {
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
                var el_node = grid_holder.querySelector("#" + el.id);
                el_node.style.gridRow = misc_helpers_1.make_template_start_end(el.start_row, Math.min(el.end_row, new_num_rows));
                el_node.style.gridColumn = misc_helpers_1.make_template_start_end(el.start_col, Math.min(el.end_col, new_num_cols));
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
        make_el_1.make_el(delete_or_edit_form, "input#name_submit", {
          props: {
            type: "submit"
          }
        });
        make_el_1.make_el(fix_els_modal_1.modal, "p.notice-text", {
          innerHTML: "Note that elements residing completely in the removed row or column are automatically deleted."
        });
        return;
      }
    }

    if (opts.rows) {
      grid_holder.style.gridTemplateRows = misc_helpers_1.sizes_to_template_def(opts.rows);
    }

    if (opts.cols) {
      grid_holder.style.gridTemplateColumns = misc_helpers_1.sizes_to_template_def(opts.cols);
    }

    if (opts.gap) {
      // To give a consistant gap around everything we also add margin of same size
      grid_holder.style.setProperty("--grid-gap", opts.gap);
    }

    if (grid_numbers_changed) fill_grid_cells();

    if (app_mode == App_Mode.ShinyNew) {
      exports.Shiny.setInputValue("grid_sizing", {
        rows: grid_holder.style.gridTemplateRows.split(" "),
        cols: grid_holder.style.gridTemplateColumns.split(" "),
        gap: grid_holder.style.getPropertyValue("--grid-gap")
      });
    }

    return grid_holder;
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
    var modal_divs = focused_modal_1.focused_modal({
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
    make_el_1.make_el(modal_div, "div.instructions", {
      innerHTML: "\n      <h2>Name your element:</h2>\n      <p>This name will be used to place items in your app.\n      For instance if you want to place a plot in this element,\n      this name will match the label of the plot output\n      </p>\n      "
    });
    var name_form = make_el_1.make_el(modal_div, "form#name_form", {
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


          add_element({
            id: id,
            color: selection_box.style.borderColor,
            grid_pos: grid_pos
          });
          reset_el_creation();
        }
      }
    });
    make_el_1.make_el(name_form, "input#cancel_btn", {
      props: {
        type: "button",
        value: "cancel"
      },
      event_listener: {
        event: "click",
        func: reset_el_creation
      }
    });
    make_el_1.make_el(name_form, "input#name_input", {
      props: {
        type: "text"
      },
      event_listener: {
        // Don't leave warning message up while user is typing
        event: "input",
        func: hide_warning_msg
      }
    }).focus(); // So user can immediately type in id

    make_el_1.make_el(name_form, "input#name_submit", {
      props: {
        type: "submit"
      }
    });

    function warn_about_bad_id(msg) {
      make_el_1.make_el(modal_div, "span#bad_id_msg.notice-text", {
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
  } // Adds a new element of a given id to the app. Both in the grid window
  // and the addeded elements panel


  function add_element(_a) {
    var id = _a.id,
        _b = _a.color,
        color = _b === void 0 ? get_next_color() : _b,
        grid_pos = _a.grid_pos;
    var element_in_grid = make_el_1.make_el(grid_holder, "div#" + id + ".el_" + id + ".added-element", {
      grid_pos: grid_pos,
      styles: {
        borderColor: color,
        position: "relative"
      }
    });
    [misc_helpers_1.Drag_Type.top_left, misc_helpers_1.Drag_Type.bottom_right, misc_helpers_1.Drag_Type.center].forEach(function (handle_type) {
      drag_on_grid({
        watching_element: make_el_1.make_el(element_in_grid, "div.dragger.visible." + handle_type, {
          styles: {
            background: color
          },
          innerHTML: handle_type === "center" ? icons_1.drag_icon : handle_type === misc_helpers_1.Drag_Type.bottom_right ? icons_1.se_arrow : icons_1.nw_arrow
        }),
        grid_element: element_in_grid,
        drag_dir: handle_type,
        on_end: function on_end() {
          send_elements_to_shiny();
        }
      });
    });
    var element_in_list = make_el_1.make_el(document.querySelector("#added_elements"), "div.el_" + id + ".added-element", {
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
    make_el_1.make_el(element_in_list, "button.remove_el", {
      innerHTML: icons_1.trashcan_icon,
      event_listener: {
        event: "click",
        func: function func() {
          remove_added_elements(id);
        }
      }
    }); // Let shiny know we have a new element

    send_elements_to_shiny();
  }

  function get_grid_pos(grid_el) {
    return {
      start_row: +grid_el.style.gridRowStart,
      start_col: +grid_el.style.gridColumnStart,
      end_row: +grid_el.style.gridRowEnd - 1,
      end_col: +grid_el.style.gridColumnEnd - 1
    };
  }

  function drag_on_grid(opts) {
    var drag_feedback_rect;
    var start_rect;
    var start_loc;
    var editor_el = document.querySelector("#editor");

    opts.watching_element.onmousedown = function (event) {
      start_loc = event; // make sure dragged element is on top

      grid_holder.appendChild(opts.grid_element); // If this is a new element drag there wont be a bounding box for the grid
      // element yet, so we need to make a new zero-width/height one at start
      // of the drag

      start_rect = misc_helpers_1.get_bounding_rect(opts.grid_element) || {
        left: event.offsetX,
        right: event.offsetX,
        top: event.offsetY,
        bottom: event.offsetY
      };
      drag_feedback_rect = make_el_1.make_el(grid_holder.querySelector("#drag_canvas"), "div.drag-feedback-rect", {
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
      misc_helpers_1.set_element_in_grid(element, grid_extent);
      return grid_extent;
    }

    function drag(event) {
      var curr_loc = event; // Sometimes the drag event gets fired with nonsense zeros

      if (curr_loc.x === 0 && curr_loc.y === 0) return;
      var new_rect = misc_helpers_1.update_rect_with_delta(start_rect, {
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
        grid: get_grid_pos(opts.grid_element || this.parentElement)
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
    grid_holder.querySelectorAll(".added-element").forEach(function (el) {
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
  }

  function send_elements_to_shiny() {
    if (app_mode == App_Mode.ShinyNew) {
      var elements_by_id_1 = {};
      current_elements().forEach(function (el) {
        elements_by_id_1[el.id] = el;
      });
      exports.Shiny.setInputValue("elements", elements_by_id_1);
    }
  }

  function gen_code_for_layout() {
    var container_selector = "#container";
    var elements = current_elements();
    var element_defs = elements.map(function (el) {
      return misc_helpers_1.concat_nl("#" + el.id + " {", "  grid-column: " + misc_helpers_1.make_template_start_end(el.start_col, el.end_col) + ";", "  grid-row: " + misc_helpers_1.make_template_start_end(el.start_row, el.end_row) + ";", "}");
    });
    var css_code = misc_helpers_1.concat_nl.apply(void 0, __spreadArray([container_selector + " {", "  display: grid;", "  grid-template-columns: " + grid_holder.style.gridTemplateColumns + ";", "  grid-template-rows: " + grid_holder.style.gridTemplateRows + ";", "  grid-gap: " + grid_holder.style.getPropertyValue("--grid-gap"), "}"], element_defs));
    var html_code = misc_helpers_1.concat_nl.apply(void 0, __spreadArray(__spreadArray(["<div id = " + container_selector + ">"], elements.map(function (el) {
      return misc_helpers_1.concat_nl("  <div id = \"#" + el.id + "\">", "  </div>");
    })), ["</div>"]));
    return [{
      type: "css",
      code: css_code
    }, {
      type: "html",
      code: html_code
    }];
  }

  function get_current_rows() {
    return grid_holder.style.gridTemplateRows.split(" ");
  }

  function get_current_cols() {
    return grid_holder.style.gridTemplateColumns.split(" ");
  } // Get the next color in our list of colors.


  function get_next_color() {
    var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#a65628", "#f781bf"];
    var all_elements = grid_holder.querySelectorAll(".added-element"); // If we have more elements than colors we simply recycle

    return colors[all_elements.length % colors.length];
  } // Removes elements the user has added to the grid by id


  function remove_added_elements(ids) {
    misc_helpers_1.as_array(ids).forEach(function (el_id) {
      make_el_1.remove_elements(document.querySelectorAll("div.el_" + el_id + ".added-element"));
    });
    send_elements_to_shiny();
  }
}; // End of the window.onload callback


window.onresize = function () {
  draw_browser_header_1.draw_browser_header();
};
},{"./make_el":"make_el.ts","./draw_browser_header":"draw_browser_header.ts","./make_incrementer":"make_incrementer.ts","./focused_modal":"focused_modal.ts","./make_css_unit_input":"make_css_unit_input.ts","./misc-helpers":"misc-helpers.ts","./icons":"icons.ts","./find_rules_by_selector":"find_rules_by_selector.ts"}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51341" + '/');

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
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map