# collapsible cards can be auto-detected and enabled
# Not working

library(gridlayout)
library(shiny)


my_layout <- new_gridlayout(
  "
  |     |200px   |1fr    |
  |80px |header  |header |
  |1fr  |sidebar |plot   |",
  alternate_layouts = list(
    layout = "
      |      |1fr     |
      |80px  |header  |
      |auto  |sidebar |
      |400px |plot    |",
    width_bounds = c(max = 700)
  )
)


# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    text_panel("header", "This is my header", is_title = TRUE),
    grid_panel(
      area = "sidebar",
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_panel(
      area = "plot",
      title = "Geysers!",
      plotOutput("distPlot", height = "100%")
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

