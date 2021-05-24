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
exports.filler_text = exports.overlap = exports.set_class = exports.flatten = exports.update_rect_with_delta = exports.boxes_overlap = exports.get_bounding_rect = exports.max_w_missing = exports.min_w_missing = exports.compare_w_missing = exports.as_array = exports.concat_sp = exports.concat_nl = void 0;

function concat_nl() {
  var component_strings = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    component_strings[_i] = arguments[_i];
  }

  return component_strings.join("\n");
}

exports.concat_nl = concat_nl;

function concat_sp() {
  var component_strings = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    component_strings[_i] = arguments[_i];
  }

  return component_strings.join(" ");
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

function flatten(arr) {
  return [].concat.apply([], arr);
}

exports.flatten = flatten;

function set_class(elements, class_name) {
  elements.forEach(function (el) {
    el.classList.add(class_name);
  });
}

exports.set_class = set_class;

function overlap(a, b) {
  for (var i = 0; i < a.length; ++i) {
    if (b.includes(a[i])) return true;
  }

  return false;
}

exports.overlap = overlap;
exports.filler_text = "\n<div class = \"filler_text\">\n  Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \n  when an unknown printer took a galley of type and scrambled it to make a type \n  specimen book.\n</div>";
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
exports.make_start_end_for_dir = exports.grid_position_of_el = exports.shrink_element_to_layout = exports.contains_element = exports.get_gap_size = exports.gen_code_for_layout = exports.bounding_rect_to_css_pos = exports.get_drag_extent_on_grid = exports.get_pos_on_grid = exports.set_element_in_grid = exports.make_template_start_end = exports.get_cols = exports.get_rows = void 0;

var utils_misc_1 = require("./utils-misc");

function get_styles(container) {
  if (container instanceof HTMLElement) {
    return container.style;
  } else {
    return container;
  }
}

function get_rows(grid_container) {
  return get_styles(grid_container).gridTemplateRows.split(" ");
}

exports.get_rows = get_rows;

