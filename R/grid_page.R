#' Setup gridlayout UI for shiny app
#'
#' This is the typical way to use `gridlayout` in your `Shiny` app. `grid_page`
#' will make up the entire `ui` declaration of the app. Under the hood it uses
#' [shiny::fluidPage()] and [grid_container]. Elements of the layout are
#' declared as named parameters which will then be matched to the provided
#' `layout`. For instance the contents of the header (as defined in `layout`)
#' would be set with `header = title_panel("App Title")`.
#'
#' @inheritParams use_gridlayout_shiny
#' @inheritParams grid_container
#' @param ... Contents of each grid element.  Every grid element argument must
#'   be named. If a named argument doesn't match the layout's declared elements
#'   than an error will be thrown. This behavior can be overridden using the
#'   `flag_mismatches` argument. Any unnamed arguments are added to the page
#'   after the container. This can be used to do things like things to the
#'   `head` or `meta` sections of the page.
#' @param theme Optional argument to pass to `theme` argument of
#'   \code{\link[shiny]{fluidPage}}.
#' @param flag_mismatches Should mismatches between the named arguments and
#'   layout elements trigger an error?
#'
#' @return A UI definition that can be passed to the
#'   \code{\link[shiny]{shinyUI}} function.
#' @export
#'
#' @seealso [grid_container]
#'
#' @examples
#' # Only run these examples in interactive R sessions
#' if (FALSE) {
#' requireNamespace("shiny", quietly = TRUE)
#' requireNamespace("bslib", quietly = TRUE)
#'
#' library(shiny)
#' my_layout <- "
#' |      |        |       |
#' |------|--------|-------|
#' |2rem  |200px   |1fr    |
#' |150px |header  |header |
#' |1fr   |sidebar |plot   |"
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = grid_page(
#'     layout = my_layout,
#'     theme = bslib::bs_theme(),
#'     header = title_panel("Old Faithful Geyser Data"),
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
#' }
grid_page <- function(layout, ..., use_bslib_card_styles = FALSE, theme = NULL, flag_mismatches = TRUE){

  requireNamespace("shiny", quietly = TRUE)
  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- coerce_to_layout(layout)
  layout_ids <- extract_chr(get_elements(layout), 'id')

  # Named arguments represent grid panels elements. Unnamed ones are assumed to
  # be extra tags that are appended after grid container.
  arg_sections <- list(...)
  arg_ids <- names(arg_sections)
  grid_elements <- arg_sections[arg_ids != ""]

  if (get_info(layout, "container_height") != "viewport") {
    warning("Container height for layout is not set at default of viewport.",
            "This is likely a mistake for grid_page()")
  }

  container <- grid_container(
    id = "grid_page",
    layout = layout,
    elements = grid_elements,
    use_bslib_card_styles = use_bslib_card_styles,
    flag_mismatches = flag_mismatches
  )

  shiny::fluidPage(
    theme = theme,
    container,
    #any extra args not matched to layout will get added after
    arg_sections[arg_ids == ""]
  )

}
