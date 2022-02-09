#' Convert grid layout to css string
#'
#' @param layout Object of class `"gridlayout"`.
#' @param container Id of the element for grid to be placed in. Default value to
#'   apply grid styling to the whole app (aka the `body` element) for whole page
#'   grids. If an simple name is passed it is assumed that it is an id: i.e. the
#'   css id selector `#` is apended to the name. If container contains css
#'   selector characters such as a dot, the selector will not be transformed
#'   into an id automatically. E.g. `container = ".main-content"`.
#' @param is_card_styled Should each section of the grid be given a card style
#'   to make it stand out? Options are `"grid_panel"`, where only elements with
#'   `"grid_panel"` class will get card styling, `"all"` where all children of
#'   the grid container will get card styling (useful for RMarkdown or other
#'   situations where you don't control child rendering) or `"none"` for no card
#'   styling.
#' @param selector_prefix CSS prefix used to target grid elements. This will
#'   change if you're integrating grid with a system that you don't want to use
#'   ids (the `"#"` prefix) with because they are not available or are used for
#'   other reasons.
#'
#' @return Character string of css used to setup grid layout and place elements
#'   (referenced by id) into correct locations
#'
#' @examples
#'
#' grid_obj <- md_to_gridlayout(
#'   layout_table = "
#'     |      |120px   |1fr    |1fr    |
#'     |:-----|:-------|:------|:------|
#'     |100px |header  |header |header |
#'     |1fr   |sidebar |plot_a |plot_c |
#'     |1fr   |sidebar |plot_b |plot_b |"
#' )
#'
#' cat(to_css(grid_obj))
#' @export
to_css <- function(layout,
                   container,
                   is_card_styled = "grid_panel",
                   selector_prefix = "#") {
  container_query <- if (missing(container)) {
    "body"
  } else {
    has_css_selector <- grepl("\\.|#|>|\\+", container)

    if (has_css_selector) container else paste0("#", container)
  }

  layout_rules <- generate_layout_rules(
    layout = layout,
    container_query = container_query,
    selector_prefix = selector_prefix
  )

  alternates <- get_info(layout, "alternates")
  alternative_layout_queries <- if (length(alternates) > 0) {
    paste(
      lapply(
        alternates,
        function(alt_layout) {
          generate_layout_rules(
            layout = alt_layout$layout,
            container_query = container_query,
            selector_prefix = selector_prefix,
            width_bounds = alt_layout$width_bounds
          )
        }
      ),
      collapse = "\n"
    )
  } else {
    ""
  }

  paste(
    layout_rules,
    alternative_layout_queries,
    "", # Make sure we end on a space
    sep = "\n\n"
  )
}

toTemplateGridAreas <- function(layout){
  # Get spacing right thanks for text.format building padding
  layout_mat <- apply(to_matrix(layout), FUN = format, MARGIN = 2)

  # Single row/col matrices get reverted to vectors here so force back to a matrix
  layout_mat <- matrix(
    layout_mat,
    nrow = length(get_info(layout, "row_sizes")),
    ncol = length(get_info(layout, "col_sizes"))
  )

  # Indent text so it's easier to read in the css
  paste0(
    "\n",
    indent_text(
      paste(
        apply(layout_mat,
              FUN = function(x) paste0("\"", paste(x, collapse = " "), "\""),
              MARGIN = 1),
        collapse="\n"
      )
    )
  )
}

generate_layout_rules <- function(layout,
                                  container_query,
                                  selector_prefix,
                                  width_bounds = NULL) {

  main_container_styles <- build_css_rule(
    selector = container_query,
    prop_list = c(
      "display" = "grid",
      "grid-template-rows" = collapse_w_space(get_info(layout, "row_sizes")),
      "grid-template-columns" = collapse_w_space(get_info(layout, "col_sizes")),
      "grid-template-areas" = toTemplateGridAreas(layout),
      "grid-gap" = get_info(layout, "gap"),
      "padding" = get_info(layout, "gap"),
      "height" = validCssUnit(get_info(layout, "container_height"))
    )
  )

  element_styles <- paste(
    main_container_styles,
    sep = "\n"
  )

  # Aka is this a recursive call of this function for generating media query styles
  within_media_query <- notNull(width_bounds)
  media_query_open <- ""
  media_query_close <- ""
  if (within_media_query) {
    has_min <- doesExist(width_bounds["min"])
    has_max <- doesExist(width_bounds["max"])
    media_query_open <- paste0(
      "@media ",
      if (has_min) paste0("(min-width: ", width_bounds["min"], ")"),
      if (has_max && has_min) " and ",
      if (has_max) paste0("(max-width:", width_bounds["max"], ")"),
      " {"
    )

    media_query_close <- "}"
    # Give element styles indentation so they visually stand out if inspected
    element_styles <- indent_text(element_styles)
  }

  paste(
    media_query_open,
    element_styles,
    media_query_close,
    sep = "\n"
  )
}


