# The geyser app... but in grid!

library(gridlayout)
library(shiny)
library(bslib)

shinyApp(
  ui = grid_page(
    layout = c(
      "header  header",
      "sidebar distPlot"
    ),
    row_sizes = c("50px", "1fr"),
    col_sizes = c("200px", "1fr"),
    grid_card_text("header", "This is my header"),
    grid_card(
      "sidebar",
      title = "Settings",
      sliderInput("bins","Number of bins:", 1, 50, 30, width = "100%")
    ),
    grid_card_plot("distPlot")
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
