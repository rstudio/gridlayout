
test_that("grided default start", {
  skip_on_cran()
  requireNamespace("here", quietly = TRUE)
  source("../../tools/generate_screenshots.R")
  expect_snapshot_file(
    screenshot_demo_app(
      gridded_app(return_app_obj = TRUE),
      "grided_default.png",
      force_rerun = TRUE
    ),
    "grided_default.png"
  )
})
