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


#' Plot output with smart sizing for use inside a `grid_card` - Depreciated
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

  lifecycle::deprecate_warn()("card_plot_output() is no longer needed with bslib card api. Simply use regular shiny::plotOutput()")

  plot_div <- shiny::plotOutput(
    outputId,
    height = height,
    click = click, 
    dblclick = dblclick, 
    hover = hover,
    brush = brush
  )

  # TODO: card-img-* needs to go on the <img> itself, not the containing <div>
  htmltools::tagAppendAttributes(
    plot_div,
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
