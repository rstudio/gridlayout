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
#' @param additional_card_styles A list of named property-value pairs for
#'   additional styles to be added to each card-element (as defined by
#'   `is_card_styled`. E.g. `element_styles = c("background" = "blue")`.
#' @param element_styles A list of named property-value pairs for additional
#'   styles to be added to each first child element of the grid container. E.g.
#'   under the css selector of `grid_container > *`. If `is_card_styled = "all"`
#'   then this has the same purpose as as `additional_card_styles`
#' @param debug_mode If set to `TRUE` then each element of the grid will have an
#'   outline applied so positioning can more easily be assessed.
#' @param container_height How tall should the grid-containing element be? If
#'   set to `"viewport"` then the container will take up the entire available
#'   vertical space (equivalent to the CSS value of `100vh`). For nested grids a
#'   value of `"100%"` will enable the the nested grid to take up the full
#'   vertical space provided by its parent container. Any other css size unit is
#'   also valid such as `"400px"` or `"100%"`.
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
to_css <- function(layout, ...) {
  UseMethod("to_css")
}

#' @export
to_css.default <- function(layout, ...){
  cat("to_css generic")
}

#' @export
to_css.gridlayout <- function(
  layout,
  container,
  is_card_styled = "grid_panel",
  element_styles = c(),
  container_height = "viewport",
  selector_prefix = "#"
){
  container_query <- if(missing(container)){
    "body"
  }  else {
    has_css_selector <- grepl("\\.|#|>|\\+", container)

    if(has_css_selector) container else paste0("#", container)
  }

  all_grid_els_selector <- paste0(container_query," > *")

  accessory_css <- paste(readLines(system.file("resources/gridlayout.css", package = "gridlayout")), collapse = "\n")
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
    container_height = container_height,
    selector_prefix = selector_prefix
  )


  alternative_layout_queries <- ""
  if (notNull(attr(layout, "alternates"))) {

    alternative_layout_queries <- paste(
      lapply(
        attr(layout, "alternates"),
        function(alt_layout) {
          generate_layout_rules(
            layout = alt_layout$layout,
            container_query = container_query,
            container_height = container_height,
            selector_prefix = selector_prefix,
            bounds = alt_layout$bounds
          )
        }
      ),
      collapse = "\n\n"
    )
  }


  paste(
    layout_rules,
    alternative_layout_queries,
    accessory_css,
    all_elements_styles,
    sep = "\n\n"
  )
}


generate_layout_rules <- function(
  layout,
  container_query,
  container_height,
  selector_prefix,
  bounds = NULL
){

  main_container_styles <- build_css_rule(
    selector = container_query,
    prop_list = c(
      "display" = "grid",
      "grid-template-rows" = collapse_w_space(attr(layout, 'row_sizes')),
      "grid-template-columns" = collapse_w_space(attr(layout, 'col_sizes')),
      "grid-gap" = attr(layout, 'gap'),
      "padding" = attr(layout, 'gap'),
      "height" = if(container_height == "viewport") "100vh" else validCssUnit(container_height)
    )
  )

  # Build the mapping for each element to its grid area.
  element_grid_areas <- paste(
    sapply(
      layout,
      function(el){
        build_css_rule(
          selector = paste0(selector_prefix, el$id),
          prop_list = c(
            "grid-column-start" = el$start_col,
            "grid-column-end" = el$end_col + 1,
            "grid-row-start" = el$start_row,
            "grid-row-end" = el$end_row + 1)
        )
      }
    ),
    collapse = "\n"
  )

  media_query_open <- ""
  media_query_close <- ""
  if (notNull(bounds)) {
    browser()
    media_query_open <- paste0(
      "@media ",
      if (notNull(bounds$lower)) paste0("(min-width: ", bounds$lower,")"),
      if (notNull(bounds$upper) && notNull(bounds$lower)) " and ",
      if (notNull(bounds$upper)) paste0("(max-width:", bounds$upper, ")"),
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


grid_panel_styles <- "
.grid_panel .panel-title {
  height: var(--card-title-height);
  width: calc(100% + 2*var(--card-padding));
  padding: calc(0.5 * var(--card-padding)) var(--card-padding);
  margin-left: calc(-1 * var(--card-padding));
  margin-top: calc(-1 * var(--card-padding));
  border-bottom: 1px solid #dae0e5;
  display: flex;
  justify-content: start;
  align-items: center;
}

.grid_panel .panel-title > h3 {
  margin: 0;
  height: 100%;
}

.grid_panel .panel-title > svg {
  outline: 1px solid red;
}

.grid_panel.collapsed  {
  height: var(--card-title-height);
  overflow: hidden;
}

.grid_panel.collapsed .panel-content {
  display: none;
}
"


#' Convert layout to css for Shiny
#'
#' This simply wraps the output of `to_css()` in a `style` tag and escapes HTML
#' characters to simplify using in Shiny. Most of the time you'll want to use
#' \code{\link{grid_page}} or \code{\link{grid_container}} instead of manually
#' adding this css though.
#'
#' @seealso \code{\link{to_css}}, \code{\link{grid_page}}, \code{\link{grid_container}}
#' @param layout Either a markdown table representation (see
#'   \code{\link{md_to_gridlayout}}) or a `gridlayout` object defining the
#'   desired layout for your Shiny app.
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
  layout <- coerce_to_layout(layout)
  htmltools::tags$head(
    htmltools::tags$style(
      htmltools::HTML(to_css(layout, ...))
    )
  )
}

#' Enable gridlayout usage in RMarkdown documents
#'
#' Adds required hooks to RMarkdown to process `gridlayout` chunks and style document accordingly.
#'
#' @inheritParams to_css
#' @inheritDotParams to_css -layout
#'
#' @return NULL
#' @export
#'
use_gridlayout_rmd <- function(
  container = '.main-container',
  container_height = 'viewport',
  is_card_styled = "all",
  ...
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
               container_height = container_height,
               is_card_styled = is_card_styled,
               ...
               ),
        rmd_utility_css,
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

# Makes tab panels work properly and gives utility classes for alignment
rmd_utility_css <- "
.tabbable { height: 100% }
.tabbable > .nav { height: 42px; }
.tabbable .tab-content { height: calc(100% - 42px); }
.tabbable .tab-pane { height: 100%; }

.section.no-header > h1:first-child {
  display: none;
}

.section.v_start,
.section.v_center,
.section.v_end,
.section.h_start,
.section.h_center,
.section.h_end {
  display: grid;
}

.section.v_start  { align-items: start; }
.section.v_center { align-items: center; }
.section.v_end    { align-items: end; }

.section.h_start  { justify-items: start; }
.section.h_center { justify-items: center; }
.section.h_end    { justify-items: end; }
"

make_card_styles <- function(bslib_styles = FALSE) {
  # Taken from here
  # https://github.com/rstudio/bslib/blob/master/inst/lib/bs/scss/_card.scss The
  # reason this is being generated here instead of simply applying the card
  # class is that we want to be able to put these styles inline, which is not
  # fully possible without bslib present.


  bs_get_variables(
    bs_theme(),
    c("card-border-width", "card-border-color")
  )
}

