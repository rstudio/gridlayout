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




