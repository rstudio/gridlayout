test_that("Basic table works", {
  my_layout <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_s3_class(my_layout, "gridlayout")

  expect_equal(attr(my_layout, "col_sizes"),
               c("120px", "1fr", "1fr"))

  expect_equal(attr(my_layout, "row_sizes"),
               c("100px", "1fr", "1fr"))

  expect_equal(attr(my_layout, "gap"),
               "1rem")
})

test_that("Can put gap size in upper left", {
  my_layout <- md_to_gridlayout(
    layout_table = "
      | 2rem |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_equal(attr(my_layout, "gap"),
               "2rem")
})

test_that("No sizes will give you constant sizes rows and cols", {
  my_layout <- md_to_gridlayout(
    layout_table = "
      |        |       |       |
      |:-------|:------|:------|
      |header  |header |header |
      |sidebar |plot_a |plot_c |
      |sidebar |plot_b |plot_b |"
  )

  expect_equal(attr(my_layout, "col_sizes"),
               c("1fr", "1fr", "1fr"))

  expect_equal(attr(my_layout, "row_sizes"),
               c("1fr", "1fr", "1fr"))
})
