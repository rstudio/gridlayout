import { ShinyType } from "shiny";
import { Layout_State } from "./Grid_Layout";

const Shiny = (window as any).Shiny as ShinyType;

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
