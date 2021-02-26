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
})({"grid-helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_template_start_end = make_template_start_end;
exports.set_element_in_grid = set_element_in_grid;
exports.sizes_to_template_def = sizes_to_template_def;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Functions related to grid construction
// Builds the start/end css string for a grid-{row,column}
function make_template_start_end(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];

  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  var negative_index = start < 0; // Grid works with lines so if we want an element to end at the 4th column we
  // need to tell it to end at the (4+1)5th line, so we add one

  end = end ? +end + 1 : start + (negative_index ? -1 : 1);
  return "".concat(start, " / ").concat(end);
}

function set_element_in_grid(el, grid_bounds) {
  el.style.gridRow = make_template_start_end(grid_bounds.row);
  el.style.gridColumn = make_template_start_end(grid_bounds.col);
} // grid-template-{column,row}: ...
// Take a vector of css sizes and turn into the format for the css argument for


function sizes_to_template_def(defs) {
  return defs.reduce(function (css, curr) {
    return "".concat(css, " ").concat(curr);
  }, "");
}
},{}],"maybe_make_el.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maybe_make_el = maybe_make_el;
exports.remove_elements = remove_elements;

var _gridHelpers = require("./grid-helpers");

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
function maybe_make_el(parent, sel_txt) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      event_listener = _ref.event_listener,
      styles = _ref.styles,
      innerHTML = _ref.innerHTML,
      data_props = _ref.data_props,
      grid_rows = _ref.grid_rows,
      grid_cols = _ref.grid_cols,
      props = _ref.props;

  var get_tag_regex = /^([^#\.]+)+/g;
  var get_id_regex = /(?<=#)([^\.]+)/g;
  var get_class_regex = /(?<=\.)([^\.#]+)/g;
  var tag_type = sel_txt.match(get_tag_regex);
  var el_id = sel_txt.match(get_id_regex);
  var class_list = sel_txt.match(get_class_regex);
  var el = parent.querySelector(sel_txt);

  if (!el) {
    // Element doesn't exists so we need to make it
    el = document.createElement(tag_type);

    if (el_id) {
      el.id = el_id[0];
    }

    if (class_list) {
      class_list.forEach(function (x) {
        return el.classList.add(x);
      });
    }

    if (props) {
      Object.assign(el, props);
    }

    parent.appendChild(el);
  }

  if (event_listener) {
    var listeners = event_listener instanceof Array ? event_listener : [event_listener];
    listeners.forEach(function (listener) {
      return el["on" + listener.event] = listener.func;
    });
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
    el.style.gridRow = (0, _gridHelpers.make_template_start_end)(grid_rows);
  }

  if (grid_cols) {
    el.style.gridColumn = (0, _gridHelpers.make_template_start_end)(grid_cols);
  }

  return el;
} // Given a list of elements from a query selector, remove them all


function remove_elements(els_to_remove) {
  els_to_remove.forEach(function (e) {
    return e.remove();
  });
}
},{"./grid-helpers":"grid-helpers.js"}],"draw_browser_header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw_browser_header = draw_browser_header;

var _index = require("./index");

function draw_browser_header() {
  var header_svg = document.getElementById("editor-browser-header");

  var _header_svg$getBoundi = header_svg.getBoundingClientRect(),
      width_of_bar = _header_svg$getBoundi.width,
      height_of_bar = _header_svg$getBoundi.height; // Clear out anything that may be in the svg already


  header_svg.innerHTML = ""; // First make the buttons for closing, minimizing and maximizing window

  var button_r = height_of_bar / 4.5;

  for (var i = 1; i <= 3; i++) {
    header_svg.innerHTML += "\n    <circle cx=".concat(i * button_r * 3, "px\n            cy = 50%\n            r = ").concat(button_r, "px\n    > </circle>");
  } // Next make the browser url bar


  var url_bar_start = 4 * button_r * 3; // Bar is takes up middle 65% of header area

  var url_bar_rel_height = 0.65;
  var url_bar_height = height_of_bar * url_bar_rel_height;
  var url_bar_margin = (height_of_bar - url_bar_height) / 2;
  header_svg.innerHTML += "\n  <rect x = ".concat(url_bar_start, "px\n        y = ").concat(url_bar_margin, "px\n        width = ").concat(width_of_bar - url_bar_start - 10, "px\n        height = ").concat(height_of_bar * url_bar_rel_height, "px\n        stroke = \"black\"\n        stroke-width: 3px\n        fill = \"none\"\n        rx = ").concat(url_bar_height / 2, "px\n        ry = ").concat(url_bar_height / 2, "px\n  ></rect>");
  var url_address = _index.shiny_exists ? "www.myShinyApp.com" : "www.myGridApp.com";
  header_svg.innerHTML += "\n  <text x = ".concat(url_bar_start + 13, "px\n        y = ").concat(height_of_bar / 2, "px\n        alignment-baseline = \"central\"\n  >\n    ").concat(url_address, "\n  </text>\n");
}
},{"./index":"index.ts"}],"make_incrementer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make_incrementer = void 0;

