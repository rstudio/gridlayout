#' Convert grid layout to css string
#'
#' @param layout Object of class `"gridlayout"`.
#' @param container Id of the element for grid to be placed in. Default value to
#'   apply grid styling to the whole app (aka the `body` element) for whole page
#'   grids. If an simple name is passed it is assumed that it is an id: i.e. the
#'   css id selector `#` is apended to the name. If container contains css
#'   selector characters such as a dot, the selector will not be transformed
#'   into an id automatically. E.g. `container = ".main-content"`.
#' @param use_card_style Should each section of the grid be given a card style
#'   to make it stand out?
#' @param element_styles A list of named property-value pairs for additional
#'   styles to be added to each element. E.g. `element_styles = c("background" =
#'   "blue")`.
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
to_css <- function(layout, container, use_card_style = TRUE, element_styles = c(), debug_mode = FALSE, container_height = "viewport", selector_prefix = "#") {
  UseMethod("to_css")
}

#' @export
to_css.default <- function(layout, container, use_card_style = TRUE, element_styles = c(), debug_mode = FALSE, container_height = "viewport", selector_prefix = "#"){
  cat("to_css generic")
}

#' @export
to_css.gridlayout <- function(layout, container, use_card_style = TRUE, element_styles = c(), debug_mode = FALSE, container_height = "viewport", selector_prefix = "#"){

  container_query <- if(missing(container)){
    "body"
  }  else {
    has_css_selector <- grepl("\\.|#|>|\\+", container)

    if(has_css_selector) container else paste0("#", container)
  }

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

  collapse_w_space <- function(vec) { paste(vec, collapse = " ") }

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

  card_style_list <- if(use_card_style) {
    c("box-shadow" = "0 0 0.5rem rgb(0 0 0 / 35%)",
      "border-radius" = "0.5rem")
  } else {
    c()
  }

  debug_style_list <- if(debug_mode){
    c("outline" = "1px solid black")
  } else {
    c()
  }

  card_styles <- build_css_rule(
    selector = paste0(container_query, " > *"),
    prop_list = c(
      "box-sizing" = "border-box",
      "padding" = "0.8rem",
      "overflow" = "hidden",
      card_style_list,
      debug_style_list,
      element_styles
    )
  )

  paste(
    main_container_styles,
    card_styles,
    element_grid_areas,
    sep = "\n\n"
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
#' @return NULL
#' @export
#'
use_gridlayout_rmd <- function(){

  requireNamespace("knitr", quietly = TRUE)

  knitr::knit_engines$set(gridlayout = function(options) {
    code <- paste(options$code, collapse = "\n")
    if (options$eval) {
      layout <- md_to_gridlayout(code)
      css_for_layout <- paste(
        "<style>",
        to_css(layout, container = '.main-container', container_height = 'viewport'),
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

