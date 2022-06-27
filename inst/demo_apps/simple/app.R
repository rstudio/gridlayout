# Experiment with how little we can do but still get layout

# pak::pkg_install('rstudio/bslib@joe/feature/cards')
library(gridlayout)
library(shiny)
library(bslib)

shinyApp(
  ui = grid_page(
    layout = c(
      "A B",
      "C C"
    ),
    gap_size = "10px",
    grid_page_header("This is my new header!", bgColor="success", bgGradient = TRUE),
    grid_page_sidebar(
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
      bgColor = "info",
      bgGradient = TRUE
    ),
    grid_card(
      "A",
      title="Simple Plot",
      card_plot_output("distPlot")
    ),
    grid_card(
      "B",
      title = "Featured",
      tags$p("This shows whatever."),
      card_plot_output("plot", height = 200)
    ),
    grid_plot(
      "C",
      outputId = "plot2"
    )
  ),
  server = function(input, output, session) {
    output$plot <- renderPlot({
      plot(cars)
      title("A plot")
    })
    output$plot2 <- renderPlot({
      plot(cars)
      title("A plot")
    })
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
