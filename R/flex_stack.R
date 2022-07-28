#' Div with vertically stacked elements
#'
#' Contain a series of ui elements with each vertically stacked on top of
#' eachother. Internally uses css flexbox to align items.
#'
#' @param ... Arguments (typically children) passed to the `htmltools::div()`
#'   that contain the card's contents
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
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with styles for
#'   vertical stacking applied.
#'
#' @keywords internal
#' @seealso [grid_card]
#'
flex_stack <- function(
    ...,
    title,
    collapsible,
    scrollable,
    item_gap = "10px"
){

  has_title <- notNull(title)

  shiny::div(
    class = "grid_card vertical_stack",
    style = htmltools::css(`--item-gap` = item_gap),
    `data-scrollable` = scrollable,
    if (has_title) {
      card_header(title, use_collapser = collapsible && has_title)
    },
    shiny::div(..., class = "panel-content")
  )

}

card_header <- function(contents, use_collapser = FALSE) {

  shiny::div(
    class = "card-header",
    contents,
    if (use_collapser) make_collapser_icon(),
    style = if (use_collapser) "justify-content: space-between;"
  )

}
