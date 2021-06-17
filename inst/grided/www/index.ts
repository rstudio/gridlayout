// JS entry point
import { LayoutState } from "./GridLayout";
import { LayoutEditor, LayoutEditorSetup } from "./Layout_Editor";
import {
  save_editor_history,
  save_gallery_history,
  StateDump,
} from "./state_tracking";
import { add_shiny_listener, setShinyInput } from "./utils-shiny";
import { copy_code } from "./web-components/copy-code";
import { create_focus_modal } from "./web-components/focus-modal";
import { LayoutGallery, layout_gallery } from "./web-components/layout-gallery";


export type LayoutElement = {
  id: string;
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
  flip_id?: boolean;
};

export type LayoutInfo = {
  name?: string;
  grid: LayoutState;
  elements: LayoutElement[];
};

export type GalleryOptions = {
  layouts: LayoutInfo[];
  selected?: string;
};

// Fresh start on page
const clear_page = () => (document.body.innerHTML = ``);

const start_layout_gallery = (
  opts: GalleryOptions,
  save_history: boolean = true
) => {
  clear_page();
  if (save_history) {
    // If we're coming from a history pop, then we want to make sure we dont
    // push another thing to the state and break the forward button
    save_gallery_history(opts.layouts);
  }
  const gallery: LayoutGallery = layout_gallery(opts.layouts)
    .on_select((selected: string) => {
      save_gallery_history(opts.layouts, selected);
    })
    .on_cancel(() => {
      save_gallery_history(opts.layouts);
    })
    .on_go((selected_layout: LayoutInfo) => {
      setShinyInput("build_app_template", selected_layout);
    })
    .on_edit((selected_layout: LayoutInfo) => {
      start_layout_editor(
        {
          entry_type: "layout-gallery",
          ...selected_layout,
        },
        true
      );
    })
    .select_layout(opts.selected);
  return document.body.appendChild(gallery);
};

const start_layout_editor = (
  opts: LayoutEditorSetup,
  save_history: boolean
) => {
  if (save_history) {
    save_editor_history(opts);
  }

  if (opts.entry_type !== "edit-existing-app") {
    // Don't erase the page if we're editing an existing app
    clear_page();
  }

  opts.finish_btn =
    opts.entry_type === "layout-gallery"
      ? {
          label: "Create app",
          on_done: (layout: LayoutInfo) => {
            setShinyInput("build_app_template", layout);
          },
        }
      : {
          label: "Update app layout",
          on_done: (layout: LayoutInfo) => {
            setShinyInput("update_layout", layout);
          },
        };

  opts.on_update = (opts: LayoutEditorSetup) => {
    save_editor_history(opts);
  };

  return new LayoutEditor(opts);
};

window.onload = function () {
  
  // Add listeners for the three main entry-points
  add_shiny_listener("layout-gallery", (layouts: LayoutInfo[]) => {
    start_layout_gallery({ layouts });
  });
  add_shiny_listener("edit-layout", (layout_info: LayoutInfo) => {
    start_layout_editor(
      {
        entry_type: "edit-layout",
        ...layout_info,
      },
      true
    );
  });
  add_shiny_listener("edit-existing-app", (layout_info: LayoutInfo) => {
    start_layout_editor({ entry_type: "edit-existing-app" }, true);
  });

  add_shiny_listener(
    "show-code-popup",
    (opts: { title: string; description: string; code: string }) => {
      create_focus_modal()
        .set_title(opts.title)
        .description(opts.description)
        .add_element(copy_code(opts.code))
        .add_to_page();
    }
  );
};

window.addEventListener("popstate", function (e) {
  const state = e.state as StateDump;

  switch (state.type) {
    case "layout_chooser":
      start_layout_gallery(state.data as GalleryOptions, false);
      break;
    case "layout_edit":
      start_layout_editor(state.data as LayoutEditorSetup, false);
      break;
    default:
      console.error("How did you get to that state?");
  }
});
