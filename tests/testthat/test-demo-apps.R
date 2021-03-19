# Run demo app and take a screenshot of landing page
screenshot_demo_app <- function(app_obj) {
  path <- tempfile(fileext = ".png")

  webshot2::appshot(
    app = app_obj,
    file = path,
    vwidth = 1600,
    vheight = 1200,
    cliprect = "viewport"
  )

  path
}

test_that("geyser app demo", {
  my_layout <- "
  |      |        |       |
  |------|--------|-------|
  |2rem  |200px   |1fr    |
  |150px |header  |header |
  |1fr   |sidebar |plot   |"
  app_obj <- shiny::shinyApp(
    ui = grid_page(
      layout = my_layout,
      header = shiny::h2("Old Faithful Geyser Data"),
      sidebar = shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
      plot = shiny::plotOutput("distPlot", height = "100%")
    ),
    server = function(input, output) {
      output$distPlot <- shiny::renderPlot({
        x    <- faithful[, 2]
        bins <- seq(min(x), max(x), length.out = input$bins + 1)
        hist(x, breaks = bins, col = 'darkgray', border = 'white')
      })
    }
  )

  expect_snapshot_file(screenshot_demo_app(app_obj), "app.png")
})

