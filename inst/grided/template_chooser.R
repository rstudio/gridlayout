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
    "|2rem  |200px   |1fr    |
     |150px |header  |header |
     |1fr   |sidebar |plot   |",
    "classic",
    flipped_els = c("sidebar")
  ),
  gen_template_info(
    "|     |1fr |1fr |
     |1fr  |A   | B  |
     |1fr  |C   | D  |",
    "four square"
  ),
  gen_template_info(
    "|1rem |1fr       |1fr      |
     |80px |header    |header   |
     |2fr  |chickens  |chickens |
     |1fr  |treePlot  |yarnPlot |",
    "Focal Chart - Top"
  ),
  gen_template_info(
    "|1rem |2fr      |1fr      |
     |80px |header   |header   |
     |1fr  |chickens |treePlot |
     |1fr  |chickens |yarnPlot |",
    "Focal Chart - Side"
  )
)

shinyApp(
  ui = shiny::fluidPage(
    tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      tags$script(src = "dist/index.js"),
      tags$title("GridEd")
    )
  ),
  server = function(input, output, session) {
    grided_server_code(input, output, session, starting_layout = layout_templates, show_messages = TRUE)
  }
)

