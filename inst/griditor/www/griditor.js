const colors = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#ffff33",
  "#a65628",
  "#f781bf",
];

// Keep track of the grid controls here. Tradeoff of a global variable
// feels worth it for direct access to the values without doing a dom query
const grid_controls = { rows: [], cols: [] };
const grid_settings = {};

window.onload = function () {
  draw_browser_header();

  const settings_panel = document.querySelector("#settings .card-body");

  grid_settings.num_rows = make_incrementer({
    parent_el: settings_panel,
    id: "num_rows",
    start_val: 2,
    label: "Number of rows",
    on_increment: (x) => rowcol_updater("rows", x),
  });

  grid_settings.num_cols = make_incrementer({
    parent_el: settings_panel,
    id: "num_cols",
    start_val: 2,
    label: "Number of cols",
    on_increment: (x) => rowcol_updater("cols", x),
  });

  grid_settings.gap = make_css_unit_input({
    parent_el: maybe_make_el(
      settings_panel,
      "div#gap_size_chooser.plus_minus_input",
      {
        innerHTML: `<span class = "label">Panel gap size</span>`,
      }
    ),
    selector: "#gap_size_chooser",
    on_change: (x) => update_grid({ gap: x }),
  });

};

window.onresize = function () {
  draw_browser_header();
};

Shiny.addCustomMessageHandler("update-grid", function (opts) {
  update_grid(opts);
});

Shiny.addCustomMessageHandler("add-elements", function (elements_to_add) {
  elements_to_add.forEach((el) => {
    add_element({
      id: el.id,
      grid_rows: [el.start_row, el.end_row],
      grid_cols: [el.start_col, el.end_col],
    });
  });
});

Shiny.addCustomMessageHandler("code_modal", function (code_to_show) {
  const css_for_layout = current_layout_in_css();
  const code_modal = focused_modal({
    modal_contents:
      "Paste the following code into your app to update the layout",
    modal_callbacks: {
      event: "click",
      func: function (event) {
        // This is needed to stop clicks on modal from triggering the cancel
        // event that is attached to the background
        event.stopPropagation();
      },
    },
    styles: {
      marginLeft: "1rem",
    },
    background_callbacks: {
      event: "click",
      func: close_modal,
    },
  });

  const code_text = maybe_make_el(code_modal.modal, "pre#code_for_layout", {
    innerHTML: code_to_show,
    styles: {
      background: "#f3f2f2",
      padding: "0.75rem",
      borderRadius: "5px",
    },
  });

  const action_buttons = maybe_make_el(code_modal.modal, "div#action_buttons", {
    styles: {
      display: "flex",
      justifyContent: "space-around",
    },
  });
  maybe_make_el(action_buttons, "button#copy_code", {
    innerHTML: "Copy to clipboard",
    event_listener: {
      event: "click",
      func: function () {
        code_text.select();
        document.execCommand("copy");
      },
    },
  });
  maybe_make_el(action_buttons, "button#close_code_model", {
    innerHTML: "Close",
    event_listener: {
      event: "click",
      func: close_modal,
    },
  });

  function close_modal() {
    code_modal.remove();
  }
});

function rowcol_updater(dir, new_count) {
  const current_vals = dir === "rows" ? get_current_rows() : get_current_cols();

  if (new_count > current_vals.length) {
    current_vals.push("1fr");
  } else if (new_count < current_vals.length) {
    current_vals.pop();
  } else {
    // No change, shouldn't happen but maybe...
  }
  update_grid({ [dir]: current_vals });
}

