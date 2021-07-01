// These are functions for communicating with Shiny. They are all optional
// chained so they won't spit errors if Shiny isn't connected or initialized
// yet.
import type { Shiny } from "shiny/srcts/types/src/shiny";

export function setShinyInput(
  inputId: string,
  inputValue: any,
  isEvent = false
) {
  // Sent input value to shiny but only if it's initialized
  window.Shiny?.setInputValue?.(
    inputId,
    inputValue,
    isEvent ? { priority: "event" } : {}
  );
}

export function addShinyListener(
  eventId: Parameters<Shiny["addCustomMessageHandler"]>[0],
  callbackFunc: Parameters<Shiny["addCustomMessageHandler"]>[1]
) {
  window.Shiny?.addCustomMessageHandler(eventId, callbackFunc);
}
