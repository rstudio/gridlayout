library(shiny)
library(here)
library(gridlayout)

# This is an app that allows live reloading when developing the typescript for grided
# It loads links to the hosted script and stylesheets so they get updated when saved
setwd(here("inst/grided/"))

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

starting_layout <- md_to_gridlayout("
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|150px |header  |header |
|1fr   |sidebar |plot   |")




shinyApp(
  ui = shiny::fluidPage(
    tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      tags$script(src = "dist/index.js"),
      tags$title("GridEd")
    )
  ),
  server = function(input, output, session) {
    grided_server_code(input, output, session, starting_layout)
  }
)

