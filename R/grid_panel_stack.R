#' Grid panel with vertically stacked elements
#'
#' Contain a series of ui elements with each vertically stacked on top of
#' eachother. Internally uses css flexbox to align items.
#'
#' @inheritParams grid_panel
#' @param item_gap How much space should there be between consecutive items?
#' @param item_alignment How should the items within the panel be aligned.
#'   Defaults to stacking downward from the top. Options include `"top"`,
#'   `"centered"`, `"bottom"`, or `"spread"` (items are distributed evenly among
#'   vertical space).
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with styles for
#'   vertical stacking applied.
#'
#' @seealso [grid_panel]
#' @export
#'
#' @examples
#'
#' # Simply a wrapper for shiny::div(...)
#' grid_panel_stack(
#'   area="header",
#'   shiny::h2("R"),
#'   shiny::actionButton("myButton", "Click Me")
#' )
#'
grid_panel_stack <- function(
    area,
    ...,
    item_alignment = "top",
    title = NULL,
    collapsible = TRUE,
    scrollable = FALSE,
    item_gap = "10px"
){

  contents <- list(...)

  if (!item_alignment %in% names(alignment_mapping)) {
    stop("Alignment argument must be one of ", paste(names(alignment_mapping), collapse = ", "))
  }

  panel_styles <- htmltools::css(
    overflow = if (scrollable) "scroll",
    `--item-gap` = item_gap,
    `justify-content` = alignment_mapping[[item_alignment]]
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
      card_header(title,use_collapser)
    },
    panel_content
  )
}

card_header <- function(contents, use_collapser = FALSE){

  shiny::div(
    class = "card-header",
    contents,
    if (use_collapser) make_collapser_icon(),
    style = if (use_collapser) "justify-content: space-between;"
  )

}


alignment_mapping <- list(
  "top" = "flex-start",
  "center" = "center",
  "bottom" = "flex-end",
  "spread" = "space-evenly"
)

