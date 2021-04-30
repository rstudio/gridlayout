# The geyser app... but in grid!

library(gridlayout)
library(shiny)
requireNamespace("bslib", quietly = TRUE)
requireNamespace("fontawesome", quietly = TRUE)
my_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |content|"

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
    header = gridlayout::grid_panel(
      h2(id = "header", "This is my header content"),
      v_align = "center"
    ),
    sidebar = p("Here is my sidebar and all the content that may be desired within it!"),
    content = grid_container(
      id = "content",
      layout = new_gridlayout(content_layout, container_height = "100%"),
      elements = list(
        icon = grid_panel(
          h2(fontawesome::fa("r-project", fill = "steelblue"), height = "80px"),
          v_align = "center",
          h_align = "center"
        ),
        bin_chooser = grid_panel(
          sliderInput("bins", label = "Number of bins", min = 1, max = 50, value = 30),
          v_align = "center"
        ),
        settings = textOutput('current_bin_num'),
        plot = plotOutput("distPlot", height = "100%")
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
