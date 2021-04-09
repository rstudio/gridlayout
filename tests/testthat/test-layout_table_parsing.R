test_that("Finds a single table if it exists (basic test)", {
my_doc <- '
my_layout <- "|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|115px |header  |header |
|1fr   |sidebar |plot   |" #an important comment
'
found_layouts <- find_layouts_in_file(
  strsplit(my_doc, split = "\n")[[1]]
)

expect_equal(
  length(found_layouts),
  1
)

expect_equal(
  found_layouts[[1]]$start_row,
  2
)

expect_equal(
  found_layouts[[1]]$end_row,
  6
)

expect_true(
  found_layouts[[1]]$start_col < found_layouts[[1]]$end_col
)

})


test_that("Finds a multiple tables if they exist (basic test)", {
  my_doc <- '
my_layout <- "|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|115px |header  |header |
|1fr   |sidebar |plot   |" #an important comment

another_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header2  |header2 |
|1fr   |sidebar2 |plot2   |"
'
  found_layouts <- find_layouts_in_file(
    strsplit(my_doc, split = "\n")[[1]]
  )

  expect_equal(
    length(found_layouts),
    2
  )

})


test_that("Layouts without gaps between them are okay", {
  my_doc <- '
my_layout <- "|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|115px |header  |header |
|1fr   |sidebar |plot   |" #an important comment
another_layout <- "|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header2  |header2 |
|1fr   |sidebar2 |plot2   |"
yet_another <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header2  |header2 |
|1fr   |sidebar2 |plot2   |

my_app <- ...
"
'
  found_layouts <- find_layouts_in_file(
    strsplit(my_doc, split = "\n")[[1]]
  )

  expect_equal(
    length(found_layouts),
    3
  )
})

test_that("Tables that are at end of file get terminated properly", {
  my_doc <- '
my_layout <- "|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|115px |header  |header |
|1fr   |sidebar |plot   |" #an important comment

another_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header2  |header2 |
|1fr   |sidebar2 |plot2   |"
'
  found_layouts <- find_layouts_in_file(
    strsplit(my_doc, split = "\n")[[1]]
  )

  expect_equal(
    length(found_layouts),
    2
  )

})
