# Experiment with how little we can do but still get layout

# pak::pkg_install('rstudio/bslib@joe/feature/cards')
# pak::pkg_install('rstudio/bslib')
library(gridlayout)
library(shiny)
library(bslib)

shinyApp(
  ui = grid_page(
    layout = c("A B B"),
    grid_place(
      "A",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_place(
      "B",
      plotOutput("distPlot", height = "100%")
    )
  ),
  server = function(input, output, session) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
