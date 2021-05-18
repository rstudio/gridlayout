// JS entry point
import { Block_El, make_el, remove_elements } from "./make-elements";
import { focused_modal, show_code } from "./make-focused_modal";
import {
  make_css_unit_input,
  CSS_Input,
  get_css_unit,
  get_css_value,
} from "./make-css_unit_input";
import { set_class, get_next_color } from "./utils-misc";
import {
  sizes_to_template_def,
  get_pos_on_grid,
  gen_code_for_layout,
  set_gap_size,
  get_gap_size,
  make_template_start_end,
} from "./utils-grid";
import {
  find_selector_by_property,
  get_css_props_by_selector,
} from "./utils-cssom";
import { wrap_in_grided } from "./wrap_in_grided";
import {
  add_shiny_listener,
  send_elements_to_shiny,
  send_grid_sizing_to_shiny,
  setShinyInput,
} from "./utils-shiny";
import { get_cols, get_rows } from "./utils-grid";
import { App_State } from "./App_State";

export const Shiny = (window as any).Shiny;

export type Grid_Settings = {
  num_rows: (new_value: number) => void;
  num_cols: (new_value: number) => void;
  gap: CSS_Input;
};

export type Grid_Update_Options = {
  rows?: string[];
  cols?: string[];
  gap?: string;
  force?: boolean;
  dont_send_to_shiny?: boolean;
};

export type Grid_Pos = {
  start_col?: number;
  end_col?: number;
  start_row?: number;
  end_row?: number;
};

export type Element_Info = {
  id: string;
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
};

const debug_messages = true;

