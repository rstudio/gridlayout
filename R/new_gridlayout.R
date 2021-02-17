#' Construct a gridlayout object from basic parts
#'
#' @param layout_mat A character matrix where each entry controls what element
#'   id will take up that given position in the grid. For instance a header
#'   element would take up every cell in the first row.
#' @param col_sizes A character vector of valid css sizes for the width of each
#'   column in your grid as given by `layout_mat`. If a single value is passed, it will be repeated for all columns.
#' @param row_sizes Same as `col_sizes`, but for row heights.
#' @param gap Valid css sizing for gap to be left between each element in your
#'   grid. Defaults to `"1rem"`.
#'
#' @return Object of class `"gridlayout"`
#' @export
#'
#' @examples
#'
#' my_layout <- new_gridlayout(
#'   layout_mat = matrix(c(
#'     "header", "header",
#'     "plota",  "plotb"
#'   ), ncol = 2, byrow = TRUE),
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr"),
#'   gap = "2rem"
#' )
#'
new_gridlayout <- function(layout_mat, col_sizes, row_sizes, gap){
  # If no sizing is given just make every row and column the same size as other
  # rows and columns
  if(missing(col_sizes)){
    col_sizes <- rep("1fr", ncol(layout_mat))
  }
  if(missing(row_sizes)){
    row_sizes <- rep("1fr", nrow(layout_mat))
  }

  # If the user has just passed a single value, assume that it should be
  # repeated to fill
  if(length(col_sizes) == 1){
    col_sizes <- as.character(rep(col_sizes, ncol(layout_mat)))
  }
  if(length(row_sizes) == 1){
    row_sizes <- as.character(rep(row_sizes, nrow(layout_mat)))
  }

  if(length(row_sizes) != nrow(layout_mat)){
    stop("The provided row sizes need to match the number of rows in your layout matrix")
  }
  if(length(col_sizes) != ncol(layout_mat)){
    stop("The provided column sizes need to match the number of columns in your layout matrix")
  }

  # Default gap is a single rem unit. This is a relative unit that scales with
  # the base text size of a page. E.g. setting font-size: 16px on the body
  # element of a page means 1rem = 16px;
  if(missing(gap)){
    gap <- "1rem"
  }

  structure(
    layout_mat,
    class = "gridlayout",
    row_sizes = row_sizes,
    col_sizes = col_sizes,
    gap = gap
  )
}

#' @export
#' @importFrom crayon %+%
print.gridlayout <- function(layout){

  no_header <- paste(
    strsplit(
      to_md(layout, include_gap_size = FALSE),
      "\n"
    )[[1]][-c(1,2)],
    collapse = "\n"
  )

  color_sizings <- crayon::cyan
  emph <- crayon::bold
  no_pipes <- stringr::str_remove_all(no_header, "\\|")
  cat(
    emph("gridlayout") %+% " object with " %+%
      emph(length(attr(layout, 'row_sizes'))) %+% " rows, " %+%
      emph(length(attr(layout, 'col_sizes'))) %+% " columns, and " %+%
      "gap size: " %+% emph(attr(layout, 'gap')),
    "\n",
    stringr::str_replace_all(no_pipes, "[1-9]+.+?(?=\\s)", color_sizings)
  )
}

