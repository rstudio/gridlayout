import { LayoutInfo } from "..";
import { clickButton, createEl } from "../make-elements";
import { createFocusModal } from "./focus-modal";
import { gridPreview } from "./grid-preview";

type SelectFn = (info: LayoutInfo) => void;
type EditFn = (info: LayoutInfo, liveApp?: boolean) => void;
export class LayoutGallery extends HTMLElement {
  layouts: LayoutInfo[];
  preselectedLayoutName: string;

  onEditFn: EditFn;
  onGoFn: SelectFn;
  onCancelFn: () => void;
  onSelectFn: (name: string) => void;

  constructor(layouts: LayoutInfo[]) {
    super();
    this.attachShadow({ mode: "open" });
    this.layouts = layouts;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        background-color: #edf2f7;
        width: 100%;
        height: 100vh;
        display: block;
        position: absolute;
      }
      
      #container {
        display: block;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      #layouts {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        grid-gap: 1rem;
        justify-items: center;
      }
      #chooser-modal {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: grid;
        grid-template-areas: 
          "main main"
          "go   edit";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(2, auto);
        gap: 1rem;
        justify-items: center;
        align-content: center;
        background-color: white;
        opacity: 0.9;
      }
      
      #chooser-modal > button {
        width: 150px;
      }
      #chooser-modal > grid-preview {
        grid-area: main;
      }
      #chooser-modal > .go {
        grid-area: go;
        justify-self: end;
      }
      #chooser-modal > .edit {
        grid-area: edit;
        justify-self: start;
      }
      #chooser-modal.hidden {
        display: none;
      }
    </style>
    <div id = "container">
      <h2> Select the layout for your app: </h2>
      <div id = "layouts"></div>
      <div id = "chooser-modal" class = "hidden"> </div>
    </div>
    `;

    this.shadowRoot.getElementById("layouts").append(
      ...this.layouts.map((layout) =>
        gridPreview()
          .layout(layout)
          .shownSize(120)
          .onSelect(() => this.focusOnLayout(layout))
      )
    );

    // If we have a preselected layout, find it and put it in focus modal
    // on load.
    if (this.preselectedLayoutName) {
      this.focusOnLayout(
        this.layouts.find(
          (layout) => layout.name === this.preselectedLayoutName
        ),
        // Dont fire on select argument because we only preselect from
        // a history event so we don't want to overwrite the history path.
        false
      );
    }
  }

  onEdit(onEditFn: EditFn) {
    this.onEditFn = onEditFn;
    return this;
  }

  onGo(onGoFn: SelectFn) {
    this.onGoFn = onGoFn;
    return this;
  }

  onCancel(onCancelFn: () => void) {
    this.onCancelFn = onCancelFn;
    return this;
  }

  selectLayout(name?: string) {
    if (name) {
      this.preselectedLayoutName = name;
    }
    return this;
  }

  onSelect(fn: (name: string) => void) {
    this.onSelectFn = fn;
    return this;
  }

  focusOnLayout(selectedLayout: LayoutInfo, fireOnSelect: boolean = true) {
    const modal = createFocusModal()
      .setTitle(selectedLayout.name)
      .maxWidth("95%")
      .onClose(this.onCancelFn)
      .addElement(
        gridPreview()
          .layout(selectedLayout)
          .shownSize(650)
          .turnoffAnimation()
          .hideName()
      );

    const closeGallery = (event: MouseEvent) => {
      // Stop propigation of click event down so it doesn't trigger the
      // background click-to-go-back behavior
      event.stopPropagation();
      this.remove();
      modal.remove();
    };

    let actionButtons = [
      clickButton(".go", "Create app with this layout", (event) => {
        closeGallery(event);
        this.onGoFn(selectedLayout);
      }),
      clickButton(".edit", "Edit this layout", (event) => {
        closeGallery(event);
        this.onEditFn(selectedLayout, false);
      }),
    ];

    if (selectedLayout.app_loc) {
      actionButtons.push(
        clickButton(".edit-live", "Edit layout with live app", (event) => {
          closeGallery(event);
          this.onEditFn(selectedLayout, true);
        })
      );
    }

    modal.addElement(
      createEl({
        selTxt: `div#footer`,
        children: actionButtons,
      })
    );

    modal.addToPage();

    if (fireOnSelect) {
      this.onSelectFn(selectedLayout.name);
    }
  }
}

export function layoutGallery(layouts: LayoutInfo[]) {
  return new LayoutGallery(layouts);
}

customElements.define("layout-gallery", LayoutGallery);
