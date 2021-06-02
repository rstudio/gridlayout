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

R_logo <- text_panel(icon = "r-project", h_align = "center")
# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = title_panel("Nested grids"),
    nestedA = nested_grid_panel(
      layout = content_layout,
      elements = list(
        icon = R_logo,
        bin_chooser = grid_panel(
          sliderInput("bins", label = "Number of bins", min = 1, max = 50, value = 30),
          h_align = "center",
          v_align = "center"
        ),
        settings = textOutput('current_bin_num'),
        plot = plotOutput("distPlot")
      )
    ),
    nestedB = nested_grid_panel(
      title = "Nested within a titled panel",
      layout = content_layout,
      elements = list(
        icon = R_logo,
        bin_chooser = text_panel("Bin Chooser L1", h_align = "center"),
        settings = text_panel("Settings L1", h_align = "center"),
        plot = nested_grid_panel(
          layout = content_layout,
          elements = list(
            icon = R_logo,
            bin_chooser = text_panel("Bin Chooser L2", h_align = "center"),
            settings = text_panel("Settings L2", h_align = "center"),
            plot =text_panel("Plot", h_align = "center")
          )
        )
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
