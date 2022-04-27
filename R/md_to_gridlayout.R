#' Build grid layout obj from markdown table
#'
#' This is just a wrapper around [new_gridlayout] that is more explicit about
#' its input format. Also adds the ability to absorb errors for use when parsing
#' free text that may or may not represent a layout table.
#'
#' @param layout_table Character string with a markdown table. First row and
#'   column are reserved for sizing (any valid css sizing works). An optional
#'   grid-gap can be provided using the very first cell.
#' @param null_instead_of_error When the input fails to be parsed as a layout,
#'   should the function return `NULL` instead of throwing an error? Useful for
#'   situations where you're parsing multiple tables simply want to check if a
#'   table can be parsed instead of relying on it being parsable.
#' @inheritDotParams new_gridlayout
#'
#' @return An object of class "grid_layout", which stores the layout as a
#'   matrix. This can be passed to other functions such as `layout_to_css()`.
#'
#' @seealso [new_gridlayout]
#' @export
#'
#' @examples
#' md_to_gridlayout(
#'   layout_table = "
#'     |      |120px   |1fr    |1fr    |
#'     |:-----|:-------|:------|:------|
#'     |100px |header  |header |header |
#'     |1fr   |sidebar |plot_a |plot_c |
#'     |1fr   |sidebar |plot_b |plot_b |"
#' )
#'
#'
#' # Can specify gap size in upper left cell
#' md_to_gridlayout(
#'   layout_table = "
#'     |25px  |120px  |1fr    |
#'     |:-----|:------|:------|
#'     |100px |header |header |
#'     |1fr   |plot   |table  |
#'     |1fr   |footer |footer |"
#' )
#'
#' # Don't need to follow full md table with
#' # header row if not desired
#' md_to_gridlayout(
#'   layout_table = "
#'     |25px  |120px  |1fr    |
#'     |100px |header |header |
#'     |1fr   |plot   |table  |
#'     |1fr   |footer |footer |"
#' )
#'
#' # Can omit sizing as well if desired
#' md_to_gridlayout(
#'   layout_table = "
#'     |header |header |
#'     |plot   |table  |
#'     |footer |footer |"
#' )
#'
md_to_gridlayout <- function(layout_table, null_instead_of_error = FALSE, ...) {
  tryCatch(
    {
      new_gridlayout(layout_table, ...)
    },
    error = function(err) {
      if (null_instead_of_error) {
        NULL
      } else {
        stop(err)
      }
    }
  )
}

parse_md_table_layout <- function(
  layout_rows,
  col_sizes = NULL,
  row_sizes = NULL,
  gap = NULL
) {
  is_header_divider <- grepl("^[\\| \\- :]+$", layout_rows, perl = TRUE)
  is_empty_row <- layout_rows == ""

  # Get rid of empty rows and columns caused by leading and trailing whitespace
  layout_rows <- layout_rows[!(is_header_divider | is_empty_row)]

  # Trim off any leading whitespace around lines
  layout_rows <- str_trim(layout_rows, side = "both")

  # Make sure everything is enclosed in pipes
  if (any(!str_detect(layout_rows, "^\\|.+\\|$"))) {
    stop("The provided text does not appear to be a markdown table.")
  }

  # Get rid of the enclosing pipes now so we just have interior separating pipes
  # to split on
  layout_rows <- str_remove_all(layout_rows, "^\\||\\|$")

  # Split on the internal pipes
  rows_list <- strsplit(layout_rows, "|", fixed = TRUE)

  # Trim whitespace. We do this hear instead of earlier to avoid erasing empty
  # cells entirely
  rows_list <- lapply(rows_list, str_trim, side = "both")

  layout_mat <- matrix(unlist(rows_list), nrow = length(layout_rows), byrow = TRUE)

  # Does the table itself provide us size info? To find this we simply look for
  # a number as the first entry in the first row
  has_row_size_col <- all_css_or_empty(layout_mat[, 1])
  has_col_size_row <- all_css_or_empty(layout_mat[1, ])

  gap_size_in_table <- has_row_size_col & has_col_size_row & are_css_sizes(layout_mat[1, 1])
  if (gap_size_in_table) {
    if (notNull(gap)) {
      warning("Gap sizing provided both in layout table and via gap argument. Ignoring gap argument.")
    }
    gap <- layout_mat[1, 1]
  }

  if (has_row_size_col) {
    row_sizes_from_table <- layout_mat[, 1]
    # Need to take off the first element if we have column sizing as well
    # as it will either be empty or contain the grid size
    if (has_col_size_row) row_sizes_from_table <- row_sizes_from_table[-1]

    if (are_css_sizes(row_sizes_from_table)) {
      if (notNull(row_sizes)) {
        warning("Row sizing provided both in layout table and via row_sizes argument. Ignoring row_sizes argument.")
      }
      row_sizes <- row_sizes_from_table
    }
  }

  if (has_col_size_row) {
    col_sizes_from_table <- layout_mat[1, ]
    if (has_row_size_col) col_sizes_from_table <- col_sizes_from_table[-1]

    if (are_css_sizes(col_sizes_from_table)) {
      if (notNull(col_sizes)) {
        warning("Row sizing provided both in layout table and via col_sizes argument. Ignoring row_sizes argument.")
      }
      col_sizes <- col_sizes_from_table
    }
  }

  # If the user provided a gap size but not a row or column size we will have an
  # empty vector where the row or column sizes would be. We should remove this
  if (has_row_size_col) {
    layout_mat <- layout_mat[, -1, drop = FALSE]
  }
  if (has_col_size_row) {
    layout_mat <- layout_mat[-1, , drop = FALSE]
  }

  list(
    elements = elements_from_mat(layout_mat),
    row_sizes = row_sizes,
    col_sizes = col_sizes,
    gap = gap
  )
}

are_css_sizes <- function(vals) {
  all(is_css_unit(vals))
}


all_css_or_empty <- function(vals) {
  all(is_css_unit(vals) | vals == "")
}
