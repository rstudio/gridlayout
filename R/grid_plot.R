#' Grid Panel Plot Output
#'
#' A light wrapper for `shiny::plotOutput()` that uses gridlayout-friendly
#' sizing defaults.
#'
#'
#' @inheritParams grid_card
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#' @inheritDotParams card_plot_output
#'
#' @return A grid panel filled with plot output
#' @export
#'
#' @seealso [card_plot_output]
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
#'     grid_card_text("header", "This is my header", is_title = TRUE),
#'     grid_card(
#'       "sidebar",
#'       title = "Settings",
#'       sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
#'     ),
#'     grid_card_plot("distPlot")
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
grid_plot <- function(area,
                      outputId = area,
                      ...,
                      has_border = TRUE) {
  grid_card(
    area = area,
    card_plot_output(outputId = outputId, ...),
    has_border = has_border
  )
}

# This will eventually get replaced with the bslib version and right now is just
# a rough copy-paste job

#' Card-container plot output
#'
#' A card-aware wrapper of `shiny::plotOutput` that has smart defaults for
#' sizing
#'
#' @inheritParams shiny::plotOutput
#' @param ... Named arguments become attributes on the div containing the plot.
#' @param stretch Set to `TRUE` if this `card_body` is eager to use any extra
#'   vertical space is available in the card.
#'
#' @export
#' @seealso [grid_plot]
card_plot_output <- function(outputId,
                             click = NULL,
                             dblclick = NULL,
                             hover = NULL,
                             brush = NULL,
                             height = NULL,
                             stretch = TRUE,
                             ...) {
  plot_div <- shiny::plotOutput(outputId,
                                height = NULL, click = click, dblclick = dblclick, hover = hover,
                                brush = brush
  )

  # TODO: card-img-* needs to go on the <img> itself, not the containing <div>
  htmltools::tagAppendAttributes(plot_div,
                                 style = htmltools::css(
                                   flex = if (stretch) "1 1",
                                   `-webkit-flex` = if (stretch) "1 1",
                                   # May be NULL
                                   `flex-basis` = htmltools::validateCssUnit(height),
                                   `-webkit-flex-basis` = htmltools::validateCssUnit(height),
                                 ),
                                 !!!rlang::list2(...)
  )
}
