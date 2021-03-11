test_that("Gets mad when mismatches are present", {
  layout_w_footer <- "
|      |        |         |
|------|--------|---------|
|2rem  |200px   |1fr      |
|150px |header  |header   |
|1fr   |sidebar |mainPlot |
|100px |footer  |footer   |"

  expect_error(
    grid_page(
      layout = layout_w_footer,
      header = shiny::h2(id = "app-title", "Old Faithful Geyser Data"),
      sidebar = shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
      mainPlot = shiny::plotOutput("distPlot", height = "100%")
    ),
    regexp = paste(
      "Mismatch between the provided elements and the defined elements in layout definition.",
      "The following element(s) were declared in the layout but not provided to `grid_page`: footer",
      "If this was intentional set `.verify_matches = FALSE`",
      sep = "\n"
    ),
    fixed = TRUE
  )

})
