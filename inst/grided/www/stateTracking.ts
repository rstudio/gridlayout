import { GalleryOptions, LayoutInfo } from "./index";
import { LayoutEditorSetup } from "./LayoutEditor";

export type StateDump = {
  type: "layoutEdit" | "layoutChooser";
  data: LayoutEditorSetup | GalleryOptions;
};
export const saveGalleryHistory = (
  layouts: LayoutInfo[],
  selected?: string
) => {
  const opts: GalleryOptions = { layouts };
  if (selected) {
    opts.selected = selected;
  }
  const stateDump: StateDump = { type: "layoutChooser", data: opts };
  window.history.pushState(stateDump, null, null);
};
export const saveEditorHistory = (state: LayoutEditorSetup) => {
  // Strips out the non-serializable properties that are not important to
  // recreating state
  const stateDump: StateDump = {
    type: "layoutEdit",
    data: state,
  };
  window.history.pushState(stateDump, null, null);
};
