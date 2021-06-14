library(chromote)

test_that("Basic interaction with grided app", {
  app <- here::here("inst/grided")
  port <- webshot2:::available_port(getOption("shiny.port"))
  url <- webshot2:::shiny_url(port)
  r_background_process <- function(..., envvars = NULL) {
    if (is.null(envvars)) {
      envvars <- callr::rcmd_safe_env()
    }
    callr::r_bg(..., env = envvars)
  }
  # Run app in background with envvars
  p <- r_background_process(
    function(...) {
      devtools::load_all()
      shiny::runApp(...)
    },
    args = list(
      appDir = app,
      port = port,
      display.mode = "normal",
      launch.browser = FALSE
    )
  )
  on.exit({
    p$kill()
  })

  webshot2:::wait_until_server_exists(
    url = url,
    timeout = 60
  )
  b <- ChromoteSession$new()

  layout_code_popup <- b$Page$navigate(url, wait_ = FALSE) %...>%
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
  remove_new_row <- b$Runtime$evaluate('document.getElementById("controller_for_row_1").querySelector("button.remove-row").click()', wait_ = FALSE) %...>%
    {
      b$screenshot(tempfile(fileext = ".png"))
    }

  expect_snapshot_file(
    b$wait_for(remove_new_row),
    "remove_new_row.png"
  )

  b$close()
})