function fill_grid_cells() {
  const grid_holder = get_grid_holder();
  const rows = get_current_rows();
  const cols = get_current_cols();
  const num_rows = rows.length;
  const num_cols = cols.length;
  // Grab currently drawn cells (if any) so we can check if we need to redraw
  // or if this was simply a column/row sizing update
  const current_cells = [];
  const need_to_reset_cells = current_cells.length != num_rows * num_cols;

  if (need_to_reset_cells) {
    remove_elements(grid_holder.querySelectorAll(".grid-cell"));
    for (let row_i = 1; row_i <= num_rows; row_i++) {
      for (let col_i = 1; col_i <= num_cols; col_i++) {
        current_cells.push(
          maybe_make_el(grid_holder, `div.r${row_i}.c${col_i}.grid-cell`, {
            data_props: { row: row_i, col: col_i },
            grid_rows: [row_i],
            grid_cols: [col_i],
          })
        );
      }
    }

    // Update controls for sizing of grid
    setup_grid_controls({ rows, cols });

    const drag_detector = maybe_make_el(grid_holder, "div#drag_detector", {
      event_listener: [
        {
          event: "mousedown",
          func: drag_started,
        },
        {
          event: "mouseup",
          func: drag_ended,
        },
      ],
    });
    // Adding the dragging event to the whole page means we dont lose the drag
    // the second the user's cursor goes off of the main grid div
    document.querySelector("#editor").addEventListener("mousemove", dragging);

    const current_selection_box = maybe_make_el(
      grid_holder,
      "div#current_selection_box.added-element"
    );

    // Lets the mousemove event listener know when to do stuff
    let user_dragging = false;

    // Drag start rel(ative) to grid editor div and positioned abs(olutely) on the whole page
    // We need the absolute position to continue calculating drag after mouse has left editor
    const drag_start = { rel: {}, abs: {} };
    const sel_bounds = { col: [null, null], row: [null, null] };

    function drag_started(event) {
      user_dragging = true;
      drag_start.rel = { x: event.offsetX, y: event.offsetY };
      drag_start.abs = { x: event.clientX, y: event.clientY };
      current_selection_box.style.borderColor = get_next_color();
    }

    function dragging(event) {
      if (!user_dragging) return;

      const d_x = event.clientX - drag_start.abs.x;
      const d_y = event.clientY - drag_start.abs.y;

      const sel_left = drag_start.rel.x + (d_x < 0 ? d_x : 0);
      const sel_right = sel_left + Math.abs(d_x);
      const sel_top = drag_start.rel.y + (d_y < 0 ? d_y : 0);
      const sel_bottom = sel_top + Math.abs(d_y);

      const selection_rect = {
        x: [sel_left, sel_right],
        y: [sel_top, sel_bottom],
      };

      // Reset bounding box definitions so we only use current selection extent
      sel_bounds.col = [null, null];
      sel_bounds.row = [null, null];

      [...current_cells].forEach(function (el) {
        // Cell is overlapped by selection box
        if (boxes_overlap(get_bounding_rect(el), selection_rect)) {
          const el_row = +el.dataset.row;
          const el_col = +el.dataset.col;
          sel_bounds.row = [
            min_w_missing(sel_bounds.row[0], el_row),
            max_w_missing(sel_bounds.row[1], el_row),
          ];
          sel_bounds.col = [
            min_w_missing(sel_bounds.col[0], el_col),
            max_w_missing(sel_bounds.col[1], el_col),
          ];
        }
      });

      current_selection_box.style.display = "block";
      current_selection_box.style.gridRow = make_template_start_end(
        sel_bounds.row
      );
      current_selection_box.style.gridColumn = make_template_start_end(
        sel_bounds.col
      );
    }

    function drag_ended(event) {
      // Trigger naming dialog modal
      name_new_element({
        grid_rows: sel_bounds.row,
        grid_cols: sel_bounds.col,
        selection_box: current_selection_box,
      });

      user_dragging = false;
    }

    // Make sure any added elements sit on top by re-appending them to grid holder
    // Make sure that the drag detector sits over everything
    [
      ...grid_holder.querySelectorAll(".added-element"),
      drag_detector,
    ].forEach((el) => grid_holder.appendChild(el));
  } else {
  }
}

