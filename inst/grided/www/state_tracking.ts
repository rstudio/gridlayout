import { GalleryOptions, LayoutInfo } from "./index";
import { LayoutEditorSetup } from "./LayoutEditor";

export type StateDump = {
  type: "layout_edit" | "layout_chooser";
  data: LayoutEditorSetup | GalleryOptions;
};
export const save_gallery_history = (
  layouts: LayoutInfo[],
  selected?: string
) => {
  const opts: GalleryOptions = { layouts };
  if (selected) {
    opts.selected = selected;
  }
  const state_dump: StateDump = { type: "layout_chooser", data: opts };
  window.history.pushState(state_dump, null, null);
};
export const save_editor_history = ({
  entry_type,
  grid,
  elements,
}: LayoutEditorSetup) => {
  // Strips out the non-serializable properties that are not important to
  // recreating state
  const state_dump: StateDump = {
    type: "layout_edit",
    data: { entry_type, grid, elements },
  };
  window.history.pushState(state_dump, null, null);
};
