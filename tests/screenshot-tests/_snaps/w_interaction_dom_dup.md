# Basic interaction with grided app

    Code
      dump_dom(b)
    Output
      
        <div class="container-fluid">
          
        </div>
      
      
      <div id="grided__holder"><div id="grided__header"><h2>GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app</h2><div class="code-btns"><button id="see-layout-code">Code for layout</button><button id="done">Update app layout</button><toggle-switch></toggle-switch></div></div><div id="grided__settings"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"></path>
      </svg> Settings</h3><div id="gridedGapSizeControls" class="settings panel-body"><div id="gapSizeChooser" class="plusMinusInput settings-grid"><span class="input-label">Panel gap size</span><form id="gapSizeChooser" class="css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="px" value="px">px</option><option class="rem" value="rem">rem</option></select></form></div></div></div><div id="grided__instructions"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z"></path>
      </svg> Instructions</h3><div class="panel-body">
            <strong>Add or remove a row/column:</strong>
            <ul> 
              <li> Click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
      </svg> in gaps between rows and columns to add a row or column at that location </li>
              <li> Click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
      </svg> next to the row/column sizing controls to remove it</li>
            </ul>
            <strong>Add an element:</strong>
            <ul>
              <li>Click and drag over the grid to define a region</li>
              <li>Enter id of element in popup</li>
            </ul>
            <strong>Edit an element:</strong>
            <ul>
              <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>
            </ul>
            <strong>Remove an element:</strong>
            <ul>
              <li>Find element entry in "Added elements" panel and click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
      </svg> icon</li>
              <li>You can't remove elements are part of a running app</li>
            </ul></div></div><div id="grided__elements"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z"></path>
      </svg> Added elements</h3><div class="panel-body"><div id="added-elements"><div class="el_header added-element css-7gu40m in-list" style="border-color: rgb(228, 26, 28);">header</div><div class="el_sidebar added-element css-7gu40m in-list" style="border-color: rgb(55, 126, 184);">sidebar</div><div class="el_plot added-element css-7gu40m in-list" style="border-color: rgb(77, 175, 74);">plot</div></div></div></div><div id="grided__editor"><div id="editor-wrapper"><div id="editor-browser-header"><div id="buttons-container">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="url-box">
        <span> www.myShinyApp.com </span>
      </div></div><div id="editor-app-window"><div id="grid_page" class="grid-container wrapped-existing-app" style="height: 100%; width: 100%; display: grid; max-width: 100%; gap: 3rem; padding: 3rem; grid-template-rows: 150px 1fr; grid-template-columns: 200px 1fr;">
            <div id="grid_page__header" class="grid_panel gridlayout-card" style="grid-area: 1 / 1 / 2 / 3; display: block;">
              <div class="panel-content">
                <h2 id="header">This is my header</h2>
              </div>
            </div>
            <div id="grid_page__sidebar" class="grid_panel gridlayout-card" style="grid-area: 2 / 1 / 3 / 2; display: block;">
              <div class="panel-content">
                <div class="form-group shiny-input-container" style="width:100%;">
                  <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                  <span class="irs irs--shiny js-irs-0 irs-with-grid"><span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min" style="visibility: visible;">1</span><span class="irs-max" style="visibility: visible;">50</span><span class="irs-from" style="visibility: hidden;">0</span><span class="irs-to" style="visibility: hidden;">0</span><span class="irs-single" style="left: 52.3004%;">30</span></span><span class="irs-grid" style="width: 87.3858%; left: 6.20712%;"><span class="irs-grid-pol" style="left: 0%"></span><span class="irs-grid-text js-grid-text-0" style="left: 0%; margin-left: -2.96544%;">1</span><span class="irs-grid-pol small" style="left: 6.802721088435375%"></span><span class="irs-grid-pol small" style="left: 3.4013605442176873%"></span><span class="irs-grid-pol" style="left: 10.204081632653061%"></span><span class="irs-grid-text js-grid-text-1" style="left: 10.2041%; visibility: visible; margin-left: -3.41336%;">6</span><span class="irs-grid-pol small" style="left: 17.006802721088434%"></span><span class="irs-grid-pol small" style="left: 13.60544217687075%"></span><span class="irs-grid-pol" style="left: 20.408163265306122%"></span><span class="irs-grid-text js-grid-text-2" style="left: 20.4082%; visibility: visible; margin-left: -4.21072%;">11</span><span class="irs-grid-pol small" style="left: 27.210884353741495%"></span><span class="irs-grid-pol small" style="left: 23.80952380952381%"></span><span class="irs-grid-pol" style="left: 30.612244897959183%"></span><span class="irs-grid-text js-grid-text-3" style="left: 30.6122%; visibility: visible; margin-left: -4.65867%;">16</span><span class="irs-grid-pol small" style="left: 37.414965986394556%"></span><span class="irs-grid-pol small" style="left: 34.01360544217687%"></span><span class="irs-grid-pol" style="left: 40.816326530612244%"></span><span class="irs-grid-text js-grid-text-4" style="left: 40.8163%; margin-left: -4.57355%;">21</span><span class="irs-grid-pol small" style="left: 47.61904761904761%"></span><span class="irs-grid-pol small" style="left: 44.21768707482993%"></span><span class="irs-grid-pol" style="left: 51.0204081632653%"></span><span class="irs-grid-text js-grid-text-5" style="left: 51.0204%; visibility: visible; margin-left: -5.01703%;">26</span><span class="irs-grid-pol small" style="left: 57.82312925170068%"></span><span class="irs-grid-pol small" style="left: 54.42176870748299%"></span><span class="irs-grid-pol" style="left: 61.224489795918366%"></span><span class="irs-grid-text js-grid-text-6" style="left: 61.2245%; visibility: visible; margin-left: -4.63178%;">31</span><span class="irs-grid-pol small" style="left: 68.02721088435374%"></span><span class="irs-grid-pol small" style="left: 64.62585034013605%"></span><span class="irs-grid-pol" style="left: 71.42857142857143%"></span><span class="irs-grid-text js-grid-text-7" style="left: 71.4286%; visibility: visible; margin-left: -5.07976%;">36</span><span class="irs-grid-pol small" style="left: 78.2312925170068%"></span><span class="irs-grid-pol small" style="left: 74.82993197278911%"></span><span class="irs-grid-pol" style="left: 81.63265306122449%"></span><span class="irs-grid-text js-grid-text-8" style="left: 81.6327%; margin-left: -4.64973%;">41</span><span class="irs-grid-pol small" style="left: 88.43537414965986%"></span><span class="irs-grid-pol small" style="left: 85.03401360544217%"></span><span class="irs-grid-pol" style="left: 91.83673469387755%"></span><span class="irs-grid-text js-grid-text-9" style="left: 91.8367%; visibility: visible; margin-left: -5.12006%;">46</span><span class="irs-grid-pol small" style="left: 97.27891156462584%"></span><span class="irs-grid-pol small" style="left: 94.5578231292517%"></span><span class="irs-grid-pol" style="left: 100%"></span><span class="irs-grid-text js-grid-text-10" style="left: 100%; visibility: visible; margin-left: -5.03942%;">50</span></span><span class="irs-bar irs-bar--single" style="left: 0px; width: 58.0252%;"></span><span class="irs-shadow shadow-single" style="display: none;"></span><span class="irs-handle single" style="left: 51.7181%;"><i></i><i></i><i></i></span></span><input class="js-range-slider irs-hidden-input shiny-bound-input" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number" tabindex="-1" readonly="">
                </div>
              </div>
            </div>
            <div id="grid_page__plot" class="grid_panel gridlayout-card" style="grid-area: 2 / 2 / 3 / 3; display: block;">
              <div class="panel-content">
                <div id="distPlot" class="shiny-plot-output shiny-bound-output" style="width:100%;height:100%;" aria-live="polite"><img src=></div>
              </div>
            </div>
          <div class="r1 c1 grid-cell css-1woxl8e transparent" data-row="1" data-col="1" style="grid-area: 1 / 1 / 2 / 2; display: block;"></div><div class="r1 c2 grid-cell css-1woxl8e transparent" data-row="1" data-col="2" style="grid-area: 1 / 2 / 2 / 3; display: block;"></div><div class="r2 c1 grid-cell css-1woxl8e transparent" data-row="2" data-col="1" style="grid-area: 2 / 1 / 3 / 2; display: block;"></div><div class="r2 c2 grid-cell css-1woxl8e transparent" data-row="2" data-col="2" style="grid-area: 2 / 2 / 3 / 3; display: block;"></div><div class="dragSelectionBox css-7gu40m css-agza8z"></div><div id="dragCanvas" class="css-1okdk2r"></div><div id="header" class="el_header added-element css-7gu40m" style="border-color: rgb(228, 26, 28); position: relative; grid-area: 1 / 1 / 2 / 3; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div><div id="sidebar" class="el_sidebar added-element css-7gu40m" style="border-color: rgb(55, 126, 184); position: relative; grid-area: 2 / 1 / 3 / 2; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div><div id="plot" class="el_plot added-element css-7gu40m" style="border-color: rgb(77, 175, 74); position: relative; grid-area: 2 / 2 / 3 / 3; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div></div></div></div><div id="controller-for-row-1" class="tract-controls css-1qlel4f rows-controls with-drag" style="top: calc(190px); height: calc(150px); left: calc(210px - var(--editor-left-pad) - 3rem - 2px);"><add-or-remove-button add_or_remove="add" row_or_col="row" is_first=""></add-or-remove-button><add-or-remove-button add_or_remove="add" row_or_col="row"></add-or-remove-button><form class="unit-input rows-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="row"></add-or-remove-button></div><div id="controller-for-row-2" class="tract-controls css-1qlel4f rows-controls" style="top: calc(388px); height: calc(654.438px); left: calc(210px - var(--editor-left-pad) - 3rem - 2px);"><add-or-remove-button add_or_remove="add" row_or_col="row"></add-or-remove-button><form class="unit-input rows-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="row"></add-or-remove-button></div><div id="controller-for-col-1" class="tract-controls css-1qlel4f cols-controls with-drag" style="left: calc(210px); width: calc(200px); top: calc(110px - var(--editor-top-pad));"><add-or-remove-button add_or_remove="add" row_or_col="col" is_first=""></add-or-remove-button><add-or-remove-button add_or_remove="add" row_or_col="col"></add-or-remove-button><form class="unit-input cols-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="col"></add-or-remove-button></div><div id="controller-for-col-2" class="tract-controls css-1qlel4f cols-controls" style="left: calc(458px); width: calc(747.25px); top: calc(110px - var(--editor-top-pad));"><add-or-remove-button add_or_remove="add" row_or_col="col"></add-or-remove-button><form class="unit-input cols-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="col"></add-or-remove-button></div></div></div><focus-modal></focus-modal>

