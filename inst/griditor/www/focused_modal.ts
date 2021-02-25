import { maybe_make_el, Event_Listener } from "./maybe_make_el";

interface Modal_Options {
  background_callbacks?: Event_Listener | Array<Event_Listener>;
  modal_callbacks?: Event_Listener | Array<Event_Listener>;
  header_text?: string;
}
export function focused_modal(opts: Modal_Options) {
  const background = maybe_make_el(
    document.querySelector("body"),
    "div.background-blurrer",
    {
      event_listener: opts.background_callbacks,
    }
  );

  const modal = maybe_make_el(background, "div.modal", {
    event_listener: opts.modal_callbacks,
  });

  if (opts.header_text) {
    maybe_make_el(modal, "div.modal_header", {
      innerHTML: opts.header_text,
      styles: {
        paddingBottom: "1rem",
      },
    });
  }

  return {
    background,
    modal,
    remove: () => background.remove(),
  };
}
