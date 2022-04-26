# Can handle recursive nesting

    Code
      make_nested_panels()
    Output
      <div class="grid_panel gridlayout-card" style="grid-area:nested;">
        <div class="panel-content">
          <div id="level1" class="grid-container" data-gridlayout-key="level1">
            <div class="grid_panel gridlayout-card" style="grid-area:top;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
              </div>
            </div>
            <div class="grid_panel gridlayout-card" style="grid-area:bottom;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
              </div>
            </div>
            <div class="grid_panel gridlayout-card" style="grid-area:left;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
              </div>
            </div>
            <div class="grid_panel gridlayout-card" style="grid-area:right;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
              </div>
            </div>
            <div class="grid_panel gridlayout-card" style="grid-area:nested;">
              <div class="panel-content">
                <div id="level2" class="grid-container" data-gridlayout-key="level2">
                  <div class="grid_panel gridlayout-card" style="grid-area:top;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
                    </div>
                  </div>
                  <div class="grid_panel gridlayout-card" style="grid-area:bottom;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
                    </div>
                  </div>
                  <div class="grid_panel gridlayout-card" style="grid-area:left;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
                    </div>
                  </div>
                  <div class="grid_panel gridlayout-card" style="grid-area:right;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
                    </div>
                  </div>
                  <div class="grid_panel gridlayout-card" style="grid-area:nested;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">🐢</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

