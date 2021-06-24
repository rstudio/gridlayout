import { css } from "@emotion/css";
import { TractDir } from "./GridLayout";
import { LayoutEditor } from "./LayoutEditor";
import { makeEl } from "./make-elements";
import { horizontalDragIcon, verticalDragIcon } from "./utils-icons";
import { AddOrRemoveButton } from "./web-components/add-or-remove-button";

const cssUnitInput = css`
  display: grid;
  grid-template-columns: repeat(2, 55px);
  justify-content: center; /* Make sure to sit in middle of control */
  grid-gap: 2px;
  padding: 0.5rem;
  pointer-events: none;
  /* Prevents card styling when set to every child from spilling into input divs */
  box-shadow: none !important;

  &.cols-sizing {
    width: 90%;
    grid-template-columns: repeat(auto-fit, 55px);
  }

  & > * {
    pointer-events: all;
  }

  select,
  input {
    align-self: stretch;
    justify-self: stretch;
    height: 1.75rem;
    font-size: 1.1rem;
  }

  .valueInput.disabled {
    opacity: 0.15;
    pointer-events: none;
  }
`;

export type CSSInput = {
  form: HTMLElement;
  currentValue: () => string;
  updateValue: (newValue: string) => void;
};

type UnitOptions = "fr" | "px" | "rem" | "auto";

const defaultValues = {
  fr: "1",
  px: "100",
  rem: "2",
};

export function getCssUnit(cssSize: string): UnitOptions {
  return (cssSize.match(/(px|\%|rem|fr|auto)/g)[0] || "px") as UnitOptions;
}

export function getCssValue(cssSize: string): number | null {
  const value = cssSize.match(/^[\d|\.]*/g)[0];
  return value === "" ? null : Number(value);
}

// =============================================================================
// From here on are a series of general purpose helper functions not
// specifically related to the app and its state
// Input with value text box on left and unit selector dropdown on right
// Used to make valid css sizes
export function makeCssUnitInput({
  parentEl,
  selector = "",
  startVal = 1,
  startUnit = "fr",
  onChange = (x: string) => console.log("css unit change", x),
  allowedUnits = ["fr", "px", "rem", "auto"],
  snapToDefaults = true,
}): CSSInput {
  let currentUnit = startUnit;

  const form = makeEl(parentEl, `form${selector}.${cssUnitInput}`, {
    eventListener: [
      { event: "change", func: onUpdate },
      {
        event: "submit",
        func: function (e) {
          // Needed to stop pressing enter causing page to refresh
          e.preventDefault();
        },
      },
    ],
  });

  const valueInput = <HTMLInputElement>makeEl(form, "input.value-input", {
    props: {
      type: "number",
      min: 0,
      value: startVal,
      step: 1,
      "aria-live": "polite",
    },
  });

  const unitSelector = <HTMLSelectElement>makeEl(form, "select.unit-selector", {
    props: { name: "units" },
  });

  allowedUnits.forEach(function (unitType) {
    const unitOption = <HTMLOptionElement>(
      makeEl(unitSelector, `option.${unitType}`, {
        props: { value: unitType },
        innerHTML: unitType,
      })
    );

    if (unitType === startUnit) {
      unitOption.selected = true;
    }
  });

  function unitType(): UnitOptions {
    return unitSelector.value as UnitOptions;
  }
  function numUnits() {
    return valueInput.value;
  }
  function currentValue() {
    if (unitType() === "auto") return "auto";
    return `${numUnits()}${unitType()}`;
  }

  function onUpdate() {
    const val = currentValue();
    updateValue(val);
    onChange(val);
  }

  function updateValue(newValue: string) {
    const units = getCssUnit(newValue);
    const count = getCssValue(newValue);

    if (count === null && units === "auto") {
      // Using a unit without values so disable value input
      valueInput.classList.add("disabled");
      valueInput.value = "";
    } else {
      valueInput.classList.remove("disabled");

      // If the user is flipping through multiple units we dont want to just
      // stick to whatever value was last set as the unit unless they've changed
      // it from the default. E.g. flipping from default of 100px to rem
      // shouldn't result in a 100rem wide track which then needs to be adjusted
      const usingOldUnitsDefault =
        valueInput.value === defaultValues[currentUnit] && snapToDefaults;
      valueInput.value =
        count === null || usingOldUnitsDefault
          ? defaultValues[units]
          : count.toString();
    }

    for (let opt of unitSelector.children as HTMLCollectionOf<
      HTMLOptionElement
    >) {
      opt.selected = opt.value === units;
    }

    currentUnit = units;
  }

  updateValue(`${startVal}${startUnit}`);

  return { form, currentValue, updateValue };
}

