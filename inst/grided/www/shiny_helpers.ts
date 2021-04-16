import { Element_Info, Shiny } from "./index";
import { get_gap_size } from "./misc-helpers";

// These are functions for communicating with Shiny. They are all optional
// chained so they won't spit errors if Shiny isn't connected or initialized
// yet.

export function setShinyInput(
  input_id: string,
  input_value: any,
  is_event = false
) {
  // Sent input value to shiny but only if it's initialized
  Shiny?.setInputValue?.(
    input_id,
    input_value,
    is_event ? { priority: "event" } : {}
  );
}

export function add_shiny_listener(event_id: string, callback_func: Function) {
  Shiny?.addCustomMessageHandler(event_id, callback_func);
}

export function send_grid_sizing_to_shiny(grid_styles: CSSStyleDeclaration) {
  setShinyInput("grid_sizing", {
    rows: grid_styles.gridTemplateRows.split(" "),
    cols: grid_styles.gridTemplateColumns.split(" "),
    gap: get_gap_size(grid_styles),
  });
}

export function send_elements_to_shiny(elements: Element_Info[]) {
  const elements_by_id = {};
  elements.forEach(function (el) {
    elements_by_id[el.id] = el;
  });

  setShinyInput("elements", elements_by_id);
}
