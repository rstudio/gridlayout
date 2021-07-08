#' Layout Gallery
#'
#' View, select, and edit layouts and generate ready-to-run app code.
#'
#' @return A shiny app object
#' @export
layout_gallery <- function(return_app_obj = FALSE){

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
      "|1rem |1fr |1fr |
       |1fr  |A   |B   |
       |1fr  |C   |D   |",
     app_loc = "four-square.R"
    ),
    gen_template_info(
      "Focal Chart - Top",
      "|1rem |1fr       |1fr      |
       |80px |header    |header   |
       |2fr  |mainPlot  |mainPlot |
       |1fr  |controls  |subPlot  |",
     app_loc = "focal-chart-top.R"
    ),
    gen_template_info(
      "Focal Chart - Side",
      "|1rem |2fr      |1fr      |
       |80px |header   |header   |
       |1fr  |mainPlot |controls |
       |1fr  |mainPlot |subPlot  |",
     app_loc = "focal-chart-side.R"
    ),
    gen_template_info(
      "Stack",
      "|1rem |1fr      |
       |80px |header   |
       |1fr  |controls |
       |1fr  |mainPlot |
       |1fr  |subPlot  |",
     app_loc = "stack.R"
    ),
    gen_template_info(
      "Scrolling-Stack",
      "|1rem  |1fr      |
       |80px  |header   |
       |400px |controls |
       |400px |mainPlot |
       |400px |subPlot  |
       |400px |about    |",
     app_loc = "scrolling-stack.R"
    )
  )

  grided_app(starting_layout = layout_templates, return_app_obj = return_app_obj)
}


# Takes a layout definition and turns it into the info ingested by grided
gen_template_info <- function(name, layout_table, app_loc = NULL, empty = FALSE){
  layout_info <- dump_all_info(new_gridlayout(layout_table))
  layout_info$name <- name
  layout_info$app_loc <- app_loc
  if (empty) layout_info$elements <- NULL
  layout_info
}
