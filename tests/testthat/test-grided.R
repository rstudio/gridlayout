
test_that("grided default start", {
  skip_on_cran()
  expect_snapshot_file(
    test_demo_app(grided_app(return_app_obj = TRUE)),
    "grided_default.png"
  )
})


test_that("geyser app", {
  skip_if_not_installed("webshot2")
  skip_on_cran()

  expect_snapshot_file(
    test_demo_app('realtime_layout_update/app.R'),
    "geyser-grided-app.png"
  )
})
