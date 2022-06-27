# The geyser app... but in grid!

library(gridlayout)
library(shiny)
library(bslib)

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = c(
      "header  header",
      "sidebar distPlot"
    ),
    row_sizes = c("50px", "1fr"),
    col_sizes = c("200px", "1fr"),
    gap_size = "10px",
    theme = bslib::bs_theme(),
    grid_header("header", "This is my header"),
    grid_card(
      "sidebar",
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_plot("distPlot")
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



