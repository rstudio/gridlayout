// JS entry point
import { Block_El } from "./make-elements";
import { show_code } from "./make-focused_modal";

import { set_class } from "./utils-misc";
import {
  get_pos_on_grid,
  gen_code_for_layout,
  set_gap_size,
  get_gap_size,
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
import { App_State } from "./App_State";

export const Shiny = (window as any).Shiny;

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

  const { grid_is_filled, existing_children, settings_panel } = wrap_in_grided(
    container,
    setShinyInput
  );

  const app_state = new App_State({
    controls: { rows: [], cols: [] },
    settings_panel,
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
    app_state.update_grid({
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
    add_shiny_listener("update-grid", app_state.update_grid);

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
    app_state.update_grid({
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
}; // End of the window.onload callback
