# The geyser app... but in grid!

library(gridlayout)
library(shiny)
requireNamespace("bslib", quietly = TRUE)

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = c(
      "header  header",
      "sidebar plot"
    ),
    row_sizes = c("85px", "1fr"),
    col_sizes = c("200px", "1fr"),
    gap_size = "2rem",
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    grid_panel_text("header", "This is my header", is_title = TRUE),
    grid_panel(
      "sidebar",
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_panel(
      "plot",
      plotOutput("distPlot", height="100%")
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
app



