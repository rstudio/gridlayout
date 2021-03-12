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
#' @seealso grid_panel
#'
#' @examples
#' # Only run these examples in interactive R sessions
#' if (interactive()) {
#'
#' my_layout <- "
#' |      |        |         |
#' |------|--------|---------|
#' |2rem  |200px   |1fr      |
#' |150px |header  |header   |
#' |1fr   |sidebar |distPlot |"
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = grid_page(
#'     layout = my_layout,
#'     theme = bslib::bs_theme(),
#'     h2(id = "header", "This is my header content"),
#'     grid_panel(
#'       id = "sidebar",
#'       sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
#'     ),
#'     plotOutput("distPlot", height = "100%")
#'   ),
#'   server = function(input, output) {
#'     output$distPlot <- renderPlot({
#'       x    <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = 'darkgray', border = 'white')
#'     })
#'   }
#' )
#'
#' }
grid_page <- function(layout, ..., theme, .verify_matches = TRUE){

  requireNamespace("shiny", quietly = TRUE)
  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }

  # Capture expressions passed just in case we need to point user to where
  # things went wrong
  user_exprs <- lapply(
    arg_list_exprs(...),
    deparse
  )

  # Get all the elements so we can make sure they are properly formed before
  # writing page
  arg_sections <- list(...)
  arg_ids <- extract_chr(arg_sections, 'attribs', 'id')


  element_missing_id <- arg_ids == "NULL"
  elements_wo_ids <- any(element_missing_id)
  # Remove the no-id arguments so "NULL" doesn't show up when we look for
  # mismatches
  arg_ids <- arg_ids[!element_missing_id]


  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- coerce_to_layout(layout)
  layout_ids <- extract(get_elements(layout), 'id')
  id_mismatches <- .verify_matches & !setequal(layout_ids, arg_ids)

  # Gather all error messages into one call because giving them together maybe
  # informative. E.g. someone forgot to pass an id and that element was meant
  # for a layout space that was unnamed.
  if(id_mismatches | elements_wo_ids){
    in_layout_not_args <- setdiff(layout_ids, arg_ids)
    in_args_not_layout <- setdiff(arg_ids, layout_ids)

    id_mismatch_err <- paste0(
      "\nMismatch between the provided elements and the defined elements in layout definition.\n",
      if(length(in_layout_not_args) > 0) {
        paste0(
          "In layout declaration but not passed to `grid_page`:\n",
          paste0("  - \"", in_layout_not_args, "\"", collapse = "\n"),
          "\n"
        )
      },
      if(length(in_args_not_layout) > 0) {
        paste0(
          "Passed to `grid_page` but not in layout declaration:\n",
          paste0("  - \"", in_args_not_layout, "\"", collapse = "\n"),
          "\n"
        )
      },
      "If this was intentional set `.verify_matches = FALSE` to override this check."
    )

    no_id_err <- paste(
      "\nThe following elements of the page lack an id:",
      paste("  -", user_exprs[element_missing_id], collapse = "\n") ,
      "Consider wrapping in `grid_panel(id = ...)`",
      sep = "\n"
    )

    stop(
      paste0(
        "Malformed call to grid_page():",
        if(id_mismatches) id_mismatch_err,
        if(elements_wo_ids) no_id_err
      ),
      call. = FALSE
    )
  }

  shiny::fluidPage(
    theme = if(!missing(theme)) theme,
    use_gridlayout(layout = layout, "body > .container-fluid", use_card_style = TRUE),
    ...
  )
}

#' Panel element for a grid layout
#'
#' @param id Id of element in grid. This should match one of the ids in layout declaration given to \code{\link{grid_page}}.
#'
#' @param ... Any children elements or arguments to be passed to containing \code{\link[shiny]{div}}.
#'
#' @seealso grid_page
#' @export
#'
#' @examples
#' # Only run these examples in interactive R sessions
#' if (interactive()) {
#'
#' my_layout <- "
#' |      |        |         |
#' |------|--------|---------|
#' |2rem  |200px   |1fr      |
#' |150px |header  |header   |
#' |1fr   |sidebar |distPlot |"
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = grid_page(
#'     layout = my_layout,
#'     theme = bslib::bs_theme(),
#'     h2(id = "header", "This is my header content"),
#'     grid_panel(
#'       id = "sidebar",
#'       sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
#'     ),
#'     plotOutput("distPlot", height = "100%")
#'   ),
#'   server = function(input, output) {
#'     output$distPlot <- renderPlot({
#'       x    <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = 'darkgray', border = 'white')
#'     })
#'   }
#' )
#'
#' }
grid_panel <- function(id, ...){

  shiny::div(id = id, ...)
}
