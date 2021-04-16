import { make_el, Event_Listener } from "./make_el";
import { as_array, concat_nl } from "./misc-helpers";

type Modal_Options = {
  background_callbacks?: Event_Listener | Event_Listener[];
  modal_callbacks?: Event_Listener | Event_Listener[];
  header_text?: string;
};
export function focused_modal(opts: Modal_Options) {
  const background = make_el(
    document.querySelector("#grided__holder"),
    "div.background-blurrer",
    {
      event_listener: opts.background_callbacks,
    }
  );

  const modal = make_el(background, "div.focused_modal", {
    event_listener: opts.modal_callbacks,
  });

  if (opts.header_text) {
    make_el(modal, "div.focused_modal_header", {
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

export type Code_Text = {
  type: string;
  code: string;
};

export function show_code(
  message: string,
  code_blocks: Code_Text | Array<Code_Text>
) {
  const code_modal = focused_modal({
    header_text: `${message}`,
    modal_callbacks: {
      event: "click",
      func: function (event) {
        // This is needed to stop clicks on modal from triggering the cancel
        // event that is attached to the background
        event.stopPropagation();
      },
    },
    background_callbacks: {
      event: "click",
      func: close_modal,
    },
  });

  as_array(code_blocks).forEach(function (code_to_show) {
    const num_of_lines: number = code_to_show.code.match(/\n/g).length;

    const code_section = make_el(
      code_modal.modal,
      `div#${code_to_show.type}.code_chunk`,
      {
        styles: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "1fr, auto",
          gap: "4px",
          gridTemplateAreas: concat_nl(
            `"code_type copy_btn"`,
            `"code_text code_text"`
          ),
        },
      }
    );

    let code_text: HTMLInputElement;

    make_el(code_section, "strong", {
      innerHTML: code_to_show.type,
      styles: { gridArea: "code_type" },
    });

    make_el(code_section, "button#copy_code", {
      innerHTML: "Copy to clipboard",
      styles: { gridArea: "copy_btn" },
      event_listener: {
        event: "click",
        func: function () {
          code_text.select();
          document.execCommand("copy");
        },
      },
    });

    code_text = make_el(code_section, "textarea#code_for_layout", {
      innerHTML: code_to_show.code,
      props: { rows: num_of_lines + 3 },
      styles: {
        width: "100%",
        background: "#f3f2f2",
        fontFamily: "monospace",
        display: "block",
        padding: "0.75rem",
        marginBottom: "10px",
        borderRadius: "5px",
        gridArea: "code_text",
      },
    }) as HTMLInputElement;
  });

  const action_buttons = make_el(code_modal.modal, "div#action_buttons", {
    styles: {
      display: "flex",
      justifyContent: "space-around",
    },
  });
  make_el(action_buttons, "button#close_code_model", {
    innerHTML: "Close",
    event_listener: {
      event: "click",
      func: close_modal,
    },
  });

  function close_modal() {
    code_modal.remove();
  }
}