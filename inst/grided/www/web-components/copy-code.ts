import { clipboardIcon } from "../utils-icons";

class CopyCode extends HTMLElement {
  code: string;
  numOfLines: number;
  constructor(code: string) {
    super();
    this.code = code;
    this.numOfLines = Math.min(code.match(/\n/g).length ?? 1, 25);
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
       * { box-sizing: border-box; }
   
       :host {
         width: 100%;
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         grid-template-rows: 40px auto;
         gap: 4px;
         grid-template-areas:
           "type      copy-btn"
           "code-text code-text";
       }
       
       textarea {
         grid-area: code-text;
         font-family: monospace;
         width: 100%;
       }
       #type { 
         grid-area: type; 
         font-size: 1.5rem;
         font-weight: bold;
         place-self: center;
        }
       #copy { 
         grid-area: copy-btn; 
         justify-self: end;
         align-self: center;
         padding: 5px 8px;
         display: inline-flex;
         align-items: center;
       }
   
       #copy > svg {
         transform: scale(0.8);
       }
     </style>
     <textarea id = 'code' rows = ${this.numOfLines + 1}>${
      this.code
    }</textarea>
     <div id = "type"> R </div>
     <button id = 'copy'> ${clipboardIcon} Copy Code </button>
   `;

    const codeEl = this.shadowRoot.getElementById(
      "code"
    ) as HTMLTextAreaElement;

    this.shadowRoot.getElementById("copy").addEventListener("click", () => {
      codeEl.select();
      document.execCommand("copy");
    });
  }

  disconnectedCallback() {}
}

customElements.define("copy-code", CopyCode);

export function copyCode(code: string) {
  return new CopyCode(code);
}
