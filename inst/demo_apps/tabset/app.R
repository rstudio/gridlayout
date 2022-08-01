library(gridlayout)
library(shiny)

ui <- grid_page(
  layout = c(
    "tabs   tabs   cookies",
    "bottom bottom bottom"
  ),
  grid_card(
    area = "tabs",
    tabsetPanel(
      tabPanel("Tab 1"),
      tabPanel("Tab 2"),
      tabPanel("Tab 3")
    )),
  grid_card_plot(area = "cookies"),
  grid_card(area = "bottom", a(href="https://github.com/rstudio/flexdashboard/issues/37", "flexdashboard issue #37"))
)

shinyApp(
  ui = ui,
  server = function(input, output) {
    output$cookies <- renderPlot({
      plot(
        x = c(1,3,4,6),
        y = c(0,3,2,4),
        "b",
        main = "Cookies Stolen",
        col="steelblue",
        xlab = "",
        ylab = ""
      )
    })
  }
)


