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
#'   override card styling for elements built with [grid_panel].
#'   This is so you don't have to manually change styles for each card. If you
#'   want a mixture of card styles, then you'll need to leave this as `FALSE`
#'   and set styles manually on each panel.
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
grid_container <- function(id = "grid-container",
                           layout,
                           elements,
                           use_bslib_card_styles = FALSE,
                           flag_mismatches = TRUE) {
  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections
  layout <- as_gridlayout(layout)
  layout_ids <- get_element_ids(layout)
  element_ids <- names(elements)

  if (!setequal(layout_ids, element_ids)) {
    in_layout_not_elements <- setdiff(layout_ids, element_ids)
    in_elements_not_layout <- setdiff(element_ids, layout_ids)

    if (flag_mismatches) {
      id_mismatch_err <- paste0(
        "\nMismatch between the provided elements and the defined elements in layout definition.\n",
        if (length(in_layout_not_elements) > 0) {
          paste0(
            "In layout declaration but not passed to `elements` argument\n",
            paste0("  - \"", in_layout_not_elements, "\"", collapse = "\n"),
            "\n"
          )
        },
        if (length(in_elements_not_layout) > 0) {
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
    function(el_id, el) {
      grid_panel(
        panel_id = paste0(id_prefix, el_id),
        el,
        use_bslib_card_styles = use_bslib_card_styles
      )
    }
  )

  # Build container div, append the styles to head and then return
  content <- shiny::tagList(
    shiny::div(
      id = id,
      class = "grid-container",
      shiny::tagList(grid_elements),
      use_gridlayout_shiny(
        layout,
        container = id,
        selector_prefix = paste0("#", id_prefix)
      )
    )
  )

  # Go through content to check if we have any nested grids. If we do we want
  # to update their id structures to avoid namespace conflicts for the CSS.
  # This means we get deterministic ids without user specification.
  content <- htmltools::tagQuery(content)$
    find(".grid-container")$
    each(namespace_nested_grid_containers)$
    allTags()

  content
}

namespace_nested_grid_containers <- function(container_tag, i = "ignored") {
  # Look for the boolean attribute we place on a grid_container if the
  # user didn't specify an id. This means we are allowed to customize it
  if (is.null(container_tag$attribs$placeholder_id)) {
    # The user has specified the id of their nested grid container so we
    # shouldn't overwrite it.
    return(container_tag)
  }

  # Pull off the existing temporary id so we can use it to find-and-replace with
  # new id
  existing_id <- container_tag$attribs$id

  # Build a tagQuery object around our container and get rid of the old id
  # related attributes in the process
  container_tq <- htmltools::tagQuery(container_tag)$
    removeAttrs(c("placeholder_id", "id"))

  # Get ID of the grid_panel that encloses this grid_container()
  wrapping_id <- container_tq$parent()$parent()$selectedTags()[[1]]$attribs$id

  # Build new suffixed id for the container based on that wrapping panel id
  nested_grid_id <- paste0(wrapping_id, "__grid_container")

  ## Update ids of the elements themselves
  # Start with the main container
  container_tq$addAttrs(id = nested_grid_id)

  # Then update the children ids with proper prefix
  container_tq$
    children()$
    each(function(el, i) {
      if (notNull(el$attribs$id)) {
        el$attribs$id <- str_replace_all(
          text = el$attribs$id,
          pattern = existing_id,
          replacement = nested_grid_id,
          fixed = TRUE
        )
      }
      el
    })

  # Update the css text to swap in our new prefixed-id
  container_tq$
    find('style')$
    each(function(style_tag, i){
      style_tag$children[[1]] <- str_replace_all(
        style_tag$children[[1]],
        pattern = paste0("#", existing_id),
        replacement = paste0("#", nested_grid_id)
      )
      style_tag
    })

  container_tq$allTags()
}