const tractControls = css`
  display: grid;
  gap: 0.25rem;
  position: absolute;

  &.disabled {
    display: none;
  }

  &.cols-controls {
    height: var(--editor-top-pad);
    padding-bottom: 5px;
    grid-template-areas:
      ".        remove-tract  .       "
      "cssInput cssInput    cssInput"
      "dragger  dragger     dragger ";
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    justify-items: center;
    align-content: end;
  }

  &.cols-controls .css-unit-input {
    width: 90%;
    grid-template-columns: repeat(auto-fit, 55px);
  }

  &.rows-controls {
    width: var(--editor-left-pad);
    padding-right: 0.5rem;
    align-items: center;
    grid-template-areas:
      "remove-tract cssInput"
      "remove-tract dragger ";
    /* grid-template-columns: auto minmax(50px, 200px); */
    justify-content: end;
    align-content: center;
  }

  add-or-remove-button {
    grid-area: remove-tract;
  }

  .unit-input {
    padding: 0;
    grid-area: cssInput;
  }

  .dragger {
    display: none;
    justify-content: center;
    align-items: center;
    cursor: grab;
    border: 1px solid var(--dark-gray);
    border-radius: 4px;
    color: var(--off-black);
    height: 15px;
    grid-area: dragger;
    position: relative; /* So the drag detector div can be sized correctly */
  }
  .dragger:active {
    cursor: grabbing;
  }

  &.with-drag .dragger {
    display: flex;
    width: 100%;
    max-width: 80px;
    justify-self: center;
  }

  .drag-detector {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: steelblue;
    opacity: 0;
  }
`;

export function buildControlsForDir(
  appState: LayoutEditor,
  dir: TractDir,
  editorContainer: HTMLElement
) {
  // This is the class of the first grid cell for each row or column
  const targetClass = dir === "rows" ? "c1" : "r1";
  const dirSingular = dir === "rows" ? "row" : "col";

  // Make sure we dont have any controls hanging around
  editorContainer
    .querySelectorAll(`.${dir}-controls`)
    .forEach((el) => el.remove());

  // Builds the controls and tract addition buttons for all cells
  return appState.currentCells
    .filter((el) => el.classList.contains(targetClass))
    .map((el) => {
      const tractIndex: number = +el.dataset[dirSingular];

      const holderEl = makeEl(
        editorContainer,
        `div#controller-for-${dirSingular}-${tractIndex}.tract-controls.${tractControls}.${dir}-controls`
      );

      if (tractIndex === 1) {
        // Add an additional button before the first row and column. Otherwise
        // the user would not be able to add a row or column at the very start
        // of the grid.
        holderEl.appendChild(
          new AddOrRemoveButton()
            .setAddOrRemove("add")
            .setRowOrCol(dirSingular)
            .setFirst()
            .onPress(() => {
              appState.addTract(dir, 0);
            })
        );
      }

      holderEl.appendChild(
        new AddOrRemoveButton()
          .setAddOrRemove("add")
          .setRowOrCol(dirSingular)
          .onPress(() => {
            appState.addTract(dir, tractIndex);
          })
      );

      return {
        matchedCell: el,
        el: holderEl,
        controller: makeGridTractControl(holderEl, appState, {
          dir: dir as TractDir,
          size: appState.gridLayout[dir][tractIndex - 1],
          tractIndex,
        }),
      };
    });
}

export function makeGridTractControl(
  holder: HTMLElement,
  appState: LayoutEditor,
  opts: {
    size: string;
    dir: TractDir;
    tractIndex: number;
  }
): CSSInput {
  const { size, dir, tractIndex } = opts;

  function sendUpdate({ isDragging }: { isDragging: boolean }) {
    appState.updateTract({
      tractIndex,
      dir,
      newValue: unitInput.currentValue(),
      isDragging,
    });
  }

  const unitInput = makeCssUnitInput({
    parentEl: holder,
    selector: `.unit-input.${dir}-sizing`,
    startVal: getCssValue(size),
    startUnit: getCssUnit(size),
    onChange: (newVal: string) => {
      showOrHideDragger(newVal);
      sendUpdate({ isDragging: false });
    },
  });

  const valueInput = <HTMLInputElement>(
    unitInput.form.querySelector(".value-input")
  );
  const dragDir = dir === "rows" ? "y" : "x";

  const resizer = makeEl(holder, "div.dragger", {
    innerHTML: dir === "rows" ? verticalDragIcon : horizontalDragIcon,
  });
  // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.
  makeEl(resizer, "div.drag-detector", {
    props: { draggable: true },
    eventListener: [
      {
        event: "dragstart",
        func: function (event) {
          this.dataset.baseline = valueInput.value;
          this.dataset.start = event[dragDir];
        },
      },
      {
        event: "drag",
        func: function (event) {
          const dragPos = event[dragDir];
          // At the end of the drag we get a drag event with 0 values that throws stuff off
          if (dragPos === 0) return;
          const newValue = Math.max(
            0,
            +this.dataset.baseline + (event[dragDir] - this.dataset.start)
          );
          valueInput.value = newValue.toString();
          sendUpdate({ isDragging: true });
        },
      },
      {
        event: "dragend",
        func: function (event) {
          sendUpdate({ isDragging: false });
        },
      },
    ],
  });

  holder.appendChild(
    new AddOrRemoveButton()
      .setAddOrRemove("remove")
      .setRowOrCol(dir)
      .onPress(() => {
        appState.removeTract(dir, tractIndex);
      })
  );

  function showOrHideDragger(currVal: string) {
    if (getCssUnit(currVal) === "px") {
      holder.classList.add("with-drag");
    } else {
      holder.classList.remove("with-drag");
    }
  }
  showOrHideDragger(unitInput.currentValue());

  return unitInput;
}
