#' Construct a `gridlayout` object
#'
#' @description
#'
#' Builds the gridlayout s3 class that holds information needed to draw a given
#' layout.
#'
#' # Declaring your layout
#'
#'  There are three current ways to declare layouts (aka inputs to
#'  `layout_def`).
#'
#'  ## Array tables
#'
#'  The easiest and cleanest way to declare your layout is to use an array where
#'  each row is an element and each column is separated by spaces. This allows
#'  you to easily visually align your layouts that look good even if your code
#'  is re-formated.
#'
#'  ```{r}
#'  new_gridlayout(
#'   c("header header",
#'     "plota  plotb")
#'  )
#'  ```
#'
#'  ## Markdown tables
#'
#'  You can also use a markdown table wrapped in a single character string. In
#'  this format you define a grid using the table and then place your grid
#'  "elements" within that grid using their grid id. So for a 2x2 layout with a
#'  header along the top and two plots side-by-side the layout would look as
#'  follows:
#'
#'  ```{r}
#'  new_gridlayout(
#'    "| header | header |
#'     | plota  | plotb  |" )
#'  ```
#'
#'
#'  _An important caveat of this style is it is not currently able to be detected
#'  using the "edit current layout" grided addin._
#'
#'  ## Element lists
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
#'    list(id = "plot_b", start_row = 2, end_row = 2, start_col = 2, end_col = 2)
#'  ) )
#'  ```
#'
#'  ## An existing `gridlayout`
#'
#'  The last way is to pass an existing `gridlayout` object in. This allows you
#'  to do things like modify the grid sizing or container sizes of an existing
#'  layout.
#'
#'
#'
#' # Adding alternate layouts
#'
#'  By default a mobile-friendly layout is generated that is simply your
#'  elements stacked in a single column. If you want to adjust this or add
#'  layouts screen-sizes other than just a mobile view, you can with the
#'  `alternate_layouts` argument.
#'
#'  Alternate layouts are simply other layouts that are used based upon the size
#'  of the viewport. This is typically used to add a mobile view (or a desktop
#'  view if your app is mobile first.)
#'
#'  To define an alternate layout you need to pass a list containing `layout`
#'  and `width_bounds` elements.
#'
#'  ```{r}
#'  new_gridlayout(
#'    "|header |header |
#'     |plot_a |plot_b |",
#'    alternate_layouts = list(
#'      layout = "
#'          |header |
#'          |plot_a |
#'          |plot_b |",
#'      width_bounds = c(max = 500)
#'    )
#'  )
#'  ```
#'
#'  Multiple layouts can also be added. Simply enclose them as a list of lists.
#'
#'  See `vignette("alternate-layouts", package = "gridlayout")` for a more in-depth overview.
#'
#'
#' @param layout_def Either a list of elements with the `id`, `start_row`,
#'  `end_row`, `start_col`, and `end_col` format, or a markdown table defining a
#'  layout.
#' @param row_sizes A character vector of valid css sizes for the height of each
#'  row in your grid as given by the main layout definition. If a single value
#'  is passed, it will be repeated for all columns. If sizes are provided both
#'  here and in the main layout then these sizes will be the ones used.
#' @param col_sizes Same as `row_sizes`, but for column widths
#' @param gap_size Valid css sizing for gap to be left between each element in your
#'  grid. Like `row_sizes` and `col_sizes`, this will win-out over a gap size
#'  provided in the main layout table.
#' @param container_height Valid css unit determining how tall the containing
#'  element should be for this layout. Defaults to `"viewport"` (full page
#'  height: equivalent to the CSS value of `100vh`) if any relative units (e.g.
#'  `fr` or `auto`) are included in row sizes and `auto` otherwise. Values such
#'  as `"auto"` will let the page grow to as large as it needs to be to fit all
#'  content. This should most likely be avoided when using row heights in
#'  relative units.
#' @param alternate_layouts A list of layouts to be used for different viewport
#'  widths. This is enables your app to adapt to different screensizes such as a
#'  phone or an ultra-wide monitor. Each entry in this list must contain a
#'  `layout`: or valid layout declaration (see *Declaring your layout* section), and
#'  `width_bounds`: or a list with at least one of a `min` and `max` value for
#'  when your page appears. See [add_alternate_layout()] for more details. If no
#'  alternate layouts are given a single-column layout will be automatically
#'  applied for mobile screens (viewports less than 600px wide). Set to `NULL`
#'  to avoid this.
#'
#' @return Object of class `"gridlayout"`
#' @export
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
#'   gap_size = "2rem"
#' )
#'
new_gridlayout <- function(
  layout_def = list(),
  row_sizes = NULL,
  col_sizes = NULL,
  gap_size = NULL,
  container_height = NULL,
  alternate_layouts = "auto"
) {

  default_template <- new_gridlayout_template(
    layout_def = layout_def,
    col_sizes = col_sizes,
    row_sizes = row_sizes,
    gap_size = gap_size,
    container_height = container_height
  )

  elements <- default_template$elements

  layout <- structure(
    list(
      element_ids = extract_chr(elements, "id"),
      layout = default_template,
      alternates = list()
    ),
    class = "gridlayout"
  )


  # Don't make an alternate layout if the user has specifically told us not to
  # or we have an empty grid (like is used in grided initialization)
  if (is.null(alternate_layouts) || length(elements) == 0) return(layout)

  if (identical(alternate_layouts, "auto")) {
    # Build a default mobile layout for the user
    layout$alternates <- list(build_mobile_alternate_layout(layout))

  } else {

    # Check to see if we're working with a list of lists or a single alternate
    # layout
    single_alternate <- "layout" %in% names(alternate_layouts)
    if (single_alternate) {
      # Wrap single layout in list to keep syntax same for both single and
      # multi-alternates cases
      alternate_layouts <- list(alternate_layouts)
    }

    for (alternate in alternate_layouts) {
      if (is.null(alternate$layout)) {
        stop(
          "Alternate layouts need to be provided as a list with ",
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


  layout
}

default_row_size_fixed <- 'auto'
default_row_size_relative <- '1fr'
default_col_size <- "1fr"
default_gap_size <- "12px"

new_gridlayout_template <- function(
  layout_def = list(),
  col_sizes = NULL,
  row_sizes = NULL,
  gap_size = NULL,
  container_height = NULL
) {

  elements <- list()

  # Figure out what type of layout definition we were passed
  if (is.character(layout_def)) {

    layout_matrix <- if ("matrix" %in% class(layout_def)) {
      layout_def
    } else if (is_md_table(layout_def)) {
      md_table_to_matrix(layout_def)
    } else {
      array_table_to_matrix(layout_def)
    }

    layout_info <- parse_layout_matrix(layout_matrix)

    elements <- layout_info$elements
    col_sizes <- col_sizes %||% layout_info$column_sizes
    row_sizes <- row_sizes %||% layout_info$row_sizes
    gap_size <- gap_size %||% layout_info$gap_size

  } else if (is_gridlayout(layout_def)) {

    # Use existing row and column heights unless they have been explicitly overridden
    col_sizes <- col_sizes %||% get_info(layout_def, "col_sizes")
    row_sizes <- row_sizes %||% get_info(layout_def, "row_sizes")
    gap_size <- gap_size %||% get_info(layout_def, "gap_size")
    container_height <- container_height %||% get_info(layout_def, "container_height")
    elements <- get_elements(layout_def)

  } else if (is.list(layout_def)) {
    # Plain elements list is passed
    elements <- layout_def

    # Fill in sizes if they werent passed as args
    num_cols <- max(extract_dbl(elements, "start_col"))
    col_sizes <- col_sizes %||% rep_len(default_col_size, num_cols)
    num_rows <- max(extract_dbl(elements, "start_row"))
    row_sizes <- row_sizes %||% rep_len(default_row_size_relative, num_cols)

  } else {
    stop(
      "Unknown layout definition type. ",
      "Layouts can be defined using markdown table syntax or element lists. ",
      "See ?gridlayout::new_gridlayout for more info"
    )
  }

  # Set defaults if unspecified
  if (is.null(gap_size)) gap_size <- default_gap_size

  # If using default container_height and all the rows are definitely sized then
  # make container height auto. Otherwise use "viewport"
  if (is.null(container_height)) {
    any_relative_row_sizes <- any(str_detect(row_sizes, "fr"))
    no_specified_sizes <- all(row_sizes == DEFAULT_SIZE_CHAR)
    container_height <- if (any_relative_row_sizes | no_specified_sizes) "viewport" else "auto";
  }


  # Fill in the default values if they're missing
  row_sizes <- replace_default_with_value(row_sizes, if(container_height == "viewport") default_row_size_relative else default_row_size_fixed)
  col_sizes <- replace_default_with_value(col_sizes, default_col_size)
  gap_size <- replace_default_with_value(gap_size, default_gap_size)

  empty_grid <- length(elements) == 0

  # Validate row and column sizes.
  sizes <- map_name_val(
    list(row = row_sizes, col = col_sizes),
    function(dir, sizes) {
      start_vals <- extract_dbl(elements, paste0("start_", dir))
      end_vals <- extract_dbl(elements, paste0("end_", dir))
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

        if (max(end_vals) != length(sizes)) {
          stop("The provided ", dir, " sizes need to match the number of ",
               dir, "s in your layout.\nIf you meant to have an empty ", dir,
               ", use the placeholder element \".\" to fill it.")
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

  # Remove any placeholder "." elements from elements list so we dont accidentally treat
  # them like true elements
  elements <- Filter(
    f = function(el) el$id != ".",
    x = elements
  )

  # Parse through all elements to see if they are collapsible. A collapsible
  # element is one that, if collapsed, will result in a shrinking of the page.
  # This only occurs when every row that the element occupies is 'auto' sized.
  for (i in seq_along(elements)) {
    rows_for_el <- sizes$row[elements[[i]]$start_row: elements[[i]]$end_row]
    elements[[i]]$collapsible = all(rows_for_el == "auto")
  }

  structure(
    list(
      elements = elements,
      row_sizes = sizes$row,
      col_sizes = sizes$col,
      container_height = container_height,
      gap_size = gap_size
    ),
    class = "gridlayout_template"
  )
}


is_gridlayout <- function(layout) {
  inherits(layout, "gridlayout")
}

# A markdown table is a single element character vector with pipes deliniating
# the cells. If we don't check for the pipes we can't distinguish between a
# single row array layout and and md table layout
is_md_table <- function(layout_def){
  length(layout_def) == 1L && str_detect(layout_def, "\\|")
}

as_gridlayout <- function(x){
  if (is.character(x)) return(new_gridlayout(x))
  if (is_gridlayout(x)) return(x)

  stop("Cant coerce a variable of class ", class(x), " to gridlayout")
}


#' @export
format.gridlayout_template <- function(
  x,
  ...,
  sizes_decorator = gridlayout:::italicize,
  elements_decorator = gridlayout:::emph
){

  table_text <- to_table(
    x,
    sizes_decorator = sizes_decorator,
    elements_dectorator = elements_decorator
  )

  paste(
    indent_text(table_text),
    "\nGap of ", italicize(get_info(x, "gap_size")), ".",
    " Total height of ", italicize(get_info(x, "container_height")),".",
    sep = ""
  )
}

#' @export
format.gridlayout <- function(x, ...) {

  lines <- c(
    emph("gridlayout"), " of ", length(get_element_ids(x)), " elements: \n",
    format.gridlayout_template(x$layout, ...)
  )

  if (length(x$alternates) != 0) {
    lines <- c(lines, "\n\nAlternate layouts:")
    for (alternate in x$alternates) {
      alternate_text <- paste(
        "\n\n- Width", print_size_range(alternate$width_bounds), "\n",
        format(alternate$layout, ...),
        collapse = ""
      )
      lines <- c(
        lines,
        indent_text(alternate_text)
      )
    }
  }
  paste(lines, collapse = "")
}

#' @export
print.gridlayout_template <- function(x, ...) {
  cat(format.gridlayout_template(x))
}

#' @export
print.gridlayout <- function(x, ...){
  cat(format.gridlayout(x))
}

# A separate function because it is also used in error messages for alternate
# layout adding
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



