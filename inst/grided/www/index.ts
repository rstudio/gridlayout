// JS entry point
import { App_State, Grid_Update_Options, update_grid } from "./App_State";
import { show_code } from "./make-focused_modal";
import {
  gen_code_for_layout,
} from "./utils-grid";
import {
  add_shiny_listener,
  send_elements_to_shiny,
  send_grid_sizing_to_shiny,
} from "./utils-shiny";

export const Shiny = (window as any).Shiny;

export type Element_Info = {
  id: string;
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
};

const debug_messages = true;

window.onload = function () {

  const app_state = new App_State();

  add_shiny_listener("shiny-loaded", function (x) {
    if (debug_messages) console.log("connected to shiny");
    x; // this is needed to vscode doesn't flag arg as dead code and delete it
    // Send elements to Shiny so app is aware of what it's working with
    send_elements_to_shiny(app_state.current_elements);
    send_grid_sizing_to_shiny(app_state.grid_layout.attrs);
  });

  add_shiny_listener("finish-button-text", function (label_text: string) {
    document.querySelector("button#update_code").innerHTML = label_text;
  });

  if (app_state.mode === "New") {
    // Need to use arrow function here so method is run on out app_state object
    // if we just passed app_state.update_grid as the callback its just the method
    // without the object behind it,
    add_shiny_listener("update-grid", (opts: Grid_Update_Options) =>
      update_grid(app_state, opts)
    );

    add_shiny_listener("add-elements", function (
      elements_to_add: Element_Info[]
    ) {
      elements_to_add.forEach((el: Element_Info) => {
        app_state.add_element({
          id: el.id,
          grid_pos: el,
        });
      });
    });
  } 
  // else {
  //   // If in pure-client-side mode we need to provide a default grid and also wireup the code button
  //   update_grid(app_state, {
  //     rows: ["1fr", "1fr"],
  //     cols: ["1fr", "1fr"],
  //     gap: "1rem",
  //   });

  //   document.getElementById("get_code").addEventListener("click", function () {
  //     show_code(
  //       "Place the following in your CSS:",
  //       gen_code_for_layout(
  //         app_state.current_elements,
  //         app_state.container.style
  //       )
  //     );
  //   });
  // }

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
}; // End of the window.onload callback
