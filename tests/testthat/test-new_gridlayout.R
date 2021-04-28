test_that("Basic setup with all options filled works", {

  my_layout <- new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |
    ",
    col_sizes = c("1fr", "2fr"),
    row_sizes = c("100px", "1fr"),
    gap = "2rem"
  )


  expect_s3_class(my_layout, "gridlayout")

  expect_equal(attr(my_layout, "col_sizes"),
               c("1fr", "2fr"))

  expect_equal(attr(my_layout, "row_sizes"),
               c("100px", "1fr"))

  expect_equal(attr(my_layout, "gap"),
               "2rem")
})

test_that("Sizing defaults work", {

  my_layout <- new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |
    "
  )

  expect_s3_class(my_layout, "gridlayout")

  expect_equal(attr(my_layout, "col_sizes"),
               c("1fr", "1fr"))

  expect_equal(attr(my_layout, "row_sizes"),
               c("1fr", "1fr"))

  expect_equal(attr(my_layout, "gap"),
               "1rem")
})

test_that("A single size can be passed for row and column sizes and it will be recycled", {

  my_layout <- new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |
    ",
    row_sizes = "200px",
    col_sizes = "100px"
  )

  expect_s3_class(my_layout, "gridlayout")

  expect_equal(attr(my_layout, "col_sizes"),
               c("100px", "100px"))

  expect_equal(attr(my_layout, "row_sizes"),
               c("200px", "200px"))
})

test_that("Gets mad if your row and column sizes don't match matrix dimensions", {

  expect_error(
    new_gridlayout(
      layout_def = "
      | header | header |
      | plota  | plotb  |",
      row_sizes = c("200px", "1fr", "2fr")
    ),
    regexp = "The provided row sizes need to match the number of rows in your layout"
  )

  expect_error(
    new_gridlayout(
      layout_def = "
      | header | header |
      | plota  | plotb  |",
      col_sizes = c("200px", "1fr", "2fr")
    ),
    regexp = "The provided col sizes need to match the number of cols in your layout"
  )

})


test_that("Can initialize a layout with the element_list argument instead of a md table", {
  elements_w_overlap <- list(
    list(id = "header",  start_row = 1, end_row = 1, start_col = 1, end_col = 3),
    list(id = "sidebar", start_row = 2, end_row = 3, start_col = 1, end_col = 1),
    list(id = "plot_a",  start_row = 2, end_row = 3, start_col = 2, end_col = 3),
    list(id = "plot_b",  start_row = 3, end_row = 3, start_col = 2, end_col = 2),
    list(id = "plot_c",  start_row = 3, end_row = 3, start_col = 3, end_col = 3)
  )


  expect_silent(
    new_gridlayout(
      elements_w_overlap,
      col_sizes = c("1fr", "1fr", "1fr"),
      row_sizes = c("1fr", "1fr", "1fr"),
    )
  )

})

test_that("Alternate layouts can be added for different sized screens", {

  main_layout <- new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |",
    col_sizes = c("1fr", "2fr"),
    row_sizes = c("100px", "1fr"),
    gap = "2rem"
  )

  mobile_layout <- new_gridlayout(
    layout_def = "
      |header|
      |plota |
      |plotb |",
    col_sizes = c("1fr"),
    row_sizes = c("100px", "400px", "500px"),
    gap = "2rem"
  )


  main_w_alternate <- add_alternate_layout(
    layout = main_layout,
    alternate_layout = mobile_layout,
    lower_bound_width = 400
  )

  expect_equal(
    mobile_layout,
    attr(main_w_alternate, "alternates")[[1]]$layout,
    ignore_attr = TRUE
  )

  mobile_wo_plota <- new_gridlayout(
    layout_def = "
      |header|
      |plota |",
    row_sizes = c("100px", "500px")
  )

  expect_error(
    add_alternate_layout(
      layout = main_layout,
      alternate_layout = mobile_wo_plota,
      lower_bound_width = 400
    ),
    regexp = "Layouts have mismatched elements: plotb",
    fixed = TRUE
  )

  big_screen_layout <- new_gridlayout(
    layout_def = "|header|plota|plotb|",
    col_sizes = c("200px", "1fr", "1fr"),
    row_sizes = c("1fr")
  )

  expect_error(
    add_alternate_layout(
      main_w_alternate,
      alternate_layout = big_screen_layout,
      lower_bound_width = 350
    ),
    regexp = "New alternate interval overlaps with previous interval",
    fixed = TRUE
  )
})

test_that("Basic table works", {
  my_layout <- new_gridlayout("
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
  my_layout <- new_gridlayout("
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
      new_gridlayout("
      | 2rem |120px   |1fr    |1fr    |
      |------|--------|-------|-------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
      ),
      new_gridlayout("
      |      |        |       |       |
      |------|--------|-------|-------|
      | 2rem |120px   |1fr    |1fr    |
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
      ))
})

test_that("No sizes will give you constant sizes rows and cols", {
  my_layout <- new_gridlayout("
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
  expect_error(
    new_gridlayout("## THis was an accidentally
    selected chunk of text
    that is not a table at all"
    ),
    "The provided text does not appear to be a markdown table.")
})


test_that("Markdown parsing -- All sizes provided", {
  expect_snapshot(
    new_gridlayout("
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |"
    )
  )
})

test_that("Markdown parsing -- Only row sizes", {
  expect_snapshot(
    new_gridlayout("
|80px  |header  |header |
|1fr   |sidebar |plot   |"
    )
  )
})


test_that("Markdown parsing -- Only col sizes", {
  expect_snapshot(
    new_gridlayout("
|200px   |1fr    |
|header  |header |
|sidebar |plot   |"
    )
  )
})

test_that("Markdown parsing -- Gap and row sizes", {
  expect_snapshot(
    new_gridlayout("
|2rem  |        |       |
|80px  |header  |header |
|1fr   |sidebar |plot   |"
    )
  )
})

test_that("Markdown parsing -- Only gap size", {
  expect_snapshot(
    new_gridlayout("
|2rem  |        |       |
|      |header  |header |
|      |sidebar |plot   |"
    )
  )
})

test_that("Markdown parsing -- No sizes", {
  expect_snapshot(
    new_gridlayout("
|header  |header |
|sidebar |plot   |"
    )
  )
})

