import { make_el, Event_Listener } from "./make_el";

type Modal_Options = {
  background_callbacks?: Event_Listener | Event_Listener[];
  modal_callbacks?: Event_Listener | Event_Listener[];
  header_text?: string;
}
export function focused_modal(opts: Modal_Options) {
  const background = make_el(
    document.querySelector("#grided__holder"),
    "div.background-blurrer",
    {
      event_listener: opts.background_callbacks,
    }
  );

  const modal = make_el(background, "div.modal", {
    event_listener: opts.modal_callbacks,
  });

  if (opts.header_text) {
    make_el(modal, "div.modal_header", {
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
