import { App_State, update_grid } from "./App_State";
import { make_css_unit_input } from "./make-css_unit_input";
import { Block_El, make_el, Text_El } from "./make-elements";
import { make_toggle_switch } from "./make-toggle_switch";
import { get_pos_on_grid } from "./utils-grid";
import {
  browser_header_html,
  elements_icon,
  instructions_icon,
  settings_icon,
  trashcan_icon,
} from "./utils-icons";
import { setShinyInput } from "./utils-shiny";

// Takes a grid element and wraps it in the grided ui. Also returns some useful
// information such as if the element passed was empty and if not, the children
// that it contains so they can be overlayed with editable element boxes
export function wrap_in_grided(app_state: App_State) {
  const grid_is_filled = app_state.container.hasChildNodes();

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

  const settings_panel_el = Block_El("div.card-body");
  const gap_size_setting = make_css_unit_input({
    parent_el: make_el(
      settings_panel_el,
      "div#gap_size_chooser.plus_minus_input.settings-grid",
      {
        innerHTML: `<span class = "input-label">Panel gap size</span>`,
      }
    ),
    selector: "#gap_size_chooser",
    on_change: (x) => update_grid(app_state, { gap: x }),
    allowed_units: ["px", "rem"],
  });

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
      settings_panel_el
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
        Block_El("div#editor-app-window", app_state.container)
      )
    )
  );

  // Make grided UI direct child of the body
  document.querySelector("body").appendChild(grided_ui);

  // Setup some basic styles for the container to make sure it fits into the
  // grided interface properly.
  app_state.grid_styles.height = "100%";
  app_state.grid_styles.width = "100%";
  app_state.grid_styles.display = "grid";
  // Sometimes RMD styles will put a max-width of some amount which can mess
  // stuff up on large screens. The tradeoff is that the app may appear wider
  // than it eventually is. I think it's worth it.
  app_state.grid_styles.maxWidth = "100%";

  if (grid_is_filled) {
    app_state.grid_styles.gap = "1rem";
    app_state.grid_styles.padding = "1rem";
  }

  function toggle_interaction_mode(interact_is_on: boolean) {
    [
      ...app_state.container.querySelectorAll(".added-element"),
      ...app_state.container.querySelectorAll(".grid-cell"),
      settings_panel_el,
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

  // If grided is running on an existing app, we need to parse the children and
  // add them as elements;
  [...app_state.container.children].forEach(function (el: Element) {
    const bbox = el.getBoundingClientRect();
    // Only keep visible elements. This will (hopefully) filter out and
    // script or style tags that find their way into the grid container
    if (bbox.width === 0 && bbox.height === 0) return;

    app_state.add_element({
      id: el.id,
      grid_pos: get_pos_on_grid(el as HTMLElement),
      mirrored_element: el as HTMLElement,
    });
  });

  return {
    gap_size_setting,
    grid_is_filled,
  };
}
