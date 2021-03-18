test_that("multiplication works", {

  grid_obj <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |------|--------|-------|-------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_a |
      |1fr   |sidebar |plot_b |plot_c |"
  )

  expect_equal(
    get_elements(grid_obj),
    list(
      list(id = "header",  start_row = 1, end_row = 1, start_col = 1, end_col = 3),
      list(id = "sidebar", start_row = 2, end_row = 3, start_col = 1, end_col = 1),
      list(id = "plot_a",  start_row = 2, end_row = 2, start_col = 2, end_col = 3),
      list(id = "plot_b",  start_row = 3, end_row = 3, start_col = 2, end_col = 2),
      list(id = "plot_c",  start_row = 3, end_row = 3, start_col = 3, end_col = 3)
    ),
    ignore_attr = TRUE
  )
})
