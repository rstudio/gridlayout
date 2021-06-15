
test_that("Basic interaction with grided app", {
  app <- background_shiny_app(here::here("inst/grided"))

  on.exit({
    print("Killing shiny server")
    app$p$kill()
  })

  b <- ChromoteSession$new(
    width = 1600,
    height = 1200
  )

  layout_code_popup <- b$Page$navigate(app$url, wait_ = FALSE) %...>%
    {
      b$Page$loadEventFired(wait_ = FALSE)
      Sys.sleep(1)
    } %...>%
    {
      b$Runtime$evaluate('document.getElementById("see-layout-code").click()', wait_ = FALSE)
    } %...>%
    {
      b$screenshot(tempfile(fileext = ".png"))
    }

  expect_snapshot_file(
    b$wait_for(layout_code_popup),
    "get_layout_code.png"
  )

  # Add a new row at top of page
  # First, close the layout popup by clicking on background
  add_new_row <- b$Runtime$evaluate('document.querySelector("focus-modal").click()', wait_ = FALSE) %...>%
    {
      b$Runtime$evaluate('document.getElementById("controller_for_row_1").querySelector("button.add-row").click()', wait_ = FALSE)
    } %...>%
    {
      b$screenshot(tempfile(fileext = ".png"))
    }

  expect_snapshot_file(
    b$wait_for(add_new_row),
    "add_new_row.png"
  )


  # Remove that new row at top of page
  remove_new_row <- b$Runtime$evaluate('document.getElementById("controller_for_row_1").querySelector("button.remove-row").click()', wait_ = FALSE) %...>% {
    b$screenshot(tempfile(fileext = ".png"))
  }

  expect_snapshot_file(
    b$wait_for(remove_new_row),
    "remove_new_row.png"
  )

  b$close()
})
