// JS entry point
import { Layout_Editor } from "./Layout_Editor";

export const Shiny = (window as any).Shiny;

window.onload = function () {
  const app_state = new Layout_Editor();
}; 
