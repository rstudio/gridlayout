#'Construct a gridlayout object
#'
#'Builds the gridlayout s3 class that holds information needed to draw a given
#'layout.
#'
#'
#'@section Declaring your layout:
#'
#'  There are three current ways to declare layouts (aka inputs to
#'  `layout_def`).
#'
#'  ### Markdown tables
#'
#'  The first is the easiest: a markdown table wrapped in a character string. In
#'  this format you define a grid using the table and then place your grid
#'  "elements" within that grid using their grid id. So for a 2x2 layout with a
#'  header along the top and two plots side-by-side the layout would look as
#'  follows:
#'  ```{r}
#'    new_gridlayout( "| header | header |
#'                     | plota  | plotb  |" )
#'  ```
#'
#'  ### Element lists
#'
#'  The second method is to supply a list of elements by providing the following
#'  information for each:
#'
#'  - `id`: Identifying id of the element (e.g. `"header`)
#'  - `start_row/end_row`: The (1-indexed) start and end row of your element's
#'  span
#'  - `start_col/end_col`: The start and end column for your element's span
#'
#'  This is a bit more verbose but allows for greater control. Here you can have
#'  overlapping elements etc.. Most of the time you will just want to use the
#'  markdown syntax
#'
#'  The same layout as declared above can be accomplished with the following:
#'
#'  ```{r}
#'  new_gridlayout( list(
#'    list(id = "header", start_row = 1, end_row = 1, start_col = 1, end_col = 2),
#'    list(id = "plot_a", start_row = 2, end_row = 2, start_col = 1, end_col = 1),
#'    list(id = "plot_b", start_row = 2, end_row = 2, start_col = 2, end_col = 2) )
#'  )
#'  ```
#'
#'  ### An existing `gridlayout`
#'
#'  The last way is to pass an existing `gridlayout` object in. This allows you
#'  to do things like modify the grid sizing or container sizes of an existing
#'  layout.
#'
#'
#'
#'@param layout_def Either a list of elements with the `id`, `start_row`,
#'  `end_row`, `start_col`, and `end_col` format, or a markdown table defining a
#'  layout.
#'@param col_sizes A character vector of valid css sizes for the width of each
#'  column in your grid as given by `layout_mat`. If a single value is passed,
#'  it will be repeated for all columns.
#'@param row_sizes Same as `col_sizes`, but for row heights.
#'@param gap Valid css sizing for gap to be left between each element in your
#'  grid. Defaults to `"1rem"`. This is a relative unit that scales with the
#'  base text size of a page. E.g. setting font-size: 16px on the body element
#'  of a page means 1rem = 16px;
#'@param container_height Valid css unit determining how tall the containing
#'  element should be for this layout. Defaults to `"viewport"` (full page
#'  height: equivalent to the CSS value of `100vh`) if any relative units (e.g.
#'  `fr` or `auto`) are included in row sizes and `auto` otherwise. Values such
#'  as `"auto"` will let the page grow to as large as it needs to be to fit all
#'  content. This should most likely be avoided when using row heights in
#'  relative units.
#'@param alternate_layouts A list of layouts to be used for different viewport
#'  widths. This is enables your app to adapt to different screensizes such as a
#'  phone or an ultra-wide monitor. Each entry in this list must contain a
#'  `layout`: or valid layout declaration (see [Declaring your layout]), and
#'  `width_bounds`: or a list with at least one of a `min` and `max` value for
#'  when your page appears. See [add_alternate_layout()] for more details. If no
#'  alternate layouts are given a single-column layout will be automatically
#'  applied for mobile screens (viewports less than 600px wide). Set to `NULL`
#'  to avoid this.
#'
#'@return Object of class `"gridlayout"`
#'@export
#'
#' @examples
#'
#' # Assemble list of elements along with their positions
#' elements_list <- list(
#'   list(id = "header", start_row = 1, end_row = 1,
#'        start_col = 1, end_col = 2),
#'   list(id = "plot",   start_row = 2, end_row = 2,
#'        start_col = 1, end_col = 1),
#'   list(id = "table",  start_row = 2, end_row = 2,
#'        start_col = 2, end_col = 2),
#'   list(id = "footer", start_row = 3, end_row = 3,
#'        start_col = 1, end_col = 2)
#' )
#'
#' new_gridlayout(
#'   elements_list,
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr", "1fr")
#' )
#'
#' # Can also use a matrix for more visually intuitive laying out
#' new_gridlayout(
#'   layout_def = "
#'       | header | header |
#'       | plota  | plotb  |",
#'   col_sizes = c("1fr", "2fr"),
#'   row_sizes = c("100px", "1fr"),
#'   gap = "2rem"
#' )
#'
new_gridlayout <- function(
  layout_def = list(),
  col_sizes = NULL,
  row_sizes = NULL,
  gap = NULL,
  container_height = NULL,
  alternate_layouts = "auto"
) {
  elements <- list()
  # Figure out what type of layout definition we were passed
  if (is_char_string(layout_def)) {
    # MD table representation
    layout_info <- parse_md_table_layout(
      layout_def,
      col_sizes = col_sizes,
      row_sizes = row_sizes,
      gap = gap
    )
    elements <- layout_info$elements
    col_sizes <- layout_info$col_sizes
    row_sizes <- layout_info$row_sizes
    gap <- layout_info$gap
  } else if (class(layout_def) == "gridlayout") {

    # Use existing row and column heights unless they have been explicitly overridden
    col_sizes <- col_sizes %||% attr(layout_def, "col_sizes")
    row_sizes <- row_sizes %||% attr(layout_def, "row_sizes")
    gap <- gap %||% attr(layout_def, "gap")
    container_height <- container_height %||% attr(layout_def, "container_height")
    elements <- get_elements(layout_def)

    # Get rid of existing alternate layouts
  } else if (is.list(layout_def)) {
    # If an existing layout is passed its sizes can and container size etc can
    # be modified
    elements <- layout_def
  } else {
    stop(
      "Unknown layout definition type. ",
      "Layouts can be defined using markdown table syntax or element lists. ",
      "See ?gridlayout::new_gridlayout for more info"
    )
  }

  # Set defaults if unspecified
  if (is.null(gap)) gap <- "1rem"

  # If using default container_height and all the rows are definitely sized then
  # make container height auto. Otherwise use "viewport"
  if (is.null(container_height)) {
    all_definite_row_sizes <- notNull(row_sizes) && all(!str_detect(row_sizes, "fr"))
    container_height <- if (all_definite_row_sizes) "auto" else "viewport"
  }

  empty_grid <- length(elements) == 0

  # Validate row and column sizes.
  sizes <- map_w_names(
    list(row = row_sizes, col = col_sizes),
    function(dir, sizes) {
      start_vals <- extract_dbl(elements, "start_" %+% dir)
      end_vals <- extract_dbl(elements, "end_" %+% dir)
      auto_sizing <- is.null(sizes)

      if (!is.atomic(sizes)) stop(dir, " sizes need to be an simple (atomic) character vector.")

      num_sections <- if (auto_sizing & empty_grid) {
        2
      } else if (empty_grid) {
        length(sizes)
      } else {
        max(end_vals)
      }

      if (auto_sizing) {
        # Don't give layouts with auto-height relative units
        auto_unit <- if (dir == "row" && container_height == "auto") "300px" else "1fr"
        sizes <- auto_unit
      }

      if (length(sizes) == 1 & num_sections != 1) {
        sizes <- rep_len(sizes, num_sections)
      }
      # Make sure that the elements sit within the defined grid
      if (!empty_grid) {
        if (max(end_vals) > num_sections) {
          bad_elements <- extract_chr(elements[end_vals > num_sections], "id")
          stop("Element(s) ", list_in_quotes(bad_elements), " extend beyond specified grid rows")
        }

        if (max(end_vals) < length(sizes)) {
          stop("The provided ", dir, " sizes need to match the number of ", dir, "s in your layout")
        }
      }

      sizes
    }
  )

  # If container height is not a fixed value then relative unit row heights will
  # not work. Issue a warning in this case
  has_relative_row_heights <- any(str_detect(row_sizes, "fr", fixed = TRUE))
  if (container_height == "auto" && has_relative_row_heights) {
    warning("Relative row heights don't mix well with auto-height containers. Expect some visual wonkiness.")
  }

  layout <- structure(
    list(
      element_ids = extract_chr(elements, "id"),
      layout = list(
        elements = elements,
        row_sizes = sizes$row,
        col_sizes = sizes$col,
        container_height = container_height,
        gap = gap
      ),
      alternates = list()
    ),
    class = "gridlayout"
  )

  if (notNull(alternate_layouts)) {
    if (identical(alternate_layouts, "auto")) {
      # Build a default mobile layout for the user
      layout <- add_alternate_layout(
        layout,
        alternate_layout = build_mobile_layout_table(layout),
        width_bounds = c(max = 600),
        container_height = "auto"
      )

      # Tag this layout as auto generated so add_alternate_layout can ignore it
      # if future layouts are added.
      attr(layout, "auto_mobile_layout") <- TRUE

    } else {

      # Check to see if we're working with a list of lists or a single alternate
      # layout
      single_alternate <- "layout" %in% names(alternate_layouts)

      if (single_alternate) {
        alternate_layouts <- list(alternate_layouts)
      }

      for (alternate in alternate_layouts) {
        if (is.null(alternate$layout)) {
          stop(
            "Altnernate layouts need to be provided as a list with ",
            "a layout element along with width bounds."
          )
        }
        layout <- add_alternate_layout(
          layout,
          alternate_layout = alternate$layout,
          width_bounds = alternate$width_bounds,
          container_height = alternate$container_height
        )
      }
    }
  }

  layout
}

