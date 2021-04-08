# The geyser app... but in grid!

library(gridlayout)
library(shiny)

looks_like_a_table <- "
|header1 | header2 |
| val1   | val2    |
| 0.3  1.4     |"

my_layout <- "|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|115px |header  |header |
|1fr   |sidebar |plot   |" #an important comment

another_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header2  |header2 |
|1fr   |sidebar2 |plot2   |"


# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = h2(id = "header", "This is my header"),
    sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
    plot = plotOutput("distPlot", height = "100%")
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
run_with_grided(app)

