#' Grid-positioned plot output
#'
#' A light wrapper for `shiny::plotOutput()` that uses gridlayout-friendly
#' sizing defaults. For more control look at combining `grid_card()` with
#' `card_plot_output()`
#'
#'
#' @inheritParams grid_card
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#' @inheritDotParams card_plot_output
#'
#' @return A grid panel filled with plot output
#'
#' @seealso [card_plot_output]
#' @example man/examples/simple_app.R
#'
#' @export
grid_card_plot <- function(area,
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

#' Plot output with smart sizing for use inside a `grid_card`
#'
#' A card-aware wrapper of `shiny::plotOutput` that has smart defaults for
#' sizing. Allows you to place content around a plot within a card.
#'
#' @inheritParams shiny::plotOutput
#' @param ... Named arguments become attributes on the div containing the plot.
#' @param stretch Set to `TRUE` if this `card_body` is eager to use any extra
#'   vertical space is available in the card.
#'
#' @seealso [grid_card_plot]
#' @example man/examples/card_plot_output_app.R
#' @export
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
