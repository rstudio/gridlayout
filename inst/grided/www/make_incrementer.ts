import { minus_icon, plus_icon } from "./icons";
import { make_el } from "./make_el";

// Builds an up down button and value input
export function make_incrementer({
  parent_el,
  start_val = 2,
  id = "incrementer",
  label = "my incrementer",
  on_increment = (x) => console.log(x),
}): (new_value: number) => void {
  let current_value: number = start_val;
  const plus_minus_div = make_el(
    parent_el,
    `div#${id}_incrementer.plus-minus-input.settings-grid`,
    {
      innerHTML: `<span class = "label">${label}</span>`,
    }
  );

  const inputs_div = make_el(plus_minus_div, "div.plus-minus-input-controls");

  const minus_btn = make_el(inputs_div, "button.plus-minus-input-btn.minus", {
    props: { name: "plus button" },
    innerHTML: minus_icon,
    event_listener: {
      event: "click",
      func: increment_counter(-1),
    },
  });

  const value_label = make_el(inputs_div, "span.plus-minus-input-value", {
    innerHTML: start_val.toString(),
  });

  make_el(inputs_div, "button.plus-minus-input-btn.plus", {
    props: { name: "minus button" },
    innerHTML: plus_icon,
    event_listener: {
      event: "click",
      func: increment_counter(1),
    },
  });

  function update_value(new_value: number) {
    // Dont waste time if value hasn't changed
    if (current_value == new_value) return;

    value_label.innerHTML = new_value.toString();

    if (new_value === 1) {
      minus_btn.classList.add("disabled");
    } else {
      minus_btn.classList.remove("disabled");
    }

    current_value = new_value;
  }
  function increment_counter(amount) {
    return function () {
      const new_value = +value_label.innerHTML + amount;

      update_value(new_value);
      on_increment(new_value);
    };
  }

  return update_value;
}
