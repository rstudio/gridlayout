#' Setup gridlayout UI for shiny app
#'
#' This is the typical way to use `gridlayout` in your `Shiny` app. `grid_page`
#' will make up the entire `ui` declaration of the app. Under the hood it uses
#' [shiny::fluidPage()] and [grid_container]. Elements are placed in the layout
#' by wrapping in a `grid_panel()` with the `area` set to the area in the layout
#' the element should be placed in.
#'
#' @inheritParams grid_container
#' @param theme Optional argument to pass to `theme` argument of
#'   \code{\link[shiny]{fluidPage}}.
#' @param flag_mismatches Should mismatches between the named arguments and
#'   layout elements trigger an error?
#' @param just_container Should the app layout be given as a standalone output
#'   (like calling [`grid_container()`])? Defaults to [`shiny::isRunning()`] so
#'   if app is produced in a [`shiny::renderUI()`] type call it knows not to try
#'   and recreate the whole page. Note that extra arguments and themes will be
#'   discarded when this is set to `TRUE`.
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
#' shinyApp(
#'   ui = grid_page(
#'     layout = "
#'       |2rem |200px   |1fr    |
#'       |90px |header  |header |
#'       |1fr  |sidebar |plot   |",
#'     grid_panel(
#'       "header",
#'       shiny::h2("My App Header")
#'     ),
#'     grid_panel(
#'       "sidebar",
#'       sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width="100%")
#'     ),
#'     grid_panel(
#'       "plot",
#'       plotOutput("distPlot", height = "100%")
#'     )
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
grid_page <- function(
    layout,
    ...,
    row_sizes = NULL,
    col_sizes = NULL,
    gap_size = NULL,
    use_bslib_card_styles = FALSE,
    theme = NULL,
    flag_mismatches = TRUE,
    just_container = shiny::isRunning()
  ){

  requireNamespace("shiny", quietly = TRUE)

  container <- grid_container(
    id = "gridlayout-grid-page-container",
    layout = layout,
    ...,
    use_bslib_card_styles = use_bslib_card_styles,
    flag_mismatches = flag_mismatches,
    row_sizes = row_sizes,
    col_sizes = col_sizes,
    gap_size = gap_size
  )

  if (get_info(as_gridlayout(layout), "container_height") != "viewport") {
    warning("Container height for layout is not set at default of viewport.",
            "This is likely a mistake for grid_page()")
  }

  if (just_container) return(container)

  shiny::fluidPage(
    theme = theme,
    container
  )

}
