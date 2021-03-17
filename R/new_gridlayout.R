#' Construct a gridlayout object from basic parts
#'
#' @param layout_mat A character matrix where each entry controls what element
#'   id will take up that given position in the grid. For instance a header
#'   element would take up every cell in the first row.
#' @param col_sizes A character vector of valid css sizes for the width of each
#'   column in your grid as given by `layout_mat`. If a single value is passed,
#'   it will be repeated for all columns.
#' @param row_sizes Same as `col_sizes`, but for row heights.
#' @param gap Valid css sizing for gap to be left between each element in your
#'   grid. Defaults to `"1rem"`.
#' @param element_list List of elements with the `id`, `start_row`, `end_row`,
#'   `start_col`, and `end_col` format.
#' @param warn_about_overap Should overlapping elements in the grid be flagged?
#'   Only used in `element_list` argument is use to define layout
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
new_gridlayout <- function(layout_mat, col_sizes = "auto", row_sizes = "auto", gap, element_list, warn_about_overap = FALSE){
  have_element_list <- !missing(element_list)
  have_layout_mat <- !missing(layout_mat)

  elements <- if(have_element_list & have_layout_mat){
    stop("Both element list and layout matrix inputs supplied. Only use one")
  } else if(have_element_list){
    # TODO: Validate form of elements
    element_list
  } else if(have_layout_mat){
    elements_from_mat(layout_mat)
  } else {
    list()
  }

  empty_grid <- length(elements) == 0

  # Validate row and column sizes.
  sizes <- map_w_names(
    list(row = row_sizes, col = col_sizes),
    function(dir, sizes){
      start_vals <- extract_dbl(elements, "start_" %+% dir)
      end_vals <- extract_dbl(elements, "end_" %+% dir)
      auto_sizing <- identical(sizes, "auto")

      if(!is.atomic(sizes)) stop(dir, " sizes need to be an simple (atomic) character vector.")

      num_sections <- if(auto_sizing & empty_grid) {
        2
      } else if(empty_grid){
        length(sizes)
      } else {
        max(end_vals)
      }

      if(auto_sizing) sizes <- "1fr"

      if(length(sizes) == 1 & num_sections != 1){
        sizes <- rep_len(sizes, num_sections)
      }

      # Make sure that the elements sit within the defined grid
      if(max(end_vals) > num_sections){
        bad_elements <- extract_chr(element_list[end_vals > num_sections], "id")
        stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid rows")
      }

      sizes
    })

  # Default gap is a single rem unit. This is a relative unit that scales with
  # the base text size of a page. E.g. setting font-size: 16px on the body
  # element of a page means 1rem = 16px;
  gap <- validate_argument(gap, default = "1rem")

  structure(
    elements,
    class = "gridlayout",
    row_sizes = sizes$row,
    col_sizes = sizes$col,
    gap = gap
  )
}

#' @export
print.gridlayout <- function(layout){

  # Make text bold
  emph <- function(text) paste0("\033[1m",text,"\033[22m")

  cat(
    emph("gridlayout") %+% " object with " %+%
      emph(length(attr(layout, 'row_sizes'))) %+% " rows, " %+%
      emph(length(attr(layout, 'col_sizes'))) %+% " columns, and " %+%
      "gap size: " %+% emph(attr(layout, 'gap')),
    "\n",
    to_table(layout, sizes_decorator = emph)
  )
}

