import { css } from "@emotion/css";
import { TractDir } from "./GridLayout";
import { LayoutEditor } from "./Layout_Editor";
import { make_el, tract_add_or_remove_button } from "./make-elements";
import { horizontal_drag_icon, vertical_drag_icon } from "./utils-icons";

const css_unit_input = css`
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

  .value_input.disabled {
    opacity: 0.15;
    pointer-events: none;
  }
`;

export type CSSInput = {
  form: HTMLElement;
  current_value: () => string;
  update_value: (new_value: string) => void;
};

type UnitOptions = "fr" | "px" | "rem" | "auto";

const default_values = {
  fr: "1",
  px: "100",
  rem: "2",
};

export function get_css_unit(css_size: string): UnitOptions {
  return (css_size.match(/(px|\%|rem|fr|auto)/g)[0] || "px") as UnitOptions;
}

export function get_css_value(css_size: string): number | null {
  const value = css_size.match(/^[\d|\.]*/g)[0];
  return value === "" ? null : Number(value);
}

// =============================================================================
// From here on are a series of general purpose helper functions not
// specifically related to the app and its state
// Input with value text box on left and unit selector dropdown on right
// Used to make valid css sizes
export function make_css_unit_input({
  parent_el,
  selector = "",
  start_val = 1,
  start_unit = "fr",
  on_change = (x: string) => console.log("css unit change", x),
  allowed_units = ["fr", "px", "rem", "auto"],
  snap_to_defaults = true,
}): CSSInput {
  let current_unit = start_unit;

  const form = make_el(parent_el, `form${selector}.${css_unit_input}`, {
    event_listener: [
      { event: "change", func: on_update },
      {
        event: "submit",
        func: function (e) {
          // Needed to stop pressing enter causing page to refresh
          e.preventDefault();
        },
      },
    ],
  });

  const value_input = <HTMLInputElement>make_el(form, "input.value-input", {
    props: {
      type: "number",
      min: 0,
      value: start_val,
      step: 1,
      "aria-live": "polite",
    },
  });

  const unit_selector = <HTMLSelectElement>(
    make_el(form, "select.unit-selector", {
      props: { name: "units" },
    })
  );

  allowed_units.forEach(function (unit_type) {
    const unit_option = <HTMLOptionElement>(
      make_el(unit_selector, `option.${unit_type}`, {
        props: { value: unit_type },
        innerHTML: unit_type,
      })
    );

    if (unit_type === start_unit) {
      unit_option.selected = true;
    }
  });

  function unit_type(): UnitOptions {
    return unit_selector.value as UnitOptions;
  }
  function num_units() {
    return value_input.value;
  }
  function current_value() {
    if (unit_type() === "auto") return "auto";
    return `${num_units()}${unit_type()}`;
  }

  function on_update() {
    const val = current_value();
    update_value(val);
    on_change(val);
  }

  function update_value(new_value: string) {
    const units = get_css_unit(new_value);
    const count = get_css_value(new_value);

    if (count === null && units === "auto") {
      // Using a unit without values so disable value input
      value_input.classList.add("disabled");
      value_input.value = "";
    } else {
      value_input.classList.remove("disabled");

      // If the user is flipping through multiple units we dont want to just
      // stick to whatever value was last set as the unit unless they've changed
      // it from the default. E.g. flipping from default of 100px to rem
      // shouldn't result in a 100rem wide track which then needs to be adjusted
      const using_old_units_default =
        value_input.value === default_values[current_unit] && snap_to_defaults;
      value_input.value =
        count === null || using_old_units_default
          ? default_values[units]
          : count.toString();
    }

    for (let opt of unit_selector.children as HTMLCollectionOf<
      HTMLOptionElement
    >) {
      opt.selected = opt.value === units;
    }

    current_unit = units;
  }

  update_value(`${start_val}${start_unit}`);

  return { form, current_value, update_value };
}

