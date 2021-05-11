# Works when it should

    Code
      grid_page(layout = "\n    |      |        |\n    |------|--------|\n    |2rem  |200px   |\n    |1fr   |header  |\n    |1fr   |plot    |\n    |1fr   |footer  |",
        header = shiny::h2(id = "header", "This is my header content"), footer = shiny::sliderInput(
          "bins", "Number of bins:", min = 1, max = 50, value = 30), plot = shiny::plotOutput(
          "myPlot"))
    Output
      <div class="container-fluid">
        <div id="grid_page" class="grid-container">
          <div id="grid_page__header" class="grid_panel gridlayout-card">
            <div style="" class="panel-content">
              <h2 id="header">This is my header content</h2>
            </div>
          </div>
          <div id="grid_page__footer" class="grid_panel gridlayout-card">
            <div style="" class="panel-content">
              <div class="form-group shiny-input-container">
                <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                <input class="js-range-slider" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number"/>
              </div>
            </div>
          </div>
          <div id="grid_page__plot" class="grid_panel gridlayout-card">
            <div style="" class="panel-content">
              <div id="myPlot" class="shiny-plot-output" style="height:100%;width:100%;min-height:150px"></div>
            </div>
          </div>
        </div>
      </div>

# Warns about mismatches between layout and passed elements

    Code
      err_msg$message
    Output
      [1] "\nMismatch between the provided elements and the defined elements in layout definition.\nPassed to `elements` argument but not in layout declaration:\n  - \"footer\"\n"

# Warns about both at the same time to help people debug easier

    Code
      err_msg$message
    Output
      [1] "\nMismatch between the provided elements and the defined elements in layout definition.\nIn layout declaration but not passed to `elements` argument\n  - \"footer\"\nPassed to `elements` argument but not in layout declaration:\n  - \"footer2\"\n"

