test_that("Gets mad when elements start before grid", {
  bad_row <- list(
    list(id = "header",  start_row = 0, end_row = 3, start_col = 1, end_col = 3),
    list(id = "sidebar", start_row = 2, end_row = 3, start_col = 1, end_col = 1)
  )

  expect_error(
    elements_to_grid_mat(bad_row, col_sizes = c('1fr', "1fr", "1fr"), row_sizes = c("1fr", "1fr", "1fr")),
    regexp = paste0("Element(s) \"header\" have invalid start_row values\n",
                    "Row start must be 1 or greater as indexing into the grid starts at 1."),
    fixed = TRUE
  )

  bad_col <- list(
    list(id = "header",  start_row = 1, end_row = 3, start_col = 1, end_col = 3),
    list(id = "sidebar", start_row = 2, end_row = 3, start_col = -1, end_col = 1)
  )

  expect_error(
    elements_to_grid_mat(bad_col, col_sizes = c('1fr', "1fr", "1fr"), row_sizes = c("1fr", "1fr", "1fr")),
    regexp = paste0("Element(s) \"sidebar\" have invalid start_col values\n",
                    "Column start must be 1 or greater as indexing into the grid starts at 1."),
    fixed = TRUE
  )
})

test_that("Gets mad when elements extend beyond designated grid", {
  too_wide <- list(
    list(id = "header",  start_row = 1, end_row = 4, start_col = 1, end_col = 3),
    list(id = "sidebar", start_row = 2, end_row = 3, start_col = 1, end_col = 1)
  )

  expect_error(
    elements_to_grid_mat(too_wide, col_sizes = c('1fr', "1fr", "1fr"), row_sizes = c("1fr", "1fr", "1fr")),
    regexp = "Element(s) \"header\" extend beyond specified grid rows",
    fixed = TRUE
  )

  too_tall <- list(
    list(id = "header",  start_row = 1, end_row = 3, start_col = 1, end_col = 3),
    list(id = "sidebar", start_row = 2, end_row = 3, start_col = 1, end_col = 5)
  )

  expect_error(
    elements_to_grid_mat(too_tall, col_sizes = c('1fr', "1fr", "1fr"), row_sizes = c("1fr", "1fr", "1fr")),
    regexp = "Element(s) \"sidebar\" extend beyond specified grid cols",
    fixed = TRUE
  )
})


test_that("Overlapping elements are detected (and can be ignored)", {
  elements_w_overlap <- list(
    list(id = "header",  start_row = 1, end_row = 1, start_col = 1, end_col = 3),
    list(id = "sidebar", start_row = 2, end_row = 3, start_col = 1, end_col = 1),
    list(id = "plot_a",  start_row = 2, end_row = 3, start_col = 2, end_col = 3),
    list(id = "plot_b",  start_row = 3, end_row = 3, start_col = 2, end_col = 2),
    list(id = "plot_c",  start_row = 3, end_row = 3, start_col = 3, end_col = 3)
  )
  suppressWarnings({
    expect_warning(
      elements_to_grid_mat(elements_w_overlap, col_sizes = c('1fr', "1fr", "1fr"), row_sizes = c("1fr", "1fr", "1fr"))
    )
  })
  expect_silent(
    elements_to_grid_mat(elements_w_overlap, col_sizes = c('1fr', "1fr", "1fr"), row_sizes = c("1fr", "1fr", "1fr"))
  )
})