#' Build css properties named or unnamed list of property values
#'
#' @param selector valid css selector to target. E.g. `body` or
#'   `div.blue_boxes`... For inline styles where no selector is desired use
#'   `"inline"`.
#' @param prop_list A list of property-value pairs for additional styles to be
#'   added to each element. Pairs can be given as named elements: e.g.
#'   `prop_list = c("background" = "blue")`. See [htmltools::css] for rules
#'   on formatting.
#'
#' @return A concatenated string of property values to be used inside a css
#'   selector. If the `prop_list` is empty, an empty string (`""`) is returned
#'   to avoid placing empty css rules on the webpage.
build_css_rule <- function(selector, prop_list) {
  # Empty css rules are best avoided
  if (length(prop_list) == 0) {
    return("")
  }

  css_text <- do.call(
    htmltools::css,
    as.list(c(prop_list, collapse_ = "\n"))
  )

  paste0(
    selector,
    " {\n",
    indent_text(css_text),
    "\n}"
  )
}

#' Convert layout to css for Shiny
#'
#' This simply wraps the output of `to_css()` in a `style` tag and escapes HTML
#' characters to simplify using in Shiny. Most of the time you'll want to use
#' \code{\link{grid_page}} or \code{\link{grid_container}} instead of manually
#' adding this css though.
#'
#' @seealso \code{\link{to_css}}, \code{\link{grid_page}}, \code{\link{grid_container}}
#' @inheritParams grid_container
#' @inheritDotParams to_css -layout
#'
#' @return Character string of css used to setup grid layout and place elements
#'   (referenced by id) into correct locations
#'
#' @export
#'
#' @examples
#' # Only run these examples in interactive R sessions
#' if (interactive()) {
#'   my_layout <- "
#' |      |        |         |
#' |------|--------|---------|
#' |2rem  |200px   |1fr      |
#' |100px |header  |header   |
#' |1fr   |sidebar |distPlot |"
#'
#'   # The classic Geyser app with grid layout
#'   shinyApp(
#'     ui = fluidPage(
#'       use_gridlayout_shiny(my_layout, "app-container"),
#'       div(
#'         id = "app-container",
#'         div(
#'           id = "header",
#'           h2(id = "app-title", "Old Faithful Geyser Data")
#'         ),
#'         div(
#'           id = "sidebar",
#'           sliderInput("bins", "Number of bins:",
#'             min = 1, max = 50, value = 30
#'           )
#'         ),
#'         plotOutput("distPlot")
#'       )
#'     ),
#'     server = function(input, output) {
#'       output$distPlot <- renderPlot({
#'         x <- faithful[, 2]
#'         bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'         hist(x, breaks = bins, col = "darkgray", border = "white")
#'       })
#'     }
#'   )
#' }
use_gridlayout_shiny <- function(layout, ...) {
  requireNamespace("htmltools", quietly = TRUE)
  layout <- as_gridlayout(layout)
  htmltools::tags$head(
    htmltools::tags$style(
      htmltools::HTML(to_css(layout, ...))
    )
  )
}

#' Enable gridlayout usage in RMarkdown documents
#'
#' Adds required hooks to RMarkdown to process `gridlayout` chunks and style
#' document accordingly. Layout will be generated from a chunk identified with
#' the syntax
#' ````
#' ```{gridlayout}
#' <insert layout table here>
#' ```
#' ````
#'
#' See `vignette("using_with_rmd", package = "gridlayout")` for a more in-depth overview.
#'
#' @inheritParams to_css
#'
#' @return NULL
#' @export
#'
use_gridlayout_rmd <- function(container = ".main-container",
                               is_card_styled = "all",
                               selector_prefix = "#") {
  requireNamespace("knitr", quietly = TRUE)

  accessory_css <- get_accessory_css("gridlayout.css")
  if (is_card_styled == "all") {
    # Make .grid_panel simply apply to every first-level div
    accessory_css <- str_replace_all(
      accessory_css,
      ".grid_panel",
      paste0(container, " > div"),
      fixed = TRUE
    )
  }

  knitr::knit_engines$set(gridlayout = function(options) {
    code <- paste(options$code, collapse = "\n")
    if (options$eval) {
      layout <- md_to_gridlayout(code)
      css_for_layout <- paste(
        "<style>",
        to_css(layout,
          container = container,
          is_card_styled = is_card_styled,
          selector_prefix = selector_prefix
        ),
        # Make sure all the elements have the proper padding they need
        build_css_rule(
          paste(container, "> div"),
          prop_list = c(
            padding = "var(--card-padding)"
          )
        ),
        accessory_css,
        # Makes tab panels work properly and gives utility classes for alignment
        get_accessory_css("gridlayout_rmd_styles.css"),
        "</style>",
        sep = "\n"
      )
    }
    options$results <- "asis"
    options$echo <- FALSE
    knitr::engine_output(
      options,
      code = options$code,
      out = css_for_layout
    )
  })
}

# Dump css file to string for inlining while still keeping in a .css file for
# easier editing
get_accessory_css <- function(file) {
  paste(
    readLines(system.file(paste0("resources/", file), package = "gridlayout")),
    collapse = "\n"
  )
}

# handle dependency
gridlayout_css_dep <- function() {
  htmltools::htmlDependency(
    name = "gridlayout_css",
    package = "gridlayout",
    src = "resources",
    stylesheet = "gridlayout.css",
    script = "gridlayout.js",
    version = "1.0"
  )
}
