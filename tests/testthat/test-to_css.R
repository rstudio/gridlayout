test_that("Works with default body target", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )
  expect_snapshot(to_css(grid_obj))
})

test_that("Can change body target", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  app_css <- to_css(grid_obj, "app_container")

  expect_true(
    str_detect(app_css, "#app_container", fixed = TRUE)
  )
})


test_that("Debug mode adds outline to all elements", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_true(
    str_detect(
      to_css(grid_obj, debug_mode = TRUE),
      "outline: 1px solid black;"
    )
  )
  expect_false(
    str_detect(
      to_css(grid_obj, debug_mode = FALSE),
      "outline: 1px solid black;"
    )
  )
})

test_that("Custom styles can be added by the user for further customization of card style", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )

  custom_styles <- c(
    "background" = "blue",
    "border" = "1px solid red"
  )

  expect_true(
    str_detect(
      to_css(grid_obj, element_styles = custom_styles),
      "background: blue;"
    )
  )

  expect_true(
    str_detect(
      to_css(grid_obj, element_styles = custom_styles),
      "border: 1px solid red;"
    )
  )
})


test_that("Height setting can be customized", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )


  expect_true(
    str_detect(
      to_css(grid_obj, container_height = "viewport"),
      "height: 100vh",
      fixed = TRUE
    )
  )

  expect_true(
    str_detect(
      to_css(grid_obj, container_height = "800px"),
      "height: 800px",
      fixed = TRUE
    )
  )

})
