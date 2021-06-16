dump_dom <- function(b){
  all_dom <- b$Runtime$evaluate('document.body.innerHTML')
  # Removes inline pngs that just polute dom with tons of nonsense strings
  cat(str_remove_all(all_dom$result$value, '"data:image\\/png;.*"'))
}

pause_length <- 0.5
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

  b$Page$navigate(app$url)
  b$Page$loadEventFired()
  Sys.sleep(pause_length)

  # Click the button to get copyable layout code
  b$Runtime$evaluate('document.getElementById("see-layout-code").click()')
  Sys.sleep(pause_length)
  expect_snapshot( dump_dom(b) )

  # Close the layout popup by clicking on background
  b$Runtime$evaluate('document.querySelector("focus-modal").click()')

  # Add a new row at top of page
  b$Runtime$evaluate('document.getElementById("controller_for_row_1").querySelector("button.add-row").click()')
  Sys.sleep(pause_length)
  expect_snapshot( dump_dom(b) )

  # Remove that new row at top of page
  b$Runtime$evaluate('document.getElementById("controller_for_row_1").querySelector("button.remove-row").click()')
  expect_snapshot( dump_dom(b) )

  b$close()
})
