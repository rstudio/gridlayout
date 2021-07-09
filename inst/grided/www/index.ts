// JS entry point
import { LayoutState } from "./GridLayout";
import { LayoutEditor, LayoutEditorSetup } from "./LayoutEditor";
import {
  saveEditorHistory,
  saveGalleryHistory,
  StateDump,
} from "./stateTracking";
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
  ui_functions?: { [key: string]: string };
  // If live app code exists for layout it's sent as a character vector
  app_loc?: string;
};

export type GalleryOptions = {
  layouts: LayoutInfo[];
  selected?: string;
};

// Fresh start on page
const clearPage = () => {
  // We want to keep the div shiny uses to dump app UI in the app so we want to
  // take it out of the dom before erasing page contents, then add it back after

  const appDumpDiv = document.getElementById("app_dump");
  if (appDumpDiv) {
    appDumpDiv.parentNode.removeChild(appDumpDiv);
  }
  document.body.innerHTML = ``;
  if (appDumpDiv) {
    document.body.append(appDumpDiv);
    console.log("Re-adding app dump div");
  }
};

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
    .onEdit((selectedLayout: LayoutInfo, liveApp?: Boolean) => {
      startLayoutEditor(
        {
          entryType: liveApp ? "layout-gallery-live" : "layout-gallery",
          ...selectedLayout,
          layoutName: selectedLayout.name,
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

  if (opts.entryType === "edit-layout" || opts.entryType === "layout-gallery") {
    // Wipe the whole page if we're in abstract layout editing mode
    clearPage();
  }

  const gallery_app =
    opts.entryType === "layout-gallery" ||
    opts.entryType === "layout-gallery-live";

  opts.finishBtn = gallery_app
    ? {
        label: "Create app",
        onDone: (layout: LayoutInfo) => {
          setShinyInput(
            opts.entryType === "layout-gallery"
              ? "build_app_template"
              : "build_live_app_template",
            layout
          );
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
