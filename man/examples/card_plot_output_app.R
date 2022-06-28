library(gridlayout)
library(shiny)
library(bslib)

ui <- grid_page(
  layout = c("A B B"),
  grid_card(
    "A",
    title = "Settings",
    sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
  ),
  grid_card(
    "B",
    title="Plot",
    card_plot_output("distPlot"),
    div("Here's some insightful commentary on that plot above...")
  )
)

server <- function(input, output, session) {
  output$distPlot <- renderPlot({
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    hist(x, breaks = bins, col = 'darkgray', border = 'white')
  })
}

if (FALSE) {
  shinyApp(ui, server)
}
