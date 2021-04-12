
test_that("grided default start", {
  skip_on_cran()
  expect_snapshot_file(
    test_demo_app(gridded_app(return_app_obj = TRUE)),
    "grided_default.png"
  )
})