---

    Code
      dump_dom(b)
    Output
      
        <div class="container-fluid">
          
        </div>
      
      
      <div id="grided__holder"><div id="grided__header"><h2>GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app</h2><div class="code-btns"><button id="see-layout-code">Code for layout</button><button id="done">Update app layout</button><toggle-switch></toggle-switch></div></div><div id="grided__settings"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"></path>
      </svg> Settings</h3><div id="gridedGapSizeControls" class="settings panel-body"><div id="gapSizeChooser" class="plusMinusInput settings-grid"><span class="input-label">Panel gap size</span><form id="gapSizeChooser" class="css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="px" value="px">px</option><option class="rem" value="rem">rem</option></select></form></div></div></div><div id="grided__instructions"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z"></path>
      </svg> Instructions</h3><div class="panel-body">
            <strong>Add or remove a row/column:</strong>
            <ul> 
              <li> Click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
      </svg> in gaps between rows and columns to add a row or column at that location </li>
              <li> Click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
      </svg> next to the row/column sizing controls to remove it</li>
            </ul>
            <strong>Add an element:</strong>
            <ul>
              <li>Click and drag over the grid to define a region</li>
              <li>Enter id of element in popup</li>
            </ul>
            <strong>Edit an element:</strong>
            <ul>
              <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>
            </ul>
            <strong>Remove an element:</strong>
            <ul>
              <li>Find element entry in "Added elements" panel and click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
      </svg> icon</li>
              <li>You can't remove elements are part of a running app</li>
            </ul></div></div><div id="grided__elements"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z"></path>
      </svg> Added elements</h3><div class="panel-body"><div id="added-elements"><div class="el_header added-element css-7gu40m in-list" style="border-color: rgb(228, 26, 28);">header</div><div class="el_sidebar added-element css-7gu40m in-list" style="border-color: rgb(55, 126, 184);">sidebar</div><div class="el_plot added-element css-7gu40m in-list" style="border-color: rgb(77, 175, 74);">plot</div></div></div></div><div id="grided__editor"><div id="editor-wrapper"><div id="editor-browser-header"><div id="buttons-container">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="url-box">
        <span> www.myShinyApp.com </span>
      </div></div><div id="editor-app-window"><div id="grid_page" class="grid-container wrapped-existing-app" style="height: 100%; width: 100%; display: grid; max-width: 100%; gap: 3rem; padding: 3rem; grid-template-rows: 150px 1fr; grid-template-columns: 200px 1fr;">
            <div id="grid_page__header" class="grid_panel gridlayout-card" style="grid-area: 1 / 1 / 2 / 3; display: block;">
              <div class="panel-content">
                <h2 id="header">This is my header</h2>
              </div>
            </div>
            <div id="grid_page__sidebar" class="grid_panel gridlayout-card" style="grid-area: 2 / 1 / 3 / 2; display: block;">
              <div class="panel-content">
                <div class="form-group shiny-input-container" style="width:100%;">
                  <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                  <span class="irs irs--shiny js-irs-0 irs-with-grid"><span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min" style="visibility: visible;">1</span><span class="irs-max" style="visibility: visible;">50</span><span class="irs-from" style="visibility: hidden;">0</span><span class="irs-to" style="visibility: hidden;">0</span><span class="irs-single" style="left: 52.3004%;">30</span></span><span class="irs-grid" style="width: 87.3858%; left: 6.20712%;"><span class="irs-grid-pol" style="left: 0%"></span><span class="irs-grid-text js-grid-text-0" style="left: 0%; margin-left: -2.96544%;">1</span><span class="irs-grid-pol small" style="left: 6.802721088435375%"></span><span class="irs-grid-pol small" style="left: 3.4013605442176873%"></span><span class="irs-grid-pol" style="left: 10.204081632653061%"></span><span class="irs-grid-text js-grid-text-1" style="left: 10.2041%; visibility: visible; margin-left: -3.41336%;">6</span><span class="irs-grid-pol small" style="left: 17.006802721088434%"></span><span class="irs-grid-pol small" style="left: 13.60544217687075%"></span><span class="irs-grid-pol" style="left: 20.408163265306122%"></span><span class="irs-grid-text js-grid-text-2" style="left: 20.4082%; visibility: visible; margin-left: -4.21072%;">11</span><span class="irs-grid-pol small" style="left: 27.210884353741495%"></span><span class="irs-grid-pol small" style="left: 23.80952380952381%"></span><span class="irs-grid-pol" style="left: 30.612244897959183%"></span><span class="irs-grid-text js-grid-text-3" style="left: 30.6122%; visibility: visible; margin-left: -4.65867%;">16</span><span class="irs-grid-pol small" style="left: 37.414965986394556%"></span><span class="irs-grid-pol small" style="left: 34.01360544217687%"></span><span class="irs-grid-pol" style="left: 40.816326530612244%"></span><span class="irs-grid-text js-grid-text-4" style="left: 40.8163%; margin-left: -4.57355%;">21</span><span class="irs-grid-pol small" style="left: 47.61904761904761%"></span><span class="irs-grid-pol small" style="left: 44.21768707482993%"></span><span class="irs-grid-pol" style="left: 51.0204081632653%"></span><span class="irs-grid-text js-grid-text-5" style="left: 51.0204%; visibility: visible; margin-left: -5.01703%;">26</span><span class="irs-grid-pol small" style="left: 57.82312925170068%"></span><span class="irs-grid-pol small" style="left: 54.42176870748299%"></span><span class="irs-grid-pol" style="left: 61.224489795918366%"></span><span class="irs-grid-text js-grid-text-6" style="left: 61.2245%; visibility: visible; margin-left: -4.63178%;">31</span><span class="irs-grid-pol small" style="left: 68.02721088435374%"></span><span class="irs-grid-pol small" style="left: 64.62585034013605%"></span><span class="irs-grid-pol" style="left: 71.42857142857143%"></span><span class="irs-grid-text js-grid-text-7" style="left: 71.4286%; visibility: visible; margin-left: -5.07976%;">36</span><span class="irs-grid-pol small" style="left: 78.2312925170068%"></span><span class="irs-grid-pol small" style="left: 74.82993197278911%"></span><span class="irs-grid-pol" style="left: 81.63265306122449%"></span><span class="irs-grid-text js-grid-text-8" style="left: 81.6327%; margin-left: -4.64973%;">41</span><span class="irs-grid-pol small" style="left: 88.43537414965986%"></span><span class="irs-grid-pol small" style="left: 85.03401360544217%"></span><span class="irs-grid-pol" style="left: 91.83673469387755%"></span><span class="irs-grid-text js-grid-text-9" style="left: 91.8367%; visibility: visible; margin-left: -5.12006%;">46</span><span class="irs-grid-pol small" style="left: 97.27891156462584%"></span><span class="irs-grid-pol small" style="left: 94.5578231292517%"></span><span class="irs-grid-pol" style="left: 100%"></span><span class="irs-grid-text js-grid-text-10" style="left: 100%; visibility: visible; margin-left: -5.03942%;">50</span></span><span class="irs-bar irs-bar--single" style="left: 0px; width: 58.0252%;"></span><span class="irs-shadow shadow-single" style="display: none;"></span><span class="irs-handle single" style="left: 51.7181%;"><i></i><i></i><i></i></span></span><input class="js-range-slider irs-hidden-input shiny-bound-input" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number" tabindex="-1" readonly="">
                </div>
              </div>
            </div>
            <div id="grid_page__plot" class="grid_panel gridlayout-card" style="grid-area: 2 / 2 / 3 / 3; display: block;">
              <div class="panel-content">
                <div id="distPlot" class="shiny-plot-output shiny-bound-output" style="width:100%;height:100%;" aria-live="polite"><img src=></div>
              </div>
            </div>
          <div class="r1 c1 grid-cell css-1woxl8e transparent" data-row="1" data-col="1" style="grid-area: 1 / 1 / 2 / 2; display: block;"></div><div class="r1 c2 grid-cell css-1woxl8e transparent" data-row="1" data-col="2" style="grid-area: 1 / 2 / 2 / 3; display: block;"></div><div class="r2 c1 grid-cell css-1woxl8e transparent" data-row="2" data-col="1" style="grid-area: 2 / 1 / 3 / 2; display: block;"></div><div class="r2 c2 grid-cell css-1woxl8e transparent" data-row="2" data-col="2" style="grid-area: 2 / 2 / 3 / 3; display: block;"></div><div class="dragSelectionBox css-7gu40m css-agza8z"></div><div id="dragCanvas" class="css-1okdk2r"></div><div id="header" class="el_header added-element css-7gu40m" style="border-color: rgb(228, 26, 28); position: relative; grid-area: 1 / 1 / 2 / 3; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div><div id="sidebar" class="el_sidebar added-element css-7gu40m" style="border-color: rgb(55, 126, 184); position: relative; grid-area: 2 / 1 / 3 / 2; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div><div id="plot" class="el_plot added-element css-7gu40m" style="border-color: rgb(77, 175, 74); position: relative; grid-area: 2 / 2 / 3 / 3; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div></div></div></div><div id="controller-for-row-1" class="tract-controls css-1qlel4f rows-controls with-drag" style="top: calc(190px); height: calc(150px); left: calc(210px - var(--editor-left-pad) - 3rem - 2px);"><add-or-remove-button add_or_remove="add" row_or_col="row" is_first=""></add-or-remove-button><add-or-remove-button add_or_remove="add" row_or_col="row"></add-or-remove-button><form class="unit-input rows-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="row"></add-or-remove-button></div><div id="controller-for-row-2" class="tract-controls css-1qlel4f rows-controls" style="top: calc(388px); height: calc(654.438px); left: calc(210px - var(--editor-left-pad) - 3rem - 2px);"><add-or-remove-button add_or_remove="add" row_or_col="row"></add-or-remove-button><form class="unit-input rows-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="row"></add-or-remove-button></div><div id="controller-for-col-1" class="tract-controls css-1qlel4f cols-controls with-drag" style="left: calc(210px); width: calc(200px); top: calc(110px - var(--editor-top-pad));"><add-or-remove-button add_or_remove="add" row_or_col="col" is_first=""></add-or-remove-button><add-or-remove-button add_or_remove="add" row_or_col="col"></add-or-remove-button><form class="unit-input cols-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="col"></add-or-remove-button></div><div id="controller-for-col-2" class="tract-controls css-1qlel4f cols-controls" style="left: calc(458px); width: calc(747.25px); top: calc(110px - var(--editor-top-pad));"><add-or-remove-button add_or_remove="add" row_or_col="col"></add-or-remove-button><form class="unit-input cols-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="col"></add-or-remove-button></div></div></div>

