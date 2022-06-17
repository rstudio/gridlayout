# Experiment with how little we can do but still get layout

# pak::pkg_install('rstudio/bslib@joe/feature/cards')
library(gridlayout)
library(shiny)
library(bslib)

shinyApp(
  ui = grid_page(
    layout = c(
      "A B",
      "C D"
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
      card_heading("Simple Plot"),
      card_plot_output("distPlot")
    ),
    grid_card(
      "B",
      card_heading("Featured"),
      card_body(
        tags$p("This shows whatever.")
      ),
      card_plot_output("plot", height = 200),
      card_body(
        tags$p("I hope you like this plot I made for you.")
      ),
      card_footer("Footer")
    ),
    grid_plot(
      "C",
      outputId = "plot2"
    ),
    grid_card(
      "D",
      card_header("This is my list"),
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
