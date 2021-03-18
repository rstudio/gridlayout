# Run demo app and take a screenshot of landing page
screenshot_demo_app <- function(app_loc) {
  path <- tempfile(fileext = ".png")

  webshot2::appshot(
    app = app_loc,
    file = path,
    vwidth = 1600,
    vheight = 1200,
    cliprect = "viewport"
  )

  path
}

test_that("geyser app demo", {
  expect_snapshot_file(screenshot_demo_app(here::here("inst/demo_app/app.R")), "app.png")
})
