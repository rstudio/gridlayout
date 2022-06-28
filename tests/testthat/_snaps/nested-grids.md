# Can handle recursive nesting

    Code
      make_nested_panels()
    Output
      <div class="card no-pad" style="grid-area:nested;" data-gridlayout-area="nested">
        <div class="card-body">
          <div id="level1" class="grid-container" data-gridlayout-key="level1">
            <div class="grid_card vertical_stack card" data-gridlayout-area="top" style="grid-area:top;">
              <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="bottom" style="grid-area:bottom;">
              <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="left" style="grid-area:left;">
              <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="right" style="grid-area:right;">
              <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
              </div>
            </div>
            <div class="card no-pad" style="grid-area:nested;" data-gridlayout-area="nested">
              <div class="card-body">
                <div id="level2" class="grid-container" data-gridlayout-key="level2">
                  <div class="grid_card vertical_stack card" data-gridlayout-area="top" style="grid-area:top;">
                    <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="bottom" style="grid-area:bottom;">
                    <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="left" style="grid-area:left;">
                    <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="right" style="grid-area:right;">
                    <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="nested" style="grid-area:nested;">
                    <div style="--item-gap:10px;justify-content:flex-start;" class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">🐢</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

