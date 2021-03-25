# The geyser app... but in grid!
library(gridlayout)
library(shiny)
requireNamespace("bslib", quietly = TRUE)

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

my_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|150px |header  |header |
|1fr   |sidebar |plot   |"

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout_edit_mode = TRUE,
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = h2(id = "header", "This is my header content 2"),
    sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
    plot = plotOutput("distPlot", height = "100%")
    # tags$head(
    #   tags$script(src = "app_updater.js")
    # )
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
