# Works when it should

    Code
      grid_page(layout = "\n    |      |        |\n    |------|--------|\n    |2rem  |200px   |\n    |1fr   |header  |\n    |1fr   |plot    |\n    |1fr   |footer  |",
        grid_card("header", shiny::h2(id = "header", "This is my header content")),
        grid_card("footer", shiny::sliderInput("bins", "Number of bins:", min = 1,
          max = 50, value = 30)), grid_card("plot", shiny::plotOutput("myPlot")))
    Output
      <div class="container-fluid">
        <div id="gridlayout-grid-page">
          <div id="gridlayout-grid-page-container" class="grid-container" data-gridlayout-key="gridlayout-grid-page-container">
            <div class="grid_card vertical_stack card" data-gridlayout-area="header" data-scrollable="FALSE" style="--item-gap:10px;grid-area:header;">
              <div class="panel-content">
                <h2 id="header">This is my header content</h2>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="footer" data-scrollable="FALSE" style="--item-gap:10px;grid-area:footer;">
              <div class="panel-content">
                <div class="form-group shiny-input-container">
                  <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                  <input class="js-range-slider" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number"/>
                </div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="plot" data-scrollable="FALSE" style="--item-gap:10px;grid-area:plot;">
              <div class="panel-content">
                <div id="myPlot" class="shiny-plot-output" style="width:100%;height:400px;"></div>
              </div>
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

