#' Grid panel with nested gridlayout
#'
#' Creates a panel for a layout with its own internal gridlayout
#'
#' @inheritParams grid_panel
#' @inheritParams grid_container
#'
#' @seealso [grid_panel], [grid_container]
#'
#' @return A `grid_panel` with a nested layout within it
#' @export
#'
#' @examples
#' if (interactive()) {
#' library(gridlayout)
#' library(shiny)
#'
#' # A centered text panel
#' text_panel_c <- function(...) text_panel(..., h_align="center")
#'
#' my_layout <- "
#' |A |B |
#' |C |D |"
#' shinyApp(
#'   ui = grid_page(
#'     layout = my_layout,
#'     text_panel_c("A","A"),
#'     text_panel_c("B","B"),
#'     text_panel_c("C","C"),
#'     nested_grid_panel(
#'       "D",
#'       layout = my_layout,
#'       text_panel_c("A","A2"),
#'       text_panel_c("B","B2"),
#'       text_panel_c("C","C2"),
#'       text_panel_c("D","D2")
#'     )
#'   ),
#'   server = function(input, output) {}
#' )
#' }
nested_grid_panel <- function(
    area,
    layout,
    ...,
    id = NULL,
    title = NULL,
    use_bslib_card_styles = FALSE,
    flag_mismatches = TRUE
){

  grid_panel(
    area = area,
    title = title,
    grid_container(
      layout = new_gridlayout(layout, container_height = "100%"),
      use_bslib_card_styles = use_bslib_card_styles,
      flag_mismatches = flag_mismatches,
      id = id,
      ...
    )
  )
}

