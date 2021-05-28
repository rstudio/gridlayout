library(gridlayout)
library(shiny)

my_layout <- "
|     |1fr     |4fr    |
|auto |header  |header |
|4fr  |sidebar |nested |"

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    header = title_panel("Level 1"),
    sidebar = "I am a sidebar",
    nested = nested_grid_panel(
      layout = my_layout,
      elements = list(
        header = text_panel("level 2"),
        sidebar = "I am a sidebar",
        nested = nested_grid_panel(
          layout = my_layout,
          elements = list(
            header = text_panel("level 3"),
            sidebar = "I am a sidebar",
            nested = "I am nested"
          )
        )
      )
    )
  ),
  server = function(input, output) {

  }
)
