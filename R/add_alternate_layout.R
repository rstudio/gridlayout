
#' @export
add_alternate_layout <- function(layout, alternate_layout, lower_bound_width = NULL, upper_bound_width = NULL) {
  UseMethod("add_alternate_layout")
}

#' @export
add_alternate_layout.gridlayout <- function(layout, alternate_layout, lower_bound_width = NULL, upper_bound_width = NULL) {


  alternate <- list(
    layout = coerce_to_layout(alternate_layout)
  )

  # Check to make sure the same elements match between layout and the main one
  layouts_have_same_elements(layout, alternate$layout)

  if (is.null(lower_bound_width) && is.null(upper_bound_width)) {
    stop("Need at least one width bound for alternative layout")
  }

  if (!is.null(lower_bound_width)) {
    alternate$lower <- as_pixel_value(lower_bound_width)
  }

  if (!is.null(upper_bound_width)) {
    alternate$upper <- as_pixel_value(upper_bound_width)
  }

  current_alternates <- attr(layout, "alternates")
  if (is.null(current_alternates)) {
    attr(layout, "alternates") <- list(alternate)
  } else {
    # TODO: Make sure that the layout condition bounds don't overlap

    attr(layout, "alternates")[length(current_alternates) + 1] <- alternate
  }

  layout
}

