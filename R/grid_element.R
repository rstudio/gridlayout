#' Simple grid panel
#'
#' The minimal adornment of a tag to be grid-aware and always able to be classed
#'
#' @param area Area of grid corresponding to the wrapping grid containers grid
#'   definition
#' @param ... Arguments passed onto the `tag` used. See `tag` argument
#' @param tag Tag used to build card. Defaults to `htmltools::div()` but can be
#'   any function that generates a html tag as output. E.g. `shiny::plotOutput`.
#' @param class Any additional classes you may want to add to your panel
#'
#' @return
#' @export
#'
grid_element <- function(area, ..., tag = htmltools::tags$div, class = ""){
  htmltools::tagAppendAttributes(
    grid_place(area = area, element = tag(...)),
    class = class
  )
}


#' Place an item on the grid
#'
#' @inheritParams grid_element
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
    "data-grid-area" = area,
  )
}
