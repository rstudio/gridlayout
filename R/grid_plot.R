#' Grid-positioned plot output
#'
#' A light wrapper for `shiny::plotOutput()` that uses gridlayout-friendly
#' sizing defaults.
#'
#'
#' @inheritParams grid_card
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#' @inheritDotParams shiny::plotOutput
#'
#' @return A grid panel filled with plot output
#'
#' @seealso [bslib::card_body_fill], [shiny::plotOutput()]
#' @example man/examples/simple_app.R
#'
#' @export
grid_card_plot <- function(area, outputId = area,...) {
  grid_card(
    area = area,
    height = "100%",
    bslib::card_body_fill(
      shiny::plotOutput(outputId = outputId, ...)
    )
  )
}


# This will eventually get replaced with the bslib version and right now is just
# a rough copy-paste job

#' Plot output with smart sizing for use inside a `grid_card`
#'
#' `r lifecycle::badge('deprecated')`
#'
#' No longer necessary. Use plain `shiny::plotOutput()` wrapped with
#' `bslib::card_body_fill()`.
#'
#' @inheritParams shiny::plotOutput
#' @param ... Named arguments become attributes on the div containing the plot.
#' @param height height in valid css units (see [htmltools::validateCssUnit()]
#'   for more details.) Most use-cases will leave this unset and the plot will
#'   fill the card as best it can.
#' @param stretch Set to `TRUE` if this `card_body` is eager to use any extra
#'   vertical space is available in the card.
#'
#' @seealso [grid_card_plot()] for a simpler way of placing just a plot on the
#'   grid
#' @export
card_plot_output <- function(outputId,
                             click = NULL,
                             dblclick = NULL,
                             hover = NULL,
                             brush = NULL,
                             height = NULL,
                             stretch = TRUE,
                             ...) {

  lifecycle::deprecate_stop("card_plot_output() is no longer needed with bslib card api. Simply use regular shiny::plotOutput()")

}
