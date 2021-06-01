# Updating of ids works for nested panels

    Code
      my_layout <-
        "\n|     |        |        |\n|-----|--------|--------|\n|1rem |1fr     |1fr     |\n|auto |header  |header  |\n|1fr  |nestedA |nestedB |"
      content_layout <-
        "\n|    |         |            |\n|----|---------|------------|\n|    |1fr      |4fr         |\n|1fr |icon     |bin_chooser |\n|4fr |settings |plot        |"
      grid_page(layout = my_layout, header = title_panel("Nested grids"), nestedA = nested_grid_panel(
        layout = content_layout, elements = list(icon = text_panel("R"), bin_chooser = "choose your bins",
        settings = "Settings panel", plot = "Plot output")), nestedB = nested_grid_panel(
        title = "Nested within a titled panel", layout = content_layout, elements = list(
          icon = text_panel("R"), bin_chooser = text_panel("Bin Slider"), settings = "Bin numbers",
          plot = text_panel("Another Plot"))))
    Output
      <div class="container-fluid">
        <div id="grid_page" class="grid-container">
          <div class="grid_panel gridlayout-card" id="grid_page__header">
            <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
              <h2 class="text_panel">Nested grids</h2>
            </div>
          </div>
          <div class="grid_panel gridlayout-card" id="grid_page__nestedA">
            <div class="panel-content">
              <div class="grid-container" id="grid_page__nestedA__grid_container">
                <div class="grid_panel gridlayout-card" id="grid_page__nestedA__grid_container__icon">
                  <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
                    <h2 class="text_panel">R</h2>
                  </div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nestedA__grid_container__bin_chooser">
                  <div class="panel-content">choose your bins</div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nestedA__grid_container__settings">
                  <div class="panel-content">Settings panel</div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nestedA__grid_container__plot">
                  <div class="panel-content">Plot output</div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid_panel gridlayout-card" id="grid_page__nestedB">
            <div class="title-bar" style="justify-content: space-between;">
              <h3>Nested within a titled panel</h3>
              <span onclick="&#10;    var card = this.parentElement.parentElement;&#10;    var card_classes = card.classList;&#10;    if (card_classes.contains(&quot;collapsed&quot;)) {&#10;      card_classes.remove(&quot;collapsed&quot;);&#10;    } else {&#10;      card_classes.add(&quot;collapsed&quot;);&#10;    }" class="collapser-icon"><svg aria-hidden="true" role="img" viewBox="0 0 448 512" style="height:1em;width:0.88em;vertical-align:-0.125em;margin-left:auto;margin-right:auto;font-size:inherit;fill:currentColor;overflow:visible;position:relative;"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"/></svg></span>
            </div>
            <div class="panel-content">
              <div class="grid-container" id="grid_page__nestedB__grid_container">
                <div class="grid_panel gridlayout-card" id="grid_page__nestedB__grid_container__icon">
                  <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
                    <h2 class="text_panel">R</h2>
                  </div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nestedB__grid_container__bin_chooser">
                  <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
                    <h2 class="text_panel">Bin Slider</h2>
                  </div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nestedB__grid_container__settings">
                  <div class="panel-content">Bin numbers</div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nestedB__grid_container__plot">
                  <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
                    <h2 class="text_panel">Another Plot</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

# Can double nest

    Code
      my_layout <-
        "\n  |     |1fr     |4fr    |\n  |auto |header  |header |\n  |4fr  |sidebar |nested |"
      grid_page(layout = my_layout, header = title_panel("Level 1"), sidebar = "I am a sidebar",
      nested = nested_grid_panel(layout = my_layout, elements = list(header = text_panel(
        "level 2"), sidebar = "I am a sidebar", nested = nested_grid_panel(layout = my_layout,
        elements = list(header = text_panel("level 3"), sidebar = "I am a sidebar",
        nested = "I am nested")))))
    Output
      <div class="container-fluid">
        <div id="grid_page" class="grid-container">
          <div class="grid_panel gridlayout-card" id="grid_page__header">
            <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
              <h2 class="text_panel">Level 1</h2>
            </div>
          </div>
          <div id="grid_page__sidebar" class="grid_panel gridlayout-card">
            <div class="panel-content">I am a sidebar</div>
          </div>
          <div class="grid_panel gridlayout-card" id="grid_page__nested">
            <div class="panel-content">
              <div class="grid-container" id="grid_page__nested__grid_container">
                <div class="grid_panel gridlayout-card" id="grid_page__nested__grid_container__header">
                  <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
                    <h2 class="text_panel">level 2</h2>
                  </div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nested__grid_container__sidebar">
                  <div class="panel-content">I am a sidebar</div>
                </div>
                <div class="grid_panel gridlayout-card" id="grid_page__nested__grid_container__nested">
                  <div class="panel-content">
                    <div class="grid-container" id="grid_page__nested__grid_container__nested__grid_container">
                      <div class="grid_panel gridlayout-card" id="grid_page__nested__grid_container__nested__grid_container__header">
                        <div style="display:grid;justify-content:start;align-content:center;" class="panel-content">
                          <h2 class="text_panel">level 3</h2>
                        </div>
                      </div>
                      <div class="grid_panel gridlayout-card" id="grid_page__nested__grid_container__nested__grid_container__sidebar">
                        <div class="panel-content">I am a sidebar</div>
                      </div>
                      <div class="grid_panel gridlayout-card" id="grid_page__nested__grid_container__nested__grid_container__nested">
                        <div class="panel-content">I am nested</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

