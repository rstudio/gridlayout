# The geyser app... but in grid!
library(gridlayout)
library(shiny)

main_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|70px  |header  |header |
|1fr   |sidebar |plot   |"

mobile_layout <- "
|----- |--------|
|2rem  |1fr     |
|100px |header  |
|250px |sidebar |
|400px |plot    |"

big_screen_layout <- "
|-----|-------|--------|-----|
|2rem |250px  | 250px  |1fr  |
|1fr  |header |sidebar |plot |
"

my_layout <- new_gridlayout(
  main_layout,
  alternate_layouts = list(
    list(
      layout = mobile_layout,
      width_bounds = c(max = 600)
    ),
    list(
      layout = big_screen_layout,
      width_bounds = c(min = 1600)
    )
  )
)


# The classic Geyser app with grid layout
app <- shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    use_bslib_card_styles = TRUE,
    text_panel("header", "Geysers!"),
    grid_panel(
      "sidebar",
      title = "Settings",
      v_align = "center",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_panel(
      "plot",
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