const tract_controls = css`
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

  .remove-row,
  .remove-col {
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

export function build_controls_for_dir(
  app_state: LayoutEditor,
  dir: TractDir,
  editor_container: HTMLElement
) {
  // This is the class of the first grid cell for each row or column
  const target_class = dir === "rows" ? "c1" : "r1";
  const dir_singular = dir === "rows" ? "row" : "col";

  // Make sure we dont have any controls hanging around
  editor_container
    .querySelectorAll(`.${dir}-controls`)
    .forEach((el) => el.remove());

  // Builds the controls and tract addition buttons for all cells
  return app_state.current_cells
    .filter((el) => el.classList.contains(target_class))
    .map((el) => {
      const tract_index: number = +el.dataset[dir_singular];

      const holder_el = make_el(
        editor_container,
        `div#controller_for_${dir_singular}_${tract_index}.tract-controls.${tract_controls}.${dir}-controls`
      );

      if (tract_index === 1) {
        // Add an additional button before the first row and column. Otherwise
        // the user would not be able to add a row or column at the very start
        // of the grid.
        tract_add_or_remove_button(app_state, {
          parent_el: holder_el,
          add_or_remove: "add",
          dir,
          tract_index: 0,
          additional_styles: {
            [dir === "rows" ? "top" : "left"]: "var(--incrementer-offset)",
          },
        });
      }

      tract_add_or_remove_button(app_state, {
        parent_el: holder_el,
        add_or_remove: "add",
        dir,
        tract_index,
      });

      return {
        matched_cell: el,
        el: holder_el,
        controller: make_grid_tract_control(holder_el, app_state, {
          dir: dir as TractDir,
          size: app_state.grid_layout[dir][tract_index - 1],
          tract_index,
        }),
      };
    });
}

export function make_grid_tract_control(
  holder: HTMLElement,
  app_state: LayoutEditor,
  opts: {
    size: string;
    dir: TractDir;
    tract_index: number;
  }
): CSSInput {
  const { size, dir, tract_index } = opts;

  function send_update({ is_dragging }: { is_dragging: boolean }) {
    app_state.update_tract({
      tract_index,
      dir,
      new_value: unit_input.current_value(),
      is_dragging,
    });
  }

  const unit_input = make_css_unit_input({
    parent_el: holder,
    selector: `.unit-input.${dir}-sizing`,
    start_val: get_css_value(size),
    start_unit: get_css_unit(size),
    on_change: (new_val: string) => {
      show_or_hide_dragger(new_val);
      send_update({ is_dragging: false });
    },
  });

  const value_input = <HTMLInputElement>(
    unit_input.form.querySelector(".value-input")
  );
  const drag_dir = dir === "rows" ? "y" : "x";

  const resizer = make_el(holder, "div.dragger", {
    innerHTML: dir === "rows" ? vertical_drag_icon : horizontal_drag_icon,
  });
  // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.
  make_el(resizer, "div.drag-detector", {
    props: { draggable: true },
    event_listener: [
      {
        event: "dragstart",
        func: function (event) {
          this.dataset.baseline = value_input.value;
          this.dataset.start = event[drag_dir];
        },
      },
      {
        event: "drag",
        func: function (event) {
          const drag_pos = event[drag_dir];
          // At the end of the drag we get a drag event with 0 values that throws stuff off
          if (drag_pos === 0) return;
          const new_value = Math.max(
            0,
            +this.dataset.baseline + (event[drag_dir] - this.dataset.start)
          );
          value_input.value = new_value.toString();
          send_update({ is_dragging: true });
        },
      },
      {
        event: "dragend",
        func: function (event) {
          send_update({ is_dragging: false });
        },
      },
    ],
  });

  tract_add_or_remove_button(app_state, {
    parent_el: holder,
    add_or_remove: "remove",
    dir,
    tract_index,
  });

  function show_or_hide_dragger(curr_val: string) {
    if (get_css_unit(curr_val) === "px") {
      holder.classList.add("with-drag");
    } else {
      holder.classList.remove("with-drag");
    }
  }
  show_or_hide_dragger(unit_input.current_value());

  return unit_input;
}
