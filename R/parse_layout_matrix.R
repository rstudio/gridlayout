parse_layout_matrix <- function(
    layout_matrix,
    default_row_size,
    default_col_size,
    default_gap_size
){

  # Missing column sizes
  if (!all_css_or_empty(layout_matrix[1,])) {
    layout_matrix <-  rbind(
      "",
      layout_matrix
    )
  }

  # Missing row sizes
  if (!all_css_or_empty(layout_matrix[,1])){
    layout_matrix <-  cbind(
      "",
      layout_matrix
    )
  }

  # Subtract the size row and column to get layout dimensions
  n_rows <- nrow(layout_matrix) - 1L
  n_cols <- ncol(layout_matrix) - 1L

  # Fill in the empty or missing sizes with defaults
  column_sizes <- fill_missing_w_default(layout_matrix[1,-1], default_col_size)
  row_sizes <- fill_missing_w_default(layout_matrix[-1,1], default_row_size)
  gap_size <- fill_missing_w_default(layout_matrix[1,1], default_gap_size)

  # Strip away sizes to get the main layout matrix
  items_matrix <- layout_matrix[-1,-1]

  item_ids <- unique(as.vector(items_matrix))

  elements <- lapply(
    item_ids,
    function(id){
      all_pos <- which( items_matrix == id, arr.ind = TRUE )
      list(
        id = id,
        start_row = min(all_pos[,"row"]),
        end_row = max(all_pos[,"row"]),
        start_col = min(all_pos[,"col"]),
        end_col = max(all_pos[,"col"])
      )
    }
  )

  list(
    areas = items_matrix,
    elements = elements,
    column_sizes = column_sizes,
    row_sizes = row_sizes,
    gap_size = gap_size
  )

}


fill_missing_w_default <- function(vec, default_val){
  vec[vec == ""] <- default_val
  vec
}
