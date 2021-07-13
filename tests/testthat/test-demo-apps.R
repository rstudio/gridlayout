skip_screenshots('demo-apps')

test_that("geyser app", {
  expect_snapshot_file(
    test_demo_app("geyser/app.R"),
    "geyser-app.png"
  )
})

test_that("Nested app", {
  expect_snapshot_file(
    test_demo_app('nested_grids/app.R'),
    "nested-app.png"
  )
})

test_that("RMarkdown", {
  expect_snapshot_file(
    test_demo_app('rmarkdown_demo/grid_markdown.Rmd'),
    "rmarkdown-doc.png"
  )
})

test_that("Alternate layouts -- mobile", {
  expect_snapshot_file(
    test_demo_app('alternate_layouts/app.R', vwidth = 500),
    "alternate-layouts-mobile.png"
  )
})


test_that("Alternate layouts -- normal", {
  expect_snapshot_file(
    test_demo_app('alternate_layouts/app.R', vwidth = 1000),
    "alternate-layouts-normal.png"
  )
})

test_that("Alternate layouts -- wide", {
  expect_snapshot_file(
    test_demo_app('alternate_layouts/app.R', vwidth = 1800),
    "alternate-layouts-wide.png"
  )
})

