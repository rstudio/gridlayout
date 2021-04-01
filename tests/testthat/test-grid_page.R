test_that("Works when it should", {

  expect_snapshot(
    grid_page(
      layout = "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |plot    |
    |1fr   |footer  |",
    header = shiny::h2(id = "header", "This is my header content"),
    footer = shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
    plot = shiny::plotOutput("myPlot")
    )()
  )

})

test_that("Warns about mismatches between layout and passed elements", {

  layout_wo_footer <- "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |plot    |"

  err_msg <- expect_error(
    grid_container(
      "main_grid",
      layout = layout_wo_footer,
      elements = list(
        header = shiny::h2("This is my header content"),
        plot = shiny::plotOutput("myPlot"),
        footer = shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
      )
    )
  )

  expect_snapshot(err_msg$message)
})


test_that("Warns about both at the same time to help people debug easier", {

  err_msg <- expect_error(
    grid_container(
      layout = "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |plot    |
    |1fr   |footer  |",
    elements = list(
      header = shiny::h2("This is my header content"),
      footer2 = shiny::h2("This is a footer"),
      plot = shiny::plotOutput("myPlot")
    )
    )
  )

  expect_snapshot(err_msg$message)

})