function update_grid({ rows, cols, gap }) {
  const grid_holder = get_grid_holder();
  const old_num_rows = get_current_rows().length;
  const old_num_cols = get_current_cols().length;
  const old_gap = grid_holder.style.getPropertyValue("--grid-gap");
  const new_gap = gap || old_gap;
  const new_num_rows = rows ? rows.length : old_num_rows;
  const new_num_cols = cols ? cols.length : old_num_cols;
  
  // Make sure settings panel is up-to-date
  grid_settings.num_rows.update_value(new_num_rows);
  grid_settings.num_cols.update_value(new_num_cols);
  grid_settings.gap.update_value(new_gap);

  const grid_numbers_changed =
  old_num_rows !== new_num_rows || old_num_cols !== new_num_cols;
  if (grid_numbers_changed) {
    
    // Check for elements that may get dropped
    const all_els = current_elements();
    let in_danger_els = [];
    let auto_removed_el_ids = [];

    Object.values(all_els).forEach((el) => {
      const sits_outside_grid =
        el.end_row > new_num_rows || el.end_col > new_num_cols;
      const completely_outside_grid =
        el.start_row > new_num_rows || el.start_col > new_num_cols;

      if (completely_outside_grid) {
        auto_removed_el_ids.push(el.id);
      } else if (sits_outside_grid) {
        in_danger_els.push(el);
      }
    });
    remove_added_elements(auto_removed_el_ids);

    if (in_danger_els.length > 0) {
      const fix_els_modal = focused_modal({
        modal_contents: `
        <h2>The following elements dont fit on the new grid layout.</h2>
        <p>Below, choose to either remove the element or to shink its bounds to the new grid sizing</p>
        `,
      });

      const radio_inputs_html = in_danger_els.reduce(
        (radio_group, el) =>
          `
          ${radio_group}
          <div class = "radio-set-group">
            <div class = "radio-set-label"> ${el.id} </div>
            <div class = "radio-set-options">
              <input type="radio" id = "delete_${el.id}" name="${el.id}" value="delete" checked>
              <label for="delete_${el.id}">Delete</label>
              <input type="radio" id = "shrink_${el.id}" name="${el.id}" value="shrink">
              <label for="shrink_${el.id}">Shink</label>
            </div>
          </div>
        `,
        ""
      );

      const delete_or_edit_form = maybe_make_el(
        fix_els_modal.modal,
        "form#delete_or_fix_list",
        {
          innerHTML: `<div class = "update-action-form"> ${radio_inputs_html} </div>`,
          event_listener: {
            event: "submit",
            func: function () {
              const form = this;
              const to_delete = in_danger_els.filter(
                (d) => form[d.id].value === "delete"
              );

              remove_added_elements(to_delete.map((d) => d.id));
              const to_edit = in_danger_els.filter(
                (d) => form[d.id].value === "shrink"
              );
              to_edit.forEach((el) => {
                const el_node = grid_holder.querySelector(`#${el.id}`);
                el_node.style.gridRow = make_template_start_end([
                  el.start_row,
                  Math.min(el.end_row, new_num_rows),
                ]);
                el_node.style.gridColumn = make_template_start_end([
                  el.start_col,
                  Math.min(el.end_col, new_num_cols),
                ]);
              });

              fix_els_modal.remove();
              // Now that we've updated elements properly, we should be able to
              // just recall the function and it won't spit an error
              update_grid({ rows, cols, gap });
            },
          },
        }
      );

      maybe_make_el(delete_or_edit_form, "input#name_submit", {
        props: { type: "submit" },
      });

      maybe_make_el(fix_els_modal.modal, "p.notice-text", {
        innerHTML:
          "Note that elements residing completely in the removed row or column are automatically deleted.",
      });

      return;
    }
  }

  if (rows) {
    grid_holder.style.gridTemplateRows = sizes_to_template_def(rows);
  }
  if (cols) {
    grid_holder.style.gridTemplateColumns = sizes_to_template_def(cols);
  }
  if (gap) {
    // To give a consistant gap around everything we also add margin of same size
    grid_holder.style.setProperty("--grid-gap", gap);
  }

  if (grid_numbers_changed) fill_grid_cells();

  Shiny.setInputValue("grid_sizing", {
    rows: grid_holder.style.gridTemplateRows.split(" "),
    cols: grid_holder.style.gridTemplateColumns.split(" "),
    gap: grid_holder.style.getPropertyValue("--grid-gap"),
  });

  return grid_holder;

}

function setup_grid_controls(vals) {
  const grid_holder = get_grid_holder();

  for (let type in grid_controls) {
    remove_elements(grid_holder.querySelectorAll(`form.${type}-controls`));

    grid_controls[type] = vals[type].map(function (size, i) {
      // The i + 1 is because grid is indexed at 1, not zero
      const grid_i = i + 1;

      return make_css_unit_input({
        parent_el: grid_holder,
        selector: `#control_${type}${grid_i}.css-unit-input.${type}-controls`,
        start_val: get_css_value(size),
        start_unit: get_css_unit(size),
        on_change: () => update_grid(get_layout_from_controls()),
        form_styles: {
          [`grid${
            type === "rows" ? "Row" : "Column"
          }`]: make_template_start_end([grid_i]),
        },
      });
    });
  }
}

