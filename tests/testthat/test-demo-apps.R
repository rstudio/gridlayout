source(here::here("tools/generate_screenshots.R"))

test_that("geyser app", {
  skip_on_cran()
  expect_snapshot_file(
    screenshot_demo_app(
      here::here('inst/demo_app/app.R'),
      "geyser_demo.png",
      force_rerun = TRUE
    ),
    "geyser-app.png"
  )
})

test_that("Nested app", {
  skip_on_cran()
  expect_snapshot_file(
    screenshot_demo_app(
      here::here('inst/nested_grids/app.R'),
      "nested_demo.png",
      force_rerun = TRUE
    ),
    "nested-app.png"
  )
})

test_that("RMarkdown", {
  skip_on_cran()
  expect_snapshot_file(
    screenshot_demo_app(
      here::here('inst/rmarkdown_demo/grid_markdown.Rmd'),
      "basic_markdown.png",
      force_rerun = TRUE
    ),
    "rmarkdown-doc.png"
  )
})
