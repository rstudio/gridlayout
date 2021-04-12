#' Setup gridlayout UI for shiny app
#'
#' @inheritParams use_gridlayout_shiny
#' @param ... Contents of each grid element. For instance the contents of the
#'   header (as defined in `layout`) would be set with `header = h2("App
#'   Title")`. Any arguments that don't match the names used in the layout
#'   definition are added to the page after the container. This can be used to
#'   do things like things to the `head` or `meta` sections of the page.
#' @param theme Optional argument to pass to `theme` argument of
#'   \code{\link[shiny]{fluidPage}}.
#'
#' @return A UI definition that can be passed to the
#'   \code{\link[shiny]{shinyUI}} function.
#' @export
#'
#' @seealso grid_container
#'
#' @examples
#' # Only run these examples in interactive R sessions
#' if (interactive()) {
#' requireNamespace("shiny", quietly = TRUE)
#' requireNamespace("bslib", quietly = TRUE)
#'
#' library(shiny)
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
#'     header = h2("Old Faithful Geyser Data"),
#'     sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
#'     plot = plotOutput("distPlot", height = "100%")
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
grid_page <- function(layout, ..., theme = NULL){

  requireNamespace("shiny", quietly = TRUE)
  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- coerce_to_layout(layout)
  layout_ids <- extract_chr(get_elements(layout), 'id')
  arg_sections <- list(...)
  arg_ids <- names(arg_sections)

  grid_element_args <- arg_sections[arg_ids %in% layout_ids]
  extra_args <- arg_sections[!(arg_ids %in% layout_ids)]

  container <- grid_container(
    id = "grid_page",
    layout = layout,
    elements = grid_element_args,
    container_height = "viewport"
  )

  shiny::fluidPage(
    theme = theme,
    container,
    #any extra args not matched to layout will get added after
    if(length(extra_args) != 0) extra_args
  )

}
