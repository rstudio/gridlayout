#' Grid Card
#'
#' A wrapper around [bslib::card] to enable placing on a grid layout using the
#' area parameter.
#'
#' @inheritParams grid_panel_stack
#' @inheritDotParams grid_panel_stack
#'
#' @seealso [grid_panel_stack]
#' @return
#' @export
grid_card <- function(area, ...) {
  card <- grid_panel_stack(area = area, ...)
  add_class(card, "card")
  # grid_place(area = area, bslib::card(...))
}


#' Grid Plot Output
#'
#' A simple plot-on-the-grid function. For more control - such as adding headers
#' or footers - you should use [`grid_card()`] and [`bslib::card_plot_output()`]
#' directly.
#'
#'
#' @inheritParams grid_panel
#' @param outputId Output id of the plot output. Used to link to server code
#'   generating plot. If left unset this will use the same value as the `area`
#'   argument.
#' @inheritDotParams bslib::card_plot_output
#'
#' @return A grid panel filled with plot output
#' @export
#'
#'
grid_plot <- function(area,
                      outputId = area,
                      ...) {
  grid_card(
    area = area,
    card_plot_output(outputId = outputId, ...)
  )
}


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
#'
#' @examples
#' if (interactive()) {
#'   library(gridlayout)
#'   library(shiny)
#'
#'   # A centered text panel
#'   grid_panel_text_c <- function(...) grid_panel_text(..., h_align = "center")
#'
#'   my_layout <- "
#' |A |B |
#' |C |D |"
#'   shinyApp(
#'     ui = grid_page(
#'       layout = my_layout,
#'       grid_panel_text_c("A", "A"),
#'       grid_panel_text_c("B", "B"),
#'       grid_panel_text_c("C", "C"),
#'       grid_panel_nested(
#'         "D",
#'         layout = my_layout,
#'         grid_panel_text_c("A", "A2"),
#'         grid_panel_text_c("B", "B2"),
#'         grid_panel_text_c("C", "C2"),
#'         grid_panel_text_c("D", "D2")
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
                        use_bslib_card_styles = FALSE,
                        flag_mismatches = TRUE) {



  nested_grid <- grid_container(
    layout = new_gridlayout(layout, container_height = "100%"),
    use_bslib_card_styles = use_bslib_card_styles,
    flag_mismatches = flag_mismatches,
    id = id,
    ...
  )

  htmltools::div(
    class = "card",
    if (!is.null(title)) {
      card_header(title)
    },
    htmltools::tags$div(
      class = "card-body",
      nested_grid
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


card_plot_output <- function(outputId,
                             click = NULL,
                             dblclick = NULL,
                             hover = NULL,
                             brush = NULL,
                             height = NULL,
                             stretch = TRUE,
                             ...) {
  plot_div <- shiny::plotOutput(outputId,
    height = NULL, click = click, dblclick = dblclick, hover = hover,
    brush = brush
  )

  # TODO: card-img-* needs to go on the <img> itself, not the containing <div>
  htmltools::tagAppendAttributes(plot_div,
    style = htmltools::css(
      flex = if (stretch) "1 1",
      `-webkit-flex` = if (stretch) "1 1",
      # May be NULL
      `flex-basis` = htmltools::validateCssUnit(height),
      `-webkit-flex-basis` = htmltools::validateCssUnit(height),
    ),
    !!!rlang::list2(...)
  )
}
