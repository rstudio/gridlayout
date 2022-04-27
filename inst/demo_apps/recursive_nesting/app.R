library(gridlayout)
library(shiny)
library(fontawesome)
my_layout <- "
|     |     |       |       |
|-----|-----|-------|-------|
|10px |1fr  |5fr    |1fr    |
|1fr  |top  |top    |right  |
|5fr  |left |nested |right  |
|1fr  |left |bottom |bottom |"

depth <- 2

emoji_panel <- function(area, emoji){
  grid_panel(
    area = area,
    div(
      style = htmltools::css(
        width = "100%", height = "100%",
        display = "grid",
        "font-size" = "2rem",
        "place-content" = "center"),
      emoji
    )
  )
}

make_nested_panels <- function(level = 1) {
  nested_grid_panel(
    area = "nested",
    layout = my_layout,
    id = paste0("level", level),
    emoji_panel("top", "↓"),
    emoji_panel("bottom", "↑"),
    emoji_panel("left", "→"),
    emoji_panel("right", "←"),
    if(level < depth) make_nested_panels(level + 1) else emoji_panel("nested", "🐢")
  )
}

shinyApp(
  ui = grid_page(
    layout = my_layout,
    emoji_panel("top", "↓"),
    emoji_panel("bottom", "↑"),
    emoji_panel("left", "→"),
    emoji_panel("right", "←"),
    make_nested_panels()
  ),
  server = function(input, output) {}
)
