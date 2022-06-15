# Demonstrating the ability to nest grid layouts within other gridlayouts

library(gridlayout)
library(shiny)
library(bslib)

drawHist <- function(nbins, color) {
  x    <- faithful[, 2]
  bins <- seq(min(x), max(x), length.out = nbins + 1)
  hist(x, breaks = bins, col = color, border = 'white')
}
# The classic Geyser app with grid layout
shinyApp(
  ui = grid_page(
    layout = c(
      "header  header",
      "sidebar plots"
    ),
    row_sizes = c("50px", "1fr"),
    col_sizes = c("250px", "1fr"),
    gap_size = "10px",
    theme = bslib::bs_theme(),
    grid_header("header", "This is my header"),
    grid_card(
      "sidebar",
      card_header("Settings"),
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_nested(
      'plots',
      title = "Plots - in technicolor",
      layout = c(
        "distPlot distPlot distPlot",
        "redPlot  bluePlot greenPlot"
      ),
      grid_plot('distPlot'),
      grid_plot('redPlot'),
      grid_plot('bluePlot'),
      grid_plot('greenPlot')

    )
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      drawHist(input$bins, "darkgray")
    })
    output$redPlot <- renderPlot({
      drawHist(input$bins, "orangered")
    })
    output$bluePlot <- renderPlot({
      drawHist(input$bins, "steelblue")
    })
    output$greenPlot <- renderPlot({
      drawHist(input$bins, "forestgreen")
    })
  }
)
