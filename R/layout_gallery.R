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
     flipped_els = c("sidebar")
    ),
    gen_template_info(
      "Four-Square",
      "|     |    |    |
     |-----|----|----|
     |1rem |1fr |1fr |
     |1fr  |A   |B   |
     |1fr  |C   |D   |"
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

  grided_app(starting_layout = layout_templates, return_app_obj = return_app_obj)
}


# Takes a layout definition and turns it into the info ingested by grided
gen_template_info <- function(name, layout_table,  flipped_els = c()){
  layout_info <-  dump_all_info(new_gridlayout(layout_table))
  layout_info$name <- name

  # If any elements need to have their id flipped (aka their panel is tall and
  # skinny), then mark that here
  for (i in seq_along(layout_info$elements)) {
    if (layout_info$elements[[i]]$id %in% flipped_els) {
      layout_info$elements[[i]]$flip_id <- TRUE
    }
  }

  layout_info
}
