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
    "Blank-Slate",
    "|2rem  |200px   |1fr    |
     |150px |header  |header |
     |1fr   |sidebar |plot   |",
    empty = TRUE
  ),
  gen_template_info(
    "Classic",
    "|2rem  |200px   |1fr    |
     |150px |header  |header |
     |1fr   |sidebar |plot   |",
    app_loc = "classic.R",
    live_app = list(
      ui = list(
        header = "geyser_header_panel",
        sidebar = "geyser_bins_panel",
        plot = "geyser_histogram_panel"
      )
    )
  ),
  gen_template_info(
    "Four-Square",
    "|1rem |1fr |1fr |
     |1fr  |A   |B   |
     |1fr  |C   |D   |",
    app_loc = "four-square.R",
    live_app = list(
      ui = list(
        A = "about_chick_weights_panel",
        B = "chooser_dropdowns_panel",
        C = "weight_dist_by_diet_panel",
        D = "weight_trajectories_for_diet_panel"
      )
    )
  ),
  gen_template_info(
    "Focal Chart - Top",
    "|1rem |1fr       |1fr      |
     |80px |header    |header   |
     |2fr  |mainPlot  |mainPlot |
     |1fr  |controls  |subPlot  |",
    live_app = list(
      ui = list(
        header = "app_header_panel",
        mainPlot = "weight_trajectories_for_diet_panel",
        controls = "chooser_dropdowns_panel",
        subPlot = "weight_dist_by_diet_panel"
      ),
      server = c(
        "weight_trajectories_for_diet_server",
        "weight_dist_by_diet_server"
      )
    ),
    app_loc = "focal-chart-top.R"
  ),
  gen_template_info(
    "Focal Chart - Side",
    "|1rem |2fr      |1fr      |
     |80px |header   |header   |
     |1fr  |mainPlot |controls |
     |1fr  |mainPlot |subPlot  |",
    app_loc = "focal-chart-side.R",
    live_app = list(
      ui = list(
        header = "app_header_panel",
        mainPlot = "weight_trajectories_for_diet_panel",
        controls = "chooser_dropdowns_panel",
        subPlot = "weight_dist_by_diet_panel"
      )
    )
  ),
  gen_template_info(
    "Stack",
    "|1rem |1fr      |
     |80px |header   |
     |1fr  |controls |
     |1fr  |mainPlot |
     |1fr  |subPlot  |",
    app_loc = "stack.R",
    live_app = list(
      ui = list(
        header = "app_header_panel",
        mainPlot = "weight_trajectories_for_diet_panel",
        controls = "chooser_dropdowns_panel",
        subPlot = "weight_dist_by_diet_panel"
      )
    )
  ),
  gen_template_info(
    "Scrolling-Stack",
    "|1rem  |1fr      |
     |80px  |header   |
     |400px |controls |
     |400px |mainPlot |
     |400px |subPlot  |
     |400px |about    |",
    app_loc = "scrolling-stack.R",
    live_app = list(
      ui = list(
        header = "app_header_panel",
        mainPlot = "weight_trajectories_for_diet_panel",
        controls = "chooser_dropdowns_panel",
        subPlot = "weight_dist_by_diet_panel",
        about = "about_chick_weights_panel"
      )
    ),
  )
)


template_functions_loc <- system.file("layout-templates/live-app-template-functions.R", package = "gridlayout")
template_app_funcs <- local({
  # Dump all the functions to the current (local) environment
  source(template_functions_loc, local = TRUE, keep.source = TRUE)
  # Wrap local env into a list so we can parse and dump function source to character vector
  as.list.environment(rlang::current_env())
})

is_ui_func <- str_detect(names(template_app_funcs), "_panel")
template_ui_els <- map_name_val(
  template_app_funcs[is_ui_func],
  function(function_name, func){
    htmltools::tagAppendAttributes(func(), `data-grided-ui-name` = function_name)
  }
)

shinyApp(
  ui = shiny::fluidPage(
    tags$head(
      gridlayout_css_dep(),
      tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      tags$script(src = "dist/index.js"),
      tags$title("GridEd")
    ),
    shiny::div(id = "app_dump", style = "display: none;", template_ui_els)
  ),
  server = function(input, output, session) {
    grided_server_code(input, output, session, starting_layout = layout_templates, show_messages = TRUE)
    for (server_func in template_app_funcs[!is_ui_func]) {
      server_func(input, output)
    }
  }
)