function make_css_unit_input({
  parent_el,
  selector = "",
  start_val = 1,
  start_unit = "fr",
  on_change = (x) => console.log("css unit change", x),
  allowed_units = ["fr", "px", "rem"],
  form_styles = {},
}) {
  const form = maybe_make_el(parent_el, `form${selector}`, {
    event_listener: { event: "change", func: on_update },
    styles: {
      display: "flex",
      flexWrap: "wrap",
      ...form_styles,
    },
  });

  const value_input = maybe_make_el(form, "input", {
    props: {
      type: "number",
      min: 0,
      value: start_val,
      step: 1,
      "aria-live": "polite",
    },
    styles: {
      minWidth: "30px",
      width: "100%",
      maxWidth: "55px",
    },
  });

  const unit_selector = maybe_make_el(form, "select", {
    props: { name: "units" },
    styles: {
      minWidth: "20px",
      marginLeft: "3px",
    },
  });

  allowed_units.forEach(function (unit_type) {
    const unit_option = maybe_make_el(unit_selector, `option.${unit_type}`, {
      props: { value: unit_type },
      innerHTML: unit_type,
    });

    if (unit_type === start_unit) {
      unit_option.selected = true;
    }
  });
  function current_value() {
    return `${value_input.value}${unit_selector.value}`;
  }
  function on_update() {
    on_change(current_value());
  }

  function update_value(new_value) {
    value_input.value = get_css_value(new_value);
    const new_unit = get_css_unit(new_value);
    [...unit_selector.children].forEach((opt) => {
      if (opt.value === new_unit) {
        opt.selected = true;
      } else {
        opt.selected = false;
      }
    });
  }

  return { form, current_value, update_value };
}

function get_layout_from_controls(){
  const sizes = {};
  for (let type in grid_controls) {
    sizes[type] = grid_controls[type].map((unit_input) =>
      unit_input.current_value()
    );
  }
  return sizes;
}

function name_new_element({ grid_rows, grid_cols, selection_box }) {
  const modal_divs = focused_modal({
    background_callbacks: {
      // Clicking outside of the modal will cancel the naming. Seems natural
      event: "click",
      func: reset_el_creation,
    },
    modal_contents: `
    <h2>Name your element:</h2>
    <p>This name will be used to place items in your app.
    For instance if you want to place a plot in this element,
    this name will match the label of the plot output
    </p>
    `,
    modal_callbacks: {
      event: "click",
      func: function (event) {
        // This is needed to stop clicks on modal from triggering the cancel
        // event that is attached to the background
        event.stopPropagation();
      },
    },
  });

  const modal_div = modal_divs.modal;

  const name_form = maybe_make_el(modal_div, "form#name_form", {
    event_listener: {
      event: "submit",
      func: function () {
        const id = this["name_input"].value.replace(/\s/g, "_");

        if (current_elements()[id]) {
          // Cant have duplicate ids!
          warn_about_bad_id(
            `You already have an element with the id ${id}, all ids need to be unique.`
          );
          return;
        }
        if (id.match(/^[^a-zA-Z]/g)) {
          warn_about_bad_id(`Valid ids need to start with a character.`);
          return;
        }

        // Add the new element in to grid
        add_element({
          id,
          color: selection_box.style.borderColor,
          grid_rows,
          grid_cols,
        });

        reset_el_creation();
      },
    },
  });
  maybe_make_el(name_form, "input#cancel_btn", {
    props: { type: "button", value: "cancel" },
    event_listener: { event: "click", func: reset_el_creation },
  });

  maybe_make_el(name_form, "input#name_input", {
    props: { type: "text" },
    event_listener: {
      // Don't leave warning message up while user is typing
      event: "input",
      func: hide_warning_msg,
    },
  }).focus(); // So user can immediately type in id

  maybe_make_el(name_form, "input#name_submit", { props: { type: "submit" } });

  function warn_about_bad_id(msg) {
    maybe_make_el(modal_div, "span#bad_id_msg.notice-text", {
      innerHTML: msg,
      styles: { color: "orangered" },
    });
  }
  function hide_warning_msg() {
    const warn_msg = modal_div.querySelector("span#bad_id_msg");
    if (warn_msg) {
      warn_msg.remove();
    }
  }
  function reset_el_creation() {
    // All done here so get rid of the whole interface.
    modal_divs.remove();
    // Remove the temporary dragged element
    selection_box.style.display = "none";
  }
}

