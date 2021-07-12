import { css } from "@emotion/css";
import { hideLiveAppUi, LayoutElement, LayoutInfo } from ".";
import { GridItem, GridPos } from "./GridItem";
import { GridLayout, LayoutState, TractDir } from "./GridLayout";
import {
  buildControlsForDir,
  CSSInput,
  makeCssUnitInput,
} from "./make-cssUnitInput";
import { blockEl, createEl, ElementOpts, makeEl } from "./make-elements";
import { setupGridedUI } from "./setupGridedUI";
import { getStylesForSelectorWithTargets } from "./utils-cssom";
import {
  boundingRectToCssPos,
  findFirstGridNode,
  getDragExtentOnGrid,
  getGapSize,
  getPosOnGrid,
  makeStartEndForDir,
} from "./utils-grid";
import { dragIcon, nwArrow, seArrow, trashcanIcon } from "./utils-icons";
import {
  asArray,
  DragType,
  fillerText,
  posRelativeToContainer,
  removeClass,
  SelectionRect,
  setClass,
  updateRectWithDelta,
  XYPos,
} from "./utils-misc";
import { setShinyInput } from "./utils-shiny";
import { createFocusModal } from "./web-components/focus-modal";

export type GridUpdateOptions = {
  rows?: string[] | string;
  cols?: string[] | string;
  gap?: string;
  force?: boolean;
  dontUpdateHistory?: boolean;
};

type DragRes = {
  xy: XYPos;
  grid: GridPos;
};

export type ElementInfo = {
  id: string;
  gridPos: GridPos;
  gridEl: HTMLElement;
  listEl: HTMLElement;
  mirroredElement?: HTMLElement;
  gridItem: GridItem;
};

export type AppEntryType =
  | "layout-gallery"
  | "edit-layout"
  | "edit-existing-app";

export type FinishButtonSetup = {
  label: string;
  onDone: (layout: LayoutInfo) => void;
};

export type LayoutEditorSetup = {
  entryType: AppEntryType;
  grid?: LayoutState;
  elements?: LayoutElement[];
  finishBtn?: FinishButtonSetup;
  onUpdate?: (opts: LayoutEditorSetup) => void;
  layoutName?: string;
  liveApp?: boolean;
  ui_functions?: { [key: string]: string };
};

export class LayoutEditor {
  gapSizeSetting: CSSInput;
  // All the currently existing cells making up the grid
  currentCells: HTMLElement[] = [];
  elements: GridItem[] = [];
  onUpdate: (opts: LayoutEditorSetup) => void;

  containerSelector: string;
  container: HTMLElement;
  gridStyles: CSSStyleDeclaration;
  gridLayout: GridLayout;
  tractControls: {
    updatePositions: () => void;
  };
  entryType: AppEntryType;
  liveApp: boolean;
  // Stores the name of the current template (if we're coming in from the template viewer)
  layoutName?: string;

  constructor(opts: LayoutEditorSetup) {
    this.entryType = opts.entryType;
    this.onUpdate = opts.onUpdate;
    this.liveApp = opts.liveApp ?? true;

    if (
      this.entryType === "layout-gallery" ||
      this.entryType === "edit-layout"
    ) {
      // Both entering from the layout gallery or just editing a layout need to
      // build from scratch the whole layout.
      this.loadLayoutTemplate(opts);
    } else if (
      this.entryType === "edit-existing-app" ||
      Boolean(document.querySelector(".wrapped-existing-app"))
    ) {
      // If we're wrapping an existing app that already exists, then we can
      // start that process immediately.
      this.wrapExistingApp(opts);
    } else if (this.entryType === "layout-gallery-live") {
      // If we've requested a live app from the layout gallery we need to wait
      // for it to be sent over by shiny and then wrap it with grided interface
      // debugger;
      this.loadLayoutTemplate(opts);
    } else {
      console.error(
        "Neither starting layout was provided nor is there an existing grid app"
      );
    }

    this.layoutName = opts?.layoutName;

    // Send info on starting layout to Shiny so it can find layout definition
    // to edit it after changes have been made
    if (
      this.entryType === "edit-layout" ||
      this.entryType === "edit-existing-app"
    ) {
      setShinyInput("starting-layout", this.currentLayout, true);
    }
  }

