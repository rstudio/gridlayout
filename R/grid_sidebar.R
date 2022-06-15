#' Sidebar
#'
#' Makes a grid element with no space around the left, and bottom.
#'
#' @inheritDotParams grid_element
#'
#' @return
#'
grid_sidebar <- function(...){
  p <- grid_element(...)
  tagAppendAttributes(p, class = "grid-sidebar pos-left-sidebar")
}

