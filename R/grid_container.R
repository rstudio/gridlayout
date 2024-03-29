#' `gridlayout` container for use within other elements
#'
#' Builds a gridlayout within a div of specified id. Not typically called
#' directly but can be used to create nested grids
#'
#' @param id ID unique to this container (note that the HTML will be prefixed
#'   with `grid-` to avoid namespace clashes)
#' @inheritParams new_gridlayout
#' @param layout Either a markdown table representation (see
#'   \code{\link{md_to_gridlayout}}) or a `gridlayout` object defining the
#'   desired layout for your Shiny app.
#' @param ... `grid_card()` (or similar) arguments that will fill the grid
#'   layout. Note the areas should match the those provided in `layout`.
#' @param flag_mismatches Should a mismatch between supplied `elements` ui
#'   definitions and layout trigger a warning? In advanced cases you may want to
#'   dynamically set your layout and sometimes omit panels.
#'
#' @return A taglist with grid elements wrapped inside a container div of class
#'   `id`.
#'
#' @seealso [grid_page()] for using a gridlayout to entirely define the page.
#'   [grid_nested()] for placing a grid container within another gridlayout.
#'   [grid_card()] for placing content inside your layout. See
#'   `vignette("defining-a-layout", package = "gridlayout")` for more info on
#'   defining your layout.
#' @export
#'
#' @examples
#'
#' if (FALSE) {
#' library(gridlayout)
#' library(shiny)
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = fluidPage(
#'     grid_container(
#'       layout = "
#'         |2rem  |200px   |1fr    |
#'         |85px  |header  |header |
#'         |1fr   |sidebar |plot   |",
#'       grid_card_text("header", "Geysers!"),
#'       grid_card(
#'         "sidebar",
#'          card_header("Settings"),
#'         sliderInput("bins", "Number of bins:",
#'            min = 1,
#'            max = 50,
#'            value = 30,
#'            width = "100%")
#'       ),
#'       grid_card_plot("plot")
#'     )
#'   ),
#'   server = function(input, output) {
#'     output$plot <- renderPlot({
#'       x    <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = 'darkgray', border = 'white')
#'     })
#'   }
#' )
#' }
#'
grid_container <- function(
  layout,
  ...,
  id = NULL,
  flag_mismatches = TRUE,
  row_sizes = NULL,
  col_sizes = NULL,
  gap_size = NULL,
  container_height = NULL
) {

  # Check to make sure we match all the names in the layout to all the names in
  # the passed arg_sections

  # Kinda silly to have a grid page without a layout
  if(missing(layout)){
    stop("Need a defined layout for page")
  }
  # Make sure we're working with a layout
  layout <- if (is_gridlayout(layout) ) layout else new_gridlayout(
    layout_def = layout,
    row_sizes = row_sizes,
    col_sizes = col_sizes,
    gap_size  = gap_size,
    container_height = container_height
  )


  # In order to leave the id field open to users to do with as they please, we
  # need to generate a unique key that can be used to find the grid. If the
  # user has provided an id already, then we can use that. Otherwise we generate
  # a random key sequence that we can use. The attribute data-gridlayout-key is
  # used to properly sync up the css with the container
  unique_key <- if (is.null(id)) gen_random_grid_key() else id

  if (flag_mismatches){
    check_for_area_mismatches(
      provided_areas = get_provided_grid_areas(list(...)),
      layout_areas =  get_element_ids(layout)
    )
  }

  # Build container div, append the styles to head and then return
  shiny::tagList(
    gridlayout_css_dep(),
    shiny::div(
      id = id,
      class = "grid-container",
      `data-gridlayout-key` = unique_key,
      ...,
      use_gridlayout_shiny(
        layout,
        container = unique_key
      )
    )
  )
}


# Generate a random 5-letter key for pairing grid containers with their css.
# This is only used if an id is not provided for the container already
gen_random_grid_key <- function(num_chars = 5){
  paste(
    sample(
      letters,
      5,
      replace = TRUE
    ),
    collapse = ""
  )
}



# handle dependency
gridlayout_css_dep <- function() {
  htmltools::htmlDependency(
    name = "gridlayout_css",
    package = "gridlayout",
    src = "resources",
    stylesheet = "gridlayout.css",
    script = "gridlayout.js",
    version = "1.0"
  )
}
