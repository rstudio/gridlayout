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
            <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="header" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:header;">
              <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                <h2 id="header">This is my header content</h2>
              </div>
              <script data-bslib-card-needs-init>
            var thisScript = document.querySelector('script[data-bslib-card-needs-init]');
            if (!thisScript) throw new Error('Failed to register card() resize observer');
      
            thisScript.removeAttribute('data-bslib-card-needs-init');
      
            var card = $(thisScript).parents('.card').last();
            if (!card) throw new Error('Failed to register card() resize observer');
      
            // Let Shiny know to trigger resize when the card size changes
            // TODO: shiny could/should do this itself (rstudio/shiny#3682)
            var resizeEvent = window.document.createEvent('UIEvents');
            resizeEvent.initUIEvent('resize', true, false, window, 0);
            var ro = new ResizeObserver(() => { window.dispatchEvent(resizeEvent); });
            ro.observe(card[0]);
      
            // Enable tooltips (for the expand icon)
            var tooltipList = card[0].querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipList.forEach(function(x) { new bootstrap.Tooltip(x); });
      
            // In some complex fill-based layouts with multiple outputs (e.g., plotly),
            // shiny initializes with the correct sizing, but in-between the 1st and last
            // renderValue(), the size of the output containers can change, meaning every
            // output but the 1st gets initialized with the wrong size during their
            // renderValue(); and then after the render phase, shiny won't know trigger a
            // resize since all the widgets will return to their original size
            // (and thus, Shiny thinks there isn't any resizing to do).
            // We workaround that situation by manually triggering a resize on the binding
            // when the output container changes (this way, if the size is different during
            // the render phase, Shiny will know about it)
            $(document).on('shiny:value', function(x) {
              var el = x.binding.el;
              if (card[0].contains(el) && !$(el).data('bslib-output-observer')) {
                var roo = new ResizeObserver(x.binding.onResize);
                roo.observe(el);
                $(el).data('bslib-output-observer', true);
              }
            });
          </script>
            </div>
            <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="footer" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:footer;">
              <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                <div class="form-group shiny-input-container">
                  <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
                  <input class="js-range-slider" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number"/>
                </div>
              </div>
              <script data-bslib-card-needs-init>
            var thisScript = document.querySelector('script[data-bslib-card-needs-init]');
            if (!thisScript) throw new Error('Failed to register card() resize observer');
      
            thisScript.removeAttribute('data-bslib-card-needs-init');
      
            var card = $(thisScript).parents('.card').last();
            if (!card) throw new Error('Failed to register card() resize observer');
      
            // Let Shiny know to trigger resize when the card size changes
            // TODO: shiny could/should do this itself (rstudio/shiny#3682)
            var resizeEvent = window.document.createEvent('UIEvents');
            resizeEvent.initUIEvent('resize', true, false, window, 0);
            var ro = new ResizeObserver(() => { window.dispatchEvent(resizeEvent); });
            ro.observe(card[0]);
      
            // Enable tooltips (for the expand icon)
            var tooltipList = card[0].querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipList.forEach(function(x) { new bootstrap.Tooltip(x); });
      
            // In some complex fill-based layouts with multiple outputs (e.g., plotly),
            // shiny initializes with the correct sizing, but in-between the 1st and last
            // renderValue(), the size of the output containers can change, meaning every
            // output but the 1st gets initialized with the wrong size during their
            // renderValue(); and then after the render phase, shiny won't know trigger a
            // resize since all the widgets will return to their original size
            // (and thus, Shiny thinks there isn't any resizing to do).
            // We workaround that situation by manually triggering a resize on the binding
            // when the output container changes (this way, if the size is different during
            // the render phase, Shiny will know about it)
            $(document).on('shiny:value', function(x) {
              var el = x.binding.el;
              if (card[0].contains(el) && !$(el).data('bslib-output-observer')) {
                var roo = new ResizeObserver(x.binding.onResize);
                roo.observe(el);
                $(el).data('bslib-output-observer', true);
              }
            });
          </script>
            </div>
            <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="plot" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:plot;">
              <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                <div class="shiny-plot-output html-fill-item" id="myPlot" style="width:100%;height:400px;"></div>
              </div>
              <script data-bslib-card-needs-init>
            var thisScript = document.querySelector('script[data-bslib-card-needs-init]');
            if (!thisScript) throw new Error('Failed to register card() resize observer');
      
            thisScript.removeAttribute('data-bslib-card-needs-init');
      
            var card = $(thisScript).parents('.card').last();
            if (!card) throw new Error('Failed to register card() resize observer');
      
            // Let Shiny know to trigger resize when the card size changes
            // TODO: shiny could/should do this itself (rstudio/shiny#3682)
            var resizeEvent = window.document.createEvent('UIEvents');
            resizeEvent.initUIEvent('resize', true, false, window, 0);
            var ro = new ResizeObserver(() => { window.dispatchEvent(resizeEvent); });
            ro.observe(card[0]);
      
            // Enable tooltips (for the expand icon)
            var tooltipList = card[0].querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipList.forEach(function(x) { new bootstrap.Tooltip(x); });
      
            // In some complex fill-based layouts with multiple outputs (e.g., plotly),
            // shiny initializes with the correct sizing, but in-between the 1st and last
            // renderValue(), the size of the output containers can change, meaning every
            // output but the 1st gets initialized with the wrong size during their
            // renderValue(); and then after the render phase, shiny won't know trigger a
            // resize since all the widgets will return to their original size
            // (and thus, Shiny thinks there isn't any resizing to do).
            // We workaround that situation by manually triggering a resize on the binding
            // when the output container changes (this way, if the size is different during
            // the render phase, Shiny will know about it)
            $(document).on('shiny:value', function(x) {
              var el = x.binding.el;
              if (card[0].contains(el) && !$(el).data('bslib-output-observer')) {
                var roo = new ResizeObserver(x.binding.onResize);
                roo.observe(el);
                $(el).data('bslib-output-observer', true);
              }
            });
          </script>
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

