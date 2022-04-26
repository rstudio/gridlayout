test_that("Works with default body target", {
  grid_obj <- new_gridlayout(
    "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_snapshot(cat(to_css(grid_obj)))
})

test_that("Can change body target", {
  grid_obj <- new_gridlayout("
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  app_css <- to_css(grid_obj, "app_container")

  expect_true(
    str_detect(app_css, "data-gridlayout-key=\"app_container\"", fixed = TRUE)
  )
})




test_that("Height setting can be customized", {
  grid_obj <- new_gridlayout("
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |",
    container_height = "viewport"
  )

  expect_true(
    str_detect(
      to_css(grid_obj),
      "height:100vh",
      fixed = TRUE
    )
  )


  expect_true(
    str_detect(
      to_css(new_gridlayout(grid_obj,container_height = "800px")),
      "height:800px",
      fixed = TRUE
    )
  )

})
