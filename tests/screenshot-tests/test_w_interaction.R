pause_length <- 1
test_that("Basic interaction with grided app", {
  app <- background_shiny_app(here::here("inst/grided"))

  on.exit({
    print("Killing shiny server")
    app$p$kill()
  })

  m <- Chromote$new(Chrome$new(args = "--disable-gpu"))
  set_default_chromote_object(m)

  b <- ChromoteSession$new(
    width = 1600,
    height = 1200
  )
  # b$view()

  # Click the button to get copyable layout code
  layout_code_popup <- b$Page$navigate(app$url, wait_ = FALSE) %...>%
    {
      b$Page$loadEventFired(wait_ = FALSE)
      Sys.sleep(pause_length)
    } %...>%
    {
      b$Runtime$evaluate('document.body.classList.add("notransition")', wait_ = FALSE)
    } %...>%
    {
      b$Runtime$evaluate('document.getElementById("see-layout-code").click()', wait_ = FALSE)
    } %...>%
    {
      capture_screenshot(b)
    }

  expect_snapshot_file(
    b$wait_for(layout_code_popup),
    "layout_code_popup.png"
  )

  # Add a new row at top of page
  # First, close the layout popup by clicking on background
  add_new_row <- b$Runtime$evaluate('document.querySelector("focus-modal").click()', wait_ = FALSE) %...>%
    {
      b$Runtime$evaluate('document.getElementById("controller-for-row-1").querySelector("button.add-row").click()', wait_ = FALSE)
    } %...>%
    {
      capture_screenshot(b)
    }

  expect_snapshot_file(
    b$wait_for(add_new_row),
    "add_new_row.png"
  )

  # Remove that new row at top of page
  remove_new_row <- b$Runtime$evaluate('document.getElementById("controller-for-row-1").querySelector("button.remove-row").click()', wait_ = FALSE) %...>%
    {
      capture_screenshot(b)
    }

  expect_snapshot_file(
    b$wait_for(remove_new_row),
    "remove_new_row.png"
  )

  b$close()
})