  loadLayoutTemplate(opts: LayoutEditorSetup) {
    this.container = blockEl("div#gridPage");

    this.gridLayout = new GridLayout(this.container);

    setupGridedUI(this, opts.finishBtn);

    this.hookupGapSizeControls(opts.grid.gap);

    // Update grid but dont update history because we need to fill in the
    // elements first
    this.updateGrid({ ...opts.grid, dontUpdateHistory: true });

    opts.elements?.forEach((elMsg: LayoutElement) => {
      const {
        id,
        start_row,
        end_row,
        start_col,
        end_col,
        ui_function = null,
      } = elMsg;

      // Add elements but dont update history as we do it
      this.addElement(
        {
          id,
          gridPos: { start_row, end_row, start_col, end_col },
          ui_function,
        },
        false
      );
    });

    if (this.liveApp) {
      this.enableLiveApp();
    }
    // Layout usually shifts a bit after adding elements so run precautionary
    // controls position update to make sure they're in right place.
    this.tractControls.updatePositions();
  }

  attachUiToElement(uiFunctionName: string) {
    const ui_for_element = document.querySelector(
      `[data-grided-ui-name="${uiFunctionName}"]`
    );

    this.container.append(ui_for_element);
    return ui_for_element as HTMLElement;
  }

  enableLiveApp() {
    this.liveApp = true;
    this.elements.forEach((el) => {
      el.addMirroredEl(this.attachUiToElement(el.ui_function));
    });
    this.updateGridTransparency();
  }

  disableLiveApp() {
    this.liveApp = false;
    hideLiveAppUi();
    this.updateGridTransparency();
  }

  wrapExistingApp(opts: LayoutEditorSetup) {
    // Check if we've already wrapped in grided and tagged the app container
    const alreadyWrappedApp = document.querySelector(
      ".wrapped-existing-app"
    ) as HTMLElement;

    this.container = alreadyWrappedApp ?? findFirstGridNode();
    this.gridStyles = this.container.style;
    this.gridLayout = new GridLayout(this.container);

    if (alreadyWrappedApp) {
      // If we're reloading an existing grided app we need to clean up the state
      // connected components like the tract sizes before rebuilding them to
      // avoid conflicts
      document
        .querySelectorAll(
          [
            ".grid-cell",
            ".added-element",
            ".tract-controls",
            ".dragSelectionBox",
            "#drag-canvas",
          ].join(",")
        )
        .forEach((el) => el?.remove());
    } else {
      setupGridedUI(this, opts.finishBtn);

      // We need to go into the style sheets to get the starting grid properties
      // because they arent reflected in the `.style` property and sizes are
      // directly computed if we use getComputedStyle()
      const currentGridProps = getStylesForSelectorWithTargets(
        `#${this.container.id}`,
        ["gridTemplateColumns", "gridTemplateRows"]
      );
      // Make sure grid matches the one the app is working with
      opts.grid = {
        rows: currentGridProps.gridTemplateRows.split(" "),
        cols: currentGridProps.gridTemplateColumns.split(" "),
        gap: getGapSize(currentGridProps.gap),
      };
    }

    // Need to sync grided state with existing app elements
    this.addExistingElementsToApp(opts.elements);

    this.hookupGapSizeControls(opts.grid?.gap);

    this.updateGrid({
      ...opts.grid,
      dontUpdateHistory: Boolean(alreadyWrappedApp),
      force: true,
    });
  }

  hookupGapSizeControls(initialGapSize?: string) {
    this.gapSizeSetting = makeCssUnitInput({
      parentEl: makeEl(
        document.getElementById("gridedGapSizeControls"),
        "div#gapSizeChooser.plusMinusInput.settings-grid",
        {
          innerHTML: `<span class = "input-label">Panel gap size</span>`,
        }
      ),
      selector: "#gapSizeChooser",
      onChange: (x) => this.updateGrid({ gap: x }),
      allowedUnits: ["px", "rem"],
      snapToDefaults: false,
    });

    if (initialGapSize) {
      this.gapSizeSetting.updateValue(initialGapSize);
    }
  }

  get currentLayout(): LayoutInfo {
    const layout: LayoutInfo = {
      grid: this.gridLayout.attrs,
      elements: this.elements.map((el) => el.info),
    };

    if (this.layoutName) {
      layout.name = this.layoutName;
    }

    return layout;
  }
  // Get the next color in our list of colors.
  get nextColor() {
    const colors = [
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#a65628",
      "#f781bf",
    ];
    // If we have more elements than colors we simply recycle
    return colors[this.elements.length % colors.length];
  }

