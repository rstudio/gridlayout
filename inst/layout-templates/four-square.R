library(shiny)
library(gridlayout)

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

#' start-layout
app_layout <- "
|     |    |    |
|-----|----|----|
|1rem |1fr |1fr |
|1fr  |A   |B   |
|1fr  |C   |D   |
"
#' end-layout


ui <- grid_page(
  layout = app_layout,
  A = panel_about_chick_weights(),
  B = panel_chooser_dropdowns(),
  C = panel_weight_dist_by_diet(),
  D = panel_weight_trajectories_for_diet()
)


server <- function(input, output, session) {
  output$chickPlot <- weight_trajectories_for_diet(input)
  output$weightRanges <- weight_dist_by_diet(input)
}

shinyApp(ui, server)