function add_element({ id, color = get_next_color(), grid_cols, grid_rows }) {
  const element_in_grid = maybe_make_el(
    get_grid_holder(),
    `div#${id}.el_${id}.added-element`,
    {
      grid_cols,
      grid_rows,
      styles: {
        borderColor: color,
      },
    }
  );

  const element_in_list = maybe_make_el(
    document.querySelector("#added_elements"),
    `div.el_${id}.added-element`,
    {
      innerHTML: id,
      styles: {
        borderColor: color,
      },
      event_listener: [
        {
          event: "mouseover",
          func: function () {
            this.classList.add("hovered");
            element_in_grid.classList.add("hovered");
          },
        },
        {
          event: "mouseout",
          func: function () {
            this.classList.remove("hovered");
            element_in_grid.classList.remove("hovered");
          },
        },
      ],
    }
  );

  maybe_make_el(element_in_list, "button.remove_el", {
    innerHTML: `<i class="fa fa-trash" aria-hidden="true"></i>`,
    event_listener: {
      event: "click",
      func: function () {
        remove_added_elements(id);
      },
    },
  });

  // Let shiny know we have a new element
  send_elements_to_shiny();
}

function current_elements() {
  const all_elements = get_grid_holder().querySelectorAll(".added-element");

  const element_info = {};
  all_elements.forEach(function (el) {
    // Ignore the selection box
    if (el.id === "current_selection_box") return;
    const grid_area = el.style.gridArea.split(" / ");
    element_info[el.id] = {
      id: el.id,
      start_row: +grid_area[0],
      start_col: +grid_area[1],
      // Subtract one here because the end in css is the end line, not row
      end_row: +grid_area[2] - 1,
      end_col: +grid_area[3] - 1,
    };
  });

  return element_info;
}

function send_elements_to_shiny() {
  Shiny.setInputValue("elements", current_elements());
}

function current_layout_in_css() {
  const container_selector = "#container";
  const grid_holder = get_grid_holder();
  const elements_defs = Object.values(current_elements()).reduce(
    (el_css, el) => `${el_css}

${container_selector} #${el.id} {
  grid-column: ${make_template_start_end([el.start_col, el.end_col])};
  grid-row: ${make_template_start_end([el.start_row, el.end_row])};
}
`,
    ""
  );

return `
${container_selector} {
  display: grid;
  grid-template-columns: ${grid_holder.style.gridTemplateColumns};
  grid-template-rows: ${grid_holder.style.gridTemplateRows};
  grid-gap: ${grid_holder.style.getPropertyValue("--grid-gap")}
}
${elements_defs}
`;
}

function get_grid_holder() {
  // Putting this into its own function in case we change the id
  return document.querySelector("#grid_holder");
}

function get_current_rows() {
  return get_grid_holder().style.gridTemplateRows.split(" ");
}

function get_current_cols() {
  return get_grid_holder().style.gridTemplateColumns.split(" ");
}

function draw_browser_header() {
  const header_svg = document.getElementById("editor-browser-header");
  const {
    width: width_of_bar,
    height: height_of_bar,
  } = header_svg.getBoundingClientRect();

  // Clear out anything that may be in the svg already
  header_svg.innerHTML = "";
  // First make the buttons for closing, minimizing and maximizing window
  const button_r = height_of_bar / 4.5;
  for (let i = 1; i <= 3; i++) {
    header_svg.innerHTML += `
      <circle cx=${i * button_r * 3}px
              cy = 50%
              r = ${button_r}px
      > </circle>`;
  }

  // Next make the browser url bar
  const url_bar_start = 4 * button_r * 3;
  // Bar is takes up middle 65% of header area
  const url_bar_rel_height = 0.65;
  const url_bar_height = height_of_bar * url_bar_rel_height;
  const url_bar_margin = (height_of_bar - url_bar_height) / 2;
  header_svg.innerHTML += `
    <rect x = ${url_bar_start}px
          y = ${url_bar_margin}px
          width = ${width_of_bar - url_bar_start - 10}px
          height = ${height_of_bar * url_bar_rel_height}px
          stroke = "black"
          stroke-width: 3px
          fill = "none"
          rx = ${url_bar_height / 2}px
          ry = ${url_bar_height / 2}px
    ></rect>`;

  header_svg.innerHTML += `
    <text x = ${url_bar_start + 13}px
          y = ${height_of_bar / 2}px
          alignment-baseline = "central"
    >
      www.myShinyApp.com
    </text>
  `;
}

// Get the next color in our list of colors.
function get_next_color() {
  const all_elements = get_grid_holder().querySelectorAll(".added-element");
  // If we have more elements than colors we simply recycle
  return colors[all_elements.length % colors.length];
}

