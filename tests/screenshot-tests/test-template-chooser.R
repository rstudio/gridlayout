pause_length <- 1
test_that("Basic interaction with grided app", {

  app <- setup_chromote_session(layout_gallery(return_app_obj = TRUE))
  app$b$view()
  on.exit({ app$p$kill() })

  expect_snapshot_file(
    app$screenshot(pause_length),
    "template-landing-page.png"
  )

  # Select second layout
  app$b$Runtime$evaluate('document.querySelector("layout-gallery").shadowRoot.querySelector("grid-preview:nth-child(2)").shadowRoot.querySelector("#layout").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "second-layout-selected.png"
  )

  go_back <- function(n_steps = 1){
    # Back button to return to main layout viewer
    history <- app$b$Page$getNavigationHistory()$entries
    n_entries <- length(history)
    app$b$Page$navigateToHistoryEntry(history[[n_entries-n_steps]]$id)
  }

  # Go back to landing page
  go_back()
  expect_snapshot_file(
    app$screenshot(pause_length),
    "back-to-start.png"
  )

  # Select the third layout and go to edit mode
  app$b$Runtime$evaluate('document.querySelector("layout-gallery").shadowRoot.querySelector("grid-preview:nth-child(3)").shadowRoot.querySelector("#layout").click()')
  app$b$Runtime$evaluate('document.querySelector("focus-modal").shadowRoot.querySelector("button.edit").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "into-layout-editor.png"
  )

  # Add new column after first one
  app$b$Runtime$evaluate('document.querySelector("button.add-col.cols_1").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "layout-col-added.png"
  )

  # Go back two times to focus on layout screen
  go_back(2)
  expect_snapshot_file(
    app$screenshot(pause_length),
    "focus-on-chosen-layout.png"
  )

  app$b$close()
})
