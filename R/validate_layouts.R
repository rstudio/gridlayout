#' Validate list of elements for grid
#'
#' @param elements List of elements with the `id`, `start_row`, `end_row`,
#'   `start_col`, and `end_col` format.
#' @inheritParams new_gridlayout
#'
#' @return NULL
#' @export
is_valid_template_areas <- function(elements, col_sizes, row_sizes){

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


}
