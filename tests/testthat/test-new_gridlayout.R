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

  expect_equal(get_info(my_layout, "col_sizes"),
               c("1fr", "2fr"))

  expect_equal(get_info(my_layout, "row_sizes"),
               c("100px", "1fr"))

  expect_equal(get_info(my_layout, "gap"),
               "2rem")
})

test_that("Works with no values at all", {
  expect_snapshot(new_gridlayout())
})

test_that("Sizing defaults work", {

  my_layout <- new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |
    "
  )

  expect_s3_class(my_layout, "gridlayout")

  expect_equal(get_info(my_layout, "col_sizes"),
               c("1fr", "1fr"))

  expect_equal(get_info(my_layout, "row_sizes"),
               c("1fr", "1fr"))

  expect_equal(get_info(my_layout, "gap"),
               "1rem")
})

test_that("Default row sizes react properly to auto-height container", {

  mobile_layout <-"
    |--------|
    |1fr     |
    |header  |
    |sidebar |
    |plot    |"

  expect_false(
    identical(
      get_info(new_gridlayout(mobile_layout,container_height = "auto"), "row_sizes"),
      get_info(new_gridlayout(mobile_layout,container_height = "viewport"), "row_sizes")
    )
  )
})

test_that("Users are warned about relative height rows with auto-height containers", {

  mobile_layout <-"
    | 50px  |header  |
    | 100px |sidebar |
    | 1fr   |plot    |"

  expect_warning(
    new_gridlayout(mobile_layout,container_height = "auto"),
    regexp = "Relative row heights don't mix well with auto-height containers. Expect some visual wonkiness.",
    fixed = TRUE
  )
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

  expect_equal(get_info(my_layout, "col_sizes"),
               c("100px", "100px"))

  expect_equal(get_info(my_layout, "row_sizes"),
               c("200px", "200px"))
})

test_that("Handles an explicit missing row provided with dots", {
  expect_snapshot(   new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |
      | .      | .      |",
    row_sizes = c("200px", "1fr", "2fr")
  ))

  expect_snapshot(new_gridlayout(
    layout_def = "
      | header | header | . |
      | plota  | plotb  | . |",
    col_sizes = c("200px", "1fr", "2fr")
  ))
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


test_that("Can use a character vector to avoid multiline strings", {

  expect_equal(
    new_gridlayout(
      c(
        "| header | header |",
        "| plota  | plotb  |"
      )
    ),
    new_gridlayout(
      "| header | header |
       | plota  | plotb  |"
    )
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




test_that("Similar named grid areas don't overlap", {

  my_layout <- md_to_gridlayout("
  |10px  |120px |
  |100px |test2 |
  |1fr   |test  |")

  # Previous versions used regexes that would place test wherever test2 was as well
  expect_false(
    get_info(my_layout, "elements")[[1]]$start_row ==
    get_info(my_layout, "elements")[[2]]$start_row
  )
})
