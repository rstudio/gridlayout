elements_from_mat <- function(layout_mat){
  # First get all unique ids, this may include concatenated ones, hence to
  # string manipulation cruft
  element_ids <- unique(str_trim(strsplit(paste(layout_mat, collapse = ","), ",")[[1]]))
  n_row <- nrow(layout_mat)
  n_col <- ncol(layout_mat)

  lapply(
    element_ids,
    function(id){
      all_pos <- which( layout_mat == id, arr.ind = TRUE )
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
