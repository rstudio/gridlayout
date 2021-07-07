library(shiny)
library(gridlayout)

#' start-layout
app_layout <- "|2rem  |200px   |1fr    |
               |150px |header  |header |
               |1fr   |sidebar |plot   |"
#' end-layout

ui <- grid_page(
  layout = app_layout,
  header = title_panel("This is my header"),
  sidebar = grid_panel(
    title = "Settings",
    sliderInput("bins", "Number of bins:", min = 1, max = 50, value = 30, width = "100%")
  ),
  plot = plotOutput("distPlot")
)

server <- function(input, output) {
  output$distPlot <- renderPlot({
    x <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    hist(x, breaks = bins, col = "darkgray", border = "white")
  })
}

shinyApp(ui, server)
