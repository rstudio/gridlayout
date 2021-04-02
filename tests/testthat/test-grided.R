source(here::here("tools/generate_screenshots.R"))

test_that("grided default start", {
  expect_snapshot_file(
    screenshot_demo_app(
      gridded_app(return_app_obj = TRUE),
      "grided_default.png",
      force_rerun = TRUE
    ),
    "grided_default.png"
  )
})
