#' Layout Gallery
#'
#' View, select, and edit layouts and generate ready-to-run app code.
#'
#' @return A shiny app object
#' @export
layout_gallery <- function(return_app_obj = FALSE) {
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
      live_app = list(
        ui = list(
          header = "geyser_header_panel",
          sidebar = "geyser_bins_panel",
          plot = "geyser_histogram_panel"
        ),
        server = c("geyser_histogram_server")
      )
    ),
    gen_template_info(
      "Four-Square",
      "|1rem |1fr |1fr |
     |1fr  |A   |B   |
     |1fr  |C   |D   |",
      live_app = list(
        ui = list(
          A = "about_chick_weights_panel",
          B = "chooser_dropdowns_panel",
          C = "weight_dist_by_diet_panel",
          D = "weight_trajectories_for_diet_panel"
        ),
        server = c(
          "weight_trajectories_for_diet_server",
          "weight_dist_by_diet_server"
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
      )
    ),
    gen_template_info(
      "Focal Chart - Side",
      "|1rem |2fr      |1fr      |
     |80px |header   |header   |
     |1fr  |mainPlot |controls |
     |1fr  |mainPlot |subPlot  |",
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
      )
    ),
    gen_template_info(
      "Stack",
      "|1rem |1fr      |
     |80px |header   |
     |1fr  |controls |
     |1fr  |mainPlot |
     |1fr  |subPlot  |",
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
      live_app = list(
        ui = list(
          header = "app_header_panel",
          mainPlot = "weight_trajectories_for_diet_panel",
          controls = "chooser_dropdowns_panel",
          subPlot = "weight_dist_by_diet_panel",
          about = "about_chick_weights_panel"
        ),
        server = c(
          "weight_trajectories_for_diet_server",
          "weight_dist_by_diet_server"
        )
      ),
    )
  )

  is_ui_func <- str_detect(names(template_app_funcs), "_panel")

  app <- shiny::shinyApp(
    ui = shiny::fluidPage(
      grided_resources(),
      shiny::div(
        id = "app_dump",
        style = "display: none;",
        map_name_val(
          template_app_funcs[is_ui_func],
          function(function_name, x) {
            ui_el <- grid_panel(x$func())
            htmltools::tagAppendAttributes(ui_el, `data-grided-ui-name` = function_name)
          }
        )
      )
    ),
    server = function(input, output, session) {
      grided_server_code(
        input, output, session,
        layout_templates,
        on_finish = on_finish,
        finish_button_text = finish_button_text
      )
      # Run the template server code
      for (x in template_app_funcs[!is_ui_func]) {
        x$func(input, output)
      }
    }
  )

  if (return_app_obj) {
    app
  } else {
    # Open gadget in the external viewer
    viewer <- shiny::browserViewer(.rs.invokeShinyWindowExternal)
    shiny::runGadget(app, viewer = viewer)
  }
}


# Takes a layout definition and turns it into the info ingested by grided
gen_template_info <- function(name, layout_table, live_app = NULL, empty = FALSE) {
  layout_info <- dump_all_info(new_gridlayout(layout_table))
  layout_info$name <- name

  if (notNull(live_app$ui)) {
    for (i in seq_along(layout_info$elements)) {
      ui_for_element <- live_app$ui[[layout_info$elements[[i]]$id]]
      if (is.null(ui_for_element)) {
        stop("Not all elements have mapping to UI functions")
      }
      layout_info$elements[[i]]$ui_function <- ui_for_element
    }
    layout_info$ui_functions <- live_app$ui
  }

  if (notNull(live_app$server)) {
    layout_info$server_functions <- live_app$server
  }
  if (empty) layout_info$elements <- NULL
  layout_info
}