  addElement(
    elProps: {
      id: string;
      gridPos: GridPos;
      ui_function?: string;
      mirroredElement?: HTMLElement;
    },
    sendUpdate: boolean = true
  ) {
    // If element ids were generated with the gridContainer R function then
    // they have a prefix of the container name which we should remove so the
    // added elements list is not ugly looking
    if (elProps.mirroredElement) {
      elProps.id = elProps.id.replace(/^.+?__/g, "");
    }

    const gridItem = drawElements(this, elProps);

    // Only update history if we're told to. This allows us to batch add
    // elements without polluting history
    if (sendUpdate) {
      this.sendUpdate();
    }

    return gridItem;
  }

  addExistingElementsToApp(elementDefs: LayoutElement[] = []) {
    // If grided is running on an existing app, we need to parse the children and
    // add them as elements;
    [...this.container.children].forEach((el: Element) => {
      // Existing apps will have the dragCanvas as a child. Ignore it
      if (el.id === "dragCanvas") return;

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

      const gridElement = this.addElement(
        {
          id: el.id,
          gridPos: getPosOnGrid(el as HTMLElement),
          mirroredElement: el as HTMLElement,
        },
        false // So we don't update history as well
      );

      // If we have a definition for an element with this ID, use that defintion
      // to place the element on the grid. This allows us to update positions
      // of elements that may already exist.
      const existingElementDefinition = elementDefs.find(
        (elDef) => elDef.id === gridElement.id
      );
      if (existingElementDefinition) {
        gridElement.position = existingElementDefinition;
      }
    });
  }

  // Removes elements the user has added to the grid by id
  removeElements(ids: string | Array<string>) {
    asArray(ids).forEach((elId) => {
      const entryIndex = this.elements.findIndex((el) => el.id === elId);
      this.elements[entryIndex].remove();
      this.elements.splice(entryIndex, 1);
    });

    this.sendUpdate();
  }

  addTract(dir: TractDir, newIndex: number) {
    this.elements.forEach((el) => {
      const startId = dir === "rows" ? "start_row" : "start_col";
      const endId = dir === "rows" ? "end_row" : "end_col";
      const elPosition = el.position;

      if (newIndex >= elPosition[endId]) {
        // no change needed
      } else if (newIndex < elPosition[startId]) {
        // Before item span means everything is shifted up
        elPosition[startId]++;
        elPosition[endId]++;
      } else {
        // Within item span: just end is shifted up
        el[endId] = elPosition[endId]++;
      }
      el.position = elPosition;
    });

    const tractSizes = this.gridLayout[dir];
    tractSizes.splice(newIndex, 0, "1fr");

    this.updateGrid({ [dir]: tractSizes });
  }

  removeTract(dir: TractDir, index: number) {
    // First check for trouble elements before proceeding so we can error out
    // and tell the user why
    const troubleElements: GridItem[] = this.elements.filter((el) => {
      const { startId, endId } = makeStartEndForDir(dir);
      const elPosition = el.position;

      return (
        elPosition[startId] === elPosition[endId] &&
        elPosition[startId] === index
      );
    });

    if (troubleElements.length > 0) {
      showConflictPopup(troubleElements);
      // End early
      return;
    }

    this.elements.forEach((el) => {
      const { startId, endId } = makeStartEndForDir(dir);
      const elPosition = el.position;

      if (elPosition[startId] > index) {
        elPosition[startId]--;
      }
      if (elPosition[endId] >= index) {
        elPosition[endId]--;
      }
      el.position = elPosition;
    });

    const tractSizes = this.gridLayout[dir];
    tractSizes.splice(index - 1, 1);

    this.updateGrid({ [dir]: tractSizes });
  }

  // Just so we dont have to always say makeEl(this.container...)
  makeEl(selTxt: string, opts?: ElementOpts) {
    return makeEl(this.container, selTxt, opts);
  }

