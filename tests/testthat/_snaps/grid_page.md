# Works when it should

    Code
      grid_page(layout = "\n    |      |        |\n    |------|--------|\n    |2rem  |200px   |\n    |1fr   |header  |\n    |1fr   |plot    |\n    |1fr   |footer  |",
        header = shiny::h2(id = "header", "This is my header content"), footer = shiny::sliderInput(
          "bins", "Number of bins:", min = 1, max = 50, value = 30), plot = shiny::plotOutput(
          "myPlot"))
    Output
      <div class="container-fluid">
        <div id="grid_page" class="grid-container" header="&lt;h2 id=&quot;header&quot;&gt;This is my header content&lt;/h2&gt;" footer="&lt;div class=&quot;form-group shiny-input-container&quot;&gt;&#10;  &lt;label class=&quot;control-label&quot; id=&quot;bins-label&quot; for=&quot;bins&quot;&gt;Number of bins:&lt;/label&gt;&#10;  &lt;input class=&quot;js-range-slider&quot; id=&quot;bins&quot; data-skin=&quot;shiny&quot; data-min=&quot;1&quot; data-max=&quot;50&quot; data-from=&quot;30&quot; data-step=&quot;1&quot; data-grid=&quot;true&quot; data-grid-num=&quot;9.8&quot; data-grid-snap=&quot;false&quot; data-prettify-separator=&quot;,&quot; data-prettify-enabled=&quot;true&quot; data-keyboard=&quot;true&quot; data-data-type=&quot;number&quot;/&gt;&#10;&lt;/div&gt;" plot="&lt;div id=&quot;myPlot&quot; class=&quot;shiny-plot-output&quot; style=&quot;width:100%;height:400px;&quot;&gt;&lt;/div&gt;"></div>
      </div>

# Warns about mismatches between layout and passed elements

    Code
      err_msg$message
    Output
      NULL

# Warns about both at the same time to help people debug easier

    Code
      err_msg$message
    Output
      NULL

