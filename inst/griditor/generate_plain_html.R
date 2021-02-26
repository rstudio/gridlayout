# This function takes the griditor shiny app and strips it away to be just the
# html needed for a vanilla web-app

library(magrittr)
library(here)
library(shiny)
library(glue)
source(here("inst/griditor/app.R"))

in_development <- FALSE
deploy_loc <- "docs/griditor"

shiny:::renderPage(ui) %>%
  stringr::str_remove_all(
    paste(
      '<script type=\"application/shiny-singletons\"></script>',
      '<script type="application/html-dependencies">.+</script>',
      '<script src="shared/jquery.min.js"></script>',
      '<link href="shared/shiny.min.css" rel="stylesheet" />',
      '<script src="shared/shiny.js"></script>',
      sep = "\\s*\\n*|"
    )
  ) %>%
  stringr::str_replace(
    "Build a grid layout for your Shiny app",
    "Build a grid layout for your web app"
  ) %>%
  writeLines(
    con = here(if(in_development) "inst/griditor/www/index.html" else glue("{deploy_loc}/index.html") )
  )


if(!in_development){
  # Move the other resources to the docs folder as well
  css_loc <- here("inst/griditor/www/main.css")
  css_new_loc <- here(glue("{deploy_loc}/main.css"))
  js_loc <-here("inst/griditor/www/dist/index.js")
  js_new_loc <-here(glue("{deploy_loc}/dist/index.js"))

  system(glue("cp {css_loc} {css_new_loc}"))
  system(glue("cp {js_loc} {js_new_loc}"))
}
