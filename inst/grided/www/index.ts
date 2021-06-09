// JS entry point
import { Layout_State } from "./Grid_Layout";
import { Layout_Editor, Layout_Editor_Setup } from "./Layout_Editor";
import { add_shiny_listener, setShinyInput } from "./utils-shiny";
import { copy_code } from "./web-components/copy-code";
import { create_focus_modal } from "./web-components/focus-modal";
import { LayoutGallery, layout_gallery } from "./web-components/layout-gallery";

export const Shiny = (window as any).Shiny;

export type Layout_Element = {
  id: string;
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
  flip_id?: boolean;
};

export type Layout_Info = {
  name?: string;
  grid: Layout_State;
  elements: Layout_Element[];
};

// A serializable format so we can store it in browser history api
export type App_Entry_Type =
  | "layout-chooser"
  | "edit-layout"
  | "edit-existing-app";

type State_Dump = {
  type: "layout_edit" | "layout_chooser";
  data: Layout_Editor_Setup | Layout_Info[];
};

const start_layout_chooser = (
  layouts: Layout_Info[],
  save_history: boolean = true
) => {
  if (save_history) {
    // If we're coming from a history pop, then we want to make sure we dont
    // push another thing to the state and break the forward button
    const state_dump: State_Dump = { type: "layout_chooser", data: layouts };
    window.history.pushState(state_dump, null, null);
  }

  const gallery: LayoutGallery = layout_gallery(layouts)
    .on_go((selected_layout: Layout_Info) => {
      setShinyInput("build_app_template", selected_layout);
    })
    .on_edit((selected_layout: Layout_Info) => {
      start_layout_editor({
        entry_type: "layout-chooser",
        ...selected_layout,
      });
    });
  document.body.appendChild(gallery);
};

const save_editor_history = ({
  entry_type,
  grid,
  elements,
}: Layout_Editor_Setup) => {
  // Strips out the non-serializable properties that are not important to
  // recreating state
  const state_dump: State_Dump = {
    type: "layout_edit",
    data: { entry_type, grid, elements },
  };
  window.history.pushState(state_dump, null, null);
};

const start_layout_editor = (
  opts: Layout_Editor_Setup,
  save_history: boolean = true
) => {
  if (save_history) {
    save_editor_history(opts);
  }

  opts.finish_btn =
    opts.entry_type === "layout-chooser"
      ? {
          label: "Create app",
          on_done: (layout: Layout_Info) => {
            setShinyInput("build_app_template", layout);
          },
        }
      : {
          label: "Update app layout",
          on_done: (layout: Layout_Info) => {
            setShinyInput("update_layout", layout);
          },
        };

  opts.on_update = (opts: Layout_Editor_Setup) => {
    save_editor_history(opts);
  };

  return new Layout_Editor(opts);
};

window.onload = function () {
  // Add listeners for the three main entry-points
  add_shiny_listener("layout-chooser", start_layout_chooser);
  add_shiny_listener("edit-layout", (layout_info: Layout_Info) => {
    start_layout_editor({
      entry_type: "edit-layout",
      ...layout_info,
    });
  });
  add_shiny_listener("edit-existing-app", (layout_info: Layout_Info) => {
    start_layout_editor({ entry_type: "edit-existing-app" });
  });

  add_shiny_listener(
    "show-layout-code",
    (opts: { layout_code: string; description: string }) => {
      create_focus_modal()
        .set_title("Layout Code")
        .description(opts.description)
        .add_element(copy_code(opts.layout_code))
        .add_to_page();
    }
  );
};

window.addEventListener("popstate", function (e) {
  const state = e.state as State_Dump;
  // Fresh start on page
  document.body.innerHTML = ``;
  switch (state.type) {
    case "layout_chooser":
      start_layout_chooser(state.data as Layout_Info[], false);
      break;
    case "layout_edit":
      start_layout_editor(state.data as Layout_Editor_Setup, false);
      break;
    default:
      console.error("How did you get to that state?");
  }
});
