default_row_size <- "1.1fr"
default_col_size <- "2fr"
default_gap_size <- "13px"

test_that("Fully defined sizes", {

  parsed <- parse_layout_matrix(
    matrix(
      c(
        "11px",   "1fr",    "300px",
        "100px", "header",  "header",
        "1fr",   "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c("1fr",    "300px")
  )
  expect_equal(
    parsed$row_sizes,
    c("100px", "1fr", "2rem")
  )
  expect_equal(
    parsed$gap_size,
    "11px"
  )
})


test_that("Missing gap size", {

  parsed <- parse_layout_matrix(
    matrix(
      c(
        "",   "1fr",    "300px",
        "100px", "header",  "header",
        "1fr",   "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c("1fr",    "300px")
  )
  expect_equal(
    parsed$row_sizes,
    c("100px", "1fr", "2rem")
  )
  expect_equal(
    parsed$gap_size,
    default_gap_size
  )
})

test_that("No column sizes", {
  parsed <- parse_layout_matrix(
    matrix(
      c(
        "100px", "header",  "header",
        "1fr",   "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 3,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c(default_col_size, default_col_size)
  )
  expect_equal(
    parsed$row_sizes,
    c("100px", "1fr", "2rem")
  )
  expect_equal(
    parsed$gap_size,
    default_gap_size
  )
})

test_that("No row sizes", {
  parsed <- parse_layout_matrix(
    matrix(
      c(
        "1fr",     "2fr",
        "header",  "header",
        "plota",   "plotb",
        "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c("1fr", "2fr")
  )
  expect_equal(
    parsed$row_sizes,
    c(default_row_size, default_row_size, default_row_size)
  )
  expect_equal(
    parsed$gap_size,
    default_gap_size
  )
})



test_that("Single column - no-sizes", {
  parsed <- parse_layout_matrix(
    matrix(
      c(
        "plota",
        "plotb"
      ),
      nrow = 2,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c(default_col_size)
  )
  expect_equal(
    parsed$row_sizes,
    c(default_row_size, default_row_size)
  )
  expect_equal(
    parsed$gap_size,
    default_gap_size
  )
})

test_that("Single column - all-sizes", {

  parsed <- parse_layout_matrix(
    matrix(
      c("1rem",  "430px",
        "240px","plota",
        "1fr",  "plotb"),
      nrow = 3,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c("430px")
  )
  expect_equal(
    parsed$row_sizes,
    c("240px", "1fr")
  )
  expect_equal(
    parsed$gap_size,
    "1rem"
  )
})

test_that("Partially defined sizes", {

  parsed <- parse_layout_matrix(
    matrix(
      c(
        "",      "1fr",     "",
        "100px", "header",  "header",
        "",      "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    ),
    default_row_size,
    default_col_size,
    default_gap_size
  )

  expect_equal(
    parsed$column_sizes,
    c("1fr", default_col_size)
  )
  expect_equal(
    parsed$row_sizes,
    c("100px", default_row_size, "2rem")
  )
  expect_equal(
    parsed$gap_size,
    default_gap_size
  )
})