# Helpers to access parts of the layout
get_layout_info <- function(layout)  {
  # If we're just working with the base gridlayout class then we want the
  # default layout
  if (class(layout) == "gridlayout") {
    return(layout$layout)
  }

  if (is.null(layout$elements)) stop("Does not appear to be a layout or layout information")

  layout
}

get_elements <- function(layout) {
  get_layout_info(layout)$elements
}
get_row_sizes <- function(layout) {
  get_layout_info(layout)$row_sizes
}
get_col_sizes <- function(layout) {
  get_layout_info(layout)$col_sizes
}
get_gap_size <- function(layout) {
  get_layout_info(layout)$gap
}
get_gap_size <- function(layout) {
  get_layout_info(layout)$gap
}
get_container_height <- function(layout) {
  get_layout_info(layout)$container_height
}

# Function to allow layout being defined with markdown or with standard object
coerce_to_layout <- function(layout_def){
  if(inherits(layout_def, "character")){
    # If we were passed a string directly then convert to a grid layout before
    # proceeding
    layout_def <- md_to_gridlayout(layout_def)
  } else if(!inherits(layout_def, "gridlayout")){
    stop("Passed layout must either be a markdown table or a gridlayout object.")
  }
  layout_def
}

build_mobile_layout_table <- function(layout) {
  mobile_rows <- vapply(
    layout,
    function(el) {
      # Be smart about headers but everything else is 350px
      if (el$id == "header") "85px" else "350px"
    },
    FUN.VALUE = character(1)
  )
  new_gridlayout(
    layout_def = lapply(
      seq_along(layout),
      function(i) {
        list(
          id = layout[[i]]$id,
          start_row = i,
          end_row = i,
          start_col = 1,
          end_col = 1
        )
      }
    ),
    row_sizes = mobile_rows,
    alternate_layouts = NULL
  )
}

