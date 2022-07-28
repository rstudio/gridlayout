#' Grid-positioned card with `gridlayout` positioned content
#'
#' Creates a panel for a layout with its own internal gridlayout
#'
#' @inheritParams grid_card
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

  grid_place(
    area = area,
    htmltools::div(
      class = "card no-pad",
      if (!is.null(title)) {
        card_header(title)
      },
      htmltools::tags$div(
        class = "card-body",
        nested_grid
      )
    )
  )

  # grid_card(
  #   area = area,
  #   title = title,
  #   htmltools::tags$div(
  #     class = "card-body",
  #     nested_grid
  #   )
  # )
}


