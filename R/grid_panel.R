#' Panel for grid page
#'
#' @param ... Elements to include within the panel
#' @param v_align,h_align Vertical and Horizontal alignment of content in panel.
#'   Options include `"center", "start", "end", "stretch"`. These are a direct
#'   mapping to the the [css-spec for
#'   `justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)
#'    (=`h_align`) and
#'   [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
#'    (= `v_align`).
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with `class =
#'   "grid_panel"` and vertical/horizontal alignment css applied.
#' @export
#'
#' @examples
#'
#' # Simply a wrapper for shiny::div(...)
#' grid_panel(
#'   shiny::h2("R"),
#'   v_align = "center",
#'   h_align = "center"
#' )
#'
#' if (interactive()) {
#'
#' library(gridlayout)
#' library(shiny)
#' requireNamespace("bslib", quietly = TRUE)
#' requireNamespace("fontawesome", quietly = TRUE)
#' my_layout <- "
#' |      |        |       |
#' |------|--------|-------|
#' |2rem  |200px   |1fr    |
#' |80px  |header  |header |
#' |1fr   |sidebar |content|"
#'
#' content_layout <- "
#' |    |         |            |
#' |----|---------|------------|
#' |    |1fr      |4fr         |
#' |1fr |icon     |bin_chooser |
#' |4fr |settings |plot        |"
#'
#' # The classic Geyser app with grid layout
#' app <- shinyApp(
#'   ui = grid_page(
#'     layout = my_layout,
#'     theme = bslib::bs_theme(),
#'     header = gridlayout::grid_panel(
#'       h2(id = "header", "This is my header content"),
#'       v_align = "center"
#'     ),
#'     sidebar = p("Here is my sidebar and all the content that may be desired within it!"),
#'     content = grid_container(
#'       id = "content",
#'       layout = content_layout,
#'       elements = list(
#'         icon = grid_panel(
#'           h2(fontawesome::fa("r-project", fill = "steelblue"), height = "80px"),
#'           v_align = "center",
#'           h_align = "center"
#'         ),
#'         bin_chooser = grid_panel(
#'           sliderInput("bins", label = "Number of bins", min = 1, max = 50, value = 30),
#'           v_align = "center"
#'         ),
#'         settings = textOutput('current_bin_num'),
#'         plot = plotOutput("distPlot", height = "100%")
#'       )
#'     )
#'   ),
#'   server = function(input, output) {
#'     output$distPlot <- renderPlot({
#'       x    <- faithful[, 2]
#'       bins <- seq(min(x), max(x), length.out = input$bins + 1)
#'       hist(x, breaks = bins, col = 'darkgray', border = 'white')
#'     })
#'     output$current_bin_num <- renderText({
#'       paste("There are currently", input$bins, "bins in our histogram.")
#'     })
#'   }
#' )
#' }
#'
grid_panel <- function(..., v_align, h_align) {
  panel_styles <- c(
    display = "grid",
    if (!missing(h_align)) {
      validate_alignment(h_align)
      c("justify-content" = h_align)
    },
    if (!missing(v_align)) {
      validate_alignment(v_align)
      c("align-content" = v_align)
    }
  )
  shiny::div(
    style = build_css_rule("inline", panel_styles),
    class = "grid_panel",
    ...
  )
}

validate_alignment <- function(arg_val) {
  # These are just the options available to the css properties justify-self
  # (horizontal alignment) and align-self (vertical alignment)
  align_options <- c("start", "end", "center", "stretch")

  if (!arg_val %in% align_options) {
    stop("Alignment argument must be one of ", paste(align_options, collapse = ", "))
  }
}
