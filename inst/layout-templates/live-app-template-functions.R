# Various UI and Server components to built live-template apps. Comments of  "#'
# start-app-scope" and "#' end-app-scope" denote code chunks that will be placed
# outside of ui and server functions in the compiled app.
panel_about_chick_weights <- function(){
  grid_panel(
    title = "About the ChickWeights dataset",
    p("The body weights of the chicks were measured at birth and every second day thereafter until day 20.
      They were also measured on day 21. There were four groups on chicks on different protein diets."),
    v_align = "center"
  )
}

panel_chooser_dropdowns <- function(){
  #' start-app-scope
  chicks_by_group <- by(data = ChickWeight$Chick, ChickWeight$Diet, FUN = unique)
  names(chicks_by_group) <- paste("Diet:", names(chicks_by_group))
  #' end-app-scope

  grid_panel(
    title = "Filters",
    selectInput("diet", label = "Diet", choices = levels(ChickWeight$Diet)),
    selectInput("chick", label = "Highlighted Chick", choices = chicks_by_group),
    v_align = "center"
  )
}



panel_weight_trajectories_for_diet <- function(){
  grid_panel(
    title = "Weight trajectories",
    plotOutput("chickPlot")
  )
}

weight_trajectories_for_diet <- function(input, output) {
  output$chickPlot <- renderPlot({
    # Filter to the current diet
    data_for_diet <- ChickWeight[ChickWeight$Diet == input$diet, ]

    plot(
      0, 0,
      type = "n",
      xlim = c(0, max(ChickWeight$Time)), xlab = "Time",
      ylim = c(0, max(ChickWeight$weight)), ylab = "Weight (grams)"
    )

    for (id in unique(data_for_diet$Chick)) {
      chick_data <- data_for_diet[data_for_diet$Chick == id, ]
      lines(
        x = chick_data$Time, y = chick_data$weight,
        col = if (input$chick == id) "blue" else "grey"
      )
    }
  })
}


panel_weight_dist_by_diet <- function(){
  grid_panel(
    title = "Weights by diet",
    plotOutput("weightRanges")
  )
}

weight_dist_by_diet <- function(input, output) {
  output$weightRanges <- renderPlot({
    plot(
      x = ChickWeight$Diet, xlab = "Diet",
      y = ChickWeight$weight, ylab = "Weight (grams)",
      ylim = c(0, max(ChickWeight$weight))
    )
  })
}
