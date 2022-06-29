# Demonstrating the ability to nest grid layouts within other gridlayouts
library(gridlayout)
library(shiny)
library(bslib)

ui <- grid_page(
  layout = c(
    "header  header",
    "sidebar plots"
  ),
  row_sizes = c("50px", "1fr"),
  col_sizes = c("250px", "1fr"),
  grid_card_text("header", "This is my header"),
  grid_card(
    "sidebar",
    title = "Settings",
    sliderInput("bins", "Number of bins:", min = 1, max = 50, value = 30, width = "100%")
  ),
  grid_nested(
    "plots",
    title = "Plots - in technicolor",
    layout = c(
      "distPlot distPlot distPlot",
      "redPlot  bluePlot greenPlot"
    ),
    grid_card_plot("distPlot"),
    grid_card_plot("redPlot"),
    grid_card_plot("bluePlot"),
    grid_card_plot("greenPlot")
  )
)


drawHist <- function(nbins, color) {
  x <- faithful[, 2]
  bins <- seq(min(x), max(x), length.out = nbins + 1)
  hist(x, breaks = bins, col = color, border = "white")
}

server <- function(input, output) {
  output$distPlot <- renderPlot(drawHist(input$bins, "darkgray"))
  output$redPlot <- renderPlot(drawHist(input$bins, "orangered"))
  output$bluePlot <- renderPlot(drawHist(input$bins, "steelblue"))
  output$greenPlot <- renderPlot(drawHist(input$bins, "forestgreen"))
}

shinyApp(ui, server)

