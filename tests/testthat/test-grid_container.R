
md_table <- grid_container(
  layout = "
    |2rem |200px  |
    |1fr  |header |
    |1fr  |plot   |",
  id = "my_grid",
  text_panel("header", "This is my header content"),
  grid_panel(
    "plot",
    shiny::plotOutput("myPlot")
  )
)

sized_array_table <- grid_container(
  layout = c(
    "2rem 200px",
    "1fr  header",
    "1fr  plot"
  ),
  id = "my_grid",
  text_panel("header", "This is my header content"),
  grid_panel(
    "plot",
    shiny::plotOutput("myPlot")
  )
)



test_that("Output is as expected for simple grid", {
  expect_snapshot(md_table)
})

test_that("Sized md and array tables are equivalent", {

  expect_equal(
    md_table,
    sized_array_table
  )
})

