library(gridlayout)
library(shiny)
library(fontawesome)
my_layout <- "
|     |     |       |       |
|-----|-----|-------|-------|
|10px |1fr  |5fr   |1fr    |
|1fr  |top  |top    |right  |
|5fr |left |nested |right  |
|1fr  |left |bottom |bottom |"

depth <- 4
colors <- viridis::plasma(depth)

emoji_panel <- function(emoji, level = 1){
  grid_panel(
    div(
      style = htmltools::css(
        "background-color" = colors[level],
        width = "100%", height = "100%",
        display = "grid",
        color = "white",
        "font-size" = "2rem",
        "place-content" = "center"),
      emoji
    )
  )
}

make_nested_panels <- function(level = 1) {
  nested_grid_panel(
    layout = my_layout,
    elements = list(
      top =    emoji_panel("↓", level),
      bottom = emoji_panel("↑", level),
      left =   emoji_panel("→", level),
      right =  emoji_panel("←", level),
      nested = if(level < depth) make_nested_panels(level + 1) else emoji_panel("🐢", level)
    )
  )
}

shinyApp(
  ui = grid_page(
    layout = my_layout,
    top =    emoji_panel("↓"),
    bottom = emoji_panel("↑"),
    left =   emoji_panel("→"),
    right =  emoji_panel("←"),
    nested = make_nested_panels()
  ),
  server = function(input, output) {}
)
