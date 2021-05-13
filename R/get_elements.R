#' Get elements and positions out of a grid layout
#'
#' @param layout Object of class `"gridlayout"`.
#'
#' @return List of all unique elements in the layout and their `id`,
#'   `{start,end}_row`, and `{start,end}_col`. Positions are indexed starting at
#'   1
#'
#' @seealso [get_element_ids]
#' @examples
#' grid_obj <- md_to_gridlayout(
#'   layout_table = "
#'         |      |120px   |1fr    |1fr    |
#'         |------|--------|-------|-------|
#'         |100px |header  |header |header |
#'         |1fr   |sidebar |plot_a |plot_a |
#'         |1fr   |sidebar |plot_b |plot_c |"
#'  )
#'
#'  get_elements(grid_obj)
#'
#' @export
get_elements <- function(layout){
  UseMethod("get_elements")
}

#' @export
get_elements.default <- function(layout){
  warning("The get_elements function is only defined for objects of the gridlayout class")
}

#' @export
get_elements.gridlayout <- function(layout){
  # Just remove the gridlayout class so printing doesn't confuse people
  get_info(layout, "elements")
}

#' Get ids of element in layout
#'
#' @param x Object of class `"gridlayout"`.
#'
#' @return Character vector of ids of all elements in layout
#' @export
#'
#' @seealso [get_elements]
#' @examples
#'
#' grid_obj <- md_to_gridlayout(
#'   layout_table = "
#'         |      |120px   |1fr    |1fr    |
#'         |------|--------|-------|-------|
#'         |100px |header  |header |header |
#'         |1fr   |sidebar |plot_a |plot_a |
#'         |1fr   |sidebar |plot_b |plot_c |"
#'  )
#'
#' get_element_ids(grid_obj)
get_element_ids <- function(x){
  UseMethod("get_element_ids")
}

get_element_ids.default <- function(x){
  cat("get_element_ids generic")
}

#' @export
get_element_ids.gridlayout <- function(x){
  get_info(x, "element_ids")
}

#' @export
get_element_ids.gridlayout_template <- function(x){
  extract_chr(get_info(x, "elements"), "id")
}

