library(shiny)
library(here)
library(gridlayout)


setwd(here("inst/grided/"))

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

starting_layout <- md_to_gridlayout("
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|150px |header  |header |
|1fr   |sidebar |plot   |")

# The classic Geyser app with grid layout
shinyApp(
  ui = shiny::fluidPage(
    tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      tags$script(src = "dist/index.js"),
      tags$title("GridEd")
    )
  ),
  server = function(input, output, session) {
    session$sendCustomMessage(
      "update-grid",
      list(
        rows =  attr(starting_layout, "row_sizes"),
        cols = attr(starting_layout, "col_sizes"),
        gap = attr(starting_layout, "gap")
      )
    )
  }
)

