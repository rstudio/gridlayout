import { FinishButtonSetup, LayoutEditor } from "./LayoutEditor";
import { make_css_unit_input } from "./make-css_unit_input";
import { block_el, click_button, make_el, text_el } from "./make-elements";
import { make_toggle_switch } from "./make-toggle_switch";
import { get_pos_on_grid } from "./utils-grid";
import {
  browser_header_html,
  elements_icon,
  instructions_icon,
  plus_icon,
  settings_icon,
  trashcan_icon,
} from "./utils-icons";
import { setShinyInput } from "./utils-shiny";

// Takes a grid element and wraps it in the grided ui. Also returns some useful
// information such as if the element passed was empty and if not, the children
// that it contains so they can be overlayed with editable element boxes
export function wrap_in_grided(
  app_state: LayoutEditor,
  finish_btn: FinishButtonSetup
) {
  const grid_is_filled = app_state.container.hasChildNodes();

  const buttons = [
    click_button("#see-layout-code", "Code for layout", () =>
      setShinyInput("see_layout_code", app_state.current_layout, true)
    ),
    click_button("#done", finish_btn.label, () =>
      finish_btn.on_done(app_state.current_layout)
    ),
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

  const settings_panel_el = block_el(
    "div#grided_gap_size_controls.settings.panel-body"
  );

  const grided_ui = block_el(
    "div#grided__holder",
    block_el(
      "div#grided__header",
      text_el(
        "h2",
        "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"
      ),
      block_el("div.code_btns", ...buttons)
    ),
    block_el(
      "div#grided__settings",
      text_el("h3", `${settings_icon} Settings`),
      settings_panel_el
    ),
    block_el(
      "div#grided__instructions",
      text_el("h3", `${instructions_icon} Instructions`),
      text_el(
        "div.panel-body",
        `
      <strong>Add or remove a row/column:</strong>
      <ul> 
        <li> Click the ${plus_icon} in gaps between rows and columns to add a row or column at that location </li>
        <li> Click the ${trashcan_icon} next to the row/column sizing controls to remove it</li>
      </ul>
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
        <li>You can't remove elements are part of a running app</li>
      </ul>`
      )
    ),
    block_el(
      "div#grided__elements",
      text_el("h3", `${elements_icon} Added elements`),
      block_el("div.panel-body", block_el("div#added_elements"))
    ),
    block_el(
      "div#grided__editor",
      block_el(
        "div#editor-wrapper",
        text_el("div#editor-browser-header", browser_header_html),
        block_el("div#editor-app-window", app_state.container)
      )
    )
  );

  // Make grided UI direct child of the body
  document.querySelector("body").appendChild(grided_ui);

  // Setup some basic styles for the container to make sure it fits into the
  // grided interface properly.
  app_state.container.style.height = "100%";
  app_state.container.style.width = "100%";
  app_state.container.style.display = "grid";
  // Sometimes RMD styles will put a max-width of some amount which can mess
  // stuff up on large screens. The tradeoff is that the app may appear wider
  // than it eventually is. I think it's worth it.
  app_state.container.style.maxWidth = "100%";

  function toggle_interaction_mode(interact_is_on: boolean) {
    [
      ...app_state.container.querySelectorAll(".added-element"),
      ...app_state.container.querySelectorAll(".grid-cell"),
      ...grided_ui.querySelectorAll(".tract-controls"),
      grided_ui.querySelector("#grided__settings .panel-body"),
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

  if (grid_is_filled) {
    app_state.container.style.gap = "1rem";
    app_state.container.style.padding = "1rem";
    // add_existing_elements_to_app(app_state);
  }
}

export function cleanup_grided_ui() {
  [
    ...document.querySelectorAll(".grid-cell"),
    ...document.querySelectorAll(".added-element"),
    ...document.querySelectorAll(".tract-controls"),
    document.querySelector(".drag_selection_box"),
    document.getElementById("drag_canvas"),
  ].forEach((el) => el.remove());
}

export function add_existing_elements_to_app(app_state: LayoutEditor) {
  // If grided is running on an existing app, we need to parse the children and
  // add them as elements;
  [...app_state.container.children].forEach(function (el: Element) {
    const bbox = el.getBoundingClientRect();
    // Only keep visible elements. This will (hopefully) filter out and
    // script or style tags that find their way into the grid container
    if (bbox.width === 0 && bbox.height === 0) return;

    // Don't load grided-related elements. These will be there if we are loading
    // from history for an existing app
    if (
      el.classList.contains("grid-cell") ||
      el.classList.contains("drag_selection_box") ||
      el.classList.contains("added-element") ||
      el.id === "drag_canvas"
    ) {
      el.remove();
      return;
    }

    app_state.add_element(
      {
        id: el.id,
        grid_pos: get_pos_on_grid(el as HTMLElement),
        mirrored_element: el as HTMLElement,
      },
      false
      // second param is false so we don't update history as well
    );
  });
}

export function hookup_gap_size_controls(
  app_state: LayoutEditor,
  settings_panel_el: HTMLElement,
  starting_gap?: string
) {
  const css_input = make_css_unit_input({
    parent_el: make_el(
      settings_panel_el,
      "div#gap_size_chooser.plus_minus_input.settings-grid",
      {
        innerHTML: `<span class = "input-label">Panel gap size</span>`,
      }
    ),
    selector: "#gap_size_chooser",
    on_change: (x) => app_state.update_grid({ gap: x }),
    allowed_units: ["px", "rem"],
    snap_to_defaults: false,
  });

  if (starting_gap) {
    css_input.update_value(starting_gap);
  }

  return css_input;
}
