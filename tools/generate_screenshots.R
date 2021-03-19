# Take screenshots of all the demo apps for use in documentation etc

screenshot_demo_app <- function(app_path, screenshot_name) {

  is_rmd <- gridlayout:::str_detect(app_path, ".Rmd", fixed = TRUE)
  path <- here::here("man/figures", screenshot_name)

  webshot_capture_fn <- if(is_rmd) {
    rendered_rmd_path <- tempfile(fileext = ".html")
    rmarkdown::render(app_path, output_file = rendered_rmd_path)
    app_path <- rendered_rmd_path # Replace with rendered path
    webshot2::webshot
  } else {
    webshot2::appshot
  }

  webshot_capture_fn(
    app_path,
    file = path,
    vwidth = 1600,
    vheight = 1200,
    cliprect = "viewport")
}

screenshot_demo_app(here::here('inst/demo_app/app.R'), "geyser_demo.png")
screenshot_demo_app(here::here('inst/rmarkdown_demo/grid_markdown.Rmd'), "basic_markdown.png")
