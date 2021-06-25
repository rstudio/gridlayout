library(shiny)

devtools::load_all(".")
get_demo_app <- function(rel_path){
  system.file(paste0("demo_apps/", rel_path), package = "gridlayout")
}

# Take screenshots of demo apps for use in documentation etc
screenshot_demo_app <- function(
  app_path,
  screenshot_name,
  rmd_params = list(),
  screenshot_root = "man/figures",
  vwidth = 1600,
  vheight = 1200
) {
  requireNamespace("webshot2", quietly = TRUE)
  requireNamespace("here", quietly = TRUE)
  screenshot_path <- here::here(screenshot_root, screenshot_name)

  # Is the app already an app object or is it a string?
  is_app_obj <- class(app_path) == "shiny.appobj"
  app_last_modified <- if(is_app_obj) NA else fs::file_info(app_path)$modification_time

  screenshot_last_modified <- fs::file_info(screenshot_path)$modification_time

  is_rmd <- !is_app_obj && gridlayout:::str_detect(app_path, ".Rmd", fixed = TRUE)

  webshot_capture_fn <- if(is_rmd) {

    rendered_rmd_path <- tempfile(fileext = ".html")
    # Render markdown with specified parameters
    rmarkdown::render(app_path, output_file = rendered_rmd_path, quiet = TRUE, params = rmd_params)
    # Replace with rendered path
    app_path <- rendered_rmd_path
    webshot2::webshot

  } else {
    app_path <- if(is_app_obj) app_path else shiny::shinyAppFile(app_path)
    webshot2::appshot
  }

  webshot_capture_fn(
    app_path,
    file = screenshot_path,
    vwidth = vwidth,
    vheight = vheight,
    delay = 1.5,
    cliprect = "viewport"
  )


  # Return screenshot path (for use in testing)
  invisible(screenshot_path)
}

test_demo_app <- function(
  app_path,
  rmd_params = list(),
  vwidth = 1600,
  vheight = 1200
) {
  requireNamespace("webshot2", quietly = TRUE)
  requireNamespace("here", quietly = TRUE)

  # Is the app already an app object or is it a string?
  is_app_obj <- class(app_path) == "shiny.appobj"

  if (!is_app_obj) app_path <- get_demo_app(app_path)

  screenshot_path <- tempfile(fileext = ".png")

  is_rmd <- !is_app_obj && gridlayout:::str_detect(app_path, ".Rmd", fixed = TRUE)

  webshot_capture_fn <- if(is_rmd) {

    rendered_rmd_path <- tempfile(fileext = ".html")
    # Render markdown with specified parameters
    rmarkdown::render(app_path, output_file = rendered_rmd_path, quiet = TRUE, params = rmd_params)
    # Replace with rendered path
    app_path <- rendered_rmd_path
    webshot2::webshot

  } else {
    app_path <- if(is_app_obj) app_path else shiny::shinyAppFile(app_path)
    webshot2::appshot
  }

  webshot_capture_fn(
    app_path,
    file = screenshot_path,
    vwidth = vwidth,
    vheight = vheight,
    cliprect = "viewport"
  )

  # Return screenshot path (for use in testing)
  invisible(screenshot_path)
}

screenshot_snapshot_test <- function(screenshot_name, ...) {
  if (notNull(getOption("gridlayout.run_webshot_tests"))) {
    expect_snapshot_file(
      test_demo_app(...),
      screenshot_name
    )
  }
}

library(chromote)

background_shiny_app <- function(app){
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

  webshot2:::wait_until_server_exists(
    url = url,
    timeout = 60
  )

  list(
    p = p,
    url = url
  )
}

setup_chromote_session <- function(app) {
  app <- background_shiny_app(app)
  m <- Chromote$new(Chrome$new(args = c(
    "--disable-gpu",
    c("--force-color-profile", "srgb")
  )))
  set_default_chromote_object(m)

  b <- ChromoteSession$new(
    width = 1600,
    height = 1200
  )


  b$Page$navigate(app$url, wait_ = FALSE) %...>%
  {
    b$Page$loadEventFired(wait_ = FALSE)
    Sys.sleep(0.5)
  } %>%
    b$wait_for()

  list(
    p = app$p,
    b = b,
    screenshot = function(delay = 1) {
      capture_screenshot(b, delay)
    }
  )
}

capture_screenshot <- function(b, pause_length = 1.5){
  Sys.sleep(pause_length)
  screenshot_path <- tempfile(fileext = ".png")
  screenshot_data <- b$Page$captureScreenshot(format = "png")$data
  writeBin(jsonlite::base64_dec(screenshot_data), screenshot_path)
  screenshot_path
  # b$screenshot(tempfile(fileext = ".png"), delay = pause_length)
}
