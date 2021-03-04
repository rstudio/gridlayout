#' Get elements and positions out of a grid layout
#'
#' @param layout Object of class `"gridlayout"`.
#'
#' @return List of all unique elements in the layout and their `id`,
#'   `{start,end}_row`, and `{start,end}_col`. Positions are indexed starting at
#'   1
#'
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
  lapply(
    unique(c(layout)),
    function(id){
      all_pos <- which(layout == id, arr.ind = TRUE)
      list(
        id = id,
        start_row = min(all_pos[,"row"]),
        end_row = max(all_pos[,"row"]),
        start_col = min(all_pos[,"col"]),
        end_col = max(all_pos[,"col"])
      )
    }
  )
}
