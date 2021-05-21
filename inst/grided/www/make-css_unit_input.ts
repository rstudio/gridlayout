import {
  browser_header_html,
  horizontal_drag_icon,
  vertical_drag_icon,
} from "./utils-icons";
import { make_el } from "./make-elements";
import { App_State, update_grid } from "./App_State";
import { make_template_start_end } from "./utils-grid";
import { Tract_Dir } from "./Grid_Layout";

export type CSS_Input = {
  form: HTMLElement;
  current_value: () => string;
  update_value: (new_value: string) => void;
};

type unit_options = "fr" | "px" | "rem" | "auto";

const default_values = {
  fr: "1",
  px: "100",
  rem: "2",
};

export function get_css_unit(css_size: string): unit_options {
  return (css_size.match(/(px|\%|rem|fr|auto)/g)[0] || "px") as unit_options;
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
}): CSS_Input {
  let current_unit = start_unit;

  const form = make_el(parent_el, `form${selector}.css-unit-input`, {
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

  const value_input = <HTMLInputElement>(
    make_el(form, "input.css-unit-input-value", {
      props: {
        type: "number",
        min: 0,
        value: start_val,
        step: 1,
        "aria-live": "polite",
      },
    })
  );

  const unit_selector = <HTMLSelectElement>(
    make_el(form, "select.css-unit-input-select", {
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

  function unit_type(): unit_options {
    return unit_selector.value as unit_options;
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
        value_input.value === default_values[current_unit];
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

export function make_grid_tract_control(
  app_state: App_State,
  opts: {
    size: string;
    dir: Tract_Dir;
    tract_index: number;
  }
): CSS_Input {
  const { size, dir, tract_index } = opts;

  const styles_for_holder: Record<string, string> = {};
  if (dir === "rows") {
    Object.assign(styles_for_holder, {
      gridRow: make_template_start_end(tract_index),
      justifyContent: "end",
      alignContent: "center",
    });
  } else {
    Object.assign(styles_for_holder, {
      gridColumn: make_template_start_end(tract_index),
      justifyContent: "center",
      alignContent: "start",
    });
  }

  const holder = make_el(
    app_state.container,
    `div#control_${dir}${tract_index}.${dir}-controls`,
    {
      styles: styles_for_holder,
    }
  );
  const unit_input = make_css_unit_input({
    parent_el: holder,
    selector: `.unit-input`,
    start_val: get_css_value(size),
    start_unit: get_css_unit(size),
    on_change: (new_val: string) => {
      show_or_hide_dragger(new_val);
      update_grid(app_state, app_state.layout_from_controls);
    },
  });

  const value_input = <HTMLInputElement>(
    unit_input.form.querySelector(".css-unit-input-value")
  );
  const drag_dir = dir === "rows" ? "y" : "x";

  const resizer = make_el(holder, "div.css-unit-input-dragger", {
    innerHTML: dir === "rows" ? vertical_drag_icon : horizontal_drag_icon,
  });
  // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.
  make_el(resizer, "div.css-unit-input-drag-detector", {
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
          update_grid(app_state, {
            ...app_state.layout_from_controls,
            dont_send_to_shiny: true,
          });
        },
      },
      {
        event: "dragend",
        func: function (event) {
          update_grid(app_state, app_state.layout_from_controls);
        },
      },
    ],
  });

  make_el(holder, "button.addButton.addAfter", {
    innerHTML: "+",
    event_listener: {
      event: "click",
      func: (event: Event) => {
        console.log(`Add ${dir} after ${tract_index}`);
        app_state.add_tract(dir, tract_index);
      },
    },
  });
  make_el(holder, "button.addButton.addBefore", {
    innerHTML: "+",
    event_listener: {
      event: "click",
      func: (event: Event) => {
        console.log(`Add ${dir} before ${tract_index}`);
        app_state.add_tract(dir, tract_index-1);
      },
    },
  });
  make_el(holder, "button.addButton.removeThis", {
    innerHTML: "-",
    event_listener: {
      event: "click",
      func: (event: Event) => {
        console.log(`Remove ${dir} ${tract_index}`);
      },
    },
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
