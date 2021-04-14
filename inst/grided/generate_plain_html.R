# This function takes the grided shiny app and strips it away to be just the
# html needed for a vanilla web-app

library(magrittr)
library(here)
library(shiny)
library(glue)
# source(here("inst/grided/app.R"))

in_development <- TRUE
deploy_loc <- "docs/grided"

ui <- grided_ui_wrapper(shiny::uiOutput("grid_page"), dev_mode = TRUE)

shiny:::renderPage(ui) %>%
  str_remove_all(
    paste(
      '<script type=\"application/shiny-singletons\"></script>',
      '<script type="application/html-dependencies">.+</script>',
      '<script src="shared/jquery.min.js"></script>',
      '<link href="shared/shiny.min.css" rel="stylesheet" />',
      '<script src="shared/shiny.js"></script>',
      '<script src="shared/shiny.min.js"></script>',
      sep = "\\s*\\n*|"
    )
  ) %>%
  str_replace_all(
    "Build a grid layout for your Shiny app",
    "Build a grid layout for your web app"
  ) %>%
  writeLines(
    con = here(if(in_development) "inst/grided/www/index.html" else glue("{deploy_loc}/index.html") )
  )


if(!in_development){
  # Move the other resources to the docs folder as well
  css_loc <- here("inst/grided/www/main.css")
  css_new_loc <- here(glue("{deploy_loc}/main.css"))
  js_loc <-here("inst/grided/www/dist/index.js")
  js_new_loc <-here(glue("{deploy_loc}/dist/index.js"))

  system(glue("cp {css_loc} {css_new_loc}"))
  system(glue("cp {js_loc} {js_new_loc}"))
}
