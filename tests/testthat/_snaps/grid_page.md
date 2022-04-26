# Works when it should

    Code
      grid_page(layout = "\n    |      |        |\n    |------|--------|\n    |2rem  |200px   |\n    |1fr   |header  |\n    |1fr   |plot    |\n    |1fr   |footer  |",
        grid_panel("header", shiny::h2(id = "header", "This is my header content")),
        grid_panel("footer", shiny::sliderInput("bins", "Number of bins:", min = 1,
          max = 50, value = 30)), grid_panel("plot", shiny::plotOutput("myPlot")))
    Output
      <div class="container-fluid">
        <div id="grid_page" class="grid-container" data-gridlayout-key="grid_page">
          <div class="grid_panel gridlayout-card" style="grid-area:header;" data-gridlayout-area="header">
            <div class="panel-content">
              <h2 id="header">This is my header content</h2>
            </div>
          </div>
          <div class="grid_panel gridlayout-card" style="grid-area:footer;" data-gridlayout-area="footer">
            <div class="panel-content">
              <div class="form-group shiny-input-container">
                <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                <input class="js-range-slider" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number"/>
              </div>
            </div>
          </div>
          <div class="grid_panel gridlayout-card" style="grid-area:plot;" data-gridlayout-area="plot">
            <div class="panel-content">
              <div id="myPlot" class="shiny-plot-output" style="width:100%;height:400px;"></div>
            </div>
          </div>
        </div>
      </div>

# Warns about mismatches between layout and passed elements

    Code
      err_msg$message
    Output
      [1] "Grid areas \"footer\" are present in the children of grid container but not specified in the layout:\n"

# Warns about both at the same time to help people debug easier

    Code
      err_msg$message
    Output
      [1] "Grid areas \"footer\" are specified in the layout but not present in the children:\n If the grid-area css property for these areas is being provided in a custom  way, set `check_for_mismatches = FALSE` to avoid this error message.\nGrid areas \"footer2\" are present in the children of grid container but not specified in the layout:\n"

