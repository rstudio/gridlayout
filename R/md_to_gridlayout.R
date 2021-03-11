#' Build grid layout obj from markdown table
#'
#' @param layout_table Character string with a markdown table. First row and
#'   column are reserved for sizing (any valid css sizing works). An optional
#'   grid-gap can be provided using the very first cell.
#'
#' @return An object of class "grid_layout", which stores the layout as a
#'   matrix. This can be passed to other functions such as `layout_to_css()`.
#' @export
#'
#' @examples
#' grid_obj <- md_to_gridlayout(
#'   layout_table = "
#'     |      |120px   |1fr    |1fr    |
#'     |:-----|:-------|:------|:------|
#'     |100px |header  |header |header |
#'     |1fr   |sidebar |plot_a |plot_c |
#'     |1fr   |sidebar |plot_b |plot_b |"
#' )
#'
md_to_gridlayout <- function(layout_table){
  by_row <- strsplit(layout_table, "\n")[[1]]
  is_header_divider <- grepl("^[\\| \\- :]+$", by_row, perl = TRUE)
  is_empty_row <- by_row == ""
  clean_rows <- by_row[!(is_header_divider | is_empty_row)]

  # Is the table just raw? In that case assume sizing of 1fr for everything
  has_sizes <- grepl("[\\s|\\|][0-9]", clean_rows[1])

  # Get rid of empty first el caused by table boundaries
  raw_mat <- t(sapply(
    strsplit(clean_rows, "\\s*\\|\\s*", perl = TRUE),
    function(row){row[-1]}
  ))

  if(!is.character(raw_mat[1,1])){
    stop("The provided text does not appear to be a markdown table.")
  }

  if(has_sizes){
    new_gridlayout(
      # Stop single column or row layouts from getting collapsed to vectors
      layout_mat = raw_mat[-1,-1, drop = FALSE],
      col_sizes = raw_mat[1,-1],
      row_sizes = raw_mat[-1,1],
      gap = if(raw_mat[1,1] != "") raw_mat[1,1] else "1rem"
    )
  } else {
    new_gridlayout(layout_mat = raw_mat)
  }
}


# Function to allow layout being defined with markdown or with standard object
coerce_to_layout <- function(layout_def){
  if(inherits(layout_def, "character")){
    # If we were passed a string directly then convert to a grid layout before
    # proceeding
    layout_def <- md_to_gridlayout(layout_def)
  } else if(!inherits(layout_def, "gridlayout")){
    stop("Passed layout must either be a markdown table or a gridlayout object.")
  }
  layout_def
}