layouts_are_equal <- function(layout_a, layout_b){
  identical(to_md(layout_a), to_md(layout_b))
}


layouts_have_same_elements <- function(layout_a, layout_b){
  a_element_ids <- extract_chr(layout_a, "id")
  b_element_ids <- extract_chr(layout_b, "id")

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


#' @export
print.gridlayout <- function(x, ...){

  # Make text bold
  emph <- if(is_installed("crayon")) crayon::bold else as.character
  cat(
    emph("gridlayout"), " with ",
    emph(length(get_row_sizes(x))), " rows, ",
    emph(length(get_col_sizes(x))), " columns, and ",
    "gap size of ", emph(get_gap_size(x)), ".",
    " Total height of ", emph(get_container_height(x)),".",
    "\n",
    to_table(x, sizes_decorator = emph),
    sep = ""
  )
#
#   alternate_layouts <- attr(x, "alternates")
#   if (notNull(alternate_layouts)) {
#     cat("\n\n", emph("Alternative layouts:"), sep = "")
#     for (alternate in alternate_layouts) {
#       cat("\n\nWhen width of page", emph(print_size_range(alternate$width_bounds)), "\n")
#
#       print(alternate$layout)
#     }
#   }
}

print_size_range <- function(bounds) {
  has_min <- doesExist(bounds["min"])
  has_max <- doesExist(bounds["max"])
  if (has_min && has_max) {
    return(paste("between", bounds["min"], "and", bounds["max"]))
  } else if (has_min) {
    return(paste(">", bounds["min"]))
  } else if (has_max) {
    return(paste("<", bounds["max"]))
  } else {
    return("Malformed bounds")
  }
}