var maybe_make_el_1 = require("./maybe_make_el"); // Builds an up down button and value input


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
  var plus_minus_div = maybe_make_el_1.maybe_make_el(parent_el, "div#" + id + "_incrementer.plus_minus_input", {
    innerHTML: "<span>" + label + "</span>"
  });
  var inputs_div = maybe_make_el_1.maybe_make_el(plus_minus_div, "div.controls");
  var minus_btn = maybe_make_el_1.maybe_make_el(inputs_div, "button.minus_btn", {
    innerHTML: "<i class=\"fa fa-minus\" aria-hidden=\"true\"></i>",
    event_listener: {
      event: "click",
      func: increment_counter(-1)
    }
  });
  var current_value = maybe_make_el_1.maybe_make_el(inputs_div, "span.value", {
    innerHTML: start_val
  });
  maybe_make_el_1.maybe_make_el(inputs_div, "button.plus_btn", {
    innerHTML: "<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>",
    event_listener: {
      event: "click",
      func: increment_counter(1)
    }
  });

  function update_value(new_value) {
    current_value.innerHTML = new_value;

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
},{"./maybe_make_el":"maybe_make_el.js"}],"focused_modal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focused_modal = focused_modal;

var _maybe_make_el = require("./maybe_make_el");

function focused_modal(_ref) {
  var background_callbacks = _ref.background_callbacks,
      modal_contents = _ref.modal_contents,
      modal_callbacks = _ref.modal_callbacks;
  var background = (0, _maybe_make_el.maybe_make_el)(document.querySelector("body"), "div.background-blurrer", {
    event_listener: background_callbacks
  });
  return {
    background: background,
    modal: (0, _maybe_make_el.maybe_make_el)(background, "div.modal", {
      innerHTML: modal_contents,
      event_listener: modal_callbacks
    }),
    remove: function remove() {
      return background.remove();
    }
  };
}
},{"./maybe_make_el":"maybe_make_el.js"}],"make_css_unit_input.ts":[function(require,module,exports) {
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
exports.make_css_unit_input = void 0;

var maybe_make_el_1 = require("./maybe_make_el");

var index_1 = require("./index");

; // =============================================================================
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
  var input_holder = maybe_make_el_1.maybe_make_el(parent_el, "div" + selector + ".input-holder.css-unit-input", {
    styles: form_styles
  });
  var form = maybe_make_el_1.maybe_make_el(input_holder, "form", {
    event_listener: {
      event: "change",
      func: on_update
    }
  });
  var value_input = maybe_make_el_1.maybe_make_el(form, "input", {
    props: {
      type: "number",
      min: 0,
      value: start_val,
      step: 1,
      "aria-live": "polite"
    },
    styles: {
      minWidth: "30px",
      width: "100%",
      maxWidth: "55px"
    }
  });
  var unit_selector = maybe_make_el_1.maybe_make_el(form, "select", {
    props: {
      name: "units"
    },
    styles: {
      minWidth: "20px",
      marginLeft: "3px"
    }
  });
  var resizer = maybe_make_el_1.maybe_make_el(input_holder, "div.css-dragger", {
    innerHTML: "<i class=\"fa fa-arrows-" + (drag_dir === "y" ? "v" : "h") + "\" aria-hidden=\"true\"></i>"
  }); // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.

  maybe_make_el_1.maybe_make_el(resizer, "div.detector", {
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
        value_input.value = new_value;
        on_change(current_value());
      }
    }]
  });
  allowed_units.forEach(function (unit_type) {
    var unit_option = maybe_make_el_1.maybe_make_el(unit_selector, "option." + unit_type, {
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
    value_input.value = index_1.get_css_value(new_value);
    var new_unit = index_1.get_css_unit(new_value);

    __spreadArray([], unit_selector.children).forEach(function (opt) {
      if (opt.value === new_unit) {
        opt.selected = true;
      } else {
        opt.selected = false;
      }
    });

    if (new_unit === "px" && allow_drag) {
      resizer.style.display = "block";
    } else {
      resizer.style.display = "none";
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
},{"./maybe_make_el":"maybe_make_el.js","./index":"index.ts"}],"index.ts":[function(require,module,exports) {
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
exports.get_css_value = exports.get_css_unit = exports.shiny_exists = void 0; // JS entry point

var maybe_make_el_1 = require("./maybe_make_el");

var draw_browser_header_1 = require("./draw_browser_header");

var make_incrementer_1 = require("./make_incrementer");

var focused_modal_1 = require("./focused_modal");

var make_css_unit_input_1 = require("./make_css_unit_input");

var grid_helpers_1 = require("./grid-helpers");

var Shiny = window.Shiny;
exports.shiny_exists = typeof Shiny !== "undefined";
;

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

  var grid_holder = document.querySelector("#grid_holder");
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
      parent_el: maybe_make_el_1.maybe_make_el(settings_panel, "div#gap_size_chooser.plus_minus_input", {
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

  if (exports.shiny_exists) {
    Shiny.addCustomMessageHandler("update-grid", function (opts) {
      update_grid(opts);
    });
    Shiny.addCustomMessageHandler("add-elements", function (elements_to_add) {
      elements_to_add.forEach(function (el) {
        add_element({
          id: el.id,
          grid_rows: [el.start_row, el.end_row],
          grid_cols: [el.start_col, el.end_col]
        });
      });
    });
    Shiny.addCustomMessageHandler("code_modal", function (code_to_show) {
      show_code("Paste the following code into your app to update the layout", code_to_show);
    });
  } else {
    // If in pure-client-side mode we need to provide a default grid and also wireup the code button
    update_grid({
      rows: ["1fr", "1fr"],
      cols: ["1fr", "1fr"],
      gap: "1rem"
    });
    document.getElementById("get_code").addEventListener("click", function () {
      var css_for_layout = current_layout_in_css();
      show_code("Place the following in your CSS:", css_for_layout);
    });
  }

  function show_code(message, code_to_show) {
    var code_modal = focused_modal_1.focused_modal({
      modal_contents: message,
      modal_callbacks: {
        event: "click",
        func: function func(event) {
          // This is needed to stop clicks on modal from triggering the cancel
          // event that is attached to the background
          event.stopPropagation();
        }
      },
      styles: {
        marginLeft: "1rem"
      },
      background_callbacks: {
        event: "click",
        func: close_modal
      }
    });
    var code_text = maybe_make_el_1.maybe_make_el(code_modal.modal, "pre#code_for_layout", {
      innerHTML: code_to_show,
      styles: {
        background: "#f3f2f2",
        padding: "0.75rem",
        borderRadius: "5px"
      }
    });
    var action_buttons = maybe_make_el_1.maybe_make_el(code_modal.modal, "div#action_buttons", {
      styles: {
        display: "flex",
        justifyContent: "space-around"
      }
    });
    maybe_make_el_1.maybe_make_el(action_buttons, "button#copy_code", {
      innerHTML: "Copy to clipboard",
      event_listener: {
        event: "click",
        func: function func() {
          code_text.select();
          document.execCommand("copy");
        }
      }
    });
    maybe_make_el_1.maybe_make_el(action_buttons, "button#close_code_model", {
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
      maybe_make_el_1.remove_elements(grid_holder.querySelectorAll(".grid-cell"));

      for (var row_i = 1; row_i <= num_rows; row_i++) {
        for (var col_i = 1; col_i <= num_cols; col_i++) {
          current_cells.push(maybe_make_el_1.maybe_make_el(grid_holder, "div.r" + row_i + ".c" + col_i + ".grid-cell", {
            data_props: {
              row: row_i,
              col: col_i
            },
            grid_rows: [row_i],
            grid_cols: [col_i]
          }));
        }
      }

      var _loop_1 = function _loop_1(type) {
        // Get rid of old ones to start with fresh slate
        maybe_make_el_1.remove_elements(grid_holder.querySelectorAll("." + type + "-controls"));
        grid_controls[type] = grid_dims[type].map(function (size, i) {
          var _a; // The i + 1 is because grid is indexed at 1, not zero


          var grid_i = i + 1;
          return make_css_unit_input_1.make_css_unit_input({
            parent_el: grid_holder,
            selector: "#control_" + type + grid_i + "." + type + "-controls",
            start_val: get_css_value(size),
            start_unit: get_css_unit(size),
            on_change: function on_change() {
              return update_grid(get_layout_from_controls());
            },
            form_styles: (_a = {}, _a["grid" + (type === "rows" ? "Row" : "Column")] = grid_helpers_1.make_template_start_end([grid_i]), _a),
            drag_dir: type === "rows" ? "y" : "x"
          });
        });
      }; // Build each column and row's sizing controler


      for (var type in grid_controls) {
        _loop_1(type);
      }

      var drag_detector = maybe_make_el_1.maybe_make_el(grid_holder, "div#drag_detector", {
        event_listener: [{
          event: "mousedown",
          func: drag_started
        }, {
          event: "mouseup",
          func: drag_ended
        }]
      }); // Adding the dragging event to the whole page means we dont lose the drag
      // the second the user's cursor goes off of the main grid div

      document.querySelector("#editor").addEventListener("mousemove", dragging);
      var current_selection_box_1 = maybe_make_el_1.maybe_make_el(grid_holder, "div#current_selection_box.added-element"); // Lets the mousemove event listener know when to do stuff

      var user_dragging_1 = false; // Drag start rel(ative) to grid editor div and positioned abs(olutely) on the whole page
      // We need the absolute position to continue calculating drag after mouse has left editor

      var drag_start_1 = {
        rel: {},
        abs: {}
      };
      var sel_bounds_1;

      function drag_started(event) {
        user_dragging_1 = true;
        drag_start_1.rel = {
          x: event.offsetX,
          y: event.offsetY
        };
        drag_start_1.abs = {
          x: event.clientX,
          y: event.clientY
        };
        current_selection_box_1.style.borderColor = get_next_color();
      }

      function dragging(event) {
        if (!user_dragging_1) return;
        var d_x = event.clientX - drag_start_1.abs.x;
        var d_y = event.clientY - drag_start_1.abs.y;
        var sel_left = drag_start_1.rel.x + (d_x < 0 ? d_x : 0);
        var sel_right = sel_left + Math.abs(d_x);
        var sel_top = drag_start_1.rel.y + (d_y < 0 ? d_y : 0);
        var sel_bottom = sel_top + Math.abs(d_y);
        var selection_rect = {
          x: [sel_left, sel_right],
          y: [sel_top, sel_bottom]
        };
        sel_bounds_1 = get_drag_extent_on_grid(selection_rect);
        current_selection_box_1.style.display = "block";
        grid_helpers_1.set_element_in_grid(current_selection_box_1, sel_bounds_1);
      }

      function drag_ended(event) {
        // Trigger naming dialog modal
        name_new_element({
          grid_rows: sel_bounds_1.row,
          grid_cols: sel_bounds_1.col,
          selection_box: current_selection_box_1
        });
        user_dragging_1 = false;
      } // Make sure any added elements sit on top by re-appending them to grid holder
      // Make sure that the drag detector sits over everything


      __spreadArray([drag_detector], grid_holder.querySelectorAll(".added-element")).forEach(function (el) {
        return grid_holder.appendChild(el);
      });
    } else {}
  }

  function get_drag_extent_on_grid(selection_rect) {
    // Reset bounding box definitions so we only use current selection extent
    var sel_bounds = {
      col: [null, null],
      row: [null, null]
    };
    current_cells.forEach(function (el) {
      // Cell is overlapped by selection box
      if (boxes_overlap(get_bounding_rect(el), selection_rect)) {
        var el_row = +el.dataset.row;
        var el_col = +el.dataset.col;
        sel_bounds.row = [min_w_missing(sel_bounds.row[0], el_row), max_w_missing(sel_bounds.row[1], el_row)];
        sel_bounds.col = [min_w_missing(sel_bounds.col[0], el_col), max_w_missing(sel_bounds.col[1], el_col)];
      }
    });
    return sel_bounds;
  }

  function update_grid(_a) {
    var rows = _a.rows,
        cols = _a.cols,
        gap = _a.gap;
    var old_num_rows = get_current_rows().length;
    var old_num_cols = get_current_cols().length;
    var old_gap = grid_holder.style.getPropertyValue("--grid-gap");
    var new_gap = gap || old_gap;
    var new_num_rows = rows ? rows.length : old_num_rows;
    var new_num_cols = cols ? cols.length : old_num_cols; // Make sure settings panel is up-to-date

    grid_settings.num_rows(new_num_rows);
    grid_settings.num_cols(new_num_cols);
    grid_settings.gap.update_value(new_gap);
    var grid_numbers_changed = old_num_rows !== new_num_rows || old_num_cols !== new_num_cols;

    if (grid_numbers_changed) {
      // Check for elements that may get dropped
      var all_els = current_elements();
      var in_danger_els_1 = [];
      var auto_removed_el_ids_1 = [];
      Object.values(all_els).forEach(function (el) {
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
          modal_contents: "\n        <h2>The following elements dont fit on the new grid layout.</h2>\n        <p>Below, choose to either remove the element or to shink its bounds to the new grid sizing</p>\n        "
        });
        var radio_inputs_html = in_danger_els_1.reduce(function (radio_group, el) {
          return "\n          " + radio_group + "\n          <div class = \"radio-set-group\">\n            <div class = \"radio-set-label\"> " + el.id + " </div>\n            <div class = \"radio-set-options\">\n              <input type=\"radio\" id = \"delete_" + el.id + "\" name=\"" + el.id + "\" value=\"delete\" checked>\n              <label for=\"delete_" + el.id + "\">Delete</label>\n              <input type=\"radio\" id = \"shrink_" + el.id + "\" name=\"" + el.id + "\" value=\"shrink\">\n              <label for=\"shrink_" + el.id + "\">Shink</label>\n            </div>\n          </div>\n        ";
        }, "");
        var delete_or_edit_form = maybe_make_el_1.maybe_make_el(fix_els_modal_1.modal, "form#delete_or_fix_list", {
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
                el_node.style.gridRow = grid_helpers_1.make_template_start_end([el.start_row, Math.min(el.end_row, new_num_rows)]);
                el_node.style.gridColumn = grid_helpers_1.make_template_start_end([el.start_col, Math.min(el.end_col, new_num_cols)]);
              });
              fix_els_modal_1.remove(); // Now that we've updated elements properly, we should be able to
              // just recall the function and it won't spit an error

              update_grid({
                rows: rows,
                cols: cols,
                gap: gap
              });
            }
          }
        });
        maybe_make_el_1.maybe_make_el(delete_or_edit_form, "input#name_submit", {
          props: {
            type: "submit"
          }
        });
        maybe_make_el_1.maybe_make_el(fix_els_modal_1.modal, "p.notice-text", {
          innerHTML: "Note that elements residing completely in the removed row or column are automatically deleted."
        });
        return;
      }
    }

    if (rows) {
      grid_holder.style.gridTemplateRows = grid_helpers_1.sizes_to_template_def(rows);
    }

    if (cols) {
      grid_holder.style.gridTemplateColumns = grid_helpers_1.sizes_to_template_def(cols);
    }

    if (gap) {
      // To give a consistant gap around everything we also add margin of same size
      grid_holder.style.setProperty("--grid-gap", gap);
    }

    if (grid_numbers_changed) fill_grid_cells();

    if (exports.shiny_exists) {
      Shiny.setInputValue("grid_sizing", {
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
    var grid_rows = _a.grid_rows,
        grid_cols = _a.grid_cols,
        selection_box = _a.selection_box;
    var modal_divs = focused_modal_1.focused_modal({
      background_callbacks: {
        // Clicking outside of the modal will cancel the naming. Seems natural
        event: "click",
        func: reset_el_creation
      },
      modal_contents: "\n    <h2>Name your element:</h2>\n    <p>This name will be used to place items in your app.\n    For instance if you want to place a plot in this element,\n    this name will match the label of the plot output\n    </p>\n    ",
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
    var name_form = maybe_make_el_1.maybe_make_el(modal_div, "form#name_form", {
      event_listener: {
        event: "submit",
        func: function func() {
          var id = this["name_input"].value.replace(/\s/g, "_");

          if (current_elements()[id]) {
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
            grid_rows: grid_rows,
            grid_cols: grid_cols
          });
          reset_el_creation();
        }
      }
    });
    maybe_make_el_1.maybe_make_el(name_form, "input#cancel_btn", {
      props: {
        type: "button",
        value: "cancel"
      },
      event_listener: {
        event: "click",
        func: reset_el_creation
      }
    });
    maybe_make_el_1.maybe_make_el(name_form, "input#name_input", {
      props: {
        type: "text"
      },
      event_listener: {
        // Don't leave warning message up while user is typing
        event: "input",
        func: hide_warning_msg
      }
    }).focus(); // So user can immediately type in id

    maybe_make_el_1.maybe_make_el(name_form, "input#name_submit", {
      props: {
        type: "submit"
      }
    });

    function warn_about_bad_id(msg) {
      maybe_make_el_1.maybe_make_el(modal_div, "span#bad_id_msg.notice-text", {
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
        grid_cols = _a.grid_cols,
        grid_rows = _a.grid_rows;
    var element_in_grid = maybe_make_el_1.maybe_make_el(grid_holder, "div#" + id + ".el_" + id + ".added-element", {
      grid_cols: grid_cols,
      grid_rows: grid_rows,
      styles: {
        borderColor: color,
        position: "relative"
      }
    });
    var drag_feedback_rect;
    var feedback_border_w = 3; // The shifting by border and padding here is hacky and probably a result
    // of me not using the right event positions

    var bounding_rect_to_pos = function bounding_rect_to_pos(_a) {
      var _b = _a.x,
          left = _b[0],
          right = _b[1],
          _c = _a.y,
          top = _c[0],
          bottom = _c[1];
      return {
        left: "calc(" + left + "px - var(--side-gaps) - " + 2 * feedback_border_w + "px)",
        top: "calc(" + top + "px - var(--side-gaps) - " + 2 * feedback_border_w + "px)",
        width: right - left + "px",
        height: bottom - top + "px"
      };
    };

    ["top-left", "bottom-right", "center"].forEach(function (handle_type) {
      // First we draw the handle that people see
      maybe_make_el_1.maybe_make_el(element_in_grid, "div.dragger.visible." + handle_type, {
        styles: {
          background: color,
          pointerEvents: "none"
        },
        innerHTML: handle_type === "center" ? "<i class=\"fas fa-arrows-alt\"></i>" : "<i class=\"fas fa-long-arrow-alt-up\"></i>"
      });
      maybe_make_el_1.maybe_make_el(element_in_grid, "div.dragger.invisible." + handle_type, {
        props: {
          draggable: true
        },
        data_props: {
          handle_type: handle_type
        },
        event_listener: [{
          event: "dragstart",
          func: function func(event) {
            // make sure dragged element is on top
            grid_holder.appendChild(this.parentElement); // Storing this info in the dom to avoid global variables
            // The speed tradeoffs of the tiny json serialization are worth it imo

            var starting_bound_box = get_bounding_rect(this.parentElement);
            this.dataset.start_rect = JSON.stringify(starting_bound_box);
            this.dataset.start_loc = JSON.stringify({
              x: event.x,
              y: event.y
            });
            drag_feedback_rect = maybe_make_el_1.maybe_make_el(grid_holder.querySelector("#drag_detector"), "div.drag-feedback-rect", {
              styles: __assign({
                border: feedback_border_w + "px dashed var(--dark-gray)",
                pointerEvents: "none",
                position: "absolute"
              }, bounding_rect_to_pos(starting_bound_box))
            });
          }
        }, {
          event: "drag",
          func: function func(event) {
            // Sometimes the drag event gets fired with nonsense zeros
            if (event.x === 0 && event.y === 0) return;

            var _a = JSON.parse(this.dataset.start_loc),
                start_x = _a.x,
                start_y = _a.y;

            var x_delta = event.x - start_x;
            var y_delta = event.y - start_y;
            var new_rect = JSON.parse(this.dataset.start_rect); // The bounding here means that we dont let the user drag the box "inside-out"

            if (this.dataset.handle_type === "top-left") {
              new_rect.x[0] = Math.min(new_rect.x[0] + x_delta, new_rect.x[1]);
              new_rect.y[0] = Math.min(new_rect.y[0] + y_delta, new_rect.y[1]);
            } else if (this.dataset.handle_type === "bottom-right") {
              new_rect.x[1] = Math.max(new_rect.x[1] + x_delta, new_rect.x[0]);
              new_rect.y[1] = Math.max(new_rect.y[1] + y_delta, new_rect.y[0]);
            } else {
              // Just move the box
              new_rect.x[0] += x_delta;
              new_rect.y[0] += y_delta;
              new_rect.x[1] += x_delta;
              new_rect.y[1] += y_delta;
            }

            Object.assign(drag_feedback_rect.style, bounding_rect_to_pos(new_rect));
            var grid_extent = get_drag_extent_on_grid(new_rect);
            grid_helpers_1.set_element_in_grid(this.parentElement, grid_extent);
          }
        }, {
          event: "dragend",
          func: function func(event) {
            drag_feedback_rect.remove();
          }
        }]
      });
    });
    var element_in_list = maybe_make_el_1.maybe_make_el(document.querySelector("#added_elements"), "div.el_" + id + ".added-element", {
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
    maybe_make_el_1.maybe_make_el(element_in_list, "button.remove_el", {
      innerHTML: "<i class=\"fa fa-trash\" aria-hidden=\"true\"></i>",
      event_listener: {
        event: "click",
        func: function func() {
          remove_added_elements(id);
        }
      }
    }); // Let shiny know we have a new element

    send_elements_to_shiny();
  }

  function current_elements() {
    var all_elements = grid_holder.querySelectorAll(".added-element");
    var element_info = {};
    all_elements.forEach(function (el) {
      // Ignore the selection box
      if (el.id === "current_selection_box") return;
      var grid_area = el.style.gridArea.split(" / ");
      element_info[el.id] = {
        id: el.id,
        start_row: +grid_area[0],
        start_col: +grid_area[1],
        // Subtract one here because the end in css is the end line, not row
        end_row: +grid_area[2] - 1,
        end_col: +grid_area[3] - 1
      };
    });
    return element_info;
  }

  function send_elements_to_shiny() {
    if (exports.shiny_exists) {
      Shiny.setInputValue("elements", current_elements());
    }
  }

  function current_layout_in_css() {
    var container_selector = "#container";
    var elements_defs = Object.values(current_elements()).reduce(function (el_css, el) {
      return el_css + "\n\n" + container_selector + " #" + el.id + " {\n  grid-column: " + grid_helpers_1.make_template_start_end([el.start_col, el.end_col]) + ";\n  grid-row: " + grid_helpers_1.make_template_start_end([el.start_row, el.end_row]) + ";\n}\n";
    }, "");
    return container_selector + " {\n  display: grid;\n  grid-template-columns: " + grid_holder.style.gridTemplateColumns + ";\n  grid-template-rows: " + grid_holder.style.gridTemplateRows + ";\n  grid-gap: " + grid_holder.style.getPropertyValue("--grid-gap") + "\n}\n" + elements_defs;
  }

  function get_current_rows() {
    return grid_holder.style.gridTemplateRows.split(" ");
  }

  function get_current_cols() {
    return grid_holder.style.gridTemplateColumns.split(" ");
  } // Get the next color in our list of colors.


  function get_next_color() {
    var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf"];
    var all_elements = grid_holder.querySelectorAll(".added-element"); // If we have more elements than colors we simply recycle

    return colors[all_elements.length % colors.length];
  } // Removes elements the user has added to the grid by id


  function remove_added_elements(ids) {
    var ids_to_remove = ids instanceof Array ? ids : [ids];
    ids_to_remove.forEach(function (el_id) {
      maybe_make_el_1.remove_elements(document.querySelectorAll("div.el_" + el_id + ".added-element"));
    });
    send_elements_to_shiny();
  }
}; // End of the window.onload callback
// Passing an undefined value to a compare like min or max will always give undefined
// These functions let you default to the second option in the case the first is falsy


function compare_w_missing(compare_fn, maybe_a, b) {
  return maybe_a ? compare_fn(maybe_a, b) : b;
}

function min_w_missing(maybe_a, b) {
  return compare_w_missing(Math.min, maybe_a, b);
}

function max_w_missing(maybe_a, b) {
  return compare_w_missing(Math.max, maybe_a, b);
} // Produce bounding rectangle relative to parent of any element


function get_bounding_rect(_a) {
  var top = _a.offsetTop,
      left = _a.offsetLeft,
      height = _a.offsetHeight,
      width = _a.offsetWidth;
  return {
    x: [left, left + width],
    y: [top, top + height]
  };
}

function boxes_overlap(box_a, box_b) {
  var horizontal_overlap = intervals_overlap(box_a.x, box_b.x);
  var vertical_overlap = intervals_overlap(box_a.y, box_b.y);
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

function get_css_unit(css_size) {
  return css_size.match(/[^ \d | \.]+$/g)[0] || "px";
}

exports.get_css_unit = get_css_unit;

function get_css_value(css_size) {
  return +css_size.match(/^[\d | \.]+/g);
}

exports.get_css_value = get_css_value;

window.onresize = function () {
  draw_browser_header_1.draw_browser_header();
};
},{"./maybe_make_el":"maybe_make_el.js","./draw_browser_header":"draw_browser_header.js","./make_incrementer":"make_incrementer.ts","./focused_modal":"focused_modal.js","./make_css_unit_input":"make_css_unit_input.ts","./grid-helpers":"grid-helpers.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52252" + '/');

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
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/www.77de5100.js.map