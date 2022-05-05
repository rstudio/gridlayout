#' Grid Panel Plot Output
#'
#' A light wrapper for `shiny::plotOutput()` that uses gridlayout-friendly
#' sizing defaults.
#'
#'
#' @inheritParams grid_panel
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#' @param width Optional width parameter. Defaults to filling entire width of
#'   grid panel
#' @param height Optional height parameter. Defaults to filling entire height of
#'   grid panel
#' @inheritDotParams shiny::plotOutput
#'
#' @return A grid panel filled with plot output
#' @export
#'
#' @examples
#'
#' if (interactive()) {
#'
#' shinyApp(
#'   ui = grid_page(
#'     layout = c(
#'       "15px 200px   1fr",
#'       "85px header  header",
#'       "1fr  sidebar distPlot"
#'     ),
#'     grid_panel_text("header", "This is my header", is_title = TRUE),
#'     grid_panel(
#'       "sidebar",
#'       title = "Settings",
#'       sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
#'     ),
#'     grid_panel_plot("distPlot")
#'   ),
#'   server = function(input, output) {
#'     output$distPlot <- renderPlot({
#'       x    <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = 'darkgray', border = 'white')
#'     })
#'   }
#' )
#'
#' }
#'
grid_panel_plot <- function(
    area,
    outputId = area,
    width = "100%",
    height = "100%",
    ...
) {
  grid_panel(
    area = area,
    shiny::plotOutput(
      outputId = outputId,
      width = width,
      height = height,
      ...
    )
  )
}
