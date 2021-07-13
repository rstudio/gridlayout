skip_on_cran()
skip_screenshots('with-remarker')

test_that("Remarker with tabs", {
  app <- suppressWarnings({
    rmarkdown:::shiny_prerendered_app(
      input_rmd = here::here("inst/demo_apps/remarker/app.Rmd"),
      render_args = list(quiet = TRUE)
    )
  })

  expect_snapshot_file(
    test_demo_app(app),
    "remarker_w_tabs.png"
  )
})