window.onload = function () {
  // Do we already have a div with id grid_page in our app? Aka the grided UI
  // has been already added?
  const grid_layout_rule = find_selector_by_property("display", "grid");

  const grid_container_selector = grid_layout_rule.rule_exists
    ? grid_layout_rule.selector
    : "#grid_page";

  // This holds the grid element dom node. Gets filled in the onload callback
  // I am using a global variable here because we query inside this so much that
  // it felt silly to regrab it every time as it never moves.
  const container: HTMLElement = grid_layout_rule.rule_exists
    ? document.querySelector(grid_container_selector)
    : Block_El("div#grid_page");

  const { grid_settings, grid_is_filled, existing_children } = wrap_in_grided(
    container,
    update_grid,
    setShinyInput
  );

  const app_state = new App_State({
    controls: { rows: [], cols: [] },
    container,
    grid_is_filled,
  });

  // Only set a default gap sizing if it isn't already provided
  if (app_state.mode !== "ShinyExisting") {
    set_gap_size(app_state.container.style, "1rem");
    app_state.container.style.padding = "1rem";
  }

  add_shiny_listener("shiny-loaded", function (event) {
    if (debug_messages) console.log("connected to shiny");
    // Send elements to Shiny so app is aware of what it's working with
    send_elements_to_shiny(app_state.current_elements);
    send_grid_sizing_to_shiny(app_state.container.style);
  });

  add_shiny_listener("finish-button-text", function (label_text: string) {
    document.querySelector("button#update_code").innerHTML = label_text;
  });

  if (app_state.mode === "ShinyExisting") {
    // If grided is running on an existing app, we need to parse the children and
    // add them as elements;
    existing_children.forEach(function (el) {
      app_state.add_element({
        id: el.id,
        grid_pos: get_pos_on_grid(el as HTMLElement),
        existing_element: el as HTMLElement,
      });
    });

    // Container styles are in this object
    const current_grid_props: {
      gridTemplateRows?: string;
      gridTemplateColumns?: string;
      gap?: string;
    } = get_css_props_by_selector(grid_container_selector, [
      "gridTemplateColumns",
      "gridTemplateRows",
      "gap",
    ]);

    // Make sure grid matches the one the app is working with
    update_grid({
      rows: current_grid_props.gridTemplateRows.split(" "),
      cols: current_grid_props.gridTemplateColumns.split(" "),
      gap: get_gap_size(current_grid_props.gap),
      force: true,
    });

    // Make grid cells transparent so the app is seen beneath them
    set_class(
      app_state.container.querySelectorAll(".grid-cell"),
      "transparent"
    );
  } else if (app_state.mode === "ShinyNew") {
    add_shiny_listener("update-grid", update_grid);

    add_shiny_listener("add-elements", function (
      elements_to_add: Element_Info[]
    ) {
      elements_to_add.forEach((el: Element_Info) => {
        app_state.add_element({
          id: el.id,
          grid_pos: el,
        });
      });
    });
  } else {
    // If in pure-client-side mode we need to provide a default grid and also wireup the code button
    update_grid({
      rows: ["1fr", "1fr"],
      cols: ["1fr", "1fr"],
      gap: "1rem",
    });

    document.getElementById("get_code").addEventListener("click", function () {
      show_code(
        "Place the following in your CSS:",
        gen_code_for_layout(
          app_state.current_elements,
          app_state.container.style
        )
      );
    });
  }

  add_shiny_listener("code_modal", function (code_to_show) {
    show_code("Paste the following code into your app to update the layout", {
      type: "R",
      code: code_to_show,
    });
  });

  add_shiny_listener("code_update_problem", function (code_to_show) {
    show_code(
      "Sorry, Couldn't find your layout to update. Make sure it's in the foreground of RStudio. Here's the code to paste in case all else fails.",
      {
        type: "R",
        code: code_to_show,
      }
    );
  });

  function fill_grid_cells() {
    const grid_dims = {
      rows: get_rows(app_state.container),
      cols: get_cols(app_state.container),
    };
    const num_rows = grid_dims.rows.length;
    const num_cols = grid_dims.cols.length;
    // Grab currently drawn cells (if any) so we can check if we need to redraw
    // or if this was simply a column/row sizing update
    app_state.current_cells = [];
    const need_to_reset_cells =
      app_state.current_cells.length != num_rows * num_cols;

    if (need_to_reset_cells) {
      remove_elements(app_state.container.querySelectorAll(".grid-cell"));
      for (let row_i = 1; row_i <= num_rows; row_i++) {
        for (let col_i = 1; col_i <= num_cols; col_i++) {
          app_state.current_cells.push(
            make_el(app_state.container, `div.r${row_i}.c${col_i}.grid-cell`, {
              data_props: { row: row_i, col: col_i },
              grid_pos: { start_row: row_i, start_col: col_i },
            })
          );
        }
      }

      // Build each column and row's sizing controler
      for (let type in app_state.controls) {
        // Get rid of old ones to start with fresh slate
        remove_elements(
          app_state.container.querySelectorAll(`.${type}-controls`)
        );
        app_state.controls[type] = grid_dims[type].map(function (
          size: string,
          i: number
        ) {
          // The i + 1 is because grid is indexed at 1, not zero
          const grid_i = i + 1;

          return make_css_unit_input({
            parent_el: app_state.container,
            selector: `#control_${type}${grid_i}.${type}-controls`,
            start_val: get_css_value(size),
            start_unit: get_css_unit(size),
            on_change: () => update_grid(app_state.layout_from_controls),
            on_drag: () =>
              update_grid({
                ...app_state.layout_from_controls,
                dont_send_to_shiny: true,
              }),
            form_styles: {
              [`grid${
                type === "rows" ? "Row" : "Column"
              }`]: make_template_start_end(grid_i),
            },
            drag_dir: type === "rows" ? "y" : "x",
          });
        });
      }
      const current_selection_box = make_el(
        app_state.container,
        "div#current_selection_box.added-element"
      );
      const drag_canvas = make_el(app_state.container, "div#drag_canvas");

      app_state.setup_drag({
        watching_element: drag_canvas,
        grid_element: current_selection_box,
        drag_dir: "bottom-right",
        on_start: () => {
          current_selection_box.style.borderColor = get_next_color(
            app_state.container
          );
        },
        on_end: ({ grid }) => {
          name_new_element({
            grid_pos: grid,
            selection_box: current_selection_box,
          });
        },
      });

      // Make sure any added elements sit on top by re-appending them to grid holder
      // Make sure that the drag detector sits over everything
      [
        drag_canvas,
        ...app_state.container.querySelectorAll(".added-element"),
      ].forEach((el) => app_state.container.appendChild(el));
    } else {
    }
  }

  function update_grid(opts: Grid_Update_Options) {
    const old_num_rows = get_rows(app_state.container).length;
    const old_num_cols = get_cols(app_state.container).length;
    const old_gap = get_gap_size(app_state.container.style);
    const new_gap = opts.gap || old_gap;
    const new_num_rows = opts.rows ? opts.rows.length : old_num_rows;
    const new_num_cols = opts.cols ? opts.cols.length : old_num_cols;

    // Make sure settings panel is up-to-date
    grid_settings.num_rows(new_num_rows);
    grid_settings.num_cols(new_num_cols);
    grid_settings.gap.update_value(new_gap);

    const grid_numbers_changed =
      old_num_rows !== new_num_rows || old_num_cols !== new_num_cols;
    if (grid_numbers_changed) {
      // Check for elements that may get dropped
      const all_els = app_state.current_elements;
      let in_danger_els = [];
      let auto_removed_el_ids = [];

      all_els.forEach(function (el) {
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

      app_state.remove_elements(auto_removed_el_ids);

      if (in_danger_els.length > 0) {
        const fix_els_modal = focused_modal({
          header_text: `
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

        const delete_or_edit_form = make_el(
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

                app_state.remove_elements(to_delete.map((d) => d.id));
                const to_edit = in_danger_els.filter(
                  (d) => form[d.id].value === "shrink"
                );
                to_edit.forEach((el) => {
                  const el_node: HTMLElement = app_state.container.querySelector(
                    `#${el.id}`
                  );

                  el_node.style.gridRow = make_template_start_end(
                    el.start_row,
                    Math.min(el.end_row, new_num_rows)
                  );
                  el_node.style.gridColumn = make_template_start_end(
                    el.start_col,
                    Math.min(el.end_col, new_num_cols)
                  );
                });

                fix_els_modal.remove();
                // Now that we've updated elements properly, we should be able to
                // just recall the function and it won't spit an error
                update_grid({
                  rows: opts.rows,
                  cols: opts.cols,
                  gap: opts.gap,
                });
              },
            },
          }
        );

        make_el(delete_or_edit_form, "input#name_submit", {
          props: { type: "submit" },
        });

        make_el(fix_els_modal.modal, "p.notice-text", {
          innerHTML:
            "Note that elements residing completely in the removed row or column are automatically deleted.",
        });

        return;
      }
    }

    if (opts.rows) {
      app_state.container.style.gridTemplateRows = sizes_to_template_def(
        opts.rows
      );
    }
    if (opts.cols) {
      app_state.container.style.gridTemplateColumns = sizes_to_template_def(
        opts.cols
      );
    }
    if (opts.gap) {
      // This sets the --grid-gap variable so that the controls that need the
      // info can use it to keep a constant distance from the grid holder
      app_state.container.parentElement.style.setProperty(
        "--grid-gap",
        opts.gap
      );
      // We dont use css variables in the exported css that existing apps used
      // so we need to modify both gap and padding
      set_gap_size(app_state.container.style, opts.gap);
      app_state.container.style.padding = opts.gap;
    }

    if (grid_numbers_changed || opts.force) {
      fill_grid_cells();
    }

    if (!opts.dont_send_to_shiny) {
      send_grid_sizing_to_shiny(app_state.container.style);
    }

    return app_state.container;
  }

  function name_new_element({ grid_pos, selection_box }) {
    const modal_divs = focused_modal({
      background_callbacks: {
        // Clicking outside of the modal will cancel the naming. Seems natural
        event: "click",
        func: reset_el_creation,
      },
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

    make_el(modal_div, "div.instructions", {
      innerHTML: `
      <h2>Name your element:</h2>
      <p>This name will be used to place items in your app.
      For instance if you want to place a plot in this element,
      this name will match the label of the plot output
      </p>
      `,
    });

    const name_form = make_el(modal_div, "form#name_form", {
      event_listener: {
        event: "submit",
        func: function (event) {
          event.preventDefault();
          const id = this["name_input"].value.replace(/\s/g, "_");

          const element_exists: boolean = !!app_state.current_elements.find(
            (el) => el.id === id
          );
          if (element_exists) {
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
          app_state.add_element({
            id,
            color: selection_box.style.borderColor,
            grid_pos,
          });

          reset_el_creation();
        },
      },
    });
    make_el(name_form, "input#cancel_btn", {
      props: { type: "button", value: "cancel" },
      event_listener: { event: "click", func: reset_el_creation },
    });

    make_el(name_form, "input#name_input", {
      props: { type: "text" },
      event_listener: {
        // Don't leave warning message up while user is typing
        event: "input",
        func: hide_warning_msg,
      },
    }).focus(); // So user can immediately type in id

    make_el(name_form, "input#name_submit", {
      props: { type: "submit" },
    });

    function warn_about_bad_id(msg) {
      make_el(modal_div, "span#bad_id_msg.notice-text", {
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
}; // End of the window.onload callback
