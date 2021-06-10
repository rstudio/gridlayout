#' Layout Gallery
#'
#' View, select, and edit layouts and generate ready-to-run app code.
#'
#' @return A shiny app object
#' @export
layout_gallery <- function(){

  layout_templates <- list(
    gen_template_info(
      "|2rem  |200px   |1fr    |
     |150px |header  |header |
     |1fr   |sidebar |plot   |",
     "classic",
     flipped_els = c("sidebar")
    ),
    gen_template_info(
      "|     |    |    |
     |-----|----|----|
     |1rem |1fr |1fr |
     |1fr  |A   |B   |
     |1fr  |C   |D   |",
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

  grided_app(starting_layout = layout_templates)
}
