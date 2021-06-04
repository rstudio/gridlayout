// JS entry point
import { App_State } from "./App_State";

export const Shiny = (window as any).Shiny;

window.onload = function () {
  const app_state = new App_State();
}; 
