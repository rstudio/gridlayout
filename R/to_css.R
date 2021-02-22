#' Convert grid layout to css string
#'
#' @param layout Object of class `"gridlayout"`.
#' @param container_query Query used by css to find the container for your grid.
#'   Defaults to `"body"` for whole page grids
#'
#' @return Character string of css used to setup grid layout and place elements
#'   (referenced by id) into correct locations
#'
#' @examples
#'
#' grid_obj <- md_to_gridlayout(
#'   layout_table = "
#'     |      |120px   |1fr    |1fr    |
#'     |:-----|:-------|:------|:------|
#'     |100px |header  |header |header |
#'     |1fr   |sidebar |plot_a |plot_c |
#'     |1fr   |sidebar |plot_b |plot_b |"
#' )
#'
#' to_css(grid_obj)
#'
#' @export
to_css <- function(layout, container_query = "body") {
  UseMethod("to_css")
}

#' @export
to_css.default <- function(layout, container_query = "body"){
  cat("to_css generic")
}

#' @export
to_css.gridlayout <- function(layout, container_query = "body"){
  # ...
  collapse_w_space <- function(vec) { paste(vec, collapse = " ") }

  template_areas <- ""
  for(row_i in 1:nrow(layout)){
    current_row <- collapse_w_space(layout[row_i,])
    template_areas <- paste0(template_areas, "\n    \"", current_row, "\"")
  }

  # Build the mapping for each element to its grid area. The simple "." denotes
  # an empty space so we need to filter that out
  all_elements <- unique(c(layout))
  element_grid_areas <- paste(
    sapply(
      all_elements[all_elements != "."],
      function(id){
        glue::glue("#{id} {{ grid-area: {id}; }}")
      }
    ),
    collapse = "\n"
  )

  as.character(glue::glue("
{container_query} {{
  grid-template-rows: {collapse_w_space(attr(layout, 'row_sizes'))};
  grid-template-columns: {collapse_w_space(attr(layout, 'col_sizes'))};
  grid-template-gap: {attr(layout, 'gap')};
  padding: {attr(layout, 'gap')};
  grid-template-areas:{template_areas};
}}

{container_query} > * {{
  box-sizing: border-box;
}}

{element_grid_areas}
"))
}
