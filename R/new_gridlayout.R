#' Construct a gridlayout object from basic parts
#'
#' @param layout_def Either a list of elements with the `id`, `start_row`, `end_row`,
#'   `start_col`, and `end_col` format, or a markdown table defining a layout.
#' @param col_sizes A character vector of valid css sizes for the width of each
#'   column in your grid as given by `layout_mat`. If a single value is passed,
#'   it will be repeated for all columns.
#' @param row_sizes Same as `col_sizes`, but for row heights.
#' @param gap Valid css sizing for gap to be left between each element in your
#'   grid. Defaults to `"1rem"`. This is a relative unit that scales with
#'   the base text size of a page. E.g. setting font-size: 16px on the body
#'   element of a page means 1rem = 16px;
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
#'   elements_list,
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr", "1fr")
#' )
#'
#' # Can also use a matrix for more visually intuitive laying out
#' new_gridlayout(
#'   layout_def = "
#'       | header | header |
#'       | plota  | plotb  |",
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr"),
#'   gap = "2rem"
#' )
#'
new_gridlayout <- function(
  layout_def = list(),
  col_sizes = NULL,
  row_sizes = NULL,
  gap = NULL,
  alternate_layouts = NULL
){
  elements <- list()
  # Figure out what type of layout definition we were passed
  if (is_char_string(layout_def)) {
    # MD table representation
    layout_info <- parse_md_table_layout(
      layout_def,
      col_sizes = col_sizes,
      row_sizes = row_sizes,
      gap = gap
    )
    elements <- layout_info$elements
    col_sizes <-  layout_info$col_sizes
    row_sizes <- layout_info$row_sizes
    gap <-  layout_info$gap

  } else if (is.list(layout_def)) {
    elements <- layout_def
  } else {
    stop(
      "Unknown layout definition type. ",
      "Layouts can be defined using markdown table syntax or element lists. ",
      "See ?gridlayout::new_gridlayout for more info"
    )
  }

  if (is.null(gap)) gap <- "1rem"

  # Validate row and column sizes.
  sizes <- create_row_and_col_size_vecs(
    row_sizes = row_sizes,
    col_sizes = col_sizes,
    elements = elements
  )

  layout <- structure(
    elements,
    class = "gridlayout",
    row_sizes = sizes$row,
    col_sizes = sizes$col,
    gap = gap
  )

  if (notNull(alternate_layouts)) {
    for (alternate in alternate_layouts) {
      layout <- add_alternate_layout(
        layout,
        alternate_layout = alternate$layout,
        lower_bound_width = alternate$lower_bound_width,
        upper_bound_width = alternate$upper_bound_width,
        container_height = alternate$container_height
      )
    }
  }

  layout
}



create_row_and_col_size_vecs <- function(row_sizes, col_sizes, elements) {
  empty_grid <- length(elements) == 0

  # Validate row and column sizes.
  sizes <- map_w_names(
    list(row = row_sizes, col = col_sizes),
    function(dir, sizes){
      start_vals <- extract_dbl(elements, "start_" %+% dir)
      end_vals <- extract_dbl(elements, "end_" %+% dir)
      auto_sizing <- is.null(sizes)

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
      if (!empty_grid) {

        if (max(end_vals) > num_sections) {
          bad_elements <- extract_chr(element_list[end_vals > num_sections], "id")
          stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid rows")
        }

        if (max(end_vals) < length(sizes)) {
          stop("The provided ", dir, " sizes need to match the number of ", dir, "s in your layout")
        }
      }

      sizes
    })
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


layouts_have_same_elements <- function(layout_a, layout_b){
  a_element_ids <- extract_chr(layout_a, "id")
  b_element_ids <- extract_chr(layout_b, "id")

  if (setequal(a_element_ids, b_element_ids)) return(TRUE)

  mismatched <- c(
    setdiff(a_element_ids, b_element_ids),
    setdiff(b_element_ids, a_element_ids)
  )
  stop(
    "Layouts have mismatched elements: ",
    paste(mismatched, collapse = ", ")
  )
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

  alternate_layouts <- attr(x, "alternates")
  if (notNull(alternate_layouts)) {
    cat("\n\n", emph("Alternative layouts:"), sep = "")
    for (alternate in alternate_layouts) {
      bounds <- alternate$bounds
      cat("\n\nWhen width of page", emph(print_size_range(bounds)), "\n")

      print(alternate$layout)
    }
  }
}

print_size_range <- function(bounds) {

  if (is.null(bounds$upper)) {
    return(paste("<", bounds$lower))
  } else if (is.null(bounds$lower)) {
    return(paste(">", bounds$upper))
  } else {
    return(paste("between", bounds$lower, "and", bounds$upper))
  }
}


