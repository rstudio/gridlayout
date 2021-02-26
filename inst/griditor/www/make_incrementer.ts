import { make_el } from "./make_el";

// Builds an up down button and value input
export function make_incrementer({
  parent_el,
  start_val = 2,
  id = "incrementer",
  label = "my incrementer",
  on_increment = (x) => console.log(x),
}): (new_value: number) => void {
  const plus_minus_div = make_el(
    parent_el,
    `div#${id}_incrementer.plus_minus_input`,
    {
      innerHTML: `<span>${label}</span>`,
    }
  );

  const inputs_div = make_el(plus_minus_div, "div.controls");

  const minus_btn = make_el(inputs_div, "button.minus_btn", {
    innerHTML: `<i class="fa fa-minus" aria-hidden="true"></i>`,
    event_listener: {
      event: "click",
      func: increment_counter(-1),
    },
  });
  const current_value = make_el(inputs_div, "span.value", {
    innerHTML: start_val.toString(),
  });

  make_el(inputs_div, "button.plus_btn", {
    innerHTML: `<i class="fa fa-plus" aria-hidden="true"></i>`,
    event_listener: {
      event: "click",
      func: increment_counter(1),
    },
  });

  function update_value(new_value: number) {
    current_value.innerHTML = new_value.toString();

    if (new_value === 1) {
      minus_btn.classList.add("disabled");
    } else {
      minus_btn.classList.remove("disabled");
    }
  }
  function increment_counter(amount) {
    return function () {
      const new_value = +current_value.innerHTML + amount;

      update_value(new_value);
      on_increment(new_value);
    };
  }

  return update_value;
}