function get_cols(grid_container) {
  return get_styles(grid_container).gridTemplateColumns.split(" ");
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

exports.make_template_start_end = make_template_start_end;

function set_element_in_grid(el, grid_bounds) {
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

function get_drag_extent_on_grid(app_state, selection_rect) {
  // Reset bounding box definitions so we only use current selection extent
  var sel_bounds = {
    start_col: null,
    end_col: null,
    start_row: null,
    end_row: null
  };
  app_state.current_cells.forEach(function (el) {
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

exports.get_drag_extent_on_grid = get_drag_extent_on_grid;

function bounding_rect_to_css_pos(rect) {
  return {
    left: rect.left + "px",
    top: rect.top + "px",
    width: rect.right - rect.left + "px",
    height: rect.bottom - rect.top + "px"
  };
}

exports.bounding_rect_to_css_pos = bounding_rect_to_css_pos;

function gen_code_for_layout(elements, grid_styles) {
  var container_selector = "#container";
  var element_defs = elements.map(function (el) {
    var _a = el.grid_pos,
        start_row = _a.start_row,
        end_row = _a.end_row,
        start_col = _a.start_col,
        end_col = _a.end_col;
    return utils_misc_1.concat_nl("#" + el.id + " {", "  grid-column: " + make_template_start_end(start_col, end_col) + ";", "  grid-row: " + make_template_start_end(start_row, end_row) + ";", "}");
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

function get_gap_size(style) {
  // Older browsers give back both row-gap and column-gap in same query
  // so we need to reduce to a single value before returning
  var gap_size_vec = (typeof style === "string" ? style : style.gap).split(" ");
  return gap_size_vec[0];
}

exports.get_gap_size = get_gap_size;

function contains_element(layout, el) {
  var num_rows = layout.rows.length;
  var num_cols = layout.cols.length;
  var _a = el.grid_pos,
      start_row = _a.start_row,
      end_row = _a.end_row,
      start_col = _a.start_col,
      end_col = _a.end_col;

  if (start_row > num_rows || start_col > num_cols) {
    return "outside";
  }

  if (end_row > num_rows || end_col > num_cols) {
    return "partially";
  }

  return "inside";
}

exports.contains_element = contains_element;

function shrink_element_to_layout(layout, el) {
  var _a = grid_position_of_el(el),
      start_row = _a.start_row,
      start_col = _a.start_col,
      end_row = _a.end_row,
      end_col = _a.end_col;

  el.style.gridRow = make_template_start_end(start_row, Math.min(end_row, layout.rows.length));
  el.style.gridColumn = make_template_start_end(start_col, Math.min(end_col, layout.cols.length));
}

exports.shrink_element_to_layout = shrink_element_to_layout;

function grid_position_of_el(el) {
  var grid_area = el.style.gridArea.split(" / ");
  return {
    start_row: +grid_area[0],
    start_col: +grid_area[1],
    // Subtract one here because the end in css is the end line, not row
    end_row: +grid_area[2] - 1,
    end_col: +grid_area[3] - 1
  };
}

exports.grid_position_of_el = grid_position_of_el;

function make_start_end_for_dir(dir) {
  if (dir === "cols") {
    return {
      start_id: "start_col",
      end_id: "end_col"
    };
  } else {
    return {
      start_id: "start_row",
      end_id: "end_row"
    };
  }
}

exports.make_start_end_for_dir = make_start_end_for_dir;
},{"./utils-misc":"utils-misc.ts"}],"Grid_Item.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid_Item = void 0;

var utils_grid_1 = require("./utils-grid");

var utils_misc_1 = require("./utils-misc");

var Grid_Item =
/** @class */
function () {
  function Grid_Item(opts) {
    Object.assign(this, opts);
  }

  Object.defineProperty(Grid_Item.prototype, "position", {
    get: function get() {
      return utils_grid_1.get_pos_on_grid(this.el);
    },
    set: function set(pos) {
      utils_grid_1.set_element_in_grid(this.el, pos);

      if (this.has_mirrored) {
        utils_grid_1.set_element_in_grid(this.mirrored_el, pos);
      }

      this.fill_if_in_auto_row();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Item.prototype, "bounding_rect", {
    get: function get() {
      return utils_misc_1.get_bounding_rect(this.el);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Item.prototype, "has_mirrored", {
    get: function get() {
      return typeof this.mirrored_el !== "undefined";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Item.prototype, "style", {
    get: function get() {
      return this.el.style;
    },
    enumerable: false,
    configurable: true
  });

  Grid_Item.prototype.contained_in_layout = function (layout) {
    var num_rows = layout.rows.length;
    var num_cols = layout.cols.length;
    var _a = this.position,
        start_row = _a.start_row,
        end_row = _a.end_row,
        start_col = _a.start_col,
        end_col = _a.end_col;

    if (start_row > num_rows || start_col > num_cols) {
      return "outside";
    }

    if (end_row > num_rows || end_col > num_cols) {
      return "partially";
    }

    return "inside";
  };

  Grid_Item.prototype.fill_if_in_auto_row = function () {
    var in_auto_row = this.parent_layout.item_row_sizes(this.position).includes("auto");

    if (in_auto_row) {
      this.el.innerHTML = utils_misc_1.filler_text;
    }
  };

  Grid_Item.prototype.remove = function () {
    this.el.remove();

    if (this.has_mirrored) {
      this.mirrored_el.remove();
    }

    if (this.sibling_el) {
      this.sibling_el.remove();
    }
  };

  return Grid_Item;
}();

exports.Grid_Item = Grid_Item;
},{"./utils-grid":"utils-grid.ts","./utils-misc":"utils-misc.ts"}],"Grid_Layout.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid_Layout = void 0;

var Grid_Layout =
/** @class */
function () {
  function Grid_Layout(container) {
    this.container = container;
    this.styles = container.style;
    console.log("Initialized Grid_Layout");
  }

  Object.defineProperty(Grid_Layout.prototype, "rows", {
    get: function get() {
      return this.styles.gridTemplateRows.split(" ");
    },
    set: function set(new_rows) {
      if (typeof new_rows === "undefined") return;
      this.styles.gridTemplateRows = new_rows.join(" ");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Layout.prototype, "num_rows", {
    get: function get() {
      return this.rows.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Layout.prototype, "cols", {
    get: function get() {
      return this.styles.gridTemplateColumns.split(" ");
    },
    set: function set(new_cols) {
      if (typeof new_cols === "undefined") return;
      this.styles.gridTemplateColumns = new_cols.join(" ");
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Layout.prototype, "num_cols", {
    get: function get() {
      return this.cols.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Layout.prototype, "gap", {
    get: function get() {
      return this.styles.gap;
    },
    set: function set(new_gap) {
      if (typeof new_gap === "undefined") return; // This sets the --grid-gap variable so that the controls that need the
      // info can use it to keep a constant distance from the grid holder

      this.container.parentElement.style.setProperty("--grid-gap", new_gap); // We dont use css variables in the exported css that existing apps used
      // so we need to modify both gap and padding

      this.styles.gap = new_gap;
      this.styles.padding = new_gap;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Grid_Layout.prototype, "attrs", {
    get: function get() {
      return {
        rows: this.rows,
        cols: this.cols,
        gap: this.gap
      };
    },
    enumerable: false,
    configurable: true
  });

  Grid_Layout.prototype.is_updated_val = function (attr, values) {
    if (attr === "gap") {
      return values !== this.gap;
    } else if (_typeof(values) === "object") {
      return !equal_arrays(this[attr], values);
    }
  }; // Given a new set of attributes, tells you which ones are different from
  // current values


  Grid_Layout.prototype.changed_attributes = function (attrs) {
    var changed = [];
    var new_attrs = this.attrs;
    if (attrs.rows) new_attrs.rows = attrs.rows;
    if (attrs.cols) new_attrs.cols = attrs.cols;
    if (attrs.gap) new_attrs.gap = attrs.gap;

    if (attrs.rows && this.is_updated_val("rows", attrs.rows)) {
      changed.push("rows");
    }

    if (attrs.cols && this.is_updated_val("cols", attrs.cols)) {
      changed.push("cols");
    }

    if (attrs.gap && this.is_updated_val("gap", attrs.gap)) {
      changed.push("gap");
    }

    var new_num_cells = new_attrs.cols.length !== this.num_cols || new_attrs.rows.length !== this.num_rows;
    return {
      changed: changed,
      new_num_cells: new_num_cells,
      new_attrs: new_attrs
    };
  };

  Grid_Layout.prototype.update_attrs = function (attrs) {
    this.rows = attrs.rows;
    this.cols = attrs.cols;
    this.gap = attrs.gap;
  };

  Grid_Layout.prototype.sizes_for_tract = function (item_pos, dir) {
    var _a, _b;

    var start_index = (_a = item_pos["start_" + dir]) !== null && _a !== void 0 ? _a : item_pos["end_" + dir];
    var end_index = (_b = item_pos["end_" + dir]) !== null && _b !== void 0 ? _b : item_pos["start_" + dir];
    var tract_sizes = dir === "row" ? this.rows : this.cols;
    return tract_sizes.filter(function (val, i) {
      return i + 1 >= start_index && i + 1 <= end_index;
    });
  };

  Grid_Layout.prototype.item_row_sizes = function (item_pos) {
    return this.sizes_for_tract(item_pos, "row");
  };

  return Grid_Layout;
}();

exports.Grid_Layout = Grid_Layout;

function equal_arrays(a, b) {
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
},{}],"utils-icons.ts":[function(require,module,exports) {
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
},{}],"make-elements.ts":[function(require,module,exports) {
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
exports.incrementer_button = exports.Text_El = exports.Block_El = exports.Shadow_El = exports.remove_elements = exports.make_el = exports.parse_selector_text = void 0;

var utils_grid_1 = require("./utils-grid");

var utils_icons_1 = require("./utils-icons");

var utils_misc_1 = require("./utils-misc"); // Safari doesn't support lookbehinds for regex so we have to make it manually


function extract_id(sel_txt) {
  var id_match = sel_txt.match(/#([^\.]+)/g);
  return id_match ? id_match[0].replace("#", "") : null;
}

function extract_classes(sel_txt) {
  var class_list = sel_txt.match(/\.([^\.#]+)/g);
  return class_list ? __spreadArray([], class_list).map(function (c) {
    return c.replace(".", "");
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

function incrementer_button(parent_el, selector_text, up_or_down, on_click, additional_styles) {
  var button_styles = __assign({
    fontSize: "10px",
    height: "2.5em",
    width: "2.5em",
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
    border: "2px solid lightgrey",
    backgroundColor: "#fff",
    position: "relative",
    padding: "0"
  }, additional_styles);

  var button = make_el(parent_el, "button" + selector_text, {
    innerHTML: up_or_down === "up" ? utils_icons_1.plus_icon : utils_icons_1.minus_icon,
    styles: button_styles,
    event_listener: {
      event: "click",
      func: on_click
    }
  });
  Object.assign(button.querySelector("svg").style, {
    width: "100%",
    height: "100%"
  });
  return button;
}

exports.incrementer_button = incrementer_button;
},{"./utils-grid":"utils-grid.ts","./utils-icons":"utils-icons.ts","./utils-misc":"utils-misc.ts"}],"make-css_unit_input.ts":[function(require,module,exports) {
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
exports.make_grid_tract_control = exports.make_css_unit_input = exports.get_css_value = exports.get_css_unit = void 0;

var utils_icons_1 = require("./utils-icons");

var make_elements_1 = require("./make-elements");

var App_State_1 = require("./App_State");

var utils_grid_1 = require("./utils-grid");

var default_values = {
  fr: "1",
  px: "100",
  rem: "2"
};

function get_css_unit(css_size) {
  return css_size.match(/(px|\%|rem|fr|auto)/g)[0] || "px";
}

exports.get_css_unit = get_css_unit;

function get_css_value(css_size) {
  var value = css_size.match(/^[\d|\.]*/g)[0];
  return value === "" ? null : Number(value);
}

exports.get_css_value = get_css_value; // =============================================================================
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
      allowed_units = _f === void 0 ? ["fr", "px", "rem", "auto"] : _f;
  var current_unit = start_unit;
  var form = make_elements_1.make_el(parent_el, "form" + selector + ".css-unit-input", {
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

  function unit_type() {
    return unit_selector.value;
  }

  function num_units() {
    return value_input.value;
  }

  function current_value() {
    if (unit_type() === "auto") return "auto";
    return "" + num_units() + unit_type();
  }

  function on_update() {
    var val = current_value();
    update_value(val);
    on_change(val);
  }

  function update_value(new_value) {
    var units = get_css_unit(new_value);
    var count = get_css_value(new_value);

    if (count === null && units === "auto") {
      // Using a unit without values so disable value input
      value_input.classList.add("disabled");
      value_input.value = "";
    } else {
      value_input.classList.remove("disabled"); // If the user is flipping through multiple units we dont want to just
      // stick to whatever value was last set as the unit unless they've changed
      // it from the default. E.g. flipping from default of 100px to rem
      // shouldn't result in a 100rem wide track which then needs to be adjusted

      var using_old_units_default = value_input.value === default_values[current_unit];
      value_input.value = count === null || using_old_units_default ? default_values[units] : count.toString();
    }

    for (var _i = 0, _a = unit_selector.children; _i < _a.length; _i++) {
      var opt = _a[_i];
      opt.selected = opt.value === units;
    }

    current_unit = units;
  }

  update_value("" + start_val + start_unit);
  return {
    form: form,
    current_value: current_value,
    update_value: update_value
  };
}

exports.make_css_unit_input = make_css_unit_input;

function make_grid_tract_control(app_state, opts) {
  var size = opts.size,
      dir = opts.dir,
      tract_index = opts.tract_index;
  var styles_for_holder = {};

  if (dir === "rows") {
    Object.assign(styles_for_holder, {
      gridRow: utils_grid_1.make_template_start_end(tract_index),
      justifyContent: "end",
      alignContent: "center"
    });
  } else {
    Object.assign(styles_for_holder, {
      gridColumn: utils_grid_1.make_template_start_end(tract_index),
      justifyContent: "center",
      alignContent: "start"
    });
  }

  var holder = make_elements_1.make_el(app_state.container, "div#control_" + dir + tract_index + "." + dir + "-controls", {
    styles: styles_for_holder
  });
  var unit_input = make_css_unit_input({
    parent_el: holder,
    selector: ".unit-input",
    start_val: get_css_value(size),
    start_unit: get_css_unit(size),
    on_change: function on_change(new_val) {
      show_or_hide_dragger(new_val);
      App_State_1.update_grid(app_state, app_state.layout_from_controls);
    }
  });
  var value_input = unit_input.form.querySelector(".css-unit-input-value");
  var drag_dir = dir === "rows" ? "y" : "x";
  var resizer = make_elements_1.make_el(holder, "div.css-unit-input-dragger", {
    innerHTML: dir === "rows" ? utils_icons_1.vertical_drag_icon : utils_icons_1.horizontal_drag_icon
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
        App_State_1.update_grid(app_state, __assign(__assign({}, app_state.layout_from_controls), {
          dont_send_to_shiny: true
        }));
      }
    }, {
      event: "dragend",
      func: function func(event) {
        App_State_1.update_grid(app_state, app_state.layout_from_controls);
      }
    }]
  });
  make_elements_1.incrementer_button(holder, ".removeThis", "down", function () {
    app_state.remove_tract(dir, tract_index);
  });

  function show_or_hide_dragger(curr_val) {
    if (get_css_unit(curr_val) === "px") {
      holder.classList.add("with-drag");
    } else {
      holder.classList.remove("with-drag");
    }
  }

  show_or_hide_dragger(unit_input.current_value());
  return unit_input;
}

exports.make_grid_tract_control = make_grid_tract_control;
},{"./utils-icons":"utils-icons.ts","./make-elements":"make-elements.ts","./App_State":"App_State.ts","./utils-grid":"utils-grid.ts"}],"make-focused_modal.ts":[function(require,module,exports) {
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
},{"./make-elements":"make-elements.ts","./utils-misc":"utils-misc.ts"}],"make-incrementer.ts":[function(require,module,exports) {
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
},{"./utils-icons":"utils-icons.ts","./make-elements":"make-elements.ts"}],"utils-cssom.ts":[function(require,module,exports) {
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
exports.find_selector_by_property = exports.get_styles_for_selector_with_targets = exports.get_css_props_by_selector = void 0;

var utils_misc_1 = require("./utils-misc"); // Combines every style rule contained in all the style sheets on page into
// a big array. Easier than navigating the nested structure of sheets => rules


function get_all_style_rules() {
  return utils_misc_1.flatten(__spreadArray([], document.styleSheets).map(function (x) {
    return __spreadArray([], x.cssRules);
  }));
}

function get_all_rules_for_selector(selector_text) {
  // Find the stylesheet which contains the containers styles
  var defines_ruleset = function defines_ruleset(selector_text) {
    return function (rule) {
      return rule.selectorText === selector_text;
    };
  };

  return __spreadArray([], document.styleSheets).filter(function (style_sheet) {
    return __spreadArray([], style_sheet.rules).find(defines_ruleset(selector_text));
  }).map(function (x) {
    return __spreadArray([], x.cssRules).find(defines_ruleset(selector_text)).style;
  });
} // that given property (if multiple exist)


function get_css_props_by_selector(selector_text, target_properties) {
  var all_rules_for_selector = get_all_rules_for_selector(selector_text);
  return target_properties.reduce(function (prop_values, prop) {
    var _a;

    var prop_val = (_a = all_rules_for_selector.find(function (rule) {
      return rule[prop];
    })) === null || _a === void 0 ? void 0 : _a[prop];

    if (prop_val) {
      prop_values[prop] = prop_val;
    }

    return prop_values;
  }, {});
}

exports.get_css_props_by_selector = get_css_props_by_selector;

function get_styles_for_selector_with_targets(selector_text, target_properties) {
  var all_rules_for_selector = get_all_rules_for_selector(selector_text);
  return all_rules_for_selector.find(function (rule) {
    return has_all_props(rule, target_properties);
  });
}

exports.get_styles_for_selector_with_targets = get_styles_for_selector_with_targets;

function has_all_props(rule, props) {
  for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
    var prop = props_1[_i];
    if (!!rule[prop]) return false;
  }

  return true;
}

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
    first_rule_w_prop: first_rule_w_prop,
    selector: rule_exists ? first_rule_w_prop.selectorText : ""
  };
}

exports.find_selector_by_property = find_selector_by_property;
},{"./utils-misc":"utils-misc.ts"}],"utils-shiny.ts":[function(require,module,exports) {
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
exports.send_elements_to_shiny = exports.send_grid_sizing_to_shiny = exports.add_shiny_listener = exports.setShinyInput = void 0;

var index_1 = require("./index"); // These are functions for communicating with Shiny. They are all optional
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

function send_grid_sizing_to_shiny(grid_attrs) {
  setShinyInput("grid_sizing", grid_attrs);
}

exports.send_grid_sizing_to_shiny = send_grid_sizing_to_shiny;

function send_elements_to_shiny(elements) {
  var elements_by_id = {};
  elements.forEach(function (el) {
    elements_by_id[el.id] = __assign({
      id: el.id
    }, el.grid_pos);
  });
  setShinyInput("elements", elements_by_id);
}

exports.send_elements_to_shiny = send_elements_to_shiny;
},{"./index":"index.ts"}],"make-toggle_switch.ts":[function(require,module,exports) {
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

var make_elements_1 = require("./make-elements");

var make_toggle_switch_1 = require("./make-toggle_switch");

var utils_grid_1 = require("./utils-grid");

var utils_icons_1 = require("./utils-icons");

var utils_shiny_1 = require("./utils-shiny"); // Takes a grid element and wraps it in the grided ui. Also returns some useful
// information such as if the element passed was empty and if not, the children
// that it contains so they can be overlayed with editable element boxes


function wrap_in_grided(app_state) {
  var grid_is_filled = app_state.container.hasChildNodes();
  var buttons = [action_button("get_code", "Get layout code"), action_button("update_code", "Update app")];

  if (grid_is_filled) {
    buttons.push(make_toggle_switch_1.make_toggle_switch("Edit layout", "Interact mode", toggle_interaction_mode));
  }

  var settings_panel_el = make_elements_1.Block_El("div.card-body");
  var grided_ui = make_elements_1.Block_El("div#grided__holder", make_elements_1.Block_El("div#grided__header", make_elements_1.Text_El("h2", "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"), make_elements_1.Block_El.apply(void 0, __spreadArray(["div.code_btns"], buttons))), make_elements_1.Block_El("div#grided__settings", make_elements_1.Text_El("h3", utils_icons_1.settings_icon + " Settings"), settings_panel_el), make_elements_1.Block_El("div#grided__instructions", make_elements_1.Text_El("h3", utils_icons_1.instructions_icon + " Instructions"), make_elements_1.Text_El("div.card-body", "\n      <strong>Add an element:</strong>\n      <ul>\n        <li>Click and drag over the grid to define a region</li>\n        <li>Enter id of element in popup</li>\n      </ul>\n      <strong>Edit an element:</strong>\n      <ul>\n        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>\n      </ul>\n      <strong>Remove an element:</strong>\n      <ul>\n        <li>Find element entry in \"Added elements\" panel and click the " + utils_icons_1.trashcan_icon + " icon</li>\n      </ul>")), make_elements_1.Block_El("div#grided__elements", make_elements_1.Text_El("h3", utils_icons_1.elements_icon + " Added elements"), make_elements_1.Block_El("div.card-body", make_elements_1.Block_El("div#added_elements"))), make_elements_1.Block_El("div#grided__editor", make_elements_1.Block_El("div#editor-wrapper", make_elements_1.Text_El("div#editor-browser-header", utils_icons_1.browser_header_html), make_elements_1.Block_El("div#editor-app-window", app_state.container)))); // Make grided UI direct child of the body

  document.querySelector("body").appendChild(grided_ui); // Setup some basic styles for the container to make sure it fits into the
  // grided interface properly.

  app_state.grid_styles.height = "100%";
  app_state.grid_styles.width = "100%";
  app_state.grid_styles.display = "grid"; // Sometimes RMD styles will put a max-width of some amount which can mess
  // stuff up on large screens. The tradeoff is that the app may appear wider
  // than it eventually is. I think it's worth it.

  app_state.grid_styles.maxWidth = "100%";

  if (grid_is_filled) {
    app_state.grid_styles.gap = "1rem";
    app_state.grid_styles.padding = "1rem";
  }

  function toggle_interaction_mode(interact_is_on) {
    __spreadArray(__spreadArray(__spreadArray([], app_state.container.querySelectorAll(".added-element")), app_state.container.querySelectorAll(".grid-cell")), [settings_panel_el, grided_ui.querySelector("#added_elements"), grided_ui.querySelector("#drag_canvas")]).forEach(function (el) {
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
      utils_shiny_1.setShinyInput(id, 1, true);
    });
    return button_el;
  } // If grided is running on an existing app, we need to parse the children and
  // add them as elements;


  __spreadArray([], app_state.container.children).forEach(function (el) {
    var bbox = el.getBoundingClientRect(); // Only keep visible elements. This will (hopefully) filter out and
    // script or style tags that find their way into the grid container

    if (bbox.width === 0 && bbox.height === 0) return;
    app_state.add_element({
      id: el.id,
      grid_pos: utils_grid_1.get_pos_on_grid(el),
      mirrored_element: el
    });
  });

  return {
    settings_panel_el: settings_panel_el,
    grid_is_filled: grid_is_filled
  };
}

exports.wrap_in_grided = wrap_in_grided;
},{"./make-elements":"make-elements.ts","./make-toggle_switch":"make-toggle_switch.ts","./utils-grid":"utils-grid.ts","./utils-icons":"utils-icons.ts","./utils-shiny":"utils-shiny.ts"}],"App_State.ts":[function(require,module,exports) {
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
exports.make_settings_panel = exports.update_grid = exports.App_State = void 0;

var Grid_Item_1 = require("./Grid_Item");

var Grid_Layout_1 = require("./Grid_Layout");

var make_css_unit_input_1 = require("./make-css_unit_input");

var make_elements_1 = require("./make-elements");

var make_focused_modal_1 = require("./make-focused_modal");

var make_incrementer_1 = require("./make-incrementer");

var utils_cssom_1 = require("./utils-cssom");

var utils_grid_1 = require("./utils-grid");

var utils_icons_1 = require("./utils-icons");

var utils_misc_1 = require("./utils-misc");

var utils_shiny_1 = require("./utils-shiny");

var wrap_in_grided_1 = require("./wrap_in_grided");

var App_State =
/** @class */
function () {
  function App_State() {
    // All the currently existing cells making up the grid
    this.current_cells = [];
    this.elements = [];
    var grid_layout_rule = utils_cssom_1.find_selector_by_property("display", "grid");
    this.container_selector = grid_layout_rule.rule_exists ? grid_layout_rule.selector : "#grid_page";
    this.container = grid_layout_rule.rule_exists ? document.querySelector(this.container_selector) : make_elements_1.Block_El("div#grid_page");
    this.controls = {
      rows: [],
      cols: []
    };
    this.grid_styles = this.container.style;
    this.grid_layout = new Grid_Layout_1.Grid_Layout(this.container);

    var _a = wrap_in_grided_1.wrap_in_grided(this),
        settings_panel_el = _a.settings_panel_el,
        grid_is_filled = _a.grid_is_filled;

    this.settings_panel = make_settings_panel(this, settings_panel_el);
    this.mode = grid_is_filled ? "Existing" : "New";

    if (grid_is_filled) {
      var current_grid_props = grid_layout_rule.first_rule_w_prop.style; // Make sure grid matches the one the app is working with

      update_grid(this, {
        rows: current_grid_props.gridTemplateRows.split(" "),
        cols: current_grid_props.gridTemplateColumns.split(" "),
        gap: utils_grid_1.get_gap_size(current_grid_props.gap),
        force: true
      });
    }
  }

  Object.defineProperty(App_State.prototype, "layout_from_controls", {
    get: function get() {
      var sizes = {};

      for (var type in this.controls) {
        sizes[type] = this.controls[type].map(function (unit_input) {
          return unit_input.current_value();
        });
      }

      return sizes;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(App_State.prototype, "next_color", {
    // Get the next color in our list of colors.
    get: function get() {
      var colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#a65628", "#f781bf"]; // If we have more elements than colors we simply recycle

      return colors[this.num_elements % colors.length];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(App_State.prototype, "num_elements", {
    get: function get() {
      return this.elements.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(App_State.prototype, "current_elements", {
    get: function get() {
      // Make sure grid position is current
      this.elements.forEach(function (el) {
        el.grid_pos = utils_grid_1.grid_position_of_el(el.grid_el);
      });
      return this.elements;
    },
    enumerable: false,
    configurable: true
  });

  App_State.prototype.add_element = function (el_props) {
    // If element ids were generated with the grid_container R function then
    // they have a prefix of the container name which we should remove so the
    // added elements list is not ugly looking
    if (el_props.mirrored_element) {
      el_props.id = el_props.id.replace(/^.+?__/g, "");
    }

    var grid_item = draw_elements(this, {
      id: el_props.id,
      mirrored_el: el_props.mirrored_element
    });
    grid_item.position = el_props.grid_pos;

    var new_element_entry = __assign(__assign({}, el_props), {
      grid_el: grid_item.el,
      list_el: grid_item.sibling_el,
      grid_item: grid_item
    });

    this.elements.push(new_element_entry); // Let shiny know we have a new element

    utils_shiny_1.send_elements_to_shiny(this.current_elements);
  };

  App_State.prototype.get_element = function (el) {
    var el_id = typeof el === "string" ? el : el.id;
    return this.elements.find(function (e) {
      return e.id == el_id;
    });
  }; // Removes elements the user has added to the grid by id


  App_State.prototype.remove_elements = function (ids) {
    var _this = this;

    utils_misc_1.as_array(ids).forEach(function (el_id) {
      var entry_index = _this.elements.findIndex(function (el) {
        return el.id === el_id;
      });

      _this.elements[entry_index].grid_item.remove();

      _this.elements.splice(entry_index, 1);
    });
    utils_shiny_1.send_elements_to_shiny(this.current_elements);
  };

  App_State.prototype.add_tract = function (dir, new_index) {
    var _a;

    this.elements.forEach(function (el) {
      var start_id = dir === "rows" ? "start_row" : "start_col";
      var end_id = dir === "rows" ? "end_row" : "end_col";
      var el_position = el.grid_item.position;

      if (new_index >= el_position[end_id]) {// no change needed
      } else if (new_index < el_position[start_id]) {
        // Before item span means everything is shifted up
        el_position[start_id]++;
        el_position[end_id]++;
      } else {
        // Within item span: just end is shifted up
        el.grid_item[end_id] = el_position[end_id]++;
      }

      el.grid_item.position = el_position;
    });
    var tract_sizes = this.grid_layout[dir];
    tract_sizes.splice(new_index, 0, "1fr");
    update_grid(this, (_a = {}, _a[dir] = tract_sizes, _a));
  };

  App_State.prototype.remove_tract = function (dir, index) {
    var _a; // First check for trouble elements before proceeding so we can error out
    // and tell the user why


    var trouble_elements = this.elements.filter(function (el) {
      var _a = utils_grid_1.make_start_end_for_dir(dir),
          start_id = _a.start_id,
          end_id = _a.end_id;

      var el_position = el.grid_item.position;
      return el_position[start_id] === el_position[end_id] && el_position[start_id] === index;
    });

    if (trouble_elements.length > 0) {
      show_conflict_popup(trouble_elements); // End early

      return;
    }

    this.elements.forEach(function (el) {
      var _a = utils_grid_1.make_start_end_for_dir(dir),
          start_id = _a.start_id,
          end_id = _a.end_id;

      var el_position = el.grid_item.position;

      if (el_position[start_id] > index) {
        el_position[start_id]--;
      }

      if (el_position[end_id] >= index) {
        el_position[end_id]--;
      }

      el.grid_item.position = el_position;
    });
    var tract_sizes = this.grid_layout[dir];
    tract_sizes.splice(index - 1, 1);
    update_grid(this, (_a = {}, _a[dir] = tract_sizes, _a));
  };

  App_State.prototype.update_settings_panel = function (opts) {
    if (opts.cols) {
      this.settings_panel.num_cols(opts.cols.length);
    }

    if (opts.rows) {
      this.settings_panel.num_rows(opts.rows.length);
    }

    if (opts.gap) {
      this.settings_panel.gap.update_value(opts.gap);
    }
  }; // Just so we dont have to always say make_el(this.container...)


  App_State.prototype.make_el = function (sel_txt, opts) {
    return make_elements_1.make_el(this.container, sel_txt, opts);
  };

  App_State.prototype.setup_drag = function (opts) {
    var _this = this;

    var drag_feedback_rect;
    var start_rect;
    var start_loc;
    var editor_el = document.querySelector("#grided__editor");

    var update_grid_pos = function update_grid_pos(grid_item, bounding_rect) {
      var grid_extent = utils_grid_1.get_drag_extent_on_grid(_this, bounding_rect);
      grid_item.position = grid_extent;
      return grid_extent;
    };

    opts.watching_element.onmousedown = function (event) {
      var _a;

      start_loc = event; // make sure dragged element is on top

      _this.container.appendChild(opts.grid_item.el); // If this is a new element drag there wont be a bounding box for the grid
      // element yet, so we need to make a new zero-width/height one at start
      // of the drag


      start_rect = ((_a = opts.grid_item) === null || _a === void 0 ? void 0 : _a.bounding_rect) || {
        left: event.offsetX,
        right: event.offsetX,
        top: event.offsetY,
        bottom: event.offsetY
      };
      drag_feedback_rect = make_elements_1.make_el(_this.container.querySelector("#drag_canvas"), "div.drag-feedback-rect", {
        styles: __assign({}, utils_grid_1.bounding_rect_to_css_pos(start_rect))
      }); // We start grid position here in case user selects by simply clicking,
      // which would mean we never get to run the drag function

      update_grid_pos(opts.grid_item, start_rect);
      if (opts.on_start) opts.on_start(start_loc); // Add listener to editor so we can continue to track this drag

      editor_el.addEventListener("mousemove", drag);
      editor_el.addEventListener("mouseup", drag_end);
    };

    function drag(event) {
      var curr_loc = event; // Sometimes the drag event gets fired with nonsense zeros

      if (curr_loc.x === 0 && curr_loc.y === 0) return;
      var new_rect = utils_misc_1.update_rect_with_delta(start_rect, {
        x: curr_loc.x - start_loc.x,
        y: curr_loc.y - start_loc.y
      }, opts.drag_dir);
      Object.assign(drag_feedback_rect.style, utils_grid_1.bounding_rect_to_css_pos(new_rect));
      var grid_extent = update_grid_pos(opts.grid_item, new_rect);
      if (opts.on_drag) opts.on_drag({
        xy: curr_loc,
        grid: grid_extent
      });
    }

    function drag_end(event) {
      var _a;

      var end_loc = event;
      drag_feedback_rect.remove();
      start_rect = null;
      start_loc = null;
      if (opts.on_end) opts.on_end({
        xy: end_loc,
        grid: ((_a = opts.grid_item) === null || _a === void 0 ? void 0 : _a.position) || utils_grid_1.get_pos_on_grid(this.parentElement)
      });
      editor_el.removeEventListener("mousemove", drag);
      editor_el.removeEventListener("mouseup", drag_end);
    }
  };

  return App_State;
}(); // End of class declaration


exports.App_State = App_State;

function update_grid(app_state, opts) {
  var updated_attributes = app_state.grid_layout.changed_attributes(opts);
  app_state.update_settings_panel(opts);
  app_state.grid_layout.update_attrs(opts); // Put some filler text into items spanning auto rows so auto behavior
  // is clear to user

  app_state.current_elements.forEach(function (el) {
    el.grid_item.fill_if_in_auto_row();
  });

  if (updated_attributes.new_num_cells || opts.force) {
    fill_grid_cells(app_state);
    setup_tract_controls(app_state);
    setup_new_item_drag(app_state);
  }

  if (!opts.dont_send_to_shiny) {
    utils_shiny_1.send_grid_sizing_to_shiny(app_state.grid_layout.attrs);
  }
}

exports.update_grid = update_grid;

function fill_grid_cells(app_state) {
  make_elements_1.remove_elements(app_state.current_cells);
  app_state.current_cells = [];

  for (var row_i = 1; row_i <= app_state.grid_layout.num_rows; row_i++) {
    for (var col_i = 1; col_i <= app_state.grid_layout.num_cols; col_i++) {
      app_state.current_cells.push(app_state.make_el("div.r" + row_i + ".c" + col_i + ".grid-cell", {
        data_props: {
          row: row_i,
          col: col_i
        },
        grid_pos: {
          start_row: row_i,
          end_row: row_i,
          start_col: col_i,
          end_col: col_i
        }
      }));
    }
  }

  if (app_state.mode === "Existing") {
    utils_misc_1.set_class(app_state.current_cells, "transparent");
  }
}

function setup_new_item_drag(app_state) {
  var current_selection_box = new Grid_Item_1.Grid_Item({
    el: app_state.make_el("div#current_selection_box.added-element"),
    parent_layout: app_state.grid_layout
  });
  var drag_canvas = app_state.make_el("div#drag_canvas");
  app_state.setup_drag({
    watching_element: drag_canvas,
    grid_item: current_selection_box,
    drag_dir: "bottom-right",
    on_start: function on_start() {
      current_selection_box.style.borderColor = app_state.next_color;
    },
    on_end: function on_end(_a) {
      var grid = _a.grid;
      element_naming_ui(app_state, {
        grid_pos: grid,
        selection_box: current_selection_box
      });
    }
  }); // Make sure any added elements sit on top by re-appending them to grid holder
  // Make sure that the drag detector sits over everything

  __spreadArray([drag_canvas], app_state.container.querySelectorAll(".added-element")).forEach(function (el) {
    return app_state.container.appendChild(el);
  });
}

function setup_tract_controls(app_state) {
  var _loop_1 = function _loop_1(dir) {
    // Get rid of old ones to start with fresh slate
    make_elements_1.remove_elements(app_state.container.querySelectorAll("." + dir + "-controls"));
    app_state.controls[dir] = app_state.grid_layout.attrs[dir].map(function (size, i) {
      return make_css_unit_input_1.make_grid_tract_control(app_state, {
        size: size,
        dir: dir,
        // The i + 1 is because grid is indexed at 1, not zero
        tract_index: i + 1
      });
    }); // Wipe all old elements

    app_state.container.querySelectorAll("button.tract-add").forEach(function (el) {
      return el.remove();
    });

    var _loop_2 = function _loop_2(dir_1) {
      var _loop_3 = function _loop_3(index) {
        var _b, _c;

        var final_btn = index === 0;
        var tract_index = final_btn ? 1 : index;
        var styles_for_holder = {
          position: "absolute"
        };
        var size = "2.5em";
        var offset_to_gap = "calc(-1 * (var(--grid-gap) + " + size + ")/2)";
        var offset_outside_editor = "calc(-" + size + " - var(--grid-gap) - 4px)";

        if (dir_1 === "rows") {
          Object.assign(styles_for_holder, (_b = {
            gridRow: utils_grid_1.make_template_start_end(tract_index),
            gridColumn: "1 / 2",
            justifyContent: final_btn ? "end" : "start",
            left: offset_outside_editor
          }, _b[final_btn ? "top" : "bottom"] = offset_to_gap, _b));
        } else {
          Object.assign(styles_for_holder, (_c = {
            gridColumn: utils_grid_1.make_template_start_end(tract_index),
            gridRow: "-1 / -2",
            alignContent: "end",
            bottom: offset_outside_editor
          }, _c[final_btn ? "left" : "right"] = offset_to_gap, _c));
        }

        make_elements_1.incrementer_button(app_state.container, ".addButton.tract-add." + dir_1 + "_" + index, "up", function () {
          return app_state.add_tract(dir_1, index);
        }, styles_for_holder);
      }; // Adds an extra row or column at end so we can bookend with new tracts


      for (var index = app_state.grid_layout["num_" + dir_1]; index >= 0; index--) {
        _loop_3(index);
      }
    };

    for (var _i = 0, _a = ["rows", "cols"]; _i < _a.length; _i++) {
      var dir_1 = _a[_i];

      _loop_2(dir_1);
    }
  }; // Build each column and row's sizing controler


  for (var dir in app_state.controls) {
    _loop_1(dir);
  }
}

function make_settings_panel(app_state, panel_el) {
  return {
    num_rows: make_incrementer_1.make_incrementer({
      parent_el: panel_el,
      id: "num_rows",
      start_val: 2,
      label: "Number of rows",
      on_increment: function on_increment(x) {
        return update_num_rows_or_cols("rows", x);
      }
    }),
    num_cols: make_incrementer_1.make_incrementer({
      parent_el: panel_el,
      id: "num_cols",
      start_val: 2,
      label: "Number of cols",
      on_increment: function on_increment(x) {
        return update_num_rows_or_cols("cols", x);
      }
    }),
    gap: make_css_unit_input_1.make_css_unit_input({
      parent_el: make_elements_1.make_el(panel_el, "div#gap_size_chooser.plus_minus_input.settings-grid", {
        innerHTML: "<span class = \"input-label\">Panel gap size</span>"
      }),
      selector: "#gap_size_chooser",
      on_change: function on_change(x) {
        return update_grid(app_state, {
          gap: x
        });
      },
      allowed_units: ["px", "rem"]
    })
  };

  function update_num_rows_or_cols(dir, new_count) {
    var _a;

    var current_vals = app_state.container.style["gridTemplate" + (dir === "rows" ? "Rows" : "Columns")].split(" ");

    if (new_count > current_vals.length) {
      current_vals.push("1fr");
    } else if (new_count < current_vals.length) {
      current_vals.pop();
    } else {// No change, shouldn't happen but maybe...
    }

    update_grid(app_state, (_a = {}, _a[dir] = current_vals, _a));
  }
}

exports.make_settings_panel = make_settings_panel;

function element_naming_ui(app_state, _a) {
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
    innerHTML: "\n    <h2>Name your element:</h2>\n    <p>This name will be used to place items in your app.\n    For instance if you want to place a plot in this element,\n    this name will match the label of the plot output\n    </p>\n    "
  });
  var name_form = make_elements_1.make_el(modal_div, "form#name_form", {
    event_listener: {
      event: "submit",
      func: function func(event) {
        event.preventDefault();
        var id = this["name_input"].value.replace(/\s/g, "_"); // Can be replaced with better function operating directly on elements dict

        var element_exists = !!app_state.current_elements.find(function (el) {
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


        app_state.add_element({
          id: id,
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

function draw_elements(app_state, el_info) {
  var id = el_info.id,
      mirrored_el = el_info.mirrored_el;
  var el_color = app_state.next_color;
  var mirrors_existing = typeof mirrored_el !== "undefined";
  var grid_el = app_state.make_el("div#" + id + ".el_" + id + ".added-element", {
    styles: {
      borderColor: app_state.next_color,
      position: "relative"
    }
  });
  var list_el = make_elements_1.make_el(document.querySelector("#added_elements"), "div.el_" + id + ".added-element", {
    innerHTML: id,
    styles: {
      borderColor: el_color
    },
    event_listener: [{
      event: "mouseover",
      func: function func() {
        this.classList.add("hovered");
        grid_el.classList.add("hovered");
      }
    }, {
      event: "mouseout",
      func: function func() {
        this.classList.remove("hovered");
        grid_el.classList.remove("hovered");
      }
    }]
  });
  var grid_item = new Grid_Item_1.Grid_Item({
    el: grid_el,
    mirrored_el: mirrored_el,
    sibling_element: list_el,
    parent_layout: app_state.grid_layout
  }); // Setup drag behavior

  ["top-left", "bottom-right", "center"].forEach(function (handle_type) {
    app_state.setup_drag({
      watching_element: make_elements_1.make_el(grid_el, "div.dragger.visible." + handle_type, {
        styles: {
          background: el_color
        },
        innerHTML: handle_type === "center" ? utils_icons_1.drag_icon : handle_type === "bottom-right" ? utils_icons_1.se_arrow : utils_icons_1.nw_arrow
      }),
      grid_item: grid_item,
      drag_dir: handle_type,
      on_end: function on_end() {
        utils_shiny_1.send_elements_to_shiny(app_state.current_elements);
      }
    });
  });

  if (!mirrors_existing) {
    // Turn of deleting if were editing an existing app
    // This means that if were in app editing mode and the user adds a new element
    // they can delete that new element but they can't delete the existing elements
    make_elements_1.make_el(list_el, "button.remove_el", {
      innerHTML: utils_icons_1.trashcan_icon,
      event_listener: {
        event: "click",
        func: function func() {
          app_state.remove_elements(id);
        }
      }
    });
  }

  return grid_item;
}

function show_conflict_popup(conflicting_elements) {
  var conflicting_elements_list = conflicting_elements.reduce(function (id_list, el) {
    return "\n    " + id_list + "\n    <li> " + el.id + " </li>\n    ";
  }, "<ul>") + "</ul>";
  var message_model = make_focused_modal_1.focused_modal({
    header_text: "\n  <h2>Sorry! Can't make that update</h2> \n  <p> This is because it would result in the following elements being removed from your app:</p>\n  " + conflicting_elements_list + "\n  <p> Either re-arrange these elements to not reside in the removed grid or column or remove them from your app before running grided.</p>\n  "
  });
  make_elements_1.make_el(message_model.modal, "button#accept_result", {
    innerHTML: "Okay",
    event_listener: {
      event: "click",
      func: function func() {
        message_model.remove();
      }
    }
  });
}

function show_danger_popup(app_state, in_danger_els, on_finish) {
  var fix_els_modal = make_focused_modal_1.focused_modal({
    header_text: "\n  <h2>The following elements dont fit on the new grid layout.</h2>\n  <p>Below, choose to either remove the element or to shink its bounds to the new grid sizing</p>\n  "
  });
  var radio_inputs_html = in_danger_els.reduce(function (radio_group, el) {
    return "\n    " + radio_group + "\n    <div class = \"radio-set-group\">\n      <div class = \"radio-set-label\"> " + el.id + " </div>\n      <div class = \"radio-set-options\">\n        <input type=\"radio\" id = \"delete_" + el.id + "\" name=\"" + el.id + "\" value=\"delete\" checked>\n        <label for=\"delete_" + el.id + "\">Delete</label>\n        <input type=\"radio\" id = \"shrink_" + el.id + "\" name=\"" + el.id + "\" value=\"shrink\">\n        <label for=\"shrink_" + el.id + "\">Shink</label>\n      </div>\n    </div>\n  ";
  }, "");
  var delete_or_edit_form = make_elements_1.make_el(fix_els_modal.modal, "form#delete_or_fix_list", {
    innerHTML: "<div class = \"update-action-form\"> " + radio_inputs_html + " </div>",
    event_listener: {
      event: "submit",
      func: function func() {
        var form = this;
        var to_delete = in_danger_els.filter(function (d) {
          return form[d.id].value === "delete";
        });
        app_state.remove_elements(to_delete.map(function (d) {
          return d.id;
        }));
        var to_edit = in_danger_els.filter(function (d) {
          return form[d.id].value === "shrink";
        });
        on_finish(to_edit);
        fix_els_modal.remove();
      }
    }
  });
  make_elements_1.make_el(delete_or_edit_form, "input#name_submit", {
    props: {
      type: "submit"
    }
  });
  make_elements_1.make_el(fix_els_modal.modal, "p.notice-text", {
    innerHTML: "Note that elements residing completely in the removed row or column are automatically deleted."
  });
}
},{"./Grid_Item":"Grid_Item.ts","./Grid_Layout":"Grid_Layout.ts","./make-css_unit_input":"make-css_unit_input.ts","./make-elements":"make-elements.ts","./make-focused_modal":"make-focused_modal.ts","./make-incrementer":"make-incrementer.ts","./utils-cssom":"utils-cssom.ts","./utils-grid":"utils-grid.ts","./utils-icons":"utils-icons.ts","./utils-misc":"utils-misc.ts","./utils-shiny":"utils-shiny.ts","./wrap_in_grided":"wrap_in_grided.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shiny = void 0; // JS entry point

var App_State_1 = require("./App_State");

var make_focused_modal_1 = require("./make-focused_modal");

var utils_shiny_1 = require("./utils-shiny");

exports.Shiny = window.Shiny;
var debug_messages = true;

window.onload = function () {
  var app_state = new App_State_1.App_State();
  utils_shiny_1.add_shiny_listener("shiny-loaded", function (x) {
    if (debug_messages) console.log("connected to shiny");
    x; // this is needed to vscode doesn't flag arg as dead code and delete it
    // Send elements to Shiny so app is aware of what it's working with

    utils_shiny_1.send_elements_to_shiny(app_state.current_elements);
    utils_shiny_1.send_grid_sizing_to_shiny(app_state.grid_layout.attrs);
  });
  utils_shiny_1.add_shiny_listener("finish-button-text", function (label_text) {
    document.querySelector("button#update_code").innerHTML = label_text;
  });

  if (app_state.mode === "New") {
    // Need to use arrow function here so method is run on out app_state object
    // if we just passed app_state.update_grid as the callback its just the method
    // without the object behind it,
    utils_shiny_1.add_shiny_listener("update-grid", function (opts) {
      return App_State_1.update_grid(app_state, opts);
    });
    utils_shiny_1.add_shiny_listener("add-elements", function (elements_to_add) {
      elements_to_add.forEach(function (el_msg) {
        var start_row = el_msg.start_row,
            end_row = el_msg.end_row,
            start_col = el_msg.start_col,
            end_col = el_msg.end_col;
        app_state.add_element({
          id: el_msg.id,
          grid_pos: {
            start_row: start_row,
            end_row: end_row,
            start_col: start_col,
            end_col: end_col
          }
        });
      });
    });
  } // else {
  //   // If in pure-client-side mode we need to provide a default grid and also wireup the code button
  //   update_grid(app_state, {
  //     rows: ["1fr", "1fr"],
  //     cols: ["1fr", "1fr"],
  //     gap: "1rem",
  //   });
  //   document.getElementById("get_code").addEventListener("click", function () {
  //     show_code(
  //       "Place the following in your CSS:",
  //       gen_code_for_layout(
  //         app_state.current_elements,
  //         app_state.container.style
  //       )
  //     );
  //   });
  // }


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
}; // End of the window.onload callback
},{"./App_State":"App_State.ts","./make-focused_modal":"make-focused_modal.ts","./utils-shiny":"utils-shiny.ts"}],"../../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62389" + '/');

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