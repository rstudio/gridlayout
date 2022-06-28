#' Place any `shiny.tag` element on the grid
#'
#' Allows you to place any item directly on the grid without having to wrap it
#' in `grid_card()` or other containers. This is done by adding a css property
#' and data-attribute to the tag object.
#'
#' @param area Area of grid corresponding to the wrapping grid containers grid
#'   definition
#' @param element Element (html tag) to be placed.
#'
#' @return The `element` updated with a `gridlayout-area` data-attribute and the
#'   `grid-area` property added to its styles
#'
#' @example man/examples/grid_place_app.R
#' @export
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
