
#' Convert layout to css for Shiny
#'
#' This simply wraps the output of `to_css()` in a `style` tag and escapes HTML
#' characters to simplify using in Shiny. Most of the time you'll want to use
#' \code{\link{grid_page}} or \code{\link{grid_container}} instead of manually
#' adding this css though.
#'
#' @seealso \code{\link{to_css}}, \code{\link{grid_page}}, \code{\link{grid_container}}
#' @inheritParams grid_container
#' @inheritDotParams to_css -layout
#'
#' @return Character string of css used to setup grid layout and place elements
#'   (referenced by id) into correct locations
#'
#' @keywords internal
#'
#' @examples
#' # Only run these examples in interactive R sessions
#' if (interactive()) {
#' library(shiny)
#' my_layout <- "
#' |      |        |         |
#' |------|--------|---------|
#' |2rem  |200px   |1fr      |
#' |100px |header  |header   |
#' |500px |sidebar |distPlot |"
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = fluidPage(
#'     use_gridlayout_shiny(my_layout, "#app-container"),
#'     div(
#'       id = "app-container",
#'       div(
#'         style = "grid-area: header;",
#'         h2(id = "app-title", "Old Faithful Geyser Data")
#'       ),
#'       div(
#'         style = "grid-area: sidebar;",
#'         sliderInput("bins", "Number of bins:",
#'                     min = 1, max = 50, value = 30
#'         )
#'       ),
#'       div(
#'         style = "grid-area:distPlot",
#'         plotOutput("distPlot", height = "100%")
#'       )
#'     )
#'   ),
#'   server = function(input, output) {
#'     output$distPlot <- renderPlot({
#'       x <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = "darkgray", border = "white")
#'     })
#'   }
#' )
#'
#' }
use_gridlayout_shiny <- function(layout, ...) {
  requireNamespace("htmltools", quietly = TRUE)
  layout <- as_gridlayout(layout)
  htmltools::tags$head(
    htmltools::tags$style(
      htmltools::HTML(to_css(layout, ...))
    )
  )
}
