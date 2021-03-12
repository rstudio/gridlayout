#' Validate list of elements for grid
#'
#' @param elements List of elements with the `id`, `start_row`, `end_row`,
#'   `start_col`, and `end_col` format.
#' @inheritParams new_gridlayout
#' @param ignore_overlap Should overlapping elements in the grid be flagged?
#'
#' @return NULL
#' @export
elements_to_grid_mat <- function(elements, col_sizes, row_sizes, warn_about_overap = TRUE){

  num_cols <- length(col_sizes)
  num_rows <- length(row_sizes)

  start_rows <- pluck_dbl(elements, "start_row")
  if(min(start_rows) < 1){
    bad_elements <- pluck_chr(elements[start_rows < 1], "id")
    stop(
      "Element(s) ", list_in_quotes(bad_elements), " have invalid start_row values\n",
      "Row start must be 1 or greater as indexing into the grid starts at 1."
    )
  }
  end_rows <- pluck_dbl(elements, "end_row")
  if(max(end_rows) > num_rows){
    bad_elements <- pluck_chr(elements[end_rows > num_rows], "id")
    stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid rows")
  }

  start_cols <- pluck_dbl(elements, "start_col")
  if(min(start_cols) < 1){
    bad_elements <- pluck_chr(elements[start_cols < 1], "id")
    stop(
      "Element(s) ", list_in_quotes(bad_elements), " have invalid start_col values\n",
      "Column start must be 1 or greater as indexing into the grid starts at 1."
    )
  }
  end_cols <- pluck_dbl(elements, "end_col")
  if(max(end_cols) > num_cols){
    bad_elements <- pluck_chr(elements[end_cols > num_cols], "id")
    stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid cols")
  }

  # Now we can start checking for overlaps in element ranges. We will do this by
  # building a matrix and then filling it with each element If we try and fill a
  # cell that already has something in it, we have an overlap
  layout_mat <- matrix("", nrow = num_rows, ncol = num_cols)
  for(el in elements){
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
