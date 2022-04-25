# Demonstrating the ability to nest grid layouts within other gridlayouts
# Not working properly with the flat syntax

library(gridlayout)
library(shiny)

my_layout <- "
|     |        |        |
|-----|--------|--------|
|1rem |1fr     |1fr     |
|auto |header  |header  |
|1fr  |nestedA |nestedB |"

content_layout <- "
|     |auto     |1fr         |
|auto |icon     |bin_chooser |
|1fr  |settings |plot        |"

R_logo <- text_panel(area = "icon", icon = "r-project", h_align = "center")

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    title_panel("header", "Nested grids"),
    nested_grid_panel(
      area = "nestedA",
      layout = content_layout,
      R_logo,
      grid_panel(
        "bin_chooser",
        sliderInput("bins", label = "Number of bins", min = 1, max = 50, value = 30),
        h_align = "center",
        v_align = "center"
      ),
      grid_panel(
        area = "plot",
        plotOutput("distPlot", height="100%")
      ),
      vertical_stack_panel(
        area = "settings",
        textOutput('current_bin_num')
      )
    ),
    nested_grid_panel(
      area = 'nestedB',
      title = "Nested within a titled panel",
      layout = content_layout,
      R_logo,
      text_panel("bin_chooser", "Bin Chooser L1", h_align = "center"),
      text_panel("settings", "Settings L1", h_align = "center"),
      nested_grid_panel(
        "plot",
        layout = content_layout,
        R_logo,
        text_panel("bin_chooser", "Bin Chooser L2", h_align = "center"),
        text_panel("settings", "Settings L2", h_align = "center"),
        text_panel("plot", "Plot", h_align = "center")
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
