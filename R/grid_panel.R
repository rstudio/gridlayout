#' Panel for grid page
#'
#' @param ... Elements to include within the panel
#' @param use_card_style Should the element contained in panel be made to look
#'   like an enclosed card?
#' @param use_bslib_card_styles Should the card styles from bslib be used
#'   instead of default `gridlayout` card styles? If this is set to `TRUE` it
#'   will override `use_card_style`.
#' @param collapsable Should the card be able to be collapsed? Only really
#'   functional when panel takes up entire width of page. Requires a title so
#'   the user knows what panel is in collapsed state.
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
grid_panel <- function(
  ...,
  v_align = "stretch", h_align = "stretch",
  title = NULL,
  use_card_styles = TRUE,
  use_bslib_card_styles = FALSE,
  collapsable = FALSE
) {

  panel_styles <- make_alignment_styles(h_align = h_align, v_align = v_align)
  card_styling_class <- make_card_classes(use_card_styles, use_bslib_card_styles)

  no_title <- is.null(title)
  if (collapsable && no_title) stop("Collapsable cards need a title")

  if (no_title) {
    shiny::div(
      class = paste("grid_panel panel-content", card_styling_class),
      style = panel_styles,
      ...
    )
  } else {
    shiny::div(
      class = paste("grid_panel", card_styling_class),
      shiny::div(
        class = "panel-title",
        h3(title),
        if (collapsable) make_collapser_icon(),
        style = if (collapsable) "justify-content: space-between;"
      ),
      shiny::div(..., style = panel_styles, class = "panel-content")
    )
  }
}

make_card_classes <- function(use_card_styles, use_bslib_card_styles) {
  if (use_bslib_card_styles) {
    "card"
  } else if (use_card_styles) {
    "gridlayout-card"
  } else {
    ""
  }
}

make_alignment_styles <- function(v_align, h_align) {
  build_css_rule(
    "inline",
    c(
      if (!missing(h_align)) {
        validate_alignment(h_align)
        c("justify-content" = h_align)
      },
      if (!missing(v_align)) {
        validate_alignment(v_align)
        c("align-content" = v_align)
      }
    )
  )
}

make_collapser_icon <- function(parent_id = "") {
  shiny::span(
    fontawesome::fa("chevron-up"),
    "onclick" = '
    var card = this.parentElement.parentElement;
    var card_content = card.querySelector(".panel-content");
    var card_classes = card.classList;
    if (card_classes.contains("collapsed")) {
      card_classes.remove("collapsed");
      card_content.style.display = "unset";
    } else {
      card_classes.add("collapsed");
      card_content.style.display = "none";
    }
    '
  )
}

#' Make header panel
#'
#' This is just a helper function that wraps your content in a vertically
#' centered header (`h2`) tag.
#'
#' @param title_content Whatever you want the title to say. If you want to
#'   include things other than text, like an image, you can pass a tag-list or
#'   span tag.
#' @inheritDotParams grid_panel
#'
#' @examples
#'
#' # Typically you'll just pass a character string to the function
#' title_panel("This is my header")
#'
#' # You can adjust the horizontal alignment of your header with h_align
#' title_panel("I'm on the right side!", h_align = "end")
#'
#' # If you want more than just text in your title, just wrap content in a span tag
#' requireNamespace("fontawesome", quietly = TRUE)
#' title_panel(
#'   htmltools::span(
#'     fontawesome::fa("r-project", fill = "steelblue"),
#'     "This is my header"
#'   )
#' )
#'
#' @export
title_panel <- function(title_content,
                        ...) {
  grid_panel(
    h2(title_content, style = "margin: 0;"),
    v_align = "center",
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
