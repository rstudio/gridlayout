
test_that("Alternate layouts can be added for different sized screens", {

  main_layout <- new_gridlayout(
    layout_def = "
      | header | header |
      | plota  | plotb  |",
    col_sizes = c("1fr", "2fr"),
    row_sizes = c("100px", "1fr"),
    gap_size = "2rem"
  )

  mobile_layout <- new_gridlayout(
    layout_def = "
      |header|
      |plota |
      |plotb |",
    col_sizes = c("1fr"),
    row_sizes = c("100px", "400px", "500px"),
    gap_size = "2rem"
  )

  main_w_alternate <- add_alternate_layout(
    layout = main_layout,
    alternate_layout = mobile_layout,
    width_bounds = c(max = 400)
  )

  expect_equal(
    mobile_layout$layout,
    get_info(main_w_alternate, "alternates")[[1]]$layout,
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

