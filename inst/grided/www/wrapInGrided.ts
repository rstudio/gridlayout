import { FinishButtonSetup, LayoutEditor } from "./LayoutEditor";
import { makeCssUnitInput } from "./make-cssUnitInput";
import { blockEl, clickButton, makeEl, textEl } from "./make-elements";
import { makeToggleSwitch } from "./make-toggleSwitch";
import { getPosOnGrid } from "./utils-grid";
import {
  browserHeaderHtml,
  elementsIcon,
  instructionsIcon,
  plusIcon,
  settingsIcon,
  trashcanIcon,
} from "./utils-icons";
import { setShinyInput } from "./utils-shiny";

// Takes a grid element and wraps it in the grided ui. Also returns some useful
// information such as if the element passed was empty and if not, the children
// that it contains so they can be overlayed with editable element boxes
export function wrapInGrided(
  appState: LayoutEditor,
  finishBtn: FinishButtonSetup
) {
  const gridIsFilled = appState.container.hasChildNodes();

  const buttons = [
    clickButton("#see-layout-code", "Code for layout", () =>
      setShinyInput("see_layout_code", appState.currentLayout, true)
    ),
    clickButton("#done", finishBtn.label, () =>
      finishBtn.onDone(appState.currentLayout)
    ),
  ];

  if (gridIsFilled) {
    buttons.push(
      makeToggleSwitch("Edit layout", "Interact mode", toggleInteractionMode)
    );
  }

  const settingsPanelEl = blockEl(
    "div#gridedGapSizeControls.settings.panel-body"
  );

  const gridedUi = blockEl(
    "div#grided__holder",
    blockEl(
      "div#grided__header",
      textEl(
        "h2",
        "GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app"
      ),
      blockEl("div.code-btns", ...buttons)
    ),
    blockEl(
      "div#grided__settings",
      textEl("h3", `${settingsIcon} Settings`),
      settingsPanelEl
    ),
    blockEl(
      "div#grided__instructions",
      textEl("h3", `${instructionsIcon} Instructions`),
      textEl(
        "div.panel-body",
        `
      <strong>Add or remove a row/column:</strong>
      <ul> 
        <li> Click the ${plusIcon} in gaps between rows and columns to add a row or column at that location </li>
        <li> Click the ${trashcanIcon} next to the row/column sizing controls to remove it</li>
      </ul>
      <strong>Add an element:</strong>
      <ul>
        <li>Click and drag over the grid to define a region</li>
        <li>Enter id of element in popup</li>
      </ul>
      <strong>Edit an element:</strong>
      <ul>
        <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>
      </ul>
      <strong>Remove an element:</strong>
      <ul>
        <li>Find element entry in "Added elements" panel and click the ${trashcanIcon} icon</li>
        <li>You can't remove elements are part of a running app</li>
      </ul>`
      )
    ),
    blockEl(
      "div#grided__elements",
      textEl("h3", `${elementsIcon} Added elements`),
      blockEl("div.panel-body", blockEl("div#added-elements"))
    ),
    blockEl(
      "div#grided__editor",
      blockEl(
        "div#editor-wrapper",
        textEl("div#editor-browser-header", browserHeaderHtml),
        blockEl("div#editor-app-window", appState.container)
      )
    )
  );

  // Make grided UI direct child of the body
  document.querySelector("body").appendChild(gridedUi);

  // Setup some basic styles for the container to make sure it fits into the
  // grided interface properly.
  appState.container.style.height = "100%";
  appState.container.style.width = "100%";
  appState.container.style.display = "grid";
  // Sometimes RMD styles will put a max-width of some amount which can mess
  // stuff up on large screens. The tradeoff is that the app may appear wider
  // than it eventually is. I think it's worth it.
  appState.container.style.maxWidth = "100%";

  function toggleInteractionMode(interactIsOn: boolean) {
    [
      ...appState.container.querySelectorAll(".added-element"),
      ...appState.container.querySelectorAll(".grid-cell"),
      ...gridedUi.querySelectorAll(".tract-controls"),
      gridedUi.querySelector("#grided__settings .panel-body"),
      gridedUi.querySelector("#added-elements"),
      gridedUi.querySelector("#drag-canvas"),
    ].forEach(function (el: Element) {
      if (interactIsOn) {
        el.classList.add("disabled");
      } else {
        el.classList.remove("disabled");
      }
    });
  }

  if (gridIsFilled) {
    appState.container.style.gap = "1rem";
    appState.container.style.padding = "1rem";
    // addExistingElementsToApp(appState);
  }
}

export function cleanupGridedUi() {
  [
    ...document.querySelectorAll(".grid-cell"),
    ...document.querySelectorAll(".added-element"),
    ...document.querySelectorAll(".tract-controls"),
    document.querySelector(".dragSelectionBox"),
    document.getElementById("drag-canvas"),
  ].forEach((el) => el.remove());
}

export function addExistingElementsToApp(appState: LayoutEditor) {
  // If grided is running on an existing app, we need to parse the children and
  // add them as elements;
  [...appState.container.children].forEach(function (el: Element) {
    const bbox = el.getBoundingClientRect();
    // Only keep visible elements. This will (hopefully) filter out and
    // script or style tags that find their way into the grid container
    if (bbox.width === 0 && bbox.height === 0) return;

    // Don't load grided-related elements. These will be there if we are loading
    // from history for an existing app
    if (
      el.classList.contains("grid-cell") ||
      el.classList.contains("dragSelectionBox") ||
      el.classList.contains("added-element") ||
      el.id === "drag-canvas"
    ) {
      el.remove();
      return;
    }

    appState.addElement(
      {
        id: el.id,
        gridPos: getPosOnGrid(el as HTMLElement),
        mirroredElement: el as HTMLElement,
      },
      false
      // second param is false so we don't update history as well
    );
  });
}

export function hookupGapSizeControls(
  appState: LayoutEditor,
  settingsPanelEl: HTMLElement,
  startingGap?: string
) {
  const cssInput = makeCssUnitInput({
    parentEl: makeEl(
      settingsPanelEl,
      "div#gapSizeChooser.plusMinusInput.settings-grid",
      {
        innerHTML: `<span class = "input-label">Panel gap size</span>`,
      }
    ),
    selector: "#gapSizeChooser",
    onChange: (x) => appState.updateGrid({ gap: x }),
    allowedUnits: ["px", "rem"],
    snapToDefaults: false,
  });

  if (startingGap) {
    cssInput.updateValue(startingGap);
  }

  return cssInput;
}
