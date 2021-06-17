// Let Typescript know that we will have a Shiny global object available
import type { ShinyType } from "shiny";
declare global {
  interface Window {
    Shiny: ShinyType;
  }
}

// These are functions for communicating with Shiny. They are all optional
// chained so they won't spit errors if Shiny isn't connected or initialized
// yet.

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

export function addShinyListener(eventId: string, callbackFunc: Function) {
  window.Shiny?.addCustomMessageHandler(eventId, callbackFunc);
}
