#' Validate list of elements for grid
#'
#' @inheritParams new_gridlayout
#'
#' @return NULL
#' @export
elements_to_grid_mat <- function(element_list, col_sizes, row_sizes, warn_about_overap = TRUE){

  # Gather info about the extent of positions
  start_rows <- extract_dbl(element_list, "start_row")
  min_row <- min(start_rows)
  end_rows <- extract_dbl(element_list, "end_row")
  max_row <- max(end_rows)
  start_cols <- extract_dbl(element_list, "start_col")
  min_col <- min(start_cols)
  end_cols <- extract_dbl(element_list, "end_col")
  max_col <- max(start_cols)

  # Recycle column and row sizes if only singular value was passed
  if(length(col_sizes) == 1 & max_col > 1){
    col_sizes <- rep_len(col_sizes, max_col)
  }
  if(length(row_sizes) == 1 & max_row > 1){
    row_sizes <- rep_len(row_sizes, max_row)
  }


  num_cols <- length(col_sizes)
  num_rows <- length(row_sizes)

  if(min(start_rows) < 1){
    bad_elements <- extract_chr(element_list[start_rows < 1], "id")
    stop(
      "Element(s) ", list_in_quotes(bad_elements), " have invalid start_row values\n",
      "Row start must be 1 or greater as indexing into the grid starts at 1."
    )
  }
  if(max(end_rows) > num_rows){
    bad_elements <- extract_chr(element_list[end_rows > num_rows], "id")
    stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid rows")
  }

  if(min(start_cols) < 1){
    bad_elements <- extract_chr(element_list[start_cols < 1], "id")
    stop(
      "Element(s) ", list_in_quotes(bad_elements), " have invalid start_col values\n",
      "Column start must be 1 or greater as indexing into the grid starts at 1."
    )
  }
  if(max(end_cols) > num_cols){
    bad_elements <- extract_chr(element_list[end_cols > num_cols], "id")
    stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid cols")
  }

  # Now we can start checking for overlaps in element ranges. We will do this by
  # building a matrix and then filling it with each element If we try and fill a
  # cell that already has something in it, we have an overlap
  layout_mat <- matrix("", nrow = num_rows, ncol = num_cols)
  for(el in element_list){
    row_span <- el$start_row:el$end_row
    col_span <- el$start_col:el$end_col
    current_cells <- layout_mat[row_span, col_span, drop = FALSE]
    already_filled_cells <- current_cells != ""
    if(any(already_filled_cells) & warn_about_overap){
      warning(el$id, " overlaps other elements. If this was intentional ",
              "set warn_about_overap = FALSE to supress these warnings.")
    }

    # Add a visual separation for overlaps with a pipe
    current_cells[already_filled_cells] <- paste0(current_cells[already_filled_cells], ",")
    layout_mat[row_span, col_span] <- paste0(current_cells, el$id)
  }
  layout_mat
}

