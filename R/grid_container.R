#' Build gridlayout container for specified layout
#'
#' Builds a gridlayout within a div of specified id. Not typically called
#' directly but can be used to create nested grids
#'
#' @param id ID unique to this container (note that the HTML will be prefixed
#'   with `grid-` to avoid namespace clashes)
#' @param layout Either a markdown table representation (see
#'   \code{\link{md_to_gridlayout}}) or a `gridlayout` object defining the
#'   desired layout for your Shiny app.
#' @param use_bslib_card_styles Should the elements within the grid be given the
#'   current bootstrap theme's card styling? Note that this setting will
#'   override card styling for elements built with [grid_panel]. This is so you
#'   don't have to manually change styles for each card. If you want a mixture
#'   of card styles, then you'll need to leave this as `FALSE` and set styles
#'   manually on each panel.
#' @param ... `grid_panel()` (or similar) arguments that will fill the grid
#'   layout. Note the areas should match the those provided in `layout`.
#' @param flag_mismatches Should a mismatch between supplied `elements` ui
#'   definitions and layout trigger a warning? In advanced cases you may want to
#'   dynamically set your layout and sometimes omit panels.
#' @param check_for_nested_grids Should nested grids be detected and properly
#'   namespaced? It will only be set to false when you know that the container
#'   is itself a nested gridlayout. This setting should only be touched in
#'   advanced layout scenarios and typically you will want to use
#'   [nested_grid_panel()] instead.
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
  ...,
  use_bslib_card_styles = FALSE,
  flag_mismatches = TRUE,
  check_for_nested_grids = TRUE
) {

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections

  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }

  # Make sure we're working with a layout
  layout <- as_gridlayout(layout)

  layout_ids <- get_element_ids(layout)

  # Build container div, append the styles to head and then return
  content <- shiny::tagList(
    gridlayout_css_dep(),
    shiny::div(
      id = id,
      class = "grid-container",
      ...,
      use_gridlayout_shiny(
        layout,
        container = id,
        selector_prefix = paste0("#", id, "__")
      )
    )
  )

  if (check_for_nested_grids) {
    # Go through content to check if we have any nested grids. If we do we want
    # to update their id structures to avoid namespace conflicts for the CSS.
    # This means we get deterministic ids without user specification.
    content <- htmltools::tagQuery(content)$
      find(".grid-container")$
      each(namespace_nested_grid_containers)$
      allTags()
  }

  content
}

# Just to avoid the long winded namespaced function name
get_attribs <- htmltools::tagGetAttribute

namespace_nested_grid_containers <- function(container_tag, i = "ignored") {
  # Look for the boolean attribute we place on a grid_container if the
  # user didn't specify an id. This means we are allowed to customize it
  # Pull off the existing temporary id so we can use it to find-and-replace with
  # new id
  existing_id <- get_attribs(container_tag, "id")

  if (!identical(existing_id, NESTED_GRID_PLACEHOLDER_ID)) {
    # The user has specified the id of their nested grid container so we
    # shouldn't overwrite it.
    return(container_tag)
  }

  # Build a tagQuery object around our container and get rid of the old id
  # related attributes in the process
  container_tq <- htmltools::tagQuery(container_tag)$
    removeAttrs("id")

  # Get ID of the grid_panel that encloses this grid_container() The $closest
  # method will stop at the very first match instead of continuing. This means
  # we won't waste effort finding all the parent containers if they exist.
  wrapping_id <- get_attribs(container_tq$closest('.grid_panel')$selectedTags()[[1]], "id")

  # Build new suffixed id for the container based on that wrapping panel id
  nested_grid_id <- paste0(wrapping_id, "__grid_container")

  ## Update ids of the elements themselves
  # Start with the main container
  container_tq$addAttrs(id = nested_grid_id)

  # Then update the children ids with proper prefix
  container_tq$
    children()$
    each(function(el, i) {
      id <- get_attribs(el,"id")
      if (notNull(id)) {
        htmltools::tagQuery(el)$
          removeAttrs("id")$
          addAttrs(id = str_replace_all(
            text = id,
            pattern = existing_id,
            replacement = nested_grid_id,
            fixed = TRUE
          ))
      }
      el
    })

  # Update the css text to swap in our new prefixed-id. For double nesting there
  # will be multiple stylesheets under any level but the lowest. Make sure we
  # only target the one closest to the current container by selecting
  # $children() first
  container_tq$
    children('head')$
    find('style')$
    each(function(style_tag, i){
      style_tag$children[[1]] <- str_replace_all(
        style_tag$children[[1]],
        pattern = paste0("#", existing_id),
        replacement = paste0("#", nested_grid_id),
        fixed = TRUE
      )
      style_tag
    })

  container_tq$allTags()
}
