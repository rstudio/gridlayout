
test_that("grided default start", {
  expect_snapshot_file(
    test_demo_app(grided_app(return_app_obj = TRUE)),
    "grided_default.png"
  )
})


test_that("geyser app", {
  expect_snapshot_file(
    test_demo_app('realtime_layout_update/app.R'),
    "geyser-grided-app.png"
  )
})