  setupDrag(opts: {
    watchingElement: HTMLElement;
    dragDir: DragType;
    gridItem?: GridItem;
    onStart?: (startLoc: XYPos) => void;
    onDrag?: (dragInfo: DragRes) => void;
    onEnd?: (dragInfo: DragRes) => void;
  }) {
    let dragFeedbackRect: HTMLElement;
    let startRect: SelectionRect;
    let startLoc: XYPos;

    const editorEl: HTMLElement = document.querySelector("#grided__editor");

    const updateGridPos = (
      gridItem: GridItem,
      boundingRect: SelectionRect
    ): GridPos => {
      const gridExtent = getDragExtentOnGrid(this, boundingRect);
      gridItem.position = gridExtent;
      return gridExtent;
    };

    opts.watchingElement.onmousedown = (event: MouseEvent) => {
      startLoc = event as DragEvent;

      // If this is a new element drag there wont be a bounding box for the grid
      // element yet, so we need to make a new zero-width/height one at start
      // of the drag
      startRect = opts.gridItem?.boundingRect || {
        left: event.offsetX,
        right: event.offsetX,
        top: event.offsetY,
        bottom: event.offsetY,
      };

      // Make sure that the grid item being dragged is not obscured by other
      // elements on top of it
      this.container.appendChild(opts.gridItem.el);

      dragFeedbackRect = makeEl(
        this.container.querySelector("#dragCanvas"),
        "div.drag-feedback-rect",
        {
          styles: {
            ...boundingRectToCssPos(startRect),
          },
        }
      );

      // We start grid position here in case user selects by simply clicking,
      // which would mean we never get to run the drag function
      updateGridPos(opts.gridItem, startRect);

      if (opts.onStart) opts.onStart(startLoc);

      // Add listener to editor so we can continue to track this drag
      editorEl.addEventListener("mousemove", drag);
      editorEl.addEventListener("mouseup", dragEnd);
    };

    function drag(event: MouseEvent) {
      const currLoc: XYPos = event;
      // Sometimes the drag event gets fired with nonsense zeros
      if (currLoc.x === 0 && currLoc.y === 0) return;

      const newRect = updateRectWithDelta(
        startRect,
        { x: currLoc.x - startLoc.x, y: currLoc.y - startLoc.y },
        opts.dragDir
      );

      Object.assign(dragFeedbackRect.style, boundingRectToCssPos(newRect));

      const gridExtent = updateGridPos(opts.gridItem, newRect);

      if (opts.onDrag) opts.onDrag({ xy: currLoc, grid: gridExtent });
    }

    function dragEnd(event: MouseEvent) {
      const endLoc: XYPos = event;
      dragFeedbackRect.remove();
      startRect = null;
      startLoc = null;
      if (opts.onEnd)
        opts.onEnd({
          xy: endLoc,
          grid: opts.gridItem?.position || getPosOnGrid(this.parentElement),
        });

      editorEl.removeEventListener("mousemove", drag);
      editorEl.removeEventListener("mouseup", dragEnd);
    }
  }

  sendUpdate() {
    this.onUpdate({
      entryType: this.entryType,
      ...this.currentLayout,
    });
  }

  updateTract(opts: {
    tractIndex: number;
    dir: TractDir;
    newValue: string;
    isDragging: boolean;
  }) {
    const { tractIndex, dir, newValue, isDragging } = opts;
    const tractValues = this.gridLayout[dir];
    tractValues[tractIndex - 1] = newValue;

    this.updateGrid({ [dir]: tractValues, dontUpdateHistory: isDragging });
  }

  updateGrid(opts: GridUpdateOptions) {
    // Given a new set of attributes, finds which ones changed and updates the
    // corresponding portions of the grid
    let newNumCells = opts.force ?? false;
    let rowsAndColsUpdated = opts.force ?? false;

    if (this.gridLayout.isUpdatedVal("rows", opts.rows)) {
      if (this.gridLayout.numRows !== opts.rows.length) newNumCells = true;
      rowsAndColsUpdated = true;
      this.gridLayout.rows = opts.rows;
    }

    if (this.gridLayout.isUpdatedVal("cols", opts.cols)) {
      if (this.gridLayout.numCols !== opts.cols.length) newNumCells = true;
      rowsAndColsUpdated = true;
      this.gridLayout.cols = opts.cols;
    }

    if (this.gridLayout.isUpdatedVal("gap", opts.gap)) {
      this.gridLayout.gap = opts.gap;
      this.gapSizeSetting.updateValue(opts.gap);
    }

    if (newNumCells) {
      this.fillGridCells();
      setupNewItemDrag(this);
    }

    if (rowsAndColsUpdated) {
      // Put some filler text into items spanning auto rows so auto behavior
      // is clear to user
      this.elements.forEach((el) => {
        el.fillIfInAutoRow();
      });

      if (this.liveApp) {
        window.dispatchEvent(new Event("resize"));
      }
    }

    this.tractControls.updatePositions();

    if (!opts.dontUpdateHistory) {
      this.sendUpdate();
    }
  }

