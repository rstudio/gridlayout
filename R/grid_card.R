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










