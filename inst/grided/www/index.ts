// JS entry point
import { Layout_State } from "./Grid_Layout";
import { start_layout_editor } from "./Layout_Editor";
import { add_shiny_listener, setShinyInput } from "./utils-shiny";
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

window.onload = function () {
  // Add listeners for the three main entry-points
  add_shiny_listener("layout-chooser", (layouts: Layout_Info[]) => {
    const gallery: LayoutGallery = layout_gallery(layouts)
      .on_go((selected_layout: Layout_Info) => {
        setShinyInput("build_app_template", selected_layout);
        console.log(`Make app with`, selected_layout);
      })
      .on_edit((selected_layout: Layout_Info) => {
        start_layout_editor({ starting_layout: selected_layout });
      });
    document.body.appendChild(gallery);
  });

  add_shiny_listener("edit-layout", (layout_info: Layout_Info) => {
    start_layout_editor({ starting_layout: layout_info });
  });

  add_shiny_listener("edit-existing-app", (layout_info: Layout_Info) => {
    start_layout_editor({});
  });
};
