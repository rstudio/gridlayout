import {
  browser_header_html,
  horizontal_drag_icon,
  vertical_drag_icon,
} from "./utils-icons";
import { make_el } from "./make-elements";

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
  on_drag = on_change,
  allowed_units = ["fr", "px", "rem", "auto"],
  form_styles = {},
  drag_dir = "none",
}): CSS_Input {
  const allow_drag = drag_dir !== "none";
  let current_unit = start_unit;

  const form = make_el(parent_el, `form${selector}.css-unit-input`, {
    styles: form_styles,
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

  const resizer = make_el(form, "div.css-unit-input-dragger", {
    innerHTML: drag_dir === "y" ? vertical_drag_icon : horizontal_drag_icon,
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
          on_drag();
        },
      },
      {
        event: "dragend",
        func: function (event) {
          on_change(current_value());
        },
      },
    ],
  });

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

      const using_old_units_default = value_input.value === default_values[current_unit];
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

    if (units === "px" && allow_drag) {
      form.classList.add("with-drag");
    } else {
      form.classList.remove("with-drag");
    }

    current_unit = units;
  }

  update_value(`${start_val}${start_unit}`);

  return { form, current_value, update_value };
}
