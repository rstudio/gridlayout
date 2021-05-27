# This is an app that allows live reloading when developing the typescript for grided
# It loads links to the hosted script and stylesheets so they get updated when saved

library(gridlayout)
library(shiny)


setwd(here::here("inst/grided/"))

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

requireNamespace("bslib", quietly = TRUE)
my_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|150px |header  |header |
|1fr   |sidebar |plot   |"

# The classic Geyser app with grid layout
shinyApp(
  ui = grid_page(
    layout = my_layout,
    theme = bslib::bs_theme(),
    header = h2(id = "header", "This is my header"),
    sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
    plot = plotOutput("distPlot", height = "100%"),
    tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      tags$script(src = "dist/index.js"),
    )
  ),
  server = function(input, output, session) {


    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })

    grided_server_code(input, output, session)

  }
)
