skip_screenshots('live-app-templates')

# source(here::here("tests/screenshot-tests/setupScreenshots.R"))
pause_length <- 1
test_that("Populating an app layout template with a live app", {

  app <- setup_chromote_session(layout_gallery(return_app_obj = TRUE))
  # app$b$view()

  on.exit({ app$p$kill() })

  # Select second layout
  app$b$Runtime$evaluate('document.querySelector("layout-gallery").shadowRoot.querySelector("grid-preview:nth-child(2)").shadowRoot.querySelector("#layout").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "live-app-edit-options.png"
  )

  # Choose live edit mode
  app$b$Runtime$evaluate('document.querySelector("focus-modal").shadowRoot.querySelector("button.edit").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "live-app-layout-editing.png"
  )

  # Add a new row at top
  app$b$Runtime$evaluate('document.querySelector("#controller-for-row-1 > add-or-remove-button:nth-child(1)").shadowRoot.querySelector("button").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "live-app-new-row.png"
  )

  # Go back once to beginning layout
  app$go_back()
  expect_snapshot_file(
    app$screenshot(pause_length),
    "live-app-undo-new-row.png"
  )


  app$b$close()
})
