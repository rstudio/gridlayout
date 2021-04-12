library(shiny)
# Take screenshots of demo apps for use in documentation etc
screenshot_demo_app <- function(
  app_path,
  screenshot_name,
  force_rerun = FALSE,
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

  if(is.na(screenshot_last_modified) | (app_last_modified >  screenshot_last_modified) | force_rerun){
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
  } else {
    message("No updates for ", screenshot_name, " since last screenshot.")
  }

  # Return screenshot path (for use in testing)
  invisible(screenshot_path)
}
