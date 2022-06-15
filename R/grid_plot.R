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
grid_plot <- function(
    area,
    outputId = area,
    ...
) {
  grid_card(
    area = area,
    card_plot_output(outputId = outputId, ...)
  )
}
