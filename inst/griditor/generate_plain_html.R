# This function takes the griditor shiny app and strips it away to be just the
# html needed for a vanilla web-app

library(magrittr)
library(here)
library(shiny)
source(here("inst/griditor/app.R"))

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
    con = here("inst/griditor/www/index.html")
  )
