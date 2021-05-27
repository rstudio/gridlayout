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
#' @param element_styles A list of named property-value pairs ( E.g.
#'   `element_styles = c("background" = "blue")`.) for additional styles to be
#'   added to each first child element of the grid container. E.g. under the css
#'   selector of `grid_container > *`. If `is_card_styled = "all"` then this has
#'   the same purpose as as `additional_card_styles`
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
#'
#' @export
to_css <- function(
  layout,
  container,
  is_card_styled = "grid_panel",
  element_styles = c(),
  selector_prefix = "#"
){
  container_query <- if(missing(container)){
    "body"
  }  else {
    has_css_selector <- grepl("\\.|#|>|\\+", container)

    if(has_css_selector) container else paste0("#", container)
  }

  all_grid_els_selector <- paste0(container_query," > *")

  accessory_css <- get_accessory_css("gridlayout.css")
  if (is_card_styled == "all") {
    # Make .grid_panel simply apply to every first-level div
    accessory_css <- str_replace_all(
      accessory_css,
      ".grid_panel",
      all_grid_els_selector,
      fixed = TRUE
    )
  }

  # User-defined styles for all the grid-elements. Goes after the accessory
  # rules so they can override any desired properties
  all_elements_styles <- build_css_rule(
    selector = all_grid_els_selector,
    element_styles
  )

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
      collapse = "\n\n"
    )
  } else ""


  paste(
    layout_rules,
    accessory_css,
    alternative_layout_queries,
    all_elements_styles,
    sep = "\n\n"
  )
}


generate_layout_rules <- function(
  layout,
  container_query,
  selector_prefix,
  width_bounds = NULL
){

  main_container_styles <- build_css_rule(
    selector = container_query,
    prop_list = c(
      "display" = "grid",
      "grid-template-rows" = collapse_w_space(get_info(layout, 'row_sizes')),
      "grid-template-columns" = collapse_w_space(get_info(layout, 'col_sizes')),
      "grid-gap" = get_info(layout, 'gap'),
      "padding" = get_info(layout, 'gap'),
      "height" = validCssUnit(get_info(layout, "container_height"))
    )
  )

  # Build the mapping for each element to its grid area.
  element_grid_areas <- paste(
    sapply(
      get_info(layout, "elements"),
      function(el){
        build_css_rule(
          selector = paste0(selector_prefix, el$id),
          prop_list = c(
            "grid-column-start" = el$start_col,
            "grid-column-end" = el$end_col + 1,
            "grid-row-start" = el$start_row,
            "grid-row-end" = el$end_row + 1,
            "--collapsible-visibility" = if (el$collapsible) "block" else "none",
            "--collapsed-content-size" = if (el$collapsible) "0" else "1fr",
            "--collapsed-panel-height" = if (el$collapsible) "min-content",
            "--collapsed-panel-overflow" = if (el$collapsible) "hidden"
          )
        )
      }
    ),
    collapse = "\n"
  )

  media_query_open <- ""
  media_query_close <- ""
  if (notNull(width_bounds)) {
    has_min <- doesExist(width_bounds["min"])
    has_max <- doesExist(width_bounds["max"])
    media_query_open <- paste0(
      "@media ",
      if (has_min) paste0("(min-width: ", width_bounds["min"],")"),
      if (has_max && has_min) " and ",
      if (has_max) paste0("(max-width:", width_bounds["max"], ")"),
      " {"
    )

    media_query_close <- "}"
  }

  paste(
    media_query_open,
    main_container_styles,
    element_grid_areas,
    media_query_close,
    sep = "\n\n"
  )
}


#' Build css properties named or unnamed list of property values
#'
#' @param selector valid css selector to target. E.g. `body` or
#'   `div.blue_boxes`... For inline styles where no selector is desired use
#'   `"inline"`.
#' @param prop_list A list of property-value pairs for additional styles to be
#'   added to each element. Pairs can be given as named elements: e.g.
#'   `element_styles = c("background" = "blue")`. See [htmltools::css] for rules
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
#'
#' my_layout <- "
#' |      |        |         |
#' |------|--------|---------|
#' |2rem  |200px   |1fr      |
#' |100px |header  |header   |
#' |1fr   |sidebar |distPlot |"
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = fluidPage(
#'     use_gridlayout_shiny(my_layout, "app-container"),
#'     div(
#'       id = "app-container",
#'       div(id = "header",
#'           h2(id = "app-title", "Old Faithful Geyser Data")
#'       ),
#'       div(id = "sidebar",
#'           sliderInput("bins","Number of bins:",
#'                       min = 1, max = 50, value = 30)
#'       ),
#'       plotOutput("distPlot")
#'     )
#'   ),
#'   server = function(input, output) {
#'     output$distPlot <- renderPlot({
#'       x    <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = 'darkgray', border = 'white')
#'     })
#'   }
#' )
#' }
use_gridlayout_shiny <- function(layout, ...){
  requireNamespace("htmltools", quietly = TRUE)
  layout <- as_gridlayout(layout)
  htmltools::tags$head(
    htmltools::tags$style(
      htmltools::HTML(to_css(layout, ...))
    ),
    htmltools::includeScript(system.file("resources/gridlayout.js", package = "gridlayout"))
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
use_gridlayout_rmd <- function(
  container = '.main-container',
  is_card_styled = "all",
  element_styles = NULL,
  selector_prefix = "#"
  ){

  requireNamespace("knitr", quietly = TRUE)

  knitr::knit_engines$set(gridlayout = function(options) {
    code <- paste(options$code, collapse = "\n")
    if (options$eval) {
      layout <- md_to_gridlayout(code)
      css_for_layout <- paste(
        "<style>",
        to_css(layout,
               container = container,
               is_card_styled = is_card_styled,
               element_styles = c(
                 element_styles,
                 "display" = "block",
                 "padding" = "var(--card-padding)"
               )
        ),
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
get_accessory_css <- function(file){
  paste(
    readLines(system.file(paste0("resources/", file), package = "gridlayout")),
    collapse = "\n"
  )
}
