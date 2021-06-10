import { Gallery_Options, Layout_Info } from "./index";
import { Layout_Editor_Setup } from "./Layout_Editor";

export type State_Dump = {
  type: "layout_edit" | "layout_chooser";
  data: Layout_Editor_Setup | Gallery_Options;
};
export const save_gallery_history = (
  layouts: Layout_Info[],
  selected?: string
) => {
  const opts: Gallery_Options = { layouts };
  if (selected) {
    opts.selected = selected;
  }
  const state_dump: State_Dump = { type: "layout_chooser", data: opts };
  window.history.pushState(state_dump, null, null);
};
export const save_editor_history = ({
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
