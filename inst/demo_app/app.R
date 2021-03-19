# The geyser app... but in grid!

library(gridlayout)
library(shiny)
requireNamespace("bslib", quietly = TRUE)
my_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|150px |header  |header |
|1fr   |sidebar |plot   |"

# The classic Geyser app with grid layout
shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = h2(id = "header", "This is my header content"),
    sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
    plot = plotOutput("distPlot", height = "100%")
  ),
  # ui = fluidPage(
  #   theme = bslib::bs_theme(),
  #   grid_container(
  #     id = "main_grid",
  #     layout = my_layout,
  #     container_height = "800px",
  #     elements = list(
  #       header = h2(id = "header", "This is my header content"),
  #       sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
  #       plot = plotOutput("distPlot", height = "100%")
  #     )
  #   )
  # ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)

