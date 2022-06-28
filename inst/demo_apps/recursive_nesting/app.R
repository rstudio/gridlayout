library(gridlayout)
library(shiny)
library(fontawesome)

max_depth <- 2

emoji_panel <- function(area, emoji){
  grid_card_text(
    area = area,
    content = emoji
  )
}

make_nested_panels <- function(level = 0) {

  is_nested <- level > 0

  container_fn <- if (is_nested) grid_nested else grid_page

  container_fn(
    layout = new_gridlayout(
      c(
        "top  top    right",
        "left nested right",
        "left bottom bottom"
      ),
      row_sizes = c("1fr", "5fr", "1fr"),
      col_sizes = c("1fr", "5fr", "1fr"),
      gap_size = "30px"
    ),
    emoji_panel("top", "↓"),
    emoji_panel("bottom", "↑"),
    emoji_panel("left", "→"),
    emoji_panel("right", "←"),
    if(level < max_depth) make_nested_panels(level + 1) else emoji_panel("nested", "🐢"),
    area = if(is_nested) "nested"
  )
}

shinyApp(
  ui = make_nested_panels(),
  server = function(input, output) {}
)
