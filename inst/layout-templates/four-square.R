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

chicks_by_group <- by(data = ChickWeight$Chick, ChickWeight$Diet, FUN = unique)
names(chicks_by_group) <- paste("Diet:", names(chicks_by_group))

ui <- grid_page(
  layout = app_layout,
  A = grid_panel(
    title = "About the ChickWeights dataset",
    p("The body weights of the chicks were measured at birth and every second day thereafter until day 20.
      They were also measured on day 21. There were four groups on chicks on different protein diets."),
    v_align = "center"
  ),
  B = grid_panel(
    title = "Filters",
    selectInput("diet", label = "Diet", choices = levels(ChickWeight$Diet)),
    selectInput("chick", label = "Highlighted Chick", choices = chicks_by_group),
    v_align = "center"
  ),
  C = grid_panel(
    title = "Weights by diet",
    plotOutput("weightRanges")
  ),
  D = grid_panel(
    title = "Weight trajectories",
    plotOutput("chickPlot")
  )
)


server <- function(input, output, session) {
  time_range <- c(0, max(ChickWeight$Time))
  weight_range <- c(0, max(ChickWeight$weight))

  output$chickPlot <- renderPlot({
    data_for_diet <- ChickWeight[ChickWeight$Diet == input$diet, ]

    plot(0, 0, xlim = time_range, ylim = weight_range, type = "n", xlab = "Time", ylab = "Weight (grams)")

    for (id in unique(data_for_diet$Chick)) {
      chick_data <- data_for_diet[data_for_diet$Chick == id, ]
      lines(
        x = chick_data$Time, y = chick_data$weight,
        col = if (input$chick == id) "blue" else "grey"
      )
    }
  })

  output$weightRanges <- renderPlot({
    plot(ChickWeight$Diet, ChickWeight$weight, xlab = "Diet", ylab = "Weight (grams)", ylim = weight_range)
  })
}

shinyApp(ui, server)
