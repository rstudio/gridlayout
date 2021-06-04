import { Layout_Editor } from "./Layout_Editor";
import { show_code } from "./make-focused_modal";
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

  add_shiny_listener("code_modal", function (code_to_show) {
    show_code("Paste the following code into your app to update the layout", {
      type: "R",
      code: code_to_show,
    });
  });

  add_shiny_listener("code_update_problem", function (code_to_show) {
    show_code(
      "Sorry, Couldn't find your layout to update. Make sure it's in the foreground of RStudio. Here's the code to paste in case all else fails.",
      {
        type: "R",
        code: code_to_show,
      }
    );
  });
}
