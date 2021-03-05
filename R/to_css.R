#' Convert grid layout to css string
#'
#' @param layout Object of class `"gridlayout"`.
#' @param container Id of the element for grid to be placed in. Default value to
#'   apply grid styling to the whole app (aka the `body` element) for whole page
#'   grids
#' @param use_card_style Should each section of the grid be given a card style
#'   to make it stand out?
#' @param element_styles A list of named property-value pairs for additional
#'   styles to be added to each element. E.g. `element_styles = c("background" = "blue")`.
#' @param debug_mode If set to `TRUE` then each element of the grid will have an
#'   outline applied so positioning can more easily be assessed.
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
#' to_css(grid_obj)
#'
#' @export
to_css <- function(layout, container, use_card_style = TRUE, element_styles = c(), debug_mode = FALSE) {
  UseMethod("to_css")
}

#' @export
to_css.default <- function(layout, container, use_card_style = TRUE, element_styles = c(), debug_mode = FALSE){
  cat("to_css generic")
}

#' @export
to_css.gridlayout <- function(layout, container, use_card_style = TRUE, element_styles = c(), debug_mode = FALSE){
  # ...

  glue_nl <- function(...){
    as.character(glue::glue(..., .sep = "\n", .open = "[", .close = "]", .trim = FALSE))
  }
  container_query <- if(missing(container)) "body" else paste0("#", container)
  collapse_w_space <- function(vec) { paste(vec, collapse = " ") }

  template_areas <- ""
  for(row_i in 1:nrow(layout)){
    current_row <- collapse_w_space(layout[row_i,])
    template_areas <- paste0(template_areas, "\n    \"", current_row, "\"")
  }

  # Build the mapping for each element to its grid area. The simple "." denotes
  # an empty space so we need to filter that out
  all_elements <- unique(c(layout))
  element_grid_areas <- paste(
    sapply(
      all_elements[all_elements != "."],
      function(id){
        glue::glue("#[id] { grid-area: [id]; }", .open = "[", .close = "]")
      }
    ),
    collapse = "\n"
  )

  card_styles <- if(use_card_style) {
    glue_nl("",
            "  box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);",
            "  border-radius: 0.5rem;") } else {""}

  debug_styles <- if(debug_mode) glue_nl("", "  outline:1px solid black;") else ""

  extra_card_styles <- build_css_props(element_styles)

  glue_nl(
    "[container_query] {",
    "  display: grid;",
    "  grid-template-rows: [collapse_w_space(attr(layout, 'row_sizes'))];",
    "  grid-template-columns: [collapse_w_space(attr(layout, 'col_sizes'))];",
    "  grid-gap: [attr(layout, 'gap')];",
    "  padding: [attr(layout, 'gap')];",
    "  grid-template-areas:[template_areas];",
    "}",
    "",
    "[container_query] > * {",
    "  box-sizing: border-box;",
    "  padding: 0.8rem;[card_styles][debug_styles][extra_card_styles]",
    "}",
    "",
    "[element_grid_areas]")
}


#' Convert layout to css for Shiny
#'
#' This simply wraps the output of `to_css()` in a `style` tag and escapes HTML
#' characters to simplify using in Shiny
#'
#' @param layout_def Either a markdown table representation (see
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
#'     use_gridlayout(my_layout, "app-container"),
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
use_gridlayout <- function(layout_def, ...){
  if(inherits(layout_def, "character")){
    # If we were passed a string directly then convert to a grid layout before
    # proceeding
    layout_def <- md_to_gridlayout(layout_def)
  } else if(!inherits(layout_def, "gridlayout")){
    stop("Passed layout must either be a markdown table or a gridlayout object.")
  }
  htmltools::tags$head(
    htmltools::tags$style(
      htmltools::HTML(to_css(layout_def, ...))
    )
  )
}

# Builds string of properties from a named list of property values
build_css_props <- function(list_of_props){

  prop_names <- names(list_of_props)

  css_txt <- ""

  for(i in seq_along(list_of_props)){
    name <- prop_names[i]
    value <- list_of_props[i]
    css_txt <- paste0(css_txt, "  ", name, ": ", value, ";\n")
  }

  css_txt
}
