#' Convert grid layout to css string
#'
#' @param layout Object of class `"gridlayout"`.
#' @param container_key The unique key used to identify the container to be
#'   targeted for the layout. If left blank it will default to applying grid
#'   styling to the whole app (aka the `body` element) for whole page grids. If
#'   plain character string is given, then it is assumed to be a
#'   `gridlayout-key` and the targeting is done using an attribute query for
#'   `data-gridlayout-key`. If container contains css selector characters such as
#'   a dot, the selector will not be transformed into an id automatically. E.g.
#'   `container = ".main-content"`.
#' @param is_card_styled Should each section of the grid be given a card style
#'   to make it stand out? Options are `"grid_panel"`, where only elements with
#'   `"grid_panel"` class will get card styling, `"all"` where all children of
#'   the grid container will get card styling (useful for RMarkdown or other
#'   situations where you don't control child rendering) or `"none"` for no card
#'   styling.
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
                   container_key,
                   is_card_styled = "grid_panel") {

  container_query <- if (missing(container_key)) {
    "body"
  } else {
    has_css_selector <- grepl("\\.|#|>|\\+", container_key)

    if (has_css_selector) {
      container_key
    }
    else {
      paste0("div[data-gridlayout-key=\"", container_key, "\"]")
    }
  }

  layout_rules <- generate_layout_rules(
    layout = layout,
    container_query = container_query
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

# Currently the only item specific css pertains to enabling the collapsing of
# the panel.
generate_element_specific_css <- function(layout, container_query){

  # Only need to supply styles for the items that can be collapsed
  collapsible_items <- Filter(
    function(item) item$collapsible,
    get_info(layout, "elements")
  )

  vapply(
    collapsible_items,
    function(item) {
      build_css_rule(
        selector =  paste0(container_query, " > ", "div[data-gridlayout-area=\"", item$id ,"\"]"),
        prop_list = c(
          "--collapsible-visibility" = "block" ,
          "--collapsed-content-size" = "0",
          "--collapsed-panel-height" = "min-content",
          "--collapsed-panel-overflow" = "hidden"
        )
      )
    },
    FUN.VALUE = character(1L)
  )
}

generate_layout_rules <- function(layout,
                                  container_query,
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

  item_specific_rules <- generate_element_specific_css(layout, container_query)

  element_styles <- paste(
    main_container_styles,
    item_specific_rules,
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

