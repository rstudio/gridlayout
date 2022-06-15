# Experiment with how little we can do but still get layout

# pak::pkg_install('rstudio/bslib@joe/feature/cards')
library(gridlayout)
library(shiny)
library(bslib)

theme <- bs_theme() |>
  bs_add_rules(
    rules = list(
      ".grid-container {
          background-color: $gray-200;
          --grid-header-bg-color: #{$primary};
          --grid-header-fg-color: #{$gray-100};
          --grid-sidebar-bg-color: #{$secondary};
          --grid-sidebar-fg-color: #{$gray-100};
        }"
    )
  )

shinyApp(
  ui = grid_page(
    layout = c(
      "header  header header",
      "sidebar A      B ",
      "sidebar C      D "
    ),
    row_sizes = c("auto", "1fr", "1fr"),
    col_sizes = c("200px", "1fr", "1fr"),
    gap_size = "15px",
    theme = theme,
    grid_header("header", "This is my new header!"),
    grid_sidebar(
      "sidebar",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
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
