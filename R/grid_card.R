#' Grid Card
#'
#' A wrapper around [bslib::card] to enable placing on a grid layout using the
#' area parameter.
#'
#' @inheritParams grid_element
#' @inheritDotParams bslib::card
#'
#' @seealso [bslib::card()]
#' @return
#' @export
grid_card <- function(area, ...){
  grid_place(area = area, bslib::card(...))
}







