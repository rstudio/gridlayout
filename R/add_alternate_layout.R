
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
  alternate_layout = NULL,
  width_bounds = NULL,
  container_height = NULL
) {

  alternate <- if (is.null(alternate_layout)) {
    build_mobile_alternate_layout(layout)
  } else {
    width_bounds <- validate_bounds(width_bounds)

    template <- new_gridlayout_template(
      layout_def = alternate_layout,
      container_height = container_height
    )
    # Make sure layouts map to same elements
    layouts_have_same_elements(layout, template)

    list(
      layout = template,
      width_bounds = width_bounds
    )
  }

  # Auto-generated mobile layout gets removed if it already exists so we don't
  # try get errors if the user is trying to add their own mobile layout with
  # stand-alone usage of add_alternate_layout()
  if (length(layout$alternates) > 0 &&
      identical(attr(layout$alternates[[1]], "auto_mobile_layout"), TRUE)) {
    layout$alternates[[1]] <- NULL
  }

  overlaps_with_existing_alternates(alternate, layout$alternates)

  # Add new element to alternates
  layout$alternates[[length(layout$alternates) + 1]] <- alternate

  layout
}

validate_bounds <- function(bounds) {
  # Check form of the width_bounds
  has_width_min <- hasName(bounds, "min")
  has_width_max <- hasName(bounds, "max")

  if (has_width_max) {
    bounds["max"] <- as_pixel_value(bounds["max"])
  }

  if (has_width_min) {
    bounds["min"] <- as_pixel_value(bounds["min"])
  }

  if (!(has_width_min || has_width_max)) {
    stop("Need at least one width bound for alternative layout")
  }

  if (has_width_min && has_width_max) {
    if (unpixelify(bounds["min"]) >= unpixelify(bounds["max"]) ) {
      stop("Min bound of layout apperance is not smaller than max.",
           "You probably want to flip them.")
    }
  }

  if (!all(names(bounds) %in% c("min", "max"))) {
    warning(
      "Only min and max bounds supported.",
      "Ignoring other bounds values passed to alternate_layout()"
    )
  }
  bounds
}

layouts_have_same_elements <- function(layout_a, layout_b){

  a_element_ids <- get_element_ids(layout_a)
  b_element_ids <- get_element_ids(layout_b)

  if (setequal(a_element_ids, b_element_ids)) return(TRUE)

  mismatched <- c(
    setdiff(a_element_ids, b_element_ids),
    setdiff(b_element_ids, a_element_ids)
  )
  stop(
    "Layouts have mismatched elements: ",
    paste(mismatched, collapse = ", ")
  )
}


overlaps_with_existing_alternates <- function(new_layout, alternates) {

  upper_new <- unpixelify(new_layout$width_bounds["max"] %||% Inf)
  lower_new <- unpixelify(new_layout$width_bounds["min"] %||% 0)
  for (alternate in alternates) {
    upper_old <- unpixelify(alternate$width_bounds["max"] %||% Inf)
    lower_old <- unpixelify(alternate$width_bounds["min"] %||% 0)

    if (upper_new >= lower_old && lower_new <= upper_old) {
      stop("New alternate interval overlaps with previous interval covering the range ",
           print_size_range(alternate$width_bounds))
    }
  }
}


build_mobile_alternate_layout <- function(layout) {
  element_ids <- get_element_ids(layout)
  mobile_rows <- vapply(
    element_ids,
    function(id) {
      # Be smart about headers but everything else is 350px
      if (id == "header") "85px" else "350px"
    },
    FUN.VALUE = character(1)
  )

  mobile_layout <- new_gridlayout_template(
    layout_def = lapply(
      seq_along(element_ids),
      function(i) {
        list(
          id = element_ids[[i]],
          start_row = i,
          end_row = i,
          start_col = 1,
          end_col = 1
        )
      }
    ),
    row_sizes = mobile_rows
  )

  alternate <- list(
    layout = mobile_layout,
    width_bounds = c(max = "500px")
  )

  # Tag this layout as auto generated so add_alternate_layout can ignore it
  # if future layouts are added.
  attr(alternate, "auto_mobile_layout") <- TRUE

  alternate
}


