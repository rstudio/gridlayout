make_grid_container <- function(...){
  htmltools::renderTags(
    grid_container(
      ...,
      id = "my_grid",
      grid_panel_text("header", "This is my header content"),
      grid_panel(
        "plot",
        shiny::plotOutput("myPlot")
      )
    )
  )
}


md_table <- make_grid_container(
  layout = "
    |2rem |200px  |
    |100px|header |
    |1fr  |plot   |"
)

sized_array_table <- make_grid_container(
  layout = c(
    "2rem   200px",
    "100px  header",
    "1fr    plot"
  )
)

array_table_with_size_args <- make_grid_container(
  layout = c(
    "header",
    "plot"
  ),
  row_sizes = c("100px", "1fr"),
  col_sizes = c("200px"),
  gap_size = "2rem"
)

array_table_with_gap_args <- make_grid_container(
  layout = c(
    "       200px",
    "100px  header",
    "1fr    plot"
  ),
  gap_size = "2rem"
)



test_that("Different methods of defining the same layout return the same thing", {

  expect_equal(
    md_table,
    sized_array_table
  )

  expect_equal(
    sized_array_table,
    array_table_with_size_args
  )

  expect_equal(
    array_table_with_size_args,
    array_table_with_gap_args
  )
})




