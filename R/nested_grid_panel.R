
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
nested_grid_panel <- function(
    area,
    layout,
    title = NULL,
    use_bslib_card_styles = FALSE,
    flag_mismatches = TRUE,
    ...
){

  grid_panel(
    area = area,
    title = title,
    grid_container(
      layout = new_gridlayout(layout, container_height = "100%"),
      use_bslib_card_styles = use_bslib_card_styles,
      flag_mismatches = flag_mismatches,
      ...
    )
  )
}