  fillGridCells() {
    this.currentCells.forEach((e) => e.remove());
    this.currentCells = [];

    for (let rowI = 1; rowI <= this.gridLayout.numRows; rowI++) {
      for (let colI = 1; colI <= this.gridLayout.numCols; colI++) {
        this.currentCells.push(
          this.makeEl(`div.r${rowI}.c${colI}.grid-cell.${gridCellStyles}`, {
            dataProps: { row: rowI, col: colI },
            gridPos: {
              start_row: rowI,
              end_row: rowI,
              start_col: colI,
              end_col: colI,
            },
          })
        );
      }
    }

    this.updateGridTransparency();
    this.tractControls = setupTractControls(this);
  }

  updateGridTransparency() {
    if (this.liveApp) {
      setClass(this.currentCells, "transparent");
    } else {
      removeClass(this.currentCells, "transparent");
    }
  }
} // End of class declaration

const gridCellStyles = css`
  background: var(--off-white, grey);
  border: 1px solid var(--gray, grey);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: var(--element-roundness);

  &.transparent {
    background: none;
  }

  &.selected {
    background: currentColor;
    border: 2px solid var(--light-gray);
  }
`;

const addedElementStyles = css`
  border-radius: var(--element-roundness);
  border-width: 3px;
  border-style: solid;
  transition: border-width 0.2s ease-in-out;
  background: none;
  position: relative;

  &.in-list {
    height: 35px;
    margin: 0 0 5px 0;
    padding: 0.65rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hovered {
    border-width: 7px;
  }

  &.in-list.hovered {
    /* Emphasize by making a bit bigger */
    transform: scale(1.05);
  }

  /* This is filler text to make auto sizing work. It's invisible to the user
     so it doesn't distract. Not sure if this is the best way to do it but I think
     it's worth a go. 
  */
  .fillerText {
    color: rgba(128, 128, 128, 0.5);
    user-select: none;
    display: none;
  }

  &.in-auto-row .fillerText {
    display: block;
  }
`;

const draggerHandle = css`
  --radius: 18px;
  font-size: 12px;
  position: absolute;
  height: var(--radius);
  width: var(--radius);
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--off-white);
  opacity: 0.5;

  & > svg {
    transform: scale(0.85);
  }

  &.top-left {
    top: -2px;
    left: -2px;
    cursor: nw-resize;
  }
  &.bottom-right {
    bottom: -2px;
    right: -2px;
    cursor: se-resize;
  }

  &.center {
    top: calc(50% - var(--radius) / 2);
    right: calc(50% - var(--radius) / 2);
    border-radius: var(--element-roundness);
    cursor: grab;
  }
  &.center:active {
    cursor: grabbing;
  }

  i {
    display: inline-block;
  }

  &.top-left i {
    transform: rotate(315deg);
  }
  &.bottom-right i {
    transform: rotate(135deg);
  }

  &.top-left,
  &.bottom-right {
    border-radius: var(--element-roundness) 0;
  }
`;

const currentSelBox = css`
  border-style: dashed;
  display: none;
  pointer-events: none;
`;

const dragCanvasStyles = css`
  margin-left: calc(-1 * var(--grid-gap));
  margin-top: calc(-1 * var(--grid-gap));
  width: calc(100% + 2 * var(--grid-gap));
  height: calc(100% + 2 * var(--grid-gap));
  grid-row: 1/-1;
  grid-column: 1/-1;
  position: relative;

  .drag-feedback-rect {
    pointer-events: none;
    position: absolute;
    background: linear-gradient(90deg, var(--dark-gray) 50%, transparent 50%),
      linear-gradient(90deg, var(--dark-gray) 50%, transparent 50%),
      linear-gradient(0deg, var(--dark-gray) 50%, transparent 50%),
      linear-gradient(0deg, var(--dark-gray) 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 4px, 15px 4px, 4px 15px, 4px 15px;
    animation: border-dance 16s infinite linear;
  }

  @keyframes border-dance {
    0% {
      background-position: 0 0, 100% 100%, 0 100%, 100% 0;
    }
    100% {
      background-position: 100% 0, 0 100%, 0 0, 100% 100%;
    }
  }
`;

