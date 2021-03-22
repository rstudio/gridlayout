#' Build gridlayout container for specified layout
#'
#' Builds a gridlayout within a div of specified id. Not typically called
#' directly but can be used to create nested grids
#'
#' @param id ID unique to this container (note that the HTML will be prefixed with
#'   `grid-` to avoid namespace clashes)
#' @inheritParams use_gridlayout_shiny
#' @inheritParams to_css
#' @param elements Named list of the UI definitions that will be used to fill
#'   all cells. Names must match those provided in `layout`.
#'
#' @return A taglist with grid elements wrapped inside a container div of class `id`.
#' @export
#'
#' @examples
#'
#' if (interactive()) {
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
#'     theme = bslib::bs_theme(),
#'     grid_container(
#'       id = "main_grid",
#'       layout = my_layout,
#'       elements = list(
#'         header = h2(id = "header", "This is my header content"),
#'         sidebar = sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30),
#'         plot = plotOutput("distPlot", height = "100%")
#'       ),
#'       container_height = "800px"
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
grid_container <- function(id = "grid-container", layout, elements, container_height = "100%"){

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- coerce_to_layout(layout)
  layout_ids <- extract_chr(get_elements(layout), 'id')
  element_ids <- names(elements)

  if(!setequal(layout_ids, element_ids)){
    in_layout_not_elements <- setdiff(layout_ids, element_ids)
    in_elements_not_layout <- setdiff(element_ids, layout_ids)

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
  }

  # Prefix all grid-element ids with the containers id to avoid namespace
  # conflicts if multiple grids are defined with the same element ids.
  # The double underscore prefix is using the BEM style for css selectors
  id_prefix <- paste0(id, "__")

  grid_elements <- map_w_names(
    elements,
    function(el_id, el){
      prefixed_id <- paste0(id_prefix, el_id)
      el_class <- el$attribs$class
      if(!is.null(el_class) && str_detect("grid_panel", el_class)){
        # If element is already wrapped in a grid_panel, we just need to update
        # the id
        el$attribs$id <- prefixed_id
        el
      } else {
        grid_panel(id = prefixed_id, el)
      }
    }
  )

  # Build container div, append the styles to head and then return
  shiny::tagList(
    use_gridlayout_shiny(
      layout,
      container = id,
      selector_prefix = paste0("#", id_prefix),
      container_height = container_height),
    shiny::div(id = id, shiny::tagList(grid_elements))
  )
}


