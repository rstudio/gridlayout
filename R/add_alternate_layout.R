
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
#' @param layout Main (or default) layout object
#' @param alternate_layout A `gridlayout` object or layout-as-markdown-table
#'   defining layout. See [Declaring your layout] for more info on format. The
#'   elements in this layout must match those in your main layout.
#' @param width_bounds A named vector with at least one element of name `min`,
#'   or `max`. These two values are used to set when the layout occurs. For
#'   instance, `c(max = 600)` means the layout will occur up until the page is
#'   wider than `600px`.
#' @param container_height How tall the layout should be. If left as `NULL` this
#'   will simply inherit the main layout's height. Often this should be set to
#'   `"auto"` to allow mobile user's to scroll. Beware though, you will want to
#'   absolutely size any plot outputs in these cases.
#'
#' @export
add_alternate_layout.gridlayout <- function(
  layout,
  alternate_layout,
  width_bounds = c(max = 500),
  container_height = NULL
) {

  # Check form of the width_bounds
  has_width_min <- hasName(width_bounds, "min")
  has_width_max <- hasName(width_bounds, "max")

  if (has_width_max) {
    width_bounds["max"] <- as_pixel_value(width_bounds["max"])
  }

  if (has_width_min) {
    width_bounds["min"] <- as_pixel_value(width_bounds["min"])
  }

  if (!(has_width_min || has_width_max)) {
    stop("Need at least one width bound for alternative layout")
  }

  if (has_width_min && has_width_max) {
    if (unpixelify(width_bounds["min"]) >= unpixelify(width_bounds["max"]) ) {
      stop("Min bound of layout apperance is not smaller than max.",
           "You probably want to flip them.")
    }
  }

  if (!all(names(width_bounds) %in% c("min", "max"))) {
    warning(
      "Only min and max bounds supported.",
      "Ignoring other bounds values passed to alternate_layout()"
    )
  }


  if (class(alternate_layout) == "gridlayout") {
    # Alternate layouts themselves cant have alternates.
    # This only happens if the user has created the alternate layout
    # as its own layout object beforehand.
    attr(alternate_layout, 'alternates') <- NULL
  }

  alternate <- list(
    layout = new_gridlayout(
      alternate_layout,
      container_height = container_height,
      alternate_layouts = NULL
    ),
    width_bounds = width_bounds
  )

  # Make sure layouts map to same elements
  layouts_have_same_elements(layout, alternate$layout)

  # Auto-generated mobile layout gets removed if it already exists so we don't
  # try get errors if the user is trying to add their own mobile layout with
  # stand-alone usage of add_alternate_layout()
  if (identical(attr(layout, "auto_mobile_layout"), TRUE)) {
    attr(layout, "alternates") <- NULL
    attr(layout, "auto_mobile_layout") <- NULL
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

  upper_new <- unpixelify(new_layout$width_bounds["max"] %||% Inf)
  lower_new <- unpixelify(new_layout$width_bounds["min"] %||% 0)
  for (alternate in alternates) {
    upper_old <- unpixelify(alternate$width_bounds["max"] %||% Inf)
    lower_old <- unpixelify(alternate$width_bounds["min"] %||% 0)

    if (upper_new >= lower_old && lower_new <= upper_old) {
      stop("New alternate interval overlaps with previous interval covering the range ",
           print_size_range(alternate$bounds))
    }
  }
}

