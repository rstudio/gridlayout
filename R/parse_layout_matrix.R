DEFAULT_SIZE_CHAR <- "."

parse_layout_matrix <- function(layout_matrix){

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
  column_sizes <- fill_missing_w_default(layout_matrix[1,-1])
  row_sizes <- fill_missing_w_default(layout_matrix[-1,1])
  gap_size <- fill_missing_w_default(layout_matrix[1,1])

  # Strip away sizes to get the main layout matrix
  items_matrix <- matrix(
    layout_matrix[-1,-1],
    nrow = n_rows,
    ncol = n_cols
  )

  item_ids <- unique(as.vector(items_matrix))

  validate_item_ids(item_ids)

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

VALID_ITEM_ID_REGEX = "^[a-zA-Z]+\\w*|\\.$"
validate_item_ids <- function(item_ids){

  is_valid_item_id <- str_detect(item_ids, pattern = VALID_ITEM_ID_REGEX)

  if (all(is_valid_item_id)) { return(TRUE) }

  bad_ids <- item_ids[!is_valid_item_id]

  stop(
    "Layout has the following invalid item ids in it:\n",
    list_in_quotes(bad_ids), "\n",
    "Only simple words and (non-starting) numbers are allowed.",
    call. = FALSE
  )
}
