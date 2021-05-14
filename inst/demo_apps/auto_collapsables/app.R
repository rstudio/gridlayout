# collapsible cards can be auto-detected and enabled

library(gridlayout)
library(shiny)

options(shiny.autoreload = TRUE)
options(shiny.trace = TRUE)
shiny::devmode(TRUE)

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
      |auto |plot    |",
    width_bounds = c(max = 700)
  )
)


# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    header = title_panel("This is my header"),
    sidebar = grid_panel(
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    plot = grid_panel(
      title = "Geysers!",
      plotOutput("distPlot", height = "400px")
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

