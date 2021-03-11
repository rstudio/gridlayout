#' Setup gridlayout UI for shiny app
#'
#' @inheritParams use_gridlayout
#' @param ... Contents of each grid element. For instance the contents of the
#'   header (as defined in `layout`) would be set with `header = h2("App
#'   Title")`.
#' @param theme Optional argument to pass to `theme` argument of \code{\link[shiny]{fluidPage}}.
#' @param .verify_matches If `TRUE` then the function will make sure defined
#'   elements match those specified in `layout` declaration. For advanced
#'   use-cases such as utilizing css-grid's auto-fill, this can be disabled with
#'   `FALSE`.
#'
#' @return A UI definition that can be passed to the \code{\link[shiny]{shinyUI}} function.
#' @export
#'
#' @examples
grid_page <- function(layout, theme, ..., .verify_matches = TRUE){

  requireNamespace("shiny", quietly = TRUE)
  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }

  arg_sections <- list(...)
  arg_ids <- names(arg_sections)

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- coerce_to_layout(layout)
  layout_elements <- get_elements(layout)
  layout_ids <- sapply(layout_elements, function(x) x$id)

  if(.verify_matches & !setequal(layout_ids, arg_ids)){

    in_layout_not_args <- setdiff(layout_ids, arg_ids)
    in_args_not_layout <- setdiff(arg_ids, layout_ids)

    stop("Mismatch between the provided elements and the defined elements in layout definition. ",
         if(length(in_layout_not_args) > 0) {
           "\nThe following element(s) were declared in the layout but not provided to `grid_page`: " %+%
             paste(in_layout_not_args, collapse = ",") %+% "."
         },
         if(length(in_args_not_layout) > 0) {
           "\nThe following element(s) were passed to `grid_page` but not declared in the layout: " %+%
             paste(in_args_not_layout, collapse = ",") %+% "."
         },
         "\nIf this was intentional set `.verify_matches = FALSE`")
  }

  shiny::fluidPage(
    theme = if(!missing(theme)) theme,
    use_gridlayout(layout = layout, "body > .container-fluid", use_card_style = TRUE),
    Map(
      arg_ids,
      arg_sections,
      f = wrap_in_div
    )
  )
}

wrap_in_div <- function(id, contents){
  shiny::div(id = id, contents)
}
