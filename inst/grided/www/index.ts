// JS entry point
import { LayoutState } from "./GridLayout";
import { LayoutEditor, LayoutEditorSetup } from "./LayoutEditor";
import {
  saveEditorHistory,
  saveGalleryHistory,
  StateDump,
} from "./state_tracking";
import { addShinyListener, setShinyInput } from "./utils-shiny";
import { copyCode } from "./web-components/copy-code";
import { createFocusModal } from "./web-components/focus-modal";
import { LayoutGallery, layoutGallery } from "./web-components/layout-gallery";

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
const clearPage = () => (document.body.innerHTML = ``);

const startLayoutGallery = (
  opts: GalleryOptions,
  saveHistory: boolean = true
) => {
  clearPage();
  if (saveHistory) {
    // If we're coming from a history pop, then we want to make sure we dont
    // push another thing to the state and break the forward button
    saveGalleryHistory(opts.layouts);
  }
  const gallery: LayoutGallery = layoutGallery(opts.layouts)
    .onSelect((selected: string) => {
      saveGalleryHistory(opts.layouts, selected);
    })
    .onCancel(() => {
      saveGalleryHistory(opts.layouts);
    })
    .onGo((selectedLayout: LayoutInfo) => {
      setShinyInput("build_app_template", selectedLayout);
    })
    .onEdit((selectedLayout: LayoutInfo) => {
      startLayoutEditor(
        {
          entryType: "layout-gallery",
          ...selectedLayout,
        },
        true
      );
    })
    .selectLayout(opts.selected);
  return document.body.appendChild(gallery);
};

const startLayoutEditor = (opts: LayoutEditorSetup, saveHistory: boolean) => {
  if (saveHistory) {
    saveEditorHistory(opts);
  }

  if (opts.entryType !== "edit-existing-app") {
    // Don't erase the page if we're editing an existing app
    clearPage();
  }

  opts.finishBtn =
    opts.entryType === "layout-gallery"
      ? {
          label: "Create app",
          onDone: (layout: LayoutInfo) => {
            setShinyInput("build_app_template", layout);
          },
        }
      : {
          label: "Update app layout",
          onDone: (layout: LayoutInfo) => {
            setShinyInput("update_layout", layout);
          },
        };

  opts.onUpdate = (opts: LayoutEditorSetup) => {
    saveEditorHistory(opts);
  };

  return new LayoutEditor(opts);
};

window.onload = function () {
  // Add listeners for the three main entry-points
  addShinyListener("layout-gallery", (layouts: LayoutInfo[]) => {
    startLayoutGallery({ layouts });
  });
  addShinyListener("edit-layout", (layoutInfo: LayoutInfo) => {
    startLayoutEditor(
      {
        entryType: "edit-layout",
        ...layoutInfo,
      },
      true
    );
  });
  addShinyListener("edit-existing-app", (layoutInfo: LayoutInfo) => {
    startLayoutEditor({ entryType: "edit-existing-app" }, true);
  });

  addShinyListener(
    "show-code-popup",
    (opts: { title: string; description: string; code: string }) => {
      createFocusModal()
        .setTitle(opts.title)
        .description(opts.description)
        .addElement(copyCode(opts.code))
        .addToPage();
    }
  );
};

window.addEventListener("popstate", function (e) {
  const state = e.state as StateDump;

  switch (state.type) {
    case "layoutChooser":
      startLayoutGallery(state.data as GalleryOptions, false);
      break;
    case "layoutEdit":
      startLayoutEditor(state.data as LayoutEditorSetup, false);
      break;
    default:
      console.error("How did you get to that state?");
  }
});
