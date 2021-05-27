# The geyser app... but in grid!

library(gridlayout)
library(shiny)
requireNamespace("bslib", quietly = TRUE)
requireNamespace("fontawesome", quietly = TRUE)

my_layout <- "
|     |        |        |
|-----|--------|--------|
|1rem |1fr     |1fr     |
|auto |header  |header  |
|1fr  |nestedA |nestedB |"

content_layout <- "
|    |         |            |
|----|---------|------------|
|    |1fr      |4fr         |
|1fr |icon     |bin_chooser |
|4fr |settings |plot        |"

# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = title_panel("Nested grids"),
    nestedA = nested_grid_panel(
      layout = content_layout,
      elements = list(
        icon = text_panel(icon = "r-project", h_align = "center"),
        bin_chooser = sliderInput("bins", label = "Number of bins", min = 1, max = 50, value = 30),
        settings = textOutput('current_bin_num'),
        plot = plotOutput("distPlot")
      )
    ),
    nestedB = nested_grid_panel(
      title = "Nested within a titled panel",
      layout = content_layout,
      elements = list(
        icon = text_panel(icon = "r-project", h_align = "center"),
        bin_chooser = text_panel("Bin Slider"),
        settings = 'Bin numbers',
        plot = text_panel("Another Plot")
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
      paste("There are currently", input$bins, "bins in our histogram.")
    })
  }
)
