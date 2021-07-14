source(system.file("layout-templates/live-app-template-functions.R", package = "gridlayout"))

#' start-layout
app_layout <- "
  |1rem  |1fr      |
  |80px  |header   |
  |300px |controls |
  |400px |mainPlot |
  |400px |subPlot  |
  |200px |about    |"
#' end-layout

ui <- grid_page(
  layout = app_layout,
  header = title_panel("Effects of diet on Chick growth"),
  mainPlot = weight_trajectories_for_diet_panel(),
  controls = chooser_dropdowns_panel(),
  subPlot = weight_dist_by_diet_panel(),
  about = about_chick_weights_panel()
)

server <- function(input, output, session) {
  weight_trajectories_for_diet_server(input, output)
  weight_dist_by_diet_server(input, output)
}

shinyApp(ui, server)
