#' Setup gridlayout UI for shiny app
#'
#' @inheritParams use_gridlayout
#' @param ... Contents of each grid element. For instance the contents of the
#'   header (as defined in `layout`) would be set with `header = h2("App
#'   Title")`.
#' @param .verify_matches If `TRUE` then the function will make sure defined
#'   elements match those specified in `layout` declaration. For advanced
#'   use-cases such as utilizing css-grid's auto-fill, this can be disabled with
#'   `FALSE`.
#'
#' @return A UI definition that can be passed to the \code{\link{shiny::shinyUI}} function.
#' @export
#'
#' @examples
grid_page <- function(layout, ..., .verify_matches = TRUE){

  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }

  sections <- list(...)
  section_ids <- names(sections)

  # Check to make sure we match all the names in the layout to all the names in
  # the passed sections
  layout <- coerce_to_layout(layout)
  layout_elements <- get_elements(layout)
  element_ids <- sapply(layout_elements, function(x) x$id)

  if(.verify_matches & !setequal(element_ids, section_ids)){
    stop("Mismatch between the provided elements and the defined elements in layout definition. ",
         "If this was intentional set `.verify_matches = FALSE`")
  }

  shiny::fluidPage(
    use_gridlayout(layout_def = layout),
    Map(
      section_ids,
      sections,
      f = wrap_in_div
    )
  )
}

wrap_in_div <- function(id, contents){
  div(id = id, contents)
}
