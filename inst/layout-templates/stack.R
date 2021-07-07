source(system.file("layout-templates/live-app-template-functions.R", package = "gridlayout"))

#' start-layout
app_layout <- "
  |1rem |1fr      |
  |80px |header   |
  |1fr  |controls |
  |1fr  |mainPlot |
  |1fr  |subPlot  |"
#' end-layout

ui <- grid_page(
  layout = app_layout,
  header = title_panel("Effects of diet on Chick growth"),
  mainPlot = weight_trajectories_for_diet_panel(),
  controls = chooser_dropdowns_panel(),
  subPlot = weight_dist_by_diet_panel()
)

server <- function(input, output, session) {
  weight_trajectories_for_diet_server(input, output)
  weight_dist_by_diet_server(input, output)
}

shinyApp(ui, server)
