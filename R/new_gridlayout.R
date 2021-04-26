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
#'
#' @return Object of class `"gridlayout"`
#' @export
#'
#' @examples
#'
#' # Assemble list of elements along with their positions
#' elements_list <- list(
#'   list(id = "header", start_row = 1, end_row = 1,
#'        start_col = 1, end_col = 2),
#'   list(id = "plot",   start_row = 2, end_row = 2,
#'        start_col = 1, end_col = 1),
#'   list(id = "table",  start_row = 2, end_row = 2,
#'        start_col = 2, end_col = 2),
#'   list(id = "footer", start_row = 3, end_row = 3,
#'        start_col = 1, end_col = 2)
#' )
#'
#' new_gridlayout(
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr", "1fr"),
#'   element_list = elements_list
#' )
#'
#' # Can also use a matrix for more visually intuitive laying out
#' elements_mat <- matrix(c(
#'   "header", "header",
#'   "plot",   "table",
#'   "footer", "footer"),
#'   ncol = 2, byrow = TRUE
#' )
#'
#' new_gridlayout(
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr", "1fr"),
#'   layout_mat = elements_mat
#' )
#'
new_gridlayout <- function(layout_mat, col_sizes = "auto", row_sizes = "auto", gap, element_list){
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
      if(!empty_grid && (max(end_vals) > num_sections)){
        bad_elements <- extract_chr(element_list[end_vals > num_sections], "id")
        stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid rows")
      }

      if(have_layout_mat){
        mat_dim_size <- if(dir == "row") nrow(layout_mat) else ncol(layout_mat)
        if(mat_dim_size != length(sizes)){
          stop("The provided ", dir,
               " sizes need to match the number of ", dir,
               "s in your layout matrix")
        }

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


layouts_are_equal <- function(layout_a, layout_b){
  identical(to_md(layout_a), to_md(layout_b))
}

#' @export
print.gridlayout <- function(x, ...){

  # Make text bold
  emph <- if(is_installed("crayon")) crayon::bold else as.character

  cat(
    emph("gridlayout") %+% " object with " %+%
      emph(length(attr(x, 'row_sizes'))) %+% " rows, " %+%
      emph(length(attr(x, 'col_sizes'))) %+% " columns, and " %+%
      "gap size: " %+% emph(attr(x, 'gap')),
    "\n",
    to_table(x, sizes_decorator = emph)
  )
}

