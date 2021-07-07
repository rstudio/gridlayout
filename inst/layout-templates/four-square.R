library(shiny)
library(gridlayout)

source(system.file("layout-templates/live-app-template-functions.R", package = "gridlayout"))

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
  A = about_chick_weights_panel(),
  B = chooser_dropdowns_panel(),
  C = weight_dist_by_diet_panel(),
  D = weight_trajectories_for_diet_panel()
)

server <- function(input, output, session) {
  weight_trajectories_for_diet_server(input, output)
  weight_dist_by_diet_server(input, output)
}

shinyApp(ui, server)
