test_that("Basic setup with all options filled works", {

  my_layout <- new_gridlayout(
    layout_mat = matrix(c(
      "header", "header",
      "plota",  "plotb"
    ), ncol = 2, byrow = TRUE),
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
    layout_mat = matrix(c(
      "header", "header",
      "plota",  "plotb"
    ), ncol = 2, byrow = TRUE)
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
    layout_mat = matrix(c(
      "header", "header",
      "plota",  "plotb"
    ), ncol = 2, byrow = TRUE),
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
      layout_mat = matrix(c(
        "header", "header",
        "plota",  "plotb"
      ), ncol = 2, byrow = TRUE),
      row_sizes = c("200px", "1fr", "2fr")
    ),
    "The provided row sizes need to match the number of rows in your layout matrix"
  )

  expect_error(
    new_gridlayout(
      layout_mat = matrix(c(
        "header", "header",
        "plota",  "plotb"
      ), ncol = 2, byrow = TRUE),
      col_sizes = c("200px", "1fr", "2fr")
    ),
    "The provided column sizes need to match the number of columns in your layout matrix"
  )

})