function setupNewItemDrag(appState: LayoutEditor) {
  const currentSelectionBox = new GridItem({
    id: "selection box",
    el: appState.makeEl(
      `div.dragSelectionBox.${addedElementStyles}.${currentSelBox}`
    ),
    parentLayout: appState.gridLayout,
  });
  const dragCanvas = appState.makeEl(`div#dragCanvas.${dragCanvasStyles}`);

  appState.setupDrag({
    watchingElement: dragCanvas,
    gridItem: currentSelectionBox,
    dragDir: "bottom-right",
    onStart: () => {
      // Make the snap-to-grid selection box show up and preview next element
      // color
      currentSelectionBox.style.borderColor = appState.nextColor;
      currentSelectionBox.style.display = "block";
    },
    onEnd: ({ grid }) => {
      elementNamingUi(appState, {
        gridPos: grid,
        selectionBox: currentSelectionBox,
      });
    },
  });

  // Make sure any added elements sit on top by re-appending them to grid holder
  // Make sure that the drag detector sits over everything
  [
    dragCanvas,
    ...appState.container.querySelectorAll(".added-element"),
  ].forEach((el) => appState.container.appendChild(el));
}

function setupTractControls(appState: LayoutEditor) {
  const editorContainer = document.querySelector(
    "#grided__editor"
  ) as HTMLElement;

  const controls: Record<
    TractDir,
    {
      matchedCell: HTMLElement;
      el: HTMLElement;
      controller: CSSInput;
    }[]
  > = {
    rows: buildControlsForDir(appState, "rows", editorContainer),
    cols: buildControlsForDir(appState, "cols", editorContainer),
  };

  updatePositions();

  // Make sure when we scroll or resize the editor window the controls follow
  (editorContainer.querySelector(
    "#editor-app-window"
  ) as HTMLElement).onscroll = () => updatePositions(["rows"]);

  // Use a timeout trick to debounce the tract updating on resizing to only
  // fire after resize is done
  let resizeTimeout: number;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => updatePositions(), 300);
  });

  function updatePositions(whichDirs: TractDir[] = ["rows", "cols"]) {
    const editorPos = editorContainer.getBoundingClientRect();
    const wrapperPos = posRelativeToContainer(
      editorPos,
      editorContainer.querySelector("#editor-wrapper")
    );

    for (const dir of whichDirs) {
      controls[dir].forEach(({ matchedCell, el }) => {
        const boundingRect = posRelativeToContainer(editorPos, matchedCell);

        Object.assign(
          el.style,
          dir === "cols"
            ? {
                left: `calc(${boundingRect.left}px)`,
                width: `calc(${boundingRect.width}px)`,
                top: `calc(${wrapperPos.top}px - var(--editor-top-pad))`,
              }
            : {
                top: `calc(${boundingRect.top}px)`,
                height: `calc(${boundingRect.height}px)`,
                left: `calc(${boundingRect.left}px - var(--editor-left-pad) - ${appState.gridLayout.attrs.gap} - 2px)`,
              }
        );
      });
    }
  }

  return {
    updatePositions,
  };
}

function elementNamingUi(appState: LayoutEditor, { gridPos, selectionBox }) {
  const nameForm = createEl({
    selTxt: `form#nameForm.centered`,
    styles: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "50% 100px",
      gap: "1rem",
      justifyContent: "center",
    },
    children: [
      createEl({
        selTxt: "input#nameInput",
        props: { type: "text" },
        eventListener: {
          // Don't leave warning message up while user is typing
          event: "input",
          func: hideWarningMsg,
        },
      }),
      createEl({ selTxt: "input#nameSubmit", props: { type: "submit" } }),
    ],
    eventListener: {
      // Don't leave warning message up while user is typing
      event: "submit",
      func: function (event) {
        event.preventDefault();
        const id = this["nameInput"].value.replace(/\s/g, "_");

        // Can be replaced with better function operating directly on elements dict
        const elementExists: boolean = !!appState.elements.find(
          (el) => el.id === id
        );

        if (elementExists) {
          // Cant have duplicate ids!
          warnAboutBadId(
            `You already have an element with the id ${id}, all ids need to be unique.`
          );
          return;
        }
        if (id.match(/^[^a-zA-Z]/g)) {
          warnAboutBadId(`Valid ids need to start with a character.`);
          return;
        }

        // Add the new element in to grid
        appState.addElement({ id, gridPos });

        resetElCreation();
      },
    },
  });

  const modal = createFocusModal()
    .setTitle("Name your element:")
    .description(
      `
      This name will be used to place items in your app.
      For instance if you want to place a plot in this element,
      this name will match the label of the plot output
    `
    )
    .addElement(nameForm)
    .onClose(resetElCreation)
    .addToPage()
    .focusOn("nameInput");

  let warningMsg: HTMLElement;

  function warnAboutBadId(msg: string) {
    warningMsg = createEl({
      selTxt: "span#badIdMsg",
      text: msg,
      styles: {
        color: "orangered",
        fontStyle: "italic",
        fontWeight: "lighter",
        fontSize: "0.9rem",
      },
    });
    modal.addElement(warningMsg);
  }
  function hideWarningMsg() {
    if (warningMsg) {
      warningMsg.remove();
    }
  }
  function resetElCreation() {
    // All done here so get rid of the whole interface.
    modal.remove();
    // Remove the temporary dragged element
    selectionBox.style.display = "none";
  }
}

