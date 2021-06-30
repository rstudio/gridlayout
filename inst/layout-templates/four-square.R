library(shiny)
library(gridlayout)
library(ggplot2)

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

app_layout <- "
|     |    |    |
|-----|----|----|
|1rem |1fr |1fr |
|1fr  |A   |B   |
|1fr  |C   |D   |
"

ui <- grid_page(
  layout = app_layout,
  A = grid_panel(
    title = "A",
    plotOutput("weightRanges", height = "100%",  click = "chick_select")
  ),
  C = grid_panel(
    title = "C",
    plotOutput("chickPlot", height = "100%",  click = "plot_click")
  ),
  B = grid_panel(
    title = "B",
    p("content for B")
  ),
  D = grid_panel(
    title = "D",
    p("content for D")
  )
)

ChickWeight$Chick <- reorder(ChickWeight$Chick, as.integer(as.character(ChickWeight$Chick)))
chick_ids <- unique(ChickWeight$Chick)

server <- function(input, output, session) {

  chosen_chick <- reactiveVal()
  # Place server code here
  output$chickPlot <- renderPlot({
    print(paste("Plotting with chick", chosen_chick()))
    plot(0, 0, xlim = c(0, max(ChickWeight$Time)), ylim = c(0, max(ChickWeight$weight)), type = "n")
    for (id in chick_ids) {
      print(paste("Plotting trajectory for", id))
      chick_data <- ChickWeight[ChickWeight$Chick == id, ]

      color <- if (!is.null(chosen_chick()) && as.integer(chosen_chick()) == as.integer(id)) {
        print("Found chick in lines")
        "blue"
      } else {
        "grey"
      }
      lines(x = chick_data$Time, y = chick_data$weight, col = color)
    }
  })

  output$weightRanges <- renderPlot({
    plot(ChickWeight$Chick, ChickWeight$weight)
  })



  observe({
    nearest_chick <- nearPoints(ChickWeight, input$chick_select, xvar = "Chick", yvar = "weight")

    if(nrow(nearest_chick) > 0) {
      print("New chick chosen!")
      chosen_chick(nearest_chick[1,'Chick'])
    }
  })
}

shinyApp(ui, server)
