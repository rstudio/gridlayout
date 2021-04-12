test_that("geyser app", {
  skip_on_cran()
  expect_snapshot_file(
    test_demo_app("demo_app/app.R"),
    "geyser-app.png"
  )
})

test_that("Nested app", {
  skip_on_cran()
  expect_snapshot_file(
    test_demo_app('nested_grids/app.R'),
    "nested-app.png"
  )
})

test_that("RMarkdown", {
  skip_on_cran()
  expect_snapshot_file(
    test_demo_app('rmarkdown_demo/grid_markdown.Rmd'),
    "rmarkdown-doc.png"
  )
})
