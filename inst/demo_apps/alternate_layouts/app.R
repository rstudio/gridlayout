# The geyser app... but in grid!
library(gridlayout)
library(shiny)
library(bslib)

main_layout <- c(
  "10px 200px   1fr   ",
  "70px header  header",
  "1fr  sidebar plot  "
)

mobile_layout <- c(
  "10px  1fr    ",
  "100px header ",
  "250px sidebar",
  "400px plot   "
)

big_screen_layout <- c(
  "10px 250px   250px  1fr ",
  "1fr  header sidebar plot"
)

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
    theme = bs_theme(),
    grid_card_text("header", "Geysers!"),
    grid_card(
      "sidebar",
      title = "Settings",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_card_plot("plot", "distPlot")
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


