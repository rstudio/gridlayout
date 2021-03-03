library(gridlayout)
library(shiny)

my_layout <- "
|      |        |         |
|------|--------|---------|
|2rem  |200px   |1fr      |
|100px |header  |header   |
|1fr   |sidebar |distPlot |"

# The classic Geyser app with grid layout
shinyApp(
  ui = fluidPage(
    use_gridlayout(my_layout, "app-container", debug_mode = TRUE),
    div(
      id = "app-container",
      div(id = "header",
        h2(id = "app-title", "Old Faithful Geyser Data")
      ),
      div(id = "sidebar",
        sliderInput("bins","Number of bins:",
                    min = 1, max = 50, value = 30)
      ),
      plotOutput("distPlot")
    )
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
