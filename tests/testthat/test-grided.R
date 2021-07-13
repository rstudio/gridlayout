skip_on_cran()

skip_screenshots('grided')

test_that("grided default start", {

  app <- setup_chromote_session(grided_app(return_app_obj = TRUE))

  on.exit({ app$p$kill() })

  expect_snapshot_file(
    app$screenshot(),
    "grided_default.png"
  )
})
