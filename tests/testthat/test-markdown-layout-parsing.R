
test_that("Basic table works", {
  my_layout <- new_gridlayout("
      |      |120px   |1fr    |1fr    |
      |------|--------|-------|-------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_s3_class(my_layout, "gridlayout")

  expect_equal(get_info(my_layout, "col_sizes"),
               c("120px", "1fr", "1fr"))

  expect_equal(get_info(my_layout, "row_sizes"),
               c("100px", "1fr", "1fr"))

  expect_equal(get_info(my_layout, "gap"),
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

  expect_equal(get_info(my_layout, "gap"),
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

  expect_equal(get_info(my_layout, "col_sizes"),
               c("1fr", "1fr", "1fr"))

  expect_equal(get_info(my_layout, "row_sizes"),
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

test_that("Markdown parsing -- Single column", {

  expect_snapshot(
    new_gridlayout("
|----- |--------|
|2rem  |1fr     |
|80px  |header  |
|auto  |sidebar |
|400px |plot    |"
    )
  )

})

test_that("Markdown parsing -- Single row", {

  expect_snapshot(
    new_gridlayout("
|2rem  |auto   | 200px  | 1fr    |
|80px  |header |sidebar |sidebar |"
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
