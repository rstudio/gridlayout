import { maybe_make_el } from "./maybe_make_el";

export function focused_modal({
  background_callbacks,
  modal_contents,
  modal_callbacks,
}) {
  const background = maybe_make_el(
    document.querySelector("body"),
    "div.background-blurrer",
    {
      event_listener: background_callbacks,
    }
  );

  return {
    background,
    modal: maybe_make_el(background, "div.modal", {
      innerHTML: modal_contents,
      event_listener: modal_callbacks,
    }),
    remove: () => background.remove(),
  };
}
