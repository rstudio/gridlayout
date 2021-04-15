import {
  browser_header_html,
  elements_icon,
  instructions_icon,
  settings_icon,
  trashcan_icon,
} from "./icons";
import { Block_El, Text_El, make_el } from "./make_el";
import { make_incrementer } from "./make_incrementer";
import { make_css_unit_input } from "./make_css_unit_input";
import { Grid_Settings, Grid_Update_Options } from "./index";
import { make_toggle_switch } from "./make_toggle_switch";

export function wrap_in_grided(
  grid_el: HTMLElement,
  update_grid: (opts: Grid_Update_Options, send_to_shiny?: boolean) => void,
  setShinyInput: (
    input_id: string,
    input_value: any,
    is_event?: boolean
  ) => void
) {
  const grid_is_filled = grid_el.hasChildNodes();

  const buttons = [
    action_button("get_code", "Get layout code"),
    action_button("update_code", "Update app"),
  ];
  if (grid_is_filled) {
    buttons.push(
      make_toggle_switch(
        "Edit layout",
        "Interact mode",
        toggle_interaction_mode
      )
    );
  }

  const settings_panel = Block_El("div.card-body");
  const grided_ui = Block_El(
    "div#grided__holder",
    Block_El(
      "div#grided__header",
      Text_El(
        "h2",
        "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"
      ),
      Block_El("div.code_btns", ...buttons)
    ),
    Block_El(
      "div#grided__settings",
      Text_El("h3", `${settings_icon} Settings`),
      settings_panel
    ),
    Block_El(
      "div#grided__instructions",
      Text_El("h3", `${instructions_icon} Instructions`),
      Text_El(
        "div.card-body",
        `
      <strong>Add an element:</strong>
      <ul>
        <li>Click and drag over the grid to define a region</li>
        <li>Enter id of element in popup</li>
      </ul>
      <strong>Edit an element:</strong>
      <ul>
        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>
      </ul>
      <strong>Remove an element:</strong>
      <ul>
        <li>Find element entry in "Added elements" panel and click the ${trashcan_icon} icon</li>
      </ul>`
      )
    ),
    Block_El(
      "div#grided__elements",
      Text_El("h3", `${elements_icon} Added elements`),
      Block_El("div.card-body", Block_El("div#added_elements"))
    ),
    Block_El(
      "div#grided__editor",
      Block_El(
        "div#editor-wrapper",
        Text_El("div#editor-browser-header", browser_header_html),
        Block_El("div#editor-app-window", grid_el)
      )
    )
  );

  // Make grided UI direct child of the body
  document.querySelector("body").appendChild(grided_ui);

  // Setup some basic styles for the container to make sure it fits into the
  // grided interface properly.
  grid_el.style.height = "100%";
  grid_el.style.width = "100%";
  grid_el.style.display = "grid";
  // Sometimes RMD styles will put a max-width of some amount which can mess
  // stuff up on large screens. The tradeoff is that the app may appear wider
  // than it eventually is. I think it's worth it.
  grid_el.style.maxWidth = "100%";

  const grid_settings: Grid_Settings = {
    num_rows: make_incrementer({
      parent_el: settings_panel,
      id: "num_rows",
      start_val: 2,
      label: "Number of rows",
      on_increment: (x) => update_num_rows_or_cols("rows", x),
    }),
    num_cols: make_incrementer({
      parent_el: settings_panel,
      id: "num_cols",
      start_val: 2,
      label: "Number of cols",
      on_increment: (x) => update_num_rows_or_cols("cols", x),
    }),
    gap: make_css_unit_input({
      parent_el: make_el(
        settings_panel,
        "div#gap_size_chooser.plus_minus_input.settings-grid",
        {
          innerHTML: `<span class = "input-label">Panel gap size</span>`,
        }
      ),
      selector: "#gap_size_chooser",
      on_change: (x) => update_grid({ gap: x }),
      allowed_units: ["px", "rem"],
    }),
  };

  function update_num_rows_or_cols(dir, new_count) {
    const current_vals = grid_el.style[
      `gridTemplate${dir === "rows" ? "Rows" : "Columns"}`
    ].split(" ");

    if (new_count > current_vals.length) {
      current_vals.push("1fr");
    } else if (new_count < current_vals.length) {
      current_vals.pop();
    } else {
      // No change, shouldn't happen but maybe...
    }
    update_grid({ [dir]: current_vals });
  }

  function toggle_interaction_mode(interact_is_on: boolean) {
    [
      ...grid_el.querySelectorAll(".added-element"),
      ...grid_el.querySelectorAll(".grid-cell"),
      settings_panel,
      grided_ui.querySelector("#added_elements"),
      grided_ui.querySelector("#drag_canvas"),
    ].forEach(function (el: Element) {
      if (interact_is_on) {
        el.classList.add("disabled");
      } else {
        el.classList.remove("disabled");
      }
    });
  }

  function action_button(id: string, label: string) {
    const button_el = Text_El(`button#${id}`, label);
    button_el.addEventListener("click", function (event) {
      setShinyInput(id, 1, true);
    });

    return button_el;
  }

  const existing_children = [...grid_el.children].filter((node) => {
    const bbox = node.getBoundingClientRect();
    // Only keep visible elements. This will (hopefully) filter out and
    // script or style tags that find their way into the grid container
    return bbox.width !== 0 && bbox.height !== 0;
  });

  return {
    settings_panel,
    grid_settings,
    grid_is_filled,
    existing_children,
  };
}
