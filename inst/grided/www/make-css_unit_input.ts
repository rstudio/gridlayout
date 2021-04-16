import { horizontal_drag_icon, vertical_drag_icon } from "./utils-icons";
import { make_el } from "./make-elements";
import { get_css_value, get_css_unit } from "./utils-misc";

export type CSS_Input = {
  form: HTMLElement;
  current_value: () => string;
  update_value: (new_value: string) => void;
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
  allowed_units = ["fr", "px", "rem"],
  form_styles = {},
  drag_dir = "none",
}): CSS_Input {
  const allow_drag = drag_dir !== "none";

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
        func: function(event){
          on_change(current_value());
        }
      }
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
  function current_value() {
    return `${value_input.value}${unit_selector.value}`;
  }
  function on_update() {
    const val = current_value();
    update_value(val);
    on_change(val);
  }

  function update_value(new_value: string) {
    value_input.value = get_css_value(new_value).toString();
    const new_unit = get_css_unit(new_value);

    for (let opt of unit_selector.children as HTMLCollectionOf<
      HTMLOptionElement
    >) {
      opt.selected = opt.value === new_unit;
    }

    if (new_unit === "px" && allow_drag) {
      form.classList.add("with-drag");
    } else {
      form.classList.remove("with-drag");
    }
  }

  update_value(`${start_val}${start_unit}`);

  return { form, current_value, update_value };
}
