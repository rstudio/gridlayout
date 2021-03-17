elements_from_mat <- function(layout_mat){
  # First get all unique ids, this may include concatenated ones, hence to
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
