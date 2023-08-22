#' Grid-positioned card with `gridlayout` positioned content
#'
#' Creates a panel for a layout with its own internal gridlayout
#'
#' @inheritParams grid_card
#' @param title Optional title for the card. Gets wrapped in
#'   `bslib::card_header()`
#' @inheritParams grid_container
#'
#' @seealso [grid_card], [grid_container]
#'
#' @return A `grid_card` with a nested layout within it
#'
#' @seealso  [grid_page()] for using a gridlayout to entirely define the page.
#'   [grid_container()] for placing a gridlayout in non-gridlayout parent
#'   elements. [grid_card()] for placing content inside your layout. See
#'   `vignette("defining-a-layout", package = "gridlayout")` for more info on
#'   defining your layout.
#'
#' @example man/examples/nested_app.R
#' @export
grid_nested <- function(area,
                        layout,
                        ...,
                        id = NULL,
                        title = NULL,
                        flag_mismatches = TRUE) {

  nested_grid <- grid_container(
    layout = new_gridlayout(layout, container_height = "100%"),
    flag_mismatches = flag_mismatches,
    id = id,
    ...
  )

  grid_card(
    area = area,
    if (!is.null(title)) {
      bslib::card_header(title)
    },
    bslib::card_body(
      class = "p-0",
      nested_grid
    )
  )
}
