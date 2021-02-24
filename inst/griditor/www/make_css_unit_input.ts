import { maybe_make_el } from "./maybe_make_el";
import { get_css_value, get_css_unit } from "./index";


export interface CSS_Input {
  form: HTMLElement, 
  current_value: () => string,
  update_value: (new_value: string) => void 
};
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
  on_change = (x) => console.log("css unit change", x),
  allowed_units = ["fr", "px", "rem"],
  form_styles = {},
  drag_dir = "none",
}): CSS_Input {
  const allow_drag = drag_dir !== "none";

  const input_holder = maybe_make_el(
    parent_el,
    `div${selector}.input-holder.css-unit-input`,
    {
      styles: form_styles,
    }
  );

  const form = maybe_make_el(input_holder, `form`, {
    event_listener: { event: "change", func: on_update },
  });

  const value_input = maybe_make_el(form, "input", {
    props: {
      type: "number",
      min: 0,
      value: start_val,
      step: 1,
      "aria-live": "polite",
    },
    styles: {
      minWidth: "30px",
      width: "100%",
      maxWidth: "55px",
    },
  });

  const unit_selector = maybe_make_el(form, "select", {
    props: { name: "units" },
    styles: {
      minWidth: "20px",
      marginLeft: "3px",
    },
  });

  const resizer = maybe_make_el(input_holder, "div.css-dragger", {
    innerHTML: `<i class="fa fa-arrows-${
      drag_dir === "y" ? "v" : "h"
    }" aria-hidden="true"></i>`,
  });

  // Place an invisible div over the main one that we let be dragged. This means
  // we can use the nice drag interaction callbacks without the ugly default
  // drag behavior of two copies of the div and zooming back to the start pos etc.
  maybe_make_el(resizer, "div.detector", {
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
          value_input.value = new_value;
          on_change(current_value());
        },
      },
    ],
  });

  allowed_units.forEach(function (unit_type) {
    const unit_option = maybe_make_el(unit_selector, `option.${unit_type}`, {
      props: { value: unit_type },
      innerHTML: unit_type,
    });

    if (unit_type === start_unit) {
      unit_option.selected = true;
    }
  });
  function current_value() {
    return `${value_input.value}${unit_selector.value}`;
  }
  function on_update() {
    const val = current_value();
    update_value(val);
    on_change(val);
  }

  function update_value(new_value) {
    value_input.value = get_css_value(new_value);
    const new_unit = get_css_unit(new_value);
    [...unit_selector.children].forEach((opt) => {
      if (opt.value === new_unit) {
        opt.selected = true;
      } else {
        opt.selected = false;
      }
    });

    if (new_unit === "px" && allow_drag) {
      resizer.style.display = "block";
    } else {
      resizer.style.display = "none";
    }
  }

  update_value(`${start_val}${start_unit}`);

  return { form, current_value, update_value };
}