function drawElements(
  appState: LayoutEditor,
  elProps: {
    id: string;
    gridPos: GridPos;
    ui_function?: string;
    mirroredElement?: HTMLElement;
  }
) {
  const { id, mirroredElement, ui_function } = elProps;
  const elColor = appState.nextColor;
  const mirrorsExisting = typeof mirroredElement !== "undefined";
  const gridEl = appState.makeEl(
    `div#${id}.el_${id}.added-element.${addedElementStyles}`,
    {
      innerHTML: fillerText,
      styles: {
        borderColor: appState.nextColor,
        position: "relative",
      },
    }
  );

  const listEl = makeEl(
    document.querySelector("#added-elements"),
    `div.el_${id}.added-element.${addedElementStyles}.in-list`,
    {
      innerHTML: id,
      styles: { borderColor: elColor },
      eventListener: [
        {
          event: "mouseover",
          func: function () {
            this.classList.add("hovered");
            gridEl.classList.add("hovered");
          },
        },
        {
          event: "mouseout",
          func: function () {
            this.classList.remove("hovered");
            gridEl.classList.remove("hovered");
          },
        },
      ],
    }
  );

  const gridItem = new GridItem({
    id,
    el: gridEl,
    mirroredElement,
    ui_function,
    siblingElement: listEl,
    parentLayout: appState.gridLayout,
  });

  // Setup drag behavior
  (["top-left", "bottom-right", "center"] as DragType[]).forEach(
    (handleType: DragType) => {
      appState.setupDrag({
        watchingElement: makeEl(
          gridEl,
          `div.dragger.visible.${draggerHandle}.${handleType}`,
          {
            styles: { background: elColor },
            innerHTML:
              handleType === "center"
                ? dragIcon
                : handleType === "bottom-right"
                ? seArrow
                : nwArrow,
          }
        ),
        gridItem: gridItem,
        dragDir: handleType,
        onEnd: () => {
          appState.sendUpdate();
        },
      });
    }
  );

  if (!mirrorsExisting) {
    // Turn of deleting if were editing an existing app
    // This means that if were in app editing mode and the user adds a new element
    // they can delete that new element but they can't delete the existing elements
    makeEl(listEl, "button.remove-el", {
      innerHTML: trashcanIcon,
      eventListener: {
        event: "click",
        func: () => {
          appState.removeElements(id);
        },
      },
    });
  }

  // Position item properly
  gridItem.position = elProps.gridPos;

  // Place item into the elements list of app state
  appState.elements.push(gridItem);

  return gridItem;
}

function showConflictPopup(conflictingElements: GridItem[]) {
  const conflictingElementsList: string =
    conflictingElements.reduce(
      (idList, el) =>
        `
    ${idList}
    <li> <strong style='font-size: 1.65rem;'> ${el.id} </strong> </li>
    `,
      "<ul>"
    ) + "</ul>";

  const modal = createFocusModal().setTitle(`Sorry! Can't make that update`)
    .description(`<p> This is because it would result in the following elements 
    being removed from your app:</p>
    ${conflictingElementsList}
    <p> Either re-arrange these elements to not reside in the removed grid or 
    column or remove them from your app before running grided.</p>
    `);

  modal.addElement(
    createEl({
      selTxt: "button#acceptResult",
      text: "Okay",
      eventListener: {
        event: "click",
        func: function () {
          modal.remove();
        },
      },
    })
  );

  modal.addToPage();
}
