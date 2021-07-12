source(system.file("layout-templates/live-app-template-functions.R", package = "gridlayout"))

#' start-layout
app_layout <- "|2rem  |200px   |1fr    |
               |150px |header  |header |
               |1fr   |sidebar |plot   |"
#' end-layout

ui <- grid_page(
  layout = app_layout,
  header = geyser_header_panel(),
  sidebar = geyser_bins_panel(),
  plot = geyser_histogram_panel()
)

server <- function(input, output) {
  geyser_histogram_server(input, output)
}

shinyApp(ui, server)
