test_that("No gap size", {


  expect_equal(
    array_table_to_matrix(
      c(
        "      1fr     2fr  ",
        "100px header  header",
        "1fr   plota   plotb ",
        "2rem  footer  footer "
      )
    ),
    matrix(
      c(
        "",      "1fr",     "2fr",
        "100px", "header",  "header",
        "1fr",   "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    )
  )

})

test_that("With gap size", {

  expect_equal(
    array_table_to_matrix(
      c(
        "42px  1fr     2fr  ",
        "100px header  header",
        "1fr   plota   plotb ",
        "2rem  footer  footer "
      )
    ),
    matrix(
      c(
        "42px",      "1fr",     "2fr",
        "100px", "header",  "header",
        "1fr",   "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    )
  )
})




test_that("No column sizes", {

  expect_equal(
    array_table_to_matrix(
      c(
        "100px header  header",
        "1fr   plota   plotb ",
        "2rem  footer  footer "
      )
    ),
    matrix(
      c(
        "100px", "header",  "header",
        "1fr",   "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 3,
      byrow = TRUE
    )
  )
})

test_that("No row sizes", {

  expect_equal(
    array_table_to_matrix(
      c(
        "1fr     2fr  ",
        "header  header",
        "plota   plotb ",
        "footer  footer "
      )
    ),
    matrix(
      c(
        "1fr",     "2fr",
        "header",  "header",
        "plota",   "plotb",
        "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    )
  )
})

test_that("No sizes at all", {


  expect_equal(
    array_table_to_matrix(
      c(
        "header  header",
        "plota   plotb ",
        "footer  footer "
      )
    ),
    matrix(
      c(
        "header",  "header",
        "plota",   "plotb",
        "footer",  "footer"
      ),
      nrow = 3,
      byrow = TRUE
    )
  )
})

test_that("Single row - no-sizes", {

  expect_equal(
    array_table_to_matrix(
      c("plota plotb")
    ),
    matrix(
      c("plota",   "plotb"),
      nrow = 1,
      byrow = TRUE
    )
  )
})

test_that("Single row - column-sizes", {

  expect_equal(
    array_table_to_matrix(
      c(
        "100px 115px",
        "plota plotb"
      )
    ),
    matrix(
      c(
        "100px", "115px",
        "plota", "plotb"
      ),
      nrow = 2,
      byrow = TRUE
    )
  )
})

test_that("Single row - row-size", {

  expect_equal(
    array_table_to_matrix(
      c("10rem plota plotb")
    ),
    matrix(
      c("10rem", "plota",   "plotb"),
      nrow = 1,
      byrow = TRUE
    )
  )
})

test_that("Single row - all-sizes", {

  expect_equal(
    array_table_to_matrix(
      c(
        "4px   100px 115px",
        "10rem plota plotb"
      )
    ),
    matrix(
      c(
        "4px",   "100px", "115px",
        "10rem", "plota", "plotb"
      ),
      nrow = 2,
      byrow = TRUE
    )
  )
})

test_that("Single column - no-sizes", {

  expect_equal(
    array_table_to_matrix(
      c("plota",
        "plotb")
    ),
    matrix(
      c(
        "plota",
        "plotb"
      ),
      nrow = 2,
      byrow = TRUE
    )
  )
})
test_that("Single column - all-sizes", {

  expect_equal(
    array_table_to_matrix(
      c("1rem  430px",
        "240px plota",
        "1fr   plotb")
    ),
    matrix(
      c("1rem",  "430px",
        "240px","plota",
        "1fr",  "plotb"),
      nrow = 3,
      byrow = TRUE
    )
  )
})

test_that("Errows with inconsistant numbers of columns", {
  expect_error(
    array_table_to_matrix(
      c(
        "1fr     2fr  ",
        "header  header",
        "plota   plotb plotc",
        "footer  footer "
      )
    ),
    "Layout appears to be malformed. Make sure each row has the same number of columns",
    fixed = TRUE
  )
})

test_that("Partially defined row sizes are possible", {
  expect_equal(
    array_table_to_matrix(
      c(
        "      1fr     2fr  ",
        "100px header  header",
        "      plota   plotb ",
        "2rem  footer  footer "
      )
    ),
    matrix(
      c(
        "",      "1fr",     "2fr",
        "100px", "header",  "header",
        "",      "plota",   "plotb",
        "2rem",  "footer",  "footer"
      ),
      nrow = 4,
      byrow = TRUE
    )
  )
})

test_that("Errows with ommited sizes", {

  expect_error(
    array_table_to_matrix(
      c(
        "2rem          2fr        ",
        "100px header  header header",
        "1fr   plota   plotb  plotc",
        "3rem  footer  footer footer"
      )
    ),
    "If supplying column sizes in layout array, every column must be given a size.",
    fixed = TRUE
  )
})
