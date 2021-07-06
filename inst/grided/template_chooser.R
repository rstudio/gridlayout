library(shiny)
library(here)
library(gridlayout)

# This is an app that allows live reloading when developing the typescript for grided
# It loads links to the hosted script and stylesheets so they get updated when saved
setwd(here("inst/grided/"))

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)
layout_templates <- list(
  gen_template_info(
    "Classic",
    "|2rem  |200px   |1fr    |
     |150px |header  |header |
     |1fr   |sidebar |plot   |",
    app_loc = "classic.R"
  ),
  gen_template_info(
    "Four-Square",
    "|     |    |    |
     |-----|----|----|
     |1rem |1fr |1fr |
     |1fr  |A   |B   |
     |1fr  |C   |D   |",
    app_loc = "four-square.R"
  ),
  gen_template_info(
    "Focal Chart - Top",
    "|1rem |1fr       |1fr      |
     |80px |header    |header   |
     |2fr  |chickens  |chickens |
     |1fr  |treePlot  |yarnPlot |"
  ),
  gen_template_info(
    "Focal Chart - Side",
    "|1rem |2fr      |1fr      |
     |80px |header   |header   |
     |1fr  |chickens |treePlot |
     |1fr  |chickens |yarnPlot |"
  ),
  gen_template_info(
    "Stack",
    "|      |         |
     |------|---------|
     |1rem  |1fr      |
     |80px  |header   |
     |1fr   |chickens |
     |1fr   |treePlot |
     |1fr   |yarnPlot |
     |1fr   |stockTable |"
  ),
  gen_template_info(
    "Scrolling-Stack",
    "|      |           |
     |------|-----------|
     |1rem  |1fr        |
     |80px  |header     |
     |400px |chickens   |
     |400px |treePlot   |
     |400px |yarnPlot   |
     |400px |stockTable |"
  )
)



shinyApp(
  ui = shiny::fluidPage(
    tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      tags$script(src = "dist/index.js"),
      tags$title("GridEd")
    ),
    uiOutput("app_dump")
  ),
  server = function(input, output, session) {
    grided_server_code(input, output, session, starting_layout = layout_templates, show_messages = TRUE)
  }
)