// =============================================================================
// From here on are a series of general purpose helper functions not
// specifically related to the app and its state

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
function maybe_make_el(
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

// Builds the start/end css string for a grid-{row,column}
function make_template_start_end([start, end]) {
  // If we only have a single value just assume we take up one row
  // If single index is a negative one, we need to subtract instead of add to it
  const negative_index = start < 0;

  // Grid works with lines so if we want an element to end at the 4th column we
  // need to tell it to end at the (4+1)5th line, so we add one
  end = end ? +end + 1 : start + (negative_index ? -1 : 1);

  return `${start} / ${end}`;
}

// Given a list of elements from a query selector, remove them all
function remove_elements(els_to_remove) {
  els_to_remove.forEach((e) => e.remove());
}

// Removes elements the user has added to the grid by id
function remove_added_elements(ids) {
  const ids_to_remove = ids instanceof Array ? ids : [ids];

  ids_to_remove.forEach((el_id) => {
    remove_elements(document.querySelectorAll(`div.el_${el_id}.added-element`));
  });

  send_elements_to_shiny();
}

function focused_modal({
  background_callbacks,
  modal_contents,
  modal_callbacks,
}) {
  const background = maybe_make_el(
    document.querySelector("body"),
    "div.background-blurrer",
    {
      event_listener: background_callbacks,
    }
  );

  return {
    background,
    modal: maybe_make_el(background, "div.modal", {
      innerHTML: modal_contents,
      event_listener: modal_callbacks,
    }),
    remove: () => background.remove(),
  };
}

// Builds an up down button and value input
function make_incrementer({
  parent_el,
  start_val = 2,
  id = "incrementer",
  label = "my incrementer",
  on_increment = (x) => console.log(x),
}) {
  const plus_minus_div = maybe_make_el(
    parent_el,
    `div#${id}_incrementer.plus_minus_input`,
    {
      innerHTML: `<span>${label}</span>`,
    }
  );

  const inputs_div = maybe_make_el(plus_minus_div, "div.controls");

  const minus_btn = maybe_make_el(inputs_div, "button.minus_btn", {
    innerHTML: `<i class="fa fa-minus" aria-hidden="true"></i>`,
    event_listener: {
      event: "click",
      func: increment_counter(-1),
    },
  });
  const current_value = maybe_make_el(inputs_div, "span.value", {
    innerHTML: start_val,
  });

  maybe_make_el(inputs_div, "button.plus_btn", {
    innerHTML: `<i class="fa fa-plus" aria-hidden="true"></i>`,
    event_listener: {
      event: "click",
      func: increment_counter(1),
    },
  });

  function update_value(new_value){
    current_value.innerHTML = new_value;

    if (new_value === 1) {
      minus_btn.classList.add("disabled");
    } else {
      minus_btn.classList.remove("disabled");
    }
  }
  function increment_counter(amount) {
    return function () {
      const new_value = +current_value.innerHTML + amount;

      update_value(new_value);
      on_increment(new_value);
    };
  }

  return {update_value};
}

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
}

// Produce bounding rectangle relative to parent of any element
function get_bounding_rect({
  offsetTop: top,
  offsetLeft: left,
  offsetHeight: height,
  offsetWidth: width,
}) {
  return { x: [left, left + width], y: [top, top + height] };
}

function boxes_overlap(box_a, box_b) {
  const horizontal_overlap = intervals_overlap(box_a.x, box_b.x);
  const vertical_overlap = intervals_overlap(box_a.y, box_b.y);

  return horizontal_overlap && vertical_overlap;

  // Figure out of two intervals overlap eachother
  function intervals_overlap([a_start, a_end], [b_start, b_end]) {
    //   aaaaaaaaaa
    // bbbbbb
    //         bbbbbb
    const a_contains_b_endpoint =
      (a_start > b_start && a_start < b_end) ||
      (a_end > b_start && a_end < b_end);

    //   aaaaaa
    // bbbbbbbbbb
    const b_covers_a = a_start <= b_start && a_end >= b_end;

    return a_contains_b_endpoint || b_covers_a;
  }
}

// Take a vector of css sizes and turn into the format for the css argument for
// grid-template-{column,row}: ...
function sizes_to_template_def(defs) {
  return defs.reduce((css, curr) => `${css} ${curr}`, "");
}


function get_css_unit(css_size){
  return css_size.match(/[^ \d | \.]+$/g)[0] || "px";
}

function get_css_value(css_size){
  return +css_size.match(/^[\d | \.]+/g);
}