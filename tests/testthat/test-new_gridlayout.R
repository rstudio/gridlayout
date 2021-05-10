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

test_that("Default row sizes react properly to auto-height container", {

  mobile_layout <-"
    |--------|
    |1fr     |
    |header  |
    |sidebar |
    |plot    |"

  expect_false(
    identical(
      attr(new_gridlayout(mobile_layout,container_height = "auto"), "row_sizes"),
      attr(new_gridlayout(mobile_layout,container_height = "viewport"), "row_sizes")
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
    width_bounds = c(max = 400)
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
      width_bounds = c(max = 400)
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
      width_bounds = c(min = 350)
    ),
    regexp = "New alternate interval overlaps with previous interval",
    fixed = TRUE
  )
})

test_that("Alternate layouts can be added with alternate layouts argument or chained with add_alternate_layout()", {
  main_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |"

  mobile_layout <- "
|----- |--------|
|2rem  |1fr     |
|80px  |header  |
|auto  |sidebar |
|400px |plot    |"

  big_screen_layout <- "
|-----|-------|--------|-----|
|2rem |250px  | 250px  |1fr  |
|1fr  |header |sidebar |plot |"

  alternate_layouts_argument <- new_gridlayout(
    main_layout,
    alternate_layouts = list(
      list(
        layout = mobile_layout,
        width_bounds = c(max = 600),
        container_height = "auto"
      ),
      list(
        layout = big_screen_layout,
        width_bounds = c(min = 1200)
      )
    )
  )

  chained_alternates <- new_gridlayout(main_layout)

  chained_alternates <- add_alternate_layout(
    chained_alternates,
    mobile_layout,
    width_bounds = c(max = 600),
    container_height = "auto"
  )

  chained_alternates <- add_alternate_layout(
    chained_alternates,
    big_screen_layout,
    width_bounds = c(min = 1200)
  )

  expect_identical(
    alternate_layouts_argument,
    chained_alternates
  )
})

test_that("A single alternate layout does not need to be double nested", {
  main_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|80px  |header  |header |
|1fr   |sidebar |plot   |"

  mobile_layout <- "
|----- |--------|
|2rem  |1fr     |
|80px  |header  |
|auto  |sidebar |
|400px |plot    |"


  expect_identical(
    new_gridlayout(
      main_layout,
      alternate_layouts = list(
        layout = mobile_layout,
        width_bounds = c(min = 600),
        container_height = "auto"
      )
    ),
    new_gridlayout(
      main_layout,
      alternate_layouts = list(
        list(
          layout = mobile_layout,
          width_bounds = c(min = 600),
          container_height = "auto"
        )
      )
    )
  )
})


