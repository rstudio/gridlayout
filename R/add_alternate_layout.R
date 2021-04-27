
#' @export
add_alternate_layout <- function(layout, ...) {
  UseMethod("add_alternate_layout")
}

#' Add alternate layout options
#'
#' Adds a layout that will be triggered based upon the size of the viewport.
#' This is typically used to add a mobile view (or a desktop view if your app is
#' mobile first.)
#'
#' @param alternate_layout A `gridlayout` object or layout-as-markdown-table
#'   defining layout. The elements in this layout must match those in your main
#'   layout.
#' @param upper_bound_width Width in pixels below which this layout is used
#' @param lower_bound_width Width in pixels above which this layout is used
#'
#' @export
add_alternate_layout.gridlayout <- function(
  layout,
  alternate_layout,
  lower_bound_width = NULL,
  upper_bound_width = NULL
) {
  alternate <- list(
    layout = coerce_to_layout(alternate_layout),
    bounds = list()
  )

  # Check to make sure the same elements match between layout and the main one
  layouts_have_same_elements(layout, alternate$layout)

  if (is.null(upper_bound_width) && is.null(lower_bound_width)) {
    stop("Need at least one width bound for alternative layout")
  }

  if (notNull(lower_bound_width)) {
    alternate$bounds$lower <- as_pixel_value(lower_bound_width)
  }

  if (notNull(upper_bound_width)) {
    alternate$bounds$upper <- as_pixel_value(upper_bound_width)
  }

  if (notNull(upper_bound_width) && notNull(lower_bound_width)) {
    if (upper_bound_width < lower_bound_width) {
      stop("Lower bound of layout apperance is greater than upper.",
           "You probably want to flip them.")
    }
  }

  existing_alternates <- attr(layout, "alternates")
  if (is.null(existing_alternates)) {
    attr(layout, "alternates") <- list(alternate)
  } else {

    overlaps_with_existing_alternates(alternate, existing_alternates)

    # Add new element to alternates
    attr(layout, "alternates")[[length(existing_alternates) + 1]] <- alternate
  }

  layout
}


overlaps_with_existing_alternates <- function(new_layout, alternates) {

  upper_new <- new_layout$upper %||% Inf
  lower_new <- new_layout$lower %||% 0

  for (alternate in alternates) {
    upper_old <- alternate$bounds$upper %||% Inf
    lower_old <- alternate$bounds$lower %||% 0

    if (upper_new >= lower_old && lower_new <= upper_old) {
      stop("New alternate interval overlaps with previous interval covering the range ",
           print_size_range(alternate$bounds))
    }
  }
}

