# Experiment with how little we can do but still get layout

# Make sure you have latest dev version of gridlayout
# pak::pkg_install('rstudio/gridlayout')
library(gridlayout)
library(shiny)
# pak::pkg_install('rstudio/bslib@joe/feature/cards')
library(bslib)


panel_card <- function(..., card_fn = bslib::card){
  panel(..., tag = card_fn)
}

panel_header <- function(..., tag = tags$h1){
  p <- panel(..., tag = tag)
  tagAppendAttributes(p, class = "padded pos-header")
}

panel_sidebar <- function(...){
  p <- panel(...)
  tagAppendAttributes(p, class = "padded pos-left-sidebar")
}

theme <- bs_theme() |>
  bs_add_rules(
    rules = list(
      ".grid-container { background-color: $gray-200; }",
      ".app-sidebar {
         background-color: $secondary;
         color: $gray-100;
      }",
      ".app-header {
         background-color: $primary;
         color: $gray-100;
      }",
      ".padded { padding: 8px; }"
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
    panel_header("header", "This is my new header!", class = "app-header"),
    panel_sidebar(
      "sidebar",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
      class = "app-sidebar"
    ),
    panel(
      "A",
      outputId = "distPlot",
      height = "100%",
      tag = plotOutput
    ),
    panel_card(
      "B",
      card_heading("Featured"),
      card_body(
        tags$p("This shows whatever.")
      ),
      plotOutput("plot", height = 200),
      card_body(
        tags$p("I hope you like this plot I made for you.")
      ),
      card_footer("Footer")
    ),
    panel_card(
      "C",
      card_plot("plot2"),
      card_header("This is my plot")
    ),
    panel_card(
      "D",
      card_header("This is my list"),
      card_list(
        card_list_item("The first item"),
        card_list_item("The second item"),
        card_list_item(actionButton("button", "A button")),
        card_list_item(actionLink("link", "A link")),
      ),
    ),
    tags$style(HTML(".card-body > :last-child { margin-bottom: 0; }")),
    tags$style(HTML(".card-body > .shiny-plot-output:last-child img { border-radius: ???; }"))
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
