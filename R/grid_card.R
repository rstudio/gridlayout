#' Grid-positioned card element
#'
#' The standard element for placing elements on the grid in a simple card
#' container
#'
#' @param area Name of grid area, should match an area defined in the layout
#'   section of the wrapping `grid_page()` or `grid_container()`.
#' @inheritDotParams bslib::card
#'
#' @seealso [bslib::card] for underlying function. [bslib::card_header], 
#'   [bslib::card_body], [bslib::card_footer]. 
#'   [grid_card_text()] for a card with just text content,
#'   [grid_card_plot()] for a card with just plot content, [grid_place()] to
#'   place any tag onto the grid without needing to wrap in a card, and
#'   [card_plot_output()] for including a smart-sized plot within a card.
#'
#' @example man/examples/simple_app.R
#' @export
grid_card <- function(area, ...) {
  card_args <- list(...)
  args_names <- names(card_args)
  ignored_args <- args_names[args_names %in% old_api_args]
  if (length(ignored_args) > 0) {
    warning(
      paste0(
        "The grid_card() api updated with version 0.1.1 and ",
        "the following args are no longer supported: ",
        paste0("\"", ignored_args, "\"", collapse = ","),
        ". Look at help for bslib::card() to find alternatives!"
      )
    )
  }
  grid_place(area = area, bslib::card(...))
}

old_api_args <- c(
  "title",
  "scrollable",
  "collapsible",
  "has_border",
  "item_gap"
)
