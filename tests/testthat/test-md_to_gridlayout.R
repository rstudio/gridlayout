test_that("Basic table works", {
  my_layout <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |------|--------|-------|-------|
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
      |------|--------|-------|-------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_equal(attr(my_layout, "gap"),
               "2rem")
})

test_that("Doesn't matter if col sizes are given in table header or simply first row", {
  my_layout <-

    expect_equal(
      md_to_gridlayout(
        layout_table = "
      | 2rem |120px   |1fr    |1fr    |
      |------|--------|-------|-------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
      ),
      md_to_gridlayout(
        layout_table = "
      |      |        |       |       |
      |------|--------|-------|-------|
      | 2rem |120px   |1fr    |1fr    |
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
      ))
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

test_that("Nonsense will give a usefull error message", {
  my_layout <-

    expect_error(
      md_to_gridlayout(
        layout_table = "## THis was an accidentally
    selected chunk of text
    that is not a table at all"
      ),
    "The provided text does not appear to be a markdown table.")
})
