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
      grid_card(
        "header",
        shiny::h2(id = "header", "This is my header content")
      ),
      grid_card(
        "footer",
        shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
      ),
      grid_card(
        "plot",
        shiny::plotOutput("myPlot")
      )
    )
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
      layout = layout_wo_footer,
      grid_card(
        "header",
        shiny::h2(id = "header", "This is my header content")
      ),
      grid_card(
        "footer",
        shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
      ),
      grid_card(
        "plot",
        shiny::plotOutput("myPlot")
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
      grid_card(
        "header",
        shiny::h2(id = "header", "This is my header content")
      ),
      grid_card(
        "footer2",
        shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
      ),
      grid_card(
        "plot",
        shiny::plotOutput("myPlot")
      )
    )
  )

  expect_snapshot(err_msg$message)

})

