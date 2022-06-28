#' Grid Card
#'
#' The standard element for placing elements on the grid in a simple card
#' container
#'
#' @inheritParams flex_stack
#' @inheritParams grid_card
#' @param title Character string to go across top of panel with label. If left
#'   blank the card contents will take up entire space.
#' @inheritDotParams flex_stack
#' @param has_border Should the card be surrounded by a border? Set to `FALSE`
#'   to turn off.
#'
#' @seealso [flex_stack]
#' @return
#' @export
grid_card <- function(area, ..., title = NULL, scrollable = FALSE, has_border = TRUE) {

  card <- update_el(
    flex_stack(..., scrollable = scrollable, title = title),
    classes = "card",
    styles = list(
      # We use transparent here so that removing the border doesn't confusingly
      # change the size of the card
      border = if (identical(has_border, FALSE)) "transparent"
    )
  )

  # Waiting for the bslib card elements to be merged in
  # card <- grid_place(area = area, bslib::card(...))
  grid_place(area = area, card)

}


make_collapser_icon <- function(parent_id = "") {
  requireNamespace("fontawesome", quietly = TRUE)
  # Clicking on the collapsing icon will update classes to initiate collapsing
  # or expanding and also trigger a resize event so Shiny will know to update
  # plots that may have gotten more space after collapsing etc.
  shiny::span(
    fontawesome::fa("chevron-up"),
    "onclick" = '
    var card = this.parentElement.parentElement;
    var card_classes = card.classList;
    if (card_classes.contains("collapsed")) {
      card_classes.remove("collapsed");
    } else {
      card_classes.add("collapsed");
    }
    window.dispatchEvent(new Event("resize"));
    ',
    class = "collapser-icon"
  )
}

