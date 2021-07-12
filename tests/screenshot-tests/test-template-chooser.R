# source(here::here("tests/screenshot-tests/setupScreenshots.R"))
pause_length <- 1
test_that("Basic interaction with grided app", {

  app <- setup_chromote_session(layout_gallery(return_app_obj = TRUE))
  # app$b$view()
  # app$b$parent$debug_messages(TRUE)
  on.exit({ app$p$kill() })

  expect_snapshot_file(
    app$screenshot(pause_length),
    "template-landing-page.png"
  )

  # Select third layout
  app$b$Runtime$evaluate('document.querySelector("layout-gallery").shadowRoot.querySelector("grid-preview:nth-child(3)").shadowRoot.querySelector("#layout").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "second-layout-selected.png"
  )

  # Go back to landing page
  app$go_back()
  expect_snapshot_file(
    app$screenshot(pause_length),
    "back-to-start.png"
  )

  # Select the fourth layout and go to edit mode
  app$b$Runtime$evaluate('document.querySelector("layout-gallery").shadowRoot.querySelector("grid-preview:nth-child(4)").shadowRoot.querySelector("#layout").click()')
  app$b$Runtime$evaluate('document.querySelector("focus-modal").shadowRoot.querySelector("button.edit").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "into-layout-editor.png"
  )

  # Add new column after first one
  app$b$Runtime$evaluate('document.querySelector("#controller-for-col-1 > add-or-remove-button:nth-child(2)").shadowRoot.querySelector("button").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "layout-col-added.png"
  )

  # Go back two times to focus on layout screen
  app$go_back(2)
  expect_snapshot_file(
    app$screenshot(pause_length),
    "focus-on-chosen-layout.png"
  )

  app$b$close()
})