---

    Code
      dump_dom(b)
    Output
      
        <div class="container-fluid">
          
        </div>
      
      
      <div id="grided__holder"><div id="grided__header"><h2>GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app</h2><div class="code-btns"><button id="see-layout-code">Code for layout</button><button id="done">Update app layout</button><toggle-switch></toggle-switch></div></div><div id="grided__settings"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"></path>
      </svg> Settings</h3><div id="gridedGapSizeControls" class="settings panel-body"><div id="gapSizeChooser" class="plusMinusInput settings-grid"><span class="input-label">Panel gap size</span><form id="gapSizeChooser" class="css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="px" value="px">px</option><option class="rem" value="rem">rem</option></select></form></div></div></div><div id="grided__instructions"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z"></path>
      </svg> Instructions</h3><div class="panel-body">
            <strong>Add or remove a row/column:</strong>
            <ul> 
              <li> Click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
      </svg> in gaps between rows and columns to add a row or column at that location </li>
              <li> Click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
      </svg> next to the row/column sizing controls to remove it</li>
            </ul>
            <strong>Add an element:</strong>
            <ul>
              <li>Click and drag over the grid to define a region</li>
              <li>Enter id of element in popup</li>
            </ul>
            <strong>Edit an element:</strong>
            <ul>
              <li>Drag the upper left, middle, or bottom right corners of the element to reposition</li>
            </ul>
            <strong>Remove an element:</strong>
            <ul>
              <li>Find element entry in "Added elements" panel and click the <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
      </svg> icon</li>
              <li>You can't remove elements are part of a running app</li>
            </ul></div></div><div id="grided__elements"><h3><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z"></path>
      </svg> Added elements</h3><div class="panel-body"><div id="added-elements"><div class="el_header added-element css-7gu40m in-list" style="border-color: rgb(228, 26, 28);">header</div><div class="el_sidebar added-element css-7gu40m in-list" style="border-color: rgb(55, 126, 184);">sidebar</div><div class="el_plot added-element css-7gu40m in-list" style="border-color: rgb(77, 175, 74);">plot</div></div></div></div><div id="grided__editor"><div id="editor-wrapper"><div id="editor-browser-header"><div id="buttons-container">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="url-box">
        <span> www.myShinyApp.com </span>
      </div></div><div id="editor-app-window"><div id="grid_page" class="grid-container wrapped-existing-app" style="height: 100%; width: 100%; display: grid; max-width: 100%; gap: 3rem; padding: 3rem; grid-template-rows: 150px 1fr; grid-template-columns: 200px 1fr;">
            <div id="grid_page__header" class="grid_panel gridlayout-card" style="grid-area: 1 / 1 / 2 / 3; display: block;">
              <div class="panel-content">
                <h2 id="header">This is my header</h2>
              </div>
            </div>
            <div id="grid_page__sidebar" class="grid_panel gridlayout-card" style="grid-area: 2 / 1 / 3 / 2; display: block;">
              <div class="panel-content">
                <div class="form-group shiny-input-container" style="width:100%;">
                  <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                  <span class="irs irs--shiny js-irs-0 irs-with-grid"><span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min" style="visibility: visible;">1</span><span class="irs-max" style="visibility: visible;">50</span><span class="irs-from" style="visibility: hidden;">0</span><span class="irs-to" style="visibility: hidden;">0</span><span class="irs-single" style="left: 52.3004%;">30</span></span><span class="irs-grid" style="width: 87.3858%; left: 6.20712%;"><span class="irs-grid-pol" style="left: 0%"></span><span class="irs-grid-text js-grid-text-0" style="left: 0%; margin-left: -2.96544%;">1</span><span class="irs-grid-pol small" style="left: 6.802721088435375%"></span><span class="irs-grid-pol small" style="left: 3.4013605442176873%"></span><span class="irs-grid-pol" style="left: 10.204081632653061%"></span><span class="irs-grid-text js-grid-text-1" style="left: 10.2041%; visibility: visible; margin-left: -3.41336%;">6</span><span class="irs-grid-pol small" style="left: 17.006802721088434%"></span><span class="irs-grid-pol small" style="left: 13.60544217687075%"></span><span class="irs-grid-pol" style="left: 20.408163265306122%"></span><span class="irs-grid-text js-grid-text-2" style="left: 20.4082%; visibility: visible; margin-left: -4.21072%;">11</span><span class="irs-grid-pol small" style="left: 27.210884353741495%"></span><span class="irs-grid-pol small" style="left: 23.80952380952381%"></span><span class="irs-grid-pol" style="left: 30.612244897959183%"></span><span class="irs-grid-text js-grid-text-3" style="left: 30.6122%; visibility: visible; margin-left: -4.65867%;">16</span><span class="irs-grid-pol small" style="left: 37.414965986394556%"></span><span class="irs-grid-pol small" style="left: 34.01360544217687%"></span><span class="irs-grid-pol" style="left: 40.816326530612244%"></span><span class="irs-grid-text js-grid-text-4" style="left: 40.8163%; margin-left: -4.57355%;">21</span><span class="irs-grid-pol small" style="left: 47.61904761904761%"></span><span class="irs-grid-pol small" style="left: 44.21768707482993%"></span><span class="irs-grid-pol" style="left: 51.0204081632653%"></span><span class="irs-grid-text js-grid-text-5" style="left: 51.0204%; visibility: visible; margin-left: -5.01703%;">26</span><span class="irs-grid-pol small" style="left: 57.82312925170068%"></span><span class="irs-grid-pol small" style="left: 54.42176870748299%"></span><span class="irs-grid-pol" style="left: 61.224489795918366%"></span><span class="irs-grid-text js-grid-text-6" style="left: 61.2245%; visibility: visible; margin-left: -4.63178%;">31</span><span class="irs-grid-pol small" style="left: 68.02721088435374%"></span><span class="irs-grid-pol small" style="left: 64.62585034013605%"></span><span class="irs-grid-pol" style="left: 71.42857142857143%"></span><span class="irs-grid-text js-grid-text-7" style="left: 71.4286%; visibility: visible; margin-left: -5.07976%;">36</span><span class="irs-grid-pol small" style="left: 78.2312925170068%"></span><span class="irs-grid-pol small" style="left: 74.82993197278911%"></span><span class="irs-grid-pol" style="left: 81.63265306122449%"></span><span class="irs-grid-text js-grid-text-8" style="left: 81.6327%; margin-left: -4.64973%;">41</span><span class="irs-grid-pol small" style="left: 88.43537414965986%"></span><span class="irs-grid-pol small" style="left: 85.03401360544217%"></span><span class="irs-grid-pol" style="left: 91.83673469387755%"></span><span class="irs-grid-text js-grid-text-9" style="left: 91.8367%; visibility: visible; margin-left: -5.12006%;">46</span><span class="irs-grid-pol small" style="left: 97.27891156462584%"></span><span class="irs-grid-pol small" style="left: 94.5578231292517%"></span><span class="irs-grid-pol" style="left: 100%"></span><span class="irs-grid-text js-grid-text-10" style="left: 100%; visibility: visible; margin-left: -5.03942%;">50</span></span><span class="irs-bar irs-bar--single" style="left: 0px; width: 58.0252%;"></span><span class="irs-shadow shadow-single" style="display: none;"></span><span class="irs-handle single" style="left: 51.7181%;"><i></i><i></i><i></i></span></span><input class="js-range-slider irs-hidden-input shiny-bound-input" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number" tabindex="-1" readonly="">
                </div>
              </div>
            </div>
            <div id="grid_page__plot" class="grid_panel gridlayout-card" style="grid-area: 2 / 2 / 3 / 3; display: block;">
              <div class="panel-content">
                <div id="distPlot" class="shiny-plot-output shiny-bound-output" style="width:100%;height:100%;" aria-live="polite"><img src=></div>
              </div>
            </div>
          <div class="r1 c1 grid-cell css-1woxl8e transparent" data-row="1" data-col="1" style="grid-area: 1 / 1 / 2 / 2; display: block;"></div><div class="r1 c2 grid-cell css-1woxl8e transparent" data-row="1" data-col="2" style="grid-area: 1 / 2 / 2 / 3; display: block;"></div><div class="r2 c1 grid-cell css-1woxl8e transparent" data-row="2" data-col="1" style="grid-area: 2 / 1 / 3 / 2; display: block;"></div><div class="r2 c2 grid-cell css-1woxl8e transparent" data-row="2" data-col="2" style="grid-area: 2 / 2 / 3 / 3; display: block;"></div><div class="dragSelectionBox css-7gu40m css-agza8z"></div><div id="dragCanvas" class="css-1okdk2r"></div><div id="header" class="el_header added-element css-7gu40m" style="border-color: rgb(228, 26, 28); position: relative; grid-area: 1 / 1 / 2 / 3; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(228, 26, 28);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div><div id="sidebar" class="el_sidebar added-element css-7gu40m" style="border-color: rgb(55, 126, 184); position: relative; grid-area: 2 / 1 / 3 / 2; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(55, 126, 184);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div><div id="plot" class="el_plot added-element css-7gu40m" style="border-color: rgb(77, 175, 74); position: relative; grid-area: 2 / 2 / 3 / 3; display: block;">
      <div class="fillerText">
        This filler text demonstrates how the height of an element spanning an "auto"
        row is influenced by its content. While you're here...
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book.
      </div><div class="dragger visible css-y917e4 top-left" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z"></path>
      </svg></div><div class="dragger visible css-y917e4 bottom-right" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z"></path>
      </svg></div><div class="dragger visible css-y917e4 center" style="background: rgb(77, 175, 74);"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"></path>
      </svg></div></div></div></div></div><div id="controller-for-row-1" class="tract-controls css-1qlel4f rows-controls with-drag" style="top: calc(190px); height: calc(150px); left: calc(210px - var(--editor-left-pad) - 3rem - 2px);"><add-or-remove-button add_or_remove="add" row_or_col="row" is_first=""></add-or-remove-button><add-or-remove-button add_or_remove="add" row_or_col="row"></add-or-remove-button><form class="unit-input rows-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="row"></add-or-remove-button></div><div id="controller-for-row-2" class="tract-controls css-1qlel4f rows-controls" style="top: calc(388px); height: calc(654.438px); left: calc(210px - var(--editor-left-pad) - 3rem - 2px);"><add-or-remove-button add_or_remove="add" row_or_col="row"></add-or-remove-button><form class="unit-input rows-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="row"></add-or-remove-button></div><div id="controller-for-col-1" class="tract-controls css-1qlel4f cols-controls with-drag" style="left: calc(210px); width: calc(200px); top: calc(110px - var(--editor-top-pad));"><add-or-remove-button add_or_remove="add" row_or_col="col" is_first=""></add-or-remove-button><add-or-remove-button add_or_remove="add" row_or_col="col"></add-or-remove-button><form class="unit-input cols-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="col"></add-or-remove-button></div><div id="controller-for-col-2" class="tract-controls css-1qlel4f cols-controls" style="left: calc(458px); width: calc(747.25px); top: calc(110px - var(--editor-top-pad));"><add-or-remove-button add_or_remove="add" row_or_col="col"></add-or-remove-button><form class="unit-input cols-sizing css-1948ukv"><input class="value-input" type="number" min="0" step="1"><select class="unit-selector" name="units"><option class="fr" value="fr">fr</option><option class="px" value="px">px</option><option class="rem" value="rem">rem</option><option class="auto" value="auto">auto</option></select></form><div class="dragger"><svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z"></path>
      </svg><div class="drag-detector" draggable="true"></div></div><add-or-remove-button add_or_remove="remove" row_or_col="col"></add-or-remove-button></div></div></div>

