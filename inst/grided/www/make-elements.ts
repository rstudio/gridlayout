import { css } from "@emotion/css";
import { GridPos } from "./GridItem";
import { TractDir } from "./GridLayout";
import { LayoutEditor } from "./LayoutEditor";
import { setElementInGrid } from "./utils-grid";
import { plusIcon, trashcanIcon } from "./utils-icons";
import { asArray } from "./utils-misc";

export type EventListener = {
  event: string;
  func: (event: Event) => void;
};

type ElementContents = {
  selTxt: string;
  text?: string;
  children?: HTMLElement[];
  styles?: object;
  props?: object;
  eventListener?: EventListener | EventListener[];
};

export type ElementOpts = {
  eventListener?: EventListener | EventListener[];
  styles?: object;
  innerHTML?: string;
  dataProps?: object;
  gridPos?: GridPos;
  props?: object;
};

export function parseSelectorText(selTxt: string) {
  // Safari doesn't support lookbehinds for regex so we have to make it manually
  const idMatch: RegExpMatchArray = selTxt.match(/#([^\.]+)/g);
  const elId = idMatch ? idMatch[0].replace("#", "") : null;

  const allClasses: RegExpMatchArray = selTxt.match(/\.([^\.#]+)/g);
  const classList = allClasses
    ? [...allClasses].map((c) => c.replace(".", ""))
    : null;
  return {
    tagType: selTxt.match(/^([^#\.]+)+/g)[0],
    elId,
    classList,
  };
}

// This is a heavy-lifter that takes care of building elements and placing them
// on the grid etc.. It only create's an element if it needs to, which means
// that we dont get dom leaks caused by recalling stuff over and over again.
export function makeEl(
  parent: HTMLElement,
  selTxt: string,
  opts: ElementOpts = {}
) {
  let el: HTMLElement = parent.querySelector(selTxt);
  if (!el) {
    // Element doesn't exists so we need to make it
    el = createEl({ selTxt });

    if (opts.props) {
      Object.assign(el, opts.props);
    }

    parent.appendChild(el);
  }

  if (opts.eventListener) {
    asArray(opts.eventListener).forEach(
      (listener) => (el["on" + listener.event] = listener.func)
    );
  }

  if (opts.styles) {
    Object.assign(el.style, opts.styles);
  }

  if (opts.innerHTML) {
    el.innerHTML = opts.innerHTML;
  }

  if (opts.dataProps) {
    Object.assign(el.dataset, opts.dataProps);
  }

  if (opts.gridPos) {
    setElementInGrid(el, opts.gridPos);
  }

  return el;
}

export function shadowEl(selTxt: string, ...children: HTMLElement[]) {
  const shadowHolder = blockEl(selTxt);
  shadowHolder.attachShadow({ mode: "open" });
  const styleSheet = document.createElement("style");

  shadowHolder.shadowRoot.appendChild(styleSheet);
  children.forEach((childEl) => shadowHolder.shadowRoot.appendChild(childEl));
  return {
    el: shadowHolder,
    styleSheet,
  };
}

export function createEl(opts: ElementContents): HTMLElement {
  const { tagType, elId, classList } = parseSelectorText(opts.selTxt);

  const el: HTMLElement = document.createElement(tagType);
  if (elId) el.id = elId;
  if (classList) {
    classList.forEach((x) => el.classList.add(x));
  }

  if (opts.text) {
    el.innerHTML = opts.text;
  }

  if (opts.children) {
    opts.children.forEach((childEl) => el.appendChild(childEl));
  }

  if (opts.styles) {
    Object.assign(el.style, opts.styles);
  }

  if (opts.props) {
    Object.assign(el, opts.props);
  }

  if (opts.eventListener) {
    asArray(opts.eventListener).forEach(
      (listener) => (el["on" + listener.event] = listener.func)
    );
  }

  return el;
}

export function blockEl(selTxt: string, ...children: HTMLElement[]) {
  return createEl({
    selTxt,
    children,
  });
}

export function textEl(selTxt: string, text: string) {
  return createEl({
    selTxt,
    text,
  });
}
const incrementerButtonClass = css`
  font-size: 15px;
  height: 2em;
  width: 2em;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid rgba(255, 255, 255, 0);
  padding: 0;
  color: var(--dark-gray, gray);
  transition: color 0.2s, background-color 0.2s;

  &.remove-col {
    font-size: 12px;
  }

  &.add-row,
  &.add-col {
    /* This offset is enough to place the button on the outside of the row/column
      spanning div and centered in the grid tract */
    --incrementer-offset: calc(-1em - var(--grid-gap) / 2);
    position: absolute;
    right: 2px;
    bottom: 2px;
  }

  &.add-row {
    bottom: var(--incrementer-offset);
  }
  &.add-col {
    right: var(--incrementer-offset);
  }

  &:hover {
    background-color: var(--dark-gray);
    color: white;
  }

  & > svg {
    max-height: 100%;
    max-width: 100%;
  }
`;
export function tractAddOrRemoveButton(
  appState: LayoutEditor,
  opts: {
    parentEl: HTMLElement;
    addOrRemove: "add" | "remove";
    dir: TractDir;
    tractIndex: number;
    additionalStyles?: Record<string, string>;
  }
) {
  const { parentEl, addOrRemove, dir, tractIndex, additionalStyles } = opts;
  const dirSingular = dir === "rows" ? "row" : "col";

  const label =
    addOrRemove === "add" ? `Add a ${dirSingular}` : `Remove ${dirSingular}`;

  const button = makeEl(
    parentEl,
    `button.${incrementerButtonClass}.${addOrRemove}-${dirSingular}.${dir}_${tractIndex}`,
    {
      innerHTML: addOrRemove === "add" ? plusIcon : trashcanIcon,
      styles: additionalStyles,
      eventListener: {
        event: "click",
        func: () => {
          if (addOrRemove === "add") {
            appState.addTract(dir, tractIndex);
          } else {
            appState.removeTract(dir, tractIndex);
          }
        },
      },
      props: {
        title: label,
      },
    }
  );

  return button;
}

export function clickButton(
  selector: string,
  label: string,
  onFinish: (event?: MouseEvent) => void
) {
  const button = textEl(`button${selector}`, label);
  button.addEventListener("click", function (event) {
    onFinish(event);
  });
  return button;
}
