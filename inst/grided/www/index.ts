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
  ui_function?: string;
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

export function hideLiveAppUi() {
  const appDumpDiv = document.getElementById("app_dump");

  document
    .querySelectorAll("[data-grided-ui-name]")
    .forEach((el: HTMLElement) => {
      if (el.parentElement === appDumpDiv) return;
      appDumpDiv.append(el);
      $(el).trigger("hidden");
    });
}
// Fresh start on page
const clearPage = () => {
  // We want to keep the div shiny uses to dump app UI in the app so we want to
  // take it out of the dom before erasing page contents, then add it back after
  const appDumpDiv = document.getElementById("app_dump");
  if (appDumpDiv) {
    hideLiveAppUi();
    appDumpDiv.parentNode.removeChild(appDumpDiv);
  }
  document.body.innerHTML = ``;
  if (appDumpDiv) {
    document.body.append(appDumpDiv);
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
    .onEdit((selectedLayout: LayoutInfo) => {
      startLayoutEditor(
        {
          entryType: "layout-gallery",
          ...selectedLayout,
          layoutName: selectedLayout.name,
          liveApp: true,
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
    // Wipe the whole page if we're not working with a full existing app
    clearPage();
  }

  opts.finishBtn =
    opts.entryType === "layout-gallery"
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
        liveApp: false,
      },
      true
    );
  });
  addShinyListener("edit-existing-app", (layoutInfo: LayoutInfo) => {
    startLayoutEditor({ entryType: "edit-existing-app", liveApp: true }, true);
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
