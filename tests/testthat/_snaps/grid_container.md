# Output is as expected for simple grid

    Code
      md_table
    Output
      $head
        <style>
      div[data-gridlayout-key="my_grid"] {
        display:grid;
        grid-template-rows:100px 1fr;
        grid-template-columns:200px;
        grid-template-areas:
          "header"
          "plot  ";
        grid-gap:2rem;
        padding:2rem;
        height:100vh;
      }
      
      
      
      @media (max-width:500px) {
        div[data-gridlayout-key="my_grid"] {
          display:grid;
          grid-template-rows:85px 350px;
          grid-template-columns:1fr;
          grid-template-areas:
            "header"
            "plot  ";
          grid-gap:2rem;
          padding:2rem;
          height:auto;
        }
      }
      
      </style>
      
      $singletons
      character(0)
      
      $dependencies
      $dependencies[[1]]
      List of 9
       $ name      : chr "gridlayout_css"
       $ version   : chr "1.0"
       $ src       :List of 1
        ..$ file: chr "/Users/nicholasstrayer/dev/gridlayout/inst/resources"
       $ meta      : NULL
       $ script    : chr "gridlayout.js"
       $ stylesheet: chr "gridlayout.css"
       $ head      : NULL
       $ attachment: NULL
       $ all_files : logi TRUE
       - attr(*, "class")= chr "html_dependency"
      
      
      $html
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
      

