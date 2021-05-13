#' Build gridlayout container for specified layout
#'
#' Builds a gridlayout within a div of specified id. Not typically called
#' directly but can be used to create nested grids
#'
#' @param id ID unique to this container (note that the HTML will be prefixed
#'   with `grid-` to avoid namespace clashes)
#' @param use_bslib_card_styles Should the elements within the grid be given the
#'   current bootstrap theme's card styling? Note that this setting will
#'   override card styling for elements built with [grid_panel].
#'   This is so you don't have to manually change styles for each card. If you
#'   want a mixture of card styles, then you'll need to leave this as `FALSE`
#'   and set styles manually on each panel.
#' @inheritParams use_gridlayout_shiny
#' @inheritParams to_css
#' @inheritParams grid_panel
#' @param elements Named list of the UI definitions that will be used to fill
#'   all cells. Names must match those provided in `layout`.
#' @param flag_mismatches Should a mismatch between supplied `elements` ui
#'   definitions and layout trigger a warning? In advanced cases you may want to
#'   dynamically set your layout and sometimes omit panels.
#'
#' @return A taglist with grid elements wrapped inside a container div of class
#'   `id`.
#'
#' @seealso [grid_page], [grid_panel]
#' @export
#'
#' @examples
#'
#' if (FALSE) {
#' library(gridlayout)
#' library(shiny)
#' requireNamespace("bslib", quietly = TRUE)
#' my_layout <- "
#' |      |        |       |
#' |------|--------|-------|
#' |2rem  |200px   |1fr    |
#' |150px |header  |header |
#' |1fr   |sidebar |plot   |"
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = fluidPage(
#'     grid_container(
#'       id = "main_grid",
#'       layout = my_layout,
#'       elements = list(
#'         header = title_panel("This is my header content"),
#'         sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
#'         plot = plotOutput("distPlot", height = "100%")
#'       )
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
#'
grid_container <- function(
  id = "grid-container",
  layout,
  elements,
  use_bslib_card_styles = FALSE,
  flag_mismatches = TRUE
){

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- as_gridlayout(layout)
  layout_ids <- get_element_ids(layout)
  element_ids <- names(elements)

  if(!setequal(layout_ids, element_ids)){
    in_layout_not_elements <- setdiff(layout_ids, element_ids)
    in_elements_not_layout <- setdiff(element_ids, layout_ids)

    if (flag_mismatches) {
      id_mismatch_err <- paste0(
        "\nMismatch between the provided elements and the defined elements in layout definition.\n",
        if(length(in_layout_not_elements) > 0) {
          paste0(
            "In layout declaration but not passed to `elements` argument\n",
            paste0("  - \"", in_layout_not_elements, "\"", collapse = "\n"),
            "\n"
          )
        },
        if(length(in_elements_not_layout) > 0) {
          paste0(
            "Passed to `elements` argument but not in layout declaration:\n",
            paste0("  - \"", in_elements_not_layout, "\"", collapse = "\n"),
            "\n"
          )
        }
      )

      stop(id_mismatch_err, call. = FALSE)
    } else {

      # Remove ui elements that don't match layout. We leave layout elements
      # that dont match UI in case the user is somehow adding them later via
      # elements made outside of the normal UI function.
      elements[[in_elements_not_layout]] <- NULL
    }
  }


  # Prefix all grid-element ids with the containers id to avoid namespace
  # conflicts if multiple grids are defined with the same element ids.
  # The double underscore prefix is using the BEM style for css selectors
  id_prefix <- paste0(id, "__")

  grid_elements <- map_w_names(
    elements,
    function(el_id, el){
      grid_panel(
        panel_id = paste0(id_prefix, el_id),
        el,
        use_bslib_card_styles = use_bslib_card_styles
      )
    }
  )

  # Build container div, append the styles to head and then return
  shiny::tagList(
    use_gridlayout_shiny(
      layout,
      container = id,
      selector_prefix = paste0("#", id_prefix)
    ),
    shiny::div(
      id = id,
      class = "grid-container",
      shiny::tagList(grid_elements)
    )
  )
}





