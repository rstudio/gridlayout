import { Layout_Editor } from "./Layout_Editor";
import {
  add_shiny_listener,
  send_elements_to_shiny,
  send_grid_sizing_to_shiny,
} from "./utils-shiny";

export function add_shiny_listeners(app_state: Layout_Editor) {
  add_shiny_listener("shiny-loaded", (_payload: any) => {
    console.log("connected to shiny");
    _payload; // this is needed to vscode doesn't flag arg as dead code and delete it

    // Send elements to Shiny so app is aware of what it's working with
    send_elements_to_shiny(app_state.current_elements);
    send_grid_sizing_to_shiny(app_state.grid_layout.attrs);
  });

  add_shiny_listener("finish-button-text", function (label_text: string) {
    document.querySelector("button#update_code").innerHTML = label_text;
  });
}
