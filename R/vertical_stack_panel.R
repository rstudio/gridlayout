#' Grid panel with vertically stacked elements
#'
#' Contain a series of ui elements with each vertically stacked on top of
#' eachother. Internally uses css flexbox to align items.
#'
#' @inheritParams grid_panel
#' @param item_gap How much space should there be between consecutive items?
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with styles for
#'   verticall stacking applied.
#'
#' @seealso [grid_panel]
#' @export
#'
#' @examples
#'
#' # Simply a wrapper for shiny::div(...)
#' vertical_stack_panel(
#'   area="header",
#'   shiny::h2("R"),
#'   shiny::actionButton(),
#' )
#'
vertical_stack_panel <- function(
    area,
    ...,
    title = NULL,
    collapsible = TRUE,
    scrollable = FALSE,
    item_gap = "10px"
  ){

  contents <- list(...)

  panel_styles <- htmltools::css(
    overflow = if (scrollable) "scroll",
    `--item-gap` = item_gap
  )

  has_title <- notNull(title)
  use_collapser <- collapsible && has_title

  # Go through and make sure plots that don't have custom sizes are set to fill their panels
  panel_content <- htmltools::tagQuery(
    shiny::div(contents, style = panel_styles, class = "panel-content")
  )$
    find(".shiny-plot-output")$
    each(update_default_sized_plots)$
    allTags()


  shiny::div(
    class = paste("grid_panel", "vertical_stack"),
    style= htmltools::css(`grid-area` = area),
    if (has_title) {
      shiny::div(
        class = "title-bar",
        shiny::h3(title),
        if (use_collapser) make_collapser_icon(),
        style = if (use_collapser) "justify-content: space-between;"
      )
    },
    panel_content
  )
}
