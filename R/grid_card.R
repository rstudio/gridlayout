#' Grid Card
#'
#' The standard element for placing elements on the grid in a simple card
#' container
#'
#' @inheritParams flex_stack
#' @inheritParams grid_card
#' @param title Character string to go across top of panel with label. If left
#'   blank the card contents will take up entire space.
#' @param collapsible Should the card be able to be collapsed (`TRUE` or
#'   `FALSE`)? Gridlayout will only show collapser if the layout allows it
#'   (panel is entirely positioned within "auto" sized rows, and has a title).
#'   Setting this to `FALSE` will mean collapsibility of the panel will never be
#'   enabled, regardless of layout.
#' @param scrollable Should scroll-bars be added so content that is larger than
#'   the panel can be seen?
#' @param item_gap How much space should there be between consecutive items?
#' @param has_border Should the card be surrounded by a border? Set to `FALSE`
#'   to turn off.
#'
#' @seealso [grid_card_text]
#' @return
#' @export
grid_card <- function(area, ..., title = NULL, scrollable = FALSE, collapsible = TRUE, has_border = TRUE, item_gap = "10px") {
  card <- update_el(
    flex_stack(..., scrollable = scrollable, collapsible = collapsible, title = title, item_gap = item_gap),
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
