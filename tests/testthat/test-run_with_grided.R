test_that("Wont try and run on non grid_page apps", {
  expect_error(
    run_with_grided(shiny::fluidPage(
      ui = shiny::tags$body(shiny::h2("Header")),
      server = function(input, output) {}
    )),
    regexp = "run_with_grided needs to be used with an app that uses grid_page as its UI.",
    fixed = TRUE
  )

  expect_error(
    run_with_grided(shiny::tags$body(
      ui = shiny::tags$body(shiny::h2("Header")),
      server = function(input, output) {}
    )),
    regexp = "run_with_grided needs to be used with an app that uses grid_page as its UI.",
    fixed = TRUE
  )
})
