// JS entry point
import { Grid_Layout, Layout_State } from "./Grid_Layout";
import { Layout_Editor } from "./Layout_Editor";
import { Block_El, Text_El } from "./make-elements";
import { add_shiny_listener } from "./utils-shiny";
import {LayoutGallery} from "./web-components/layout-gallery";

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
  name?: string,
  grid: Layout_State,
  elements: Layout_Element[]
};

window.onload = function () {
  
  add_shiny_listener("layout-chooser", (layouts: Layout_Info[]) => {
    const gallery: LayoutGallery = new LayoutGallery(layouts);
    document.body.appendChild(gallery);
  });

  add_shiny_listener("edit-layout", (layout_info: Layout_Info) => {
    console.log("Editing a passed layout");
    const app_state = new Layout_Editor({starting_layout: layout_info});
  })

  add_shiny_listener("edit-existing-app", (layout_info: Layout_Info) => {
    console.log("Editing an existing app");
    const app_state = new Layout_Editor({});
  })
}; 
