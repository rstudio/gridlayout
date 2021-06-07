const copy_code_template = document.createElement("template");
copy_code_template.innerHTML = `
 <style>
    :host {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 40px auto;
      gap: 4px;
      grid-template-areas:
        "type      copy-btn"
        "code-text code-text"
    }
    
    textarea {
      grid-area: code-text;
      font-family: monospace;
      width: 100%;
    }
    #type { 
      font-size: 1.5rem;
      font-weight: bold;
      grid-area: "type"; 
      place-self: center;
     }
    #copy { grid-area: "copy-btn"; }
  </style>
  <div id = "code-catcher">
    <slot> </slot>
  </div>
  <textarea id = 'code'></textarea>
  <div id = "type"> R </div>
  <button id = 'copy'> Copy Code </button>
`;

class CopyCode extends HTMLElement {
  constructor(code?: string) {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      copy_code_template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const code_content = this.shadowRoot.getElementById("code-catcher");
    const code_text = (code_content.firstElementChild as HTMLSlotElement).assignedNodes()[0]
      .textContent;
    const num_of_lines = code_text.match(/\n/g).length ?? 1;
    code_content.remove();

    const code_el = this.shadowRoot.getElementById(
      "code"
    ) as HTMLTextAreaElement;
    code_el.value = code_text;
    code_el.rows = num_of_lines + 1;
    this.shadowRoot.getElementById("copy").addEventListener("click", () => {
      code_el.select();
      document.execCommand("copy");
    });
  }

  disconnectedCallback() {}
}

customElements.define("copy-code", CopyCode);
