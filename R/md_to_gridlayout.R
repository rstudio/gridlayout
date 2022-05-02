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




