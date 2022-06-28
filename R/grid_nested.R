#' Grid-positioned card with gridlayout positioned content
#'
#' Creates a panel for a layout with its own internal gridlayout
#'
#' @inheritParams grid_card
#' @inheritParams grid_container
#'
#' @seealso [grid_card], [grid_container]
#'
#' @return A `grid_card` with a nested layout within it
#' @export
#'
#' @examples
#' if (interactive()) {
#'   library(gridlayout)
#'   library(shiny)
#'
#'   # A centered text panel
#'   grid_card_text_c <- function(...) grid_card_text(...)
#'
#'   my_layout <- "
#' |A |B |
#' |C |D |"
#'   shinyApp(
#'     ui = grid_page(
#'       layout = my_layout,
#'       grid_card_text_c("A", "A"),
#'       grid_card_text_c("B", "B"),
#'       grid_card_text_c("C", "C"),
#'       grid_card_nested(
#'         "D",
#'         layout = my_layout,
#'         grid_card_text_c("A", "A2"),
#'         grid_card_text_c("B", "B2"),
#'         grid_card_text_c("C", "C2"),
#'         grid_card_text_c("D", "D2")
#'       )
#'     ),
#'     server = function(input, output) {}
#'   )
#' }
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


