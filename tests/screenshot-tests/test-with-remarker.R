test_that("Remarker with tabs", {

  app <- rmarkdown:::shiny_prerendered_app(
    input_rmd = here::here("inst/demo_apps/remarker/app.Rmd"),
    render_args = NULL,
    theme = NULL
  )

  expect_snapshot_file(
    test_demo_app(app),
    "remarker_w_tabs.png"
  )
})
