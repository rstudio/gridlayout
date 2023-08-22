# Can handle recursive nesting

    Code
      make_nested_panels()
    Output
      <div class="container-fluid">
        <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="nested" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:nested;">
          <div class="card-body html-fill-item html-fill-container p-0" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
            <div id="level1" class="grid-container" data-gridlayout-key="level1">
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="top" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:top;">
                <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
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
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="bottom" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:bottom;">
                <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
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
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="left" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:left;">
                <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
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
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="right" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:right;">
                <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
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
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="nested" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:nested;">
                <div class="card-body html-fill-item html-fill-container p-0" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                  <div id="level2" class="grid-container" data-gridlayout-key="level2">
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="top" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:top;">
                      <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
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
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="bottom" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:bottom;">
                      <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
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
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="left" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:left;">
                      <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
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
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="right" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:right;">
                      <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
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
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="nested" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:nested;">
                      <div class="card-body html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">🐢</div>
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

