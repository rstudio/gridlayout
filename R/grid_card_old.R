#' Grid-positioned card element - old version
#'
#' `r lifecycle::badge('deprecated')`
#' 
#' Note that this version of grid card has been replaced with a newer one based
#' on `bslib::card()`. That is the recomended way of using cards in your layout.
#' This version is kept for compatibility with old apps while they are switched
#' to the new interface. The standard element for placing elements on the grid
#' in a simple card container
#'
#' @param area Name of grid area, should match an area defined in the layout
#'   section of the wrapping `grid_page()` or `grid_container()`.
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
#' @param class Additional CSS classes to include on the card div.
#' @param item_gap How much vertical space should there be between children of
#'   card?
#' @param has_border Should the card be surrounded by a border? Set to `FALSE`
#'   to turn off.
#'
#' @seealso [grid_card_text()] for a card with just text content,
#'   [grid_card_plot()] for a card with just plot content, [grid_place()] to
#'   place any tag onto the grid without needing to wrap in a card, and
#'   [card_plot_output()] for including a smart-sized plot within a card.
#'
#' @example man/examples/simple_app_old.R
#' @export
grid_card_old <- function(area,
                          ...,
                          title = NULL,
                          scrollable = FALSE,
                          collapsible = TRUE,
                          has_border = TRUE,
                          item_gap = "10px",
                          class = NULL) {
  card <- update_el(
    flex_stack(
      ...,
      scrollable = scrollable,
      collapsible = collapsible,
      title = title,
      item_gap = item_gap
    ),
    classes = c("card", class),
    styles = list(
      # We use transparent here so that removing the border doesn't confusingly
      # change the size of the card
      border = if (identical(has_border, FALSE)) "transparent"
    )
  )

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
flex_stack <- function(...,
                       title,
                       collapsible,
                       scrollable,
                       item_gap = "10px") {
  has_title <- notNull(title)

  shiny::div(
    class = "grid_card vertical_stack",
    style = htmltools::css(`--item-gap` = item_gap),
    `data-scrollable` = scrollable,
    if (has_title) {
      card_header_internal(title, use_collapser = collapsible && has_title)
    },
    shiny::div(..., class = "panel-content")
  )
}

card_header_internal <- function(contents, use_collapser = FALSE) {
  shiny::div(
    class = "card-header",
    contents,
    if (use_collapser) make_collapser_icon(),
    style = if (use_collapser) "justify-content: space-between;"
  )
}
