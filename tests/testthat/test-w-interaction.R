skip_screenshots('w-interaction')
# source(here::here("tests/screenshot-tests/setupScreenshots.R"))

pause_length <- 1.5
test_that("Basic interaction with grided app", {
  app <- setup_chromote_session(here::here("inst/grided"))
  # app$b$view()
  on.exit({ app$p$kill() })

  # Click the button to get copyable layout code
  app$b$Runtime$evaluate('document.getElementById("see-layout-code").click()')

  expect_snapshot_file(
    app$screenshot(pause_length),
    "layout_code_popup.png"
  )

  # Add a new row at top of page
  # First, close the layout popup by clicking on background
  app$b$Runtime$evaluate('document.querySelector("focus-modal").click()')
  # Then click the add a row button
  app$b$Runtime$evaluate('document.querySelector("#controller-for-row-1 > add-or-remove-button:nth-child(1)").shadowRoot.querySelector("button").click()')
  expect_snapshot_file(
    app$screenshot(pause_length),
    "add_new_row.png"
  )

  # Remove that new row at top of page
  app$b$Runtime$evaluate('document.querySelector("#controller-for-row-1 > add-or-remove-button[add_or_remove=\'remove\']").shadowRoot.querySelector("button").click()')

  expect_snapshot_file(
    app$screenshot(pause_length),
    "remove_new_row.png"
  )

  app$b$close()
})
