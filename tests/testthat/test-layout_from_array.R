test_that("No gap size", {
  parsed <- layout_from_array(
    c(
      "      1fr     2fr  ",
      "100px header  header",
      "1fr   plota   plotb ",
      "2rem  footer  footer "
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("1fr", "2fr"))
  expect_equal(parsed$row_sizes, c("100px", "1fr", "2rem"))
})

test_that("With gap size", {
  parsed <- layout_from_array(
    c(
      "42px  1fr     2fr  ",
      "100px header  header",
      "1fr   plota   plotb ",
      "2rem  footer  footer "
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "42px")
  expect_equal(parsed$column_sizes, c("1fr", "2fr"))
  expect_equal(parsed$row_sizes, c("100px", "1fr", "2rem"))
})


test_that("No column sizes", {
  parsed <- layout_from_array(
    c(
      "100px header  header",
      "1fr   plota   plotb ",
      "2rem  footer  footer "
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("1fr", "1fr"))
  expect_equal(parsed$row_sizes, c("100px", "1fr", "2rem"))
})

test_that("No row sizes", {
  parsed <- layout_from_array(
    c(
      "1fr     2fr  ",
      "header  header",
      "plota   plotb ",
      "footer  footer "
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("1fr", "2fr"))
  expect_equal(parsed$row_sizes, c("1fr", "1fr", "1fr"))
})

test_that("No sizes at all", {
  parsed <- layout_from_array(
    c(
      "header  header",
      "plota   plotb ",
      "footer  footer "
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("1fr", "1fr"))
  expect_equal(parsed$row_sizes, c("1fr", "1fr", "1fr"))
})

test_that("Single row - no-sizes", {
  parsed <- layout_from_array(
    c("plota plotb"),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("1fr", "1fr"))
  expect_equal(parsed$row_sizes, c("1fr"))
})

test_that("Single row - column-sizes", {
  parsed <- layout_from_array(
    c(
      "100px 115px",
      "plota plotb"
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("100px", "115px"))
  expect_equal(parsed$row_sizes, c("1fr"))
})

test_that("Single row - row-size", {
  parsed <- layout_from_array(
    c(
      "10rem plota plotb"
    ),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$column_sizes, c("1fr", "1fr"))
  expect_equal(parsed$row_sizes, c("10rem"))
})

test_that("Single row - all-sizes", {
  parsed <- layout_from_array(
    c(
      "4px   100px 115px",
      "10rem plota plotb"
    )
  )

  expect_equal(parsed$gap_size, "4px")
  expect_equal(parsed$column_sizes, c("100px", "115px"))
  expect_equal(parsed$row_sizes, c("10rem"))
})

test_that("Single column - no-sizes", {
  parsed <- layout_from_array(
    c("plota",
      "plotb"),
    gap_size = "12px"
  )

  expect_equal(parsed$gap_size, "12px")
  expect_equal(parsed$row_sizes, c("1fr", "1fr"))
  expect_equal(parsed$column_sizes, c("1fr"))
})
test_that("Single column - all-sizes", {
  parsed <- layout_from_array(
    c("1rem  430px",
      "240px plota",
      "1fr   plotb")
  )

  expect_equal(parsed$gap_size, "1rem")
  expect_equal(parsed$row_sizes, c("240px", "1fr"))
  expect_equal(parsed$column_sizes, c("430px"))
})

test_that("Errows with inconsistant numbers of columns", {
  expect_error(
    layout_from_array(
      c(
        "1fr     2fr  ",
        "header  header",
        "plota   plotb plotc",
        "footer  footer "
      ),
    ),
    "Different amount of columns in rows. Check format of layout.",
    fixed = TRUE
  )
})

test_that("Errows with ommited sizes", {
  expect_error(
    layout_from_array(
      c(
        "      1fr     2fr  ",
        "100px header  header",
        "      plota   plotb ",
        "3rem  footer  footer "
      ),
    ),
    "If supplying row sizes in layout, every row must be given a size.",
    fixed = TRUE
  )

  expect_error(
    layout_from_array(
      c(
        "2rem          2fr        ",
        "100px header  header header",
        "1fr   plota   plotb  plotc",
        "3rem  footer  footer footer"
      ),
    ),
    "If supplying column sizes in layout, every column must be given a size.",
    fixed = TRUE
  )
})

