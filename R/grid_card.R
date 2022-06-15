#' Grid Card
#'
#' A wrapper around [bslib::card] to enable placing on a grid layout using the
#' area parameter.
#'
#' @inheritParams grid_element
#' @inheritDotParams bslib::card
#'
#' @seealso [bslib::card()]
#' @return
#' @export
grid_card <- function(area, ...){
  grid_place(area = area, bslib::card(...))
}


#' Grid Plot Output
#'
#' A simple plot-on-the-grid function. For more control - such as adding headers
#' or footers - you should use [`grid_card()`] and [`bslib::card_plot_output()`]
#' directly.
#'
#'
#' @inheritParams grid_panel
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#' @inheritDotParams bslib::card_plot_output
#'
#' @return A grid panel filled with plot output
#' @export
#'
#'
grid_plot <- function(
    area,
    outputId = area,
    ...
) {
  grid_card(
    area = area,
    card_plot_output(outputId = outputId, ...)
  )
}


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
#' grid_panel_text_c <- function(...) grid_panel_text(..., h_align="center")
#'
#' my_layout <- "
#' |A |B |
#' |C |D |"
#' shinyApp(
#'   ui = grid_page(
#'     layout = my_layout,
#'     grid_panel_text_c("A","A"),
#'     grid_panel_text_c("B","B"),
#'     grid_panel_text_c("C","C"),
#'     grid_panel_nested(
#'       "D",
#'       layout = my_layout,
#'       grid_panel_text_c("A","A2"),
#'       grid_panel_text_c("B","B2"),
#'       grid_panel_text_c("C","C2"),
#'       grid_panel_text_c("D","D2")
#'     )
#'   ),
#'   server = function(input, output) {}
#' )
#' }
grid_nested <- function(
    area,
    layout,
    ...,
    id = NULL,
    title = NULL,
    use_bslib_card_styles = FALSE,
    flag_mismatches = TRUE
){

  grid_card(
    area = area,
    if (!is.null(title)) bslib::card_header(title),
    bslib::card_body(
      grid_container(
        layout = new_gridlayout(layout, container_height = "100%"),
        use_bslib_card_styles = use_bslib_card_styles,
        flag_mismatches = flag_mismatches,
        id = id,
        ...
      ),
      stretch = TRUE
    )
  )

}




