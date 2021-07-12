import { FinishButtonSetup, LayoutEditor } from "./LayoutEditor";
import { blockEl, clickButton, textEl } from "./make-elements";
import {
  browserHeaderHtml,
  elementsIcon,
  instructionsIcon,
  plusIcon,
  settingsIcon,
  trashcanIcon,
} from "./utils-icons";
import { setShinyInput } from "./utils-shiny";
import { ToggleSwitch } from "./web-components/toggle-switch";

// Takes a grid element and wraps it in the grided ui. Also returns some useful
// information such as if the element passed was empty and if not, the children
// that it contains so they can be overlayed with editable element boxes
export function setupGridedUI(
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

  if (gridIsFilled || appState.entryType === "layout-gallery") {
    buttons.push(
      new ToggleSwitch({
        offText: "Edit layout",
        onText: "Interact mode",
        onChange: toggleInteractionMode,
        startOn: true,
      })
    );
  }

  if (appState.entryType === "layout-gallery") {
    buttons.push(
      new ToggleSwitch({
        offText: "Live App",
        onText: "Simple Edit",
        onChange: (isOn: boolean) => {
          if (isOn) {
            appState.disableLiveApp();
          } else {
            appState.enableLiveApp();
          }
          appState.sendUpdate();
        },
        startOn: !appState.liveApp,
      })
    );
  }

  const settingsPanelEl = blockEl(
    "div#gridedGapSizeControls.settings.panel-body"
  );

  // Initialize added elements with empty class because at this point it
  // always is empty
  const addedElements = blockEl("div#added-elements.empty");

  // Watch the elements list and use a placeholder when no elements are
  // currently in the app
  new MutationObserver((mutationsList, observer) => {
    // The empty class triggers the appearance of psuedoelement that tells the
    // user how to add elements to the app
    if (addedElements.hasChildNodes()) {
      addedElements.classList.remove("empty");
    } else {
      addedElements.classList.add("empty");
    }
  }).observe(addedElements, { childList: true });

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
      blockEl("div.panel-body", addedElements)
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
      if (!el) return; // Only try and enable or disable an element if it exists

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
  }
}
