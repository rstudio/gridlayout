# Demonstrating the ability to nest grid layouts within other gridlayouts

library(gridlayout)
library(shiny)
library(bslib)

my_layout <- "
|20px |1fr     |1fr     |
|auto |header  |header  |
|1fr  |nestedA |nestedB |"

content_layout <- "
|20px |auto     |1fr         |
|auto |icon     |bin_chooser |
|1fr  |settings |plot        |"

R_logo <- grid_card(area = "icon", fontawesome::fa("r-project"))

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    grid_place("header", tags$h1("Nested Grids")),
    grid_panel_nested(
      area = "nestedA",
      layout = content_layout,
      R_logo,
      grid_card(
        "bin_chooser",
        sliderInput("bins", label = "Number of bins", min = 1, max = 50, value = 30)
      ),
      grid_plot("plot", "distPlot"),
      grid_card(
        "settings",
        textOutput('current_bin_num')
      )
    ),
    grid_panel_nested(
      area = 'nestedB',
      title = "Nested within a titled panel",
      layout = content_layout,
      R_logo,
      grid_card("bin_chooser", "Bin Chooser L1"),
      grid_card("settings", "Settings L1"),
      grid_panel_nested(
        "plot",
        layout = content_layout,
        R_logo,
        grid_card("bin_chooser", "Bin Chooser L2"),
        grid_card("settings", "Settings L2"),
        grid_card("plot", "Plot")
      )
    )
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
    output$current_bin_num <- renderText({
      paste("Histogram has", input$bins, "bins.")
    })
  }
)
