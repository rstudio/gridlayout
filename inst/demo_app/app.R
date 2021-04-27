# The geyser app... but in grid!

library(gridlayout)
library(shiny)
requireNamespace("bslib", quietly = TRUE)

my_layout <- md_to_gridlayout("
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |")


my_layout <- add_alternate_layout(
  layout = my_layout,
  alternate_layout = "
|     |        |
|-----|--------|
|2rem |1fr     |
|80px |header  |
|auto |sidebar |
|400px |plot    |",
upper_bound_width = 600
)



# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    header = title_panel("This is my header"),
    sidebar = grid_panel(
      title = "Settings",
      v_align = "center",
      collapsable = TRUE,
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    plot = plotOutput("distPlot", height = "100%")
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
app

