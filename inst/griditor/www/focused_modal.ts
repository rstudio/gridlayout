import { maybe_make_el, Event_Listener} from "./maybe_make_el";

interface Modal_Options {
  background_callbacks?: Event_Listener | Array<Event_Listener>;
  modal_callbacks?: Event_Listener | Array<Event_Listener>;
  modal_contents: string;
}
export function focused_modal(opts: Modal_Options) {
  const background = maybe_make_el(
    document.querySelector("body"),
    "div.background-blurrer",
    {
      event_listener: opts.background_callbacks,
    }
  );

  return {
    background,
    modal: maybe_make_el(background, "div.modal", {
      innerHTML: opts.modal_contents,
      event_listener: opts.modal_callbacks,
    }),
    remove: () => background.remove(),
  };
}
