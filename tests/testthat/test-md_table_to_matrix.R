test_that("all sizes", {
  expect_equal(
    md_table_to_matrix( "
    |2rem  | 300px  |1fr    |
    |80px  |header  |header |
    |1fr   |sidebar |plot   |"),
    matrix(
      c(
        "2rem", "300px", "1fr",
        "80px", "header", "header",
        "1fr", "sidebar", "plot"
      ),
      nrow=3,
      byrow = TRUE
    )
  )
})
test_that("gap-size and row-sizes", {
  expect_equal(
    md_table_to_matrix( "
    |2rem  |        |       |
    |80px  |header  |header |
    |1fr   |sidebar |plot   |"),
    matrix(
      c(
        "2rem", "", "",
        "80px", "header", "header",
        "1fr", "sidebar", "plot"
      ),
      nrow=3,
      byrow = TRUE
    )
  )
})

test_that("only row-sizes", {
  expect_equal(
    md_table_to_matrix( "
    |80px  |header  |header |
    |1fr   |sidebar |plot   |"),
    matrix(
      c(
        "80px", "header", "header",
        "1fr", "sidebar", "plot"
      ),
      nrow=2,
      byrow = TRUE
    )
  )
})

test_that("only col-sizes", {
  expect_equal(
    md_table_to_matrix( "
      | 1rem   | 1fr   |
      |header  |header |
      |sidebar |plot   |"),
    matrix(
      c(
        "1rem", "1fr",
        "header", "header",
        "sidebar", "plot"
      ),
      nrow=3,
      byrow = TRUE
    )
  )
})


test_that("only gap-size", {
  expect_equal(
    md_table_to_matrix( "
    |2rem |        |       |
    |     |header  |header |
    |     |sidebar |plot   |"),
    matrix(
      c(
        "2rem", "", "",
        "", "header", "header",
        "", "sidebar", "plot"
      ),
      nrow=3,
      byrow = TRUE
    )
  )
})

test_that("no sizes", {
  expect_equal(
    md_table_to_matrix( "
    |header  |header |
    |sidebar |plot   |"),
    matrix(
      c(
       "header", "header",
       "sidebar", "plot"
      ),
      nrow=2,
      byrow = TRUE
    )
  )
})
