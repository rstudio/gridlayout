# Can handle recursive nesting

    Code
      make_nested_panels()
    Output
      <div class="card no-pad" style="grid-area:nested;" data-gridlayout-area="nested">
        <div class="card-body">
          <div id="level1" class="grid-container" data-gridlayout-key="level1">
            <div class="grid_card vertical_stack card" data-gridlayout-area="top" data-scrollable="FALSE" style="--item-gap:10px;grid-area:top;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="bottom" data-scrollable="FALSE" style="--item-gap:10px;grid-area:bottom;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="left" data-scrollable="FALSE" style="--item-gap:10px;grid-area:left;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
              </div>
            </div>
            <div class="grid_card vertical_stack card" data-gridlayout-area="right" data-scrollable="FALSE" style="--item-gap:10px;grid-area:right;">
              <div class="panel-content">
                <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
              </div>
            </div>
            <div class="card no-pad" style="grid-area:nested;" data-gridlayout-area="nested">
              <div class="card-body">
                <div id="level2" class="grid-container" data-gridlayout-key="level2">
                  <div class="grid_card vertical_stack card" data-gridlayout-area="top" data-scrollable="FALSE" style="--item-gap:10px;grid-area:top;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="bottom" data-scrollable="FALSE" style="--item-gap:10px;grid-area:bottom;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="left" data-scrollable="FALSE" style="--item-gap:10px;grid-area:left;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="right" data-scrollable="FALSE" style="--item-gap:10px;grid-area:right;">
                    <div class="panel-content">
                      <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
                    </div>
                  </div>
                  <div class="grid_card vertical_stack card" data-gridlayout-area="nested" data-scrollable="FALSE" style="--item-gap:10px;grid-area:nested;">
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

