#' Grid panel with vertically stacked elements
#'
#' Contain a series of ui elements with each vertically stacked on top of
#' eachother. Internally uses css flexbox to align items.
#'
#' @param area Name of grid area, should match an area defined in the layout
#'   section of the wrapping `grid_page()` or `grid_container()`.
#' @param ... Elements to include within the panel
#' @param title Character string to go across top of panel with label. If left
#'   blank the card contents will take up entire space.
#' @param use_card_styles Should the element contained in panel be made to look
#'   like an enclosed card?
#' @param collapsible Should the card be able to be collapsed (`TRUE` or
#'   `FALSE`)? Gridlayout will only show collapser if the layout allows it
#'   (panel is entirely positioned within "auto" sized rows, and has a title).
#'   Setting this to `FALSE` will mean collapsibility of the panel will never be
#'   enabled, regardless of layout.
#' @param scrollable Should scroll-bars be added so content that is larger than
#'   the panel can be seen?
#' @param v_align,h_align Vertical and Horizontal alignment of content in panel.
#'   Options include `"center", "start", "end", "stretch"`. These are a direct
#'   mapping to the the [css-spec for
#'   `justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)
#'    (=`h_align`) and
#'   [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
#'    (= `v_align`).
#' @param panel_id ID of `grid_card` div. Usually this is automatically set by
#'   `grid_page()` or `grid_container()`.
#' @param panel_class Class(es) of `grid_card` div. Like `panel_id` this is
#'   typically automatically generated and should only be touched in advanced
#'   usage.
#' @param padding A valid css size that overrides the default of how much
#'   spacing is around the card contents
#' @param item_gap How much space should there be between consecutive items?
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with styles for
#'   vertical stacking applied.
#'
#' @seealso [grid_card]
#' @export
#'
#' @examples
#'
#' # Simply a wrapper for shiny::div(...)
#' flex_stack(
#'   area="header",
#'   shiny::h2("R"),
#'   shiny::actionButton("myButton", "Click Me")
#' )
#'
flex_stack <- function(
    ...,
    title = NULL,
    collapsible = TRUE,
    scrollable = FALSE,
    item_gap = "10px"
){

  contents <- list(...)

  has_title <- notNull(title)

  shiny::div(
    class = paste("grid_card", "vertical_stack"),
    style = htmltools::css(`--item-gap` = item_gap),
    `data-scrollable` = scrollable,
    if (has_title) {
      card_header(title, use_collapser = collapsible && has_title)
    },
    shiny::div(contents, class = "panel-content")
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
