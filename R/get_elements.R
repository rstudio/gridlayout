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
  elements_from_mat(layout)
}


elements_from_mat <- function(layout_mat){
  # First get all unique ids, this may include concatinated ones, hense to
  # string manipulation cruft
  element_ids <- unique(str_trim(strsplit(paste(layout_mat, collapse = ","), ",")[[1]]))
  n_row <- nrow(layout_mat)
  n_col <- ncol(layout_mat)

  lapply(
    element_ids,
    function(id){
      # str_detect/grepl collapses the results back to a vector so we have to
      # reassemble the matrix for the which to give us 2d coordinates
      all_pos <- which(
        matrix(
          str_detect(layout_mat, id),
          nrow = n_row,
          ncol = n_col
        ),
        arr.ind = TRUE
      )
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
