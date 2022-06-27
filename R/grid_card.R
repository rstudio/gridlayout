#' Grid Card
#'
#' The standard element for placing elements on the grid in a simple card
#' container
#'
#' @inheritParams grid_panel_stack
#' @inheritParams grid_panel
#' @inheritDotParams grid_panel_stack
#' @param has_border Should the card be surrounded by a border? Set to `FALSE`
#'   to turn off.
#'
#' @seealso [grid_panel_stack]
#' @return
#' @export
grid_card <- function(area, ..., scrollable = FALSE, has_border = TRUE) {

  card <- grid_panel_stack(area = area, ...)
  # Waiting for the bslib card elements to be merged in
  # card <- grid_place(area = area, bslib::card(...))

  update_el(
    card,
    classes = "card",
    styles = list(
      overflow = if (scrollable) "scroll",
      # We use transparent here so that removing the border doesn't confusingly
      # change the size of the card
      border = if(identical(has_border, FALSE) ) "transparent"
    )
  )
}


#' Grid Plot Output
#'
#' A simple plot-on-the-grid function. For more control - such as adding headers
#' or footers - you should use [`grid_card()`] and [`card_plot_output()`]
#' directly.
#'
#'
#' @inheritParams grid_card
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#'
#' @return A grid panel filled with plot output
#' @export
#'
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




