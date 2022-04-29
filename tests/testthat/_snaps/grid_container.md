# Output is as expected for simple grid

    Code
      md_table
    Output
      <div id="my_grid" class="grid-container" data-gridlayout-key="my_grid">
        <div class="grid_panel gridlayout-card" style="grid-area:header;" data-gridlayout-area="header">
          <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
            <h2 class="text_panel">This is my header content</h2>
          </div>
        </div>
        <div class="grid_panel gridlayout-card" style="grid-area:plot;" data-gridlayout-area="plot">
          <div class="panel-content">
            <div id="myPlot" class="shiny-plot-output" style="width:100%;height:400px;"></div>
          </div>
        </div>
      </div>

