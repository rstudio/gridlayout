#' Place an item on the grid
#'
#' @param area Area of grid corresponding to the wrapping grid containers grid
#'   definition
#' @param element Element (html tag) to be placed.
#'
#' @return The `element` with a `grid-area` property added to its styles
#' @export
#'
#' @examples
#'
#' grid_place("header", htmltools::tags$h1("I am a header"))
#'
grid_place <- function(area, element) {
  if (!inherits(element, "shiny.tag")) {
    stop("element needs to be a valid tag object")
  }

  htmltools::tagAppendAttributes(
    add_styles(
      element,
      "grid-area" = area
    ),
    "data-gridlayout-area" = area,
  )
}
