#' Header panel
#'
#' Makes a grid panel with no space around the top, left, and right sides.
#'
#' To change the background color, set the css variable `--grid-header-bg-color`.
#'
#' @inheritParams grid_element
#'
#' @return
#' @export
#'
grid_header <- function(area, ..., tag = shiny::tags$h1){
  p <- grid_element(area, ..., tag = tag)
  tagAppendAttributes(p, class = "grid-header pos-header")
}
