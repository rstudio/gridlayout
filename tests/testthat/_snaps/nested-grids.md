# Can handle recursive nesting

    Code
      make_nested_panels()
    Output
      <div class="container-fluid">
        <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="nested" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:nested;">
          <div class="card-body html-fill-item html-fill-container p-0" style="flex:1 1 auto; margin-top:auto;margin-bottom:auto;">
            <div id="level1" class="grid-container" data-gridlayout-key="level1">
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="top" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:top;">
                <div class="card-body" style="flex:0 0 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
                </div>
              </div>
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="bottom" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:bottom;">
                <div class="card-body" style="flex:0 0 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
                </div>
              </div>
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="left" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:left;">
                <div class="card-body" style="flex:0 0 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
                </div>
              </div>
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="right" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:right;">
                <div class="card-body" style="flex:0 0 auto;">
                  <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
                </div>
              </div>
              <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="nested" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:nested;">
                <div class="card-body html-fill-item html-fill-container p-0" style="flex:1 1 auto; margin-top:auto;margin-bottom:auto;">
                  <div id="level2" class="grid-container" data-gridlayout-key="level2">
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="top" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:top;">
                      <div class="card-body" style="flex:0 0 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↓</div>
                      </div>
                    </div>
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="bottom" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:bottom;">
                      <div class="card-body" style="flex:0 0 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">↑</div>
                      </div>
                    </div>
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="left" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:left;">
                      <div class="card-body" style="flex:0 0 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">→</div>
                      </div>
                    </div>
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="right" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:right;">
                      <div class="card-body" style="flex:0 0 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">←</div>
                      </div>
                    </div>
                    <div class="card bslib-card html-fill-item html-fill-container" data-gridlayout-area="nested" data-require-bs-caller="card()" data-require-bs-version="5" style="grid-area:nested;">
                      <div class="card-body" style="flex:0 0 auto;">
                        <div style="width:100%;height:100%;display:grid;font-size:2rem;place-content:center;">🐢</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

