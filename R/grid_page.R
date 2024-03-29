#' Use `gridlayout` for entire app layout
#'
#' This is the typical way to use `gridlayout` in your `Shiny` app. `grid_page`
#' will make up the entire `ui` declaration of the app. Under the hood it uses
#' [shiny::fluidPage()] and [grid_container]. Elements are placed in the layout
#' by wrapping in a `grid_card()` with the `area` set to the area in the layout
#' the element should be placed in.
#'
#' @inheritParams grid_container
#' @param container_height Optional parameter to control height of page.
#'  Defaults to `"viewport"` so app takes up full vertical space of page.
#'  See argument of same name in `new_gridlayout()` for more options.
#' @param theme Optional argument to pass to `theme` argument of
#'   \code{\link[shiny]{fluidPage}}.
#' @param flag_mismatches Should mismatches between the named arguments and
#'   layout elements trigger an error?
#'
#' @return A UI definition that can be passed to the
#'   \code{\link[shiny]{shinyUI}} function.
#' @export
#'
#' @seealso See `vignette("defining-a-layout", package = "gridlayout")` for more info on defining your layout. [grid_container()] for using gridlayout without also setting up the
#'   root page layout. [grid_nested()] for placing a grid container within
#'   another gridlayout. [grid_card()] for placing content inside your layout.
#'
#' @example man/examples/simple_app.R
#'
grid_page <- function(layout,
                      ...,
                      row_sizes = NULL,
                      col_sizes = NULL,
                      gap_size = NULL,
                      container_height = "viewport",
                      theme = bslib::bs_theme(version = 5),
                      flag_mismatches = FALSE) {
  dot_args <- list(...)

  body_elements <- Filter(
    f = function(x) !(is_grid_page_header(x) || is_grid_page_sidebar(x)),
    dot_args
  )

  header <- Filter(
    f = function(x) is_grid_page_header(x),
    dot_args
  )

  sidebar <- Filter(
    f = function(x) is_grid_page_sidebar(x),
    dot_args
  )

  container_args <- c(
    list(
      layout = layout,
      flag_mismatches = flag_mismatches,
      row_sizes = row_sizes,
      col_sizes = col_sizes,
      gap_size = gap_size,
      container_height=container_height,
      # This is used to prevent a randomly generated grid container id data
      # attribute which stabilizes tests and makes it easier to target with
      # custom css
      id = "gridlayout-grid-page-container"
    ),
    body_elements
  )

  container <- do.call(grid_container, container_args)

  shiny::fluidPage(
    theme = theme,
    htmltools::tags$div(
      id = "gridlayout-grid-page",
      header,
      sidebar,
      container
    )
  )
}


grid_page_header <- function(..., bgColor = "primary", bgGradient = FALSE, height = NULL) {
  update_el(
    htmltools::tags$div(...),
    classes = c(
      "grid-page-header",
      make_bg_class(bgColor, bgGradient)
    ),
    styles = list(height = height)
  )
}

is_grid_page_header <- function(x) {
  has_class(x, "grid-page-header")
}

grid_page_sidebar <- function(..., side = "left", bgColor = "light", bgGradient = FALSE, width = NULL) {
  update_el(
    htmltools::tags$div(...),
    classes = c(
      make_bg_class(bgColor, bgGradient),
      paste0("grid-page-sidebar-", side)
    ),
    styles = list(
      width = width
    )
  )
}

is_grid_page_sidebar <- function(x) {
  has_class(x, "grid-page-sidebar")
}
