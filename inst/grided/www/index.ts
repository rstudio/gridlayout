// JS entry point
import { Layout_State } from "./Grid_Layout";
import { Layout_Editor, Layout_Editor_Setup } from "./Layout_Editor";
import {
  save_editor_history,
  save_gallery_history,
  State_Dump,
} from "./state_tracking";
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

export type Gallery_Options = {
  layouts: Layout_Info[];
  selected?: string;
};

const start_layout_gallery = (
  opts: Gallery_Options,
  save_history: boolean = true
) => {
  if (save_history) {
    // If we're coming from a history pop, then we want to make sure we dont
    // push another thing to the state and break the forward button
    save_gallery_history(opts.layouts);
  }
  const gallery: LayoutGallery = layout_gallery(opts.layouts)
    .on_select((selected: string) => {
      save_gallery_history(opts.layouts, selected);
    })
    .on_go((selected_layout: Layout_Info) => {
      setShinyInput("build_app_template", selected_layout);
    })
    .on_edit((selected_layout: Layout_Info) => {
      start_layout_editor({
        entry_type: "layout-gallery",
        ...selected_layout,
      });
    })
    .select_layout(opts.selected);
  return document.body.appendChild(gallery);
};

const start_layout_editor = (
  opts: Layout_Editor_Setup,
  save_history: boolean = true
) => {
  if (save_history) {
    save_editor_history(opts);
  }

  opts.finish_btn =
    opts.entry_type === "layout-gallery"
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
  add_shiny_listener("layout-gallery", (layouts: Layout_Info[]) => {
    start_layout_gallery({ layouts });
  });
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
      start_layout_gallery(state.data as Gallery_Options, false);
      break;
    case "layout_edit":
      start_layout_editor(state.data as Layout_Editor_Setup, false);
      break;
    default:
      console.error("How did you get to that state?");
  }
});
