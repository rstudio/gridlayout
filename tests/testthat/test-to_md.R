test_that("Can reacreate input table", {
  start_table <-
"|      |        |       |       |
|:-----|:-------|:------|:------|
|10px  |120px   |1fr    |1fr    |
|100px |header  |header |header |
|1fr   |sidebar |plot_a |plot_c |
|1fr   |sidebar |plot_b |plot_b |"

  my_layout <- md_to_gridlayout(layout_table = start_table)
  expect_equal(
    to_md(my_layout),
    start_table
  )
})
