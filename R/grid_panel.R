#' Panel for grid page element
#'
#' Allows you to customize the appearance of an element within your gridlayout.
#' When using [grid_page] or [grid_container] all items will be automatically
#' wrapped in this function with default values. However, if further
#' customization is needed you can do this wrapping yourself. Some examples of
#' things you can customize are settings a specific element to use a given card
#' style, or to align the content of the card vertically or horizontally.
#'
#' @param area Name of grid area, should match an area defined in the layout
#'   section of the wrapping `grid_page()` or `grid_container()`.
#' @param ... Elements to include within the panel
#' @param title Character string to go across top of panel with label. If left
#'   blank the card contents will take up entire space.
#' @param use_card_styles Should the element contained in panel be made to look
#'   like an enclosed card?
#' @param use_bslib_card_styles Should the card styles from bslib be used
#'   instead of default `gridlayout` card styles? If this is set to `TRUE` it
#'   will override `use_card_style`.
#' @param collapsible Should the card be able to be collapsed (`TRUE` or
#'   `FALSE`)? Gridlayout will only show collapser if the layout allows it
#'   (panel is entirely positioned within "auto" sized rows, and has a title).
#'   Setting this to `FALSE` will mean collapsibility of the panel will never be
#'   enabled, regardless of layout.
#' @param scrollable Should scroll-bars be added so content that is larger than
#'   the panel can be seen?
#' @param v_align,h_align Vertical and Horizontal alignment of content in panel.
#'   Options include `"center", "start", "end", "stretch"`. These are a direct
#'   mapping to the the [css-spec for
#'   `justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items)
#'    (=`h_align`) and
#'   [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
#'    (= `v_align`).
#' @param panel_id ID of `grid_panel` div. Usually this is automatically set by
#'   `grid_page()` or `grid_container()`.
#' @param panel_class Class(es) of `grid_panel` div. Like `panel_id` this is
#'   typically automatically generated and should only be touched in advanced
#'   usage.
#' @param padding A valid css size that overrides the default of how much
#'   spacing is around the card contents
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with `class =
#'   "grid_panel"` and vertical/horizontal alignment css applied.
#'
#' @seealso [grid_panel_text]
#' @export
#'
#' @examples
#'
#' # Simply a wrapper for shiny::div(...)
#' grid_panel(
#'   area="header",
#'   shiny::h2("R"),
#'   v_align = "center",
#'   h_align = "center"
#' )
#'
#' if (interactive()) {
#'
#' library(gridlayout)
#' library(shiny)
#'
#' # The classic Geyser app with grid layout
#' shinyApp(
#'   ui = grid_page(
#'     layout = "
#'       |2rem  |200px   |1fr    |
#'       |85px  |header  |header |
#'       |1fr   |sidebar |plot   |",
#'     grid_panel("header", h1("Geysers!")),
#'     grid_panel(
#'       "sidebar",
#'       title = "Settings",
#'       sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%")
#'     ),
#'     grid_panel(
#'       "plot",
#'       plotOutput("distPlot", height="100%")
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
#'
grid_panel <- function(
  area,
  ...,
  v_align = NULL,
  h_align = NULL,
  title = NULL,
  use_card_styles = TRUE,
  use_bslib_card_styles = FALSE,
  collapsible = TRUE,
  scrollable = FALSE,
  panel_id = NULL,
  panel_class = make_panel_classes(use_card_styles, use_bslib_card_styles),
  padding = NULL
) {
  contents <- list(...)

  panel_styles <- htmltools::css(
    display = if (notNull(h_align) || notNull(v_align)) "grid",
    `justify-items` = if (notNull(h_align)) validate_alignment(h_align),
    `align-items` = if (notNull(v_align)) validate_alignment(v_align),
    overflow = if (scrollable) "scroll",
    `--card-padding` = if(notNull(padding)) padding
  )

  has_title <- notNull(title)
  use_collapser <- collapsible && has_title

  shiny::div(
    id = panel_id,
    class = panel_class,
    style= htmltools::css(`grid-area` = area),
    `data-gridlayout-area` = area,
    if (has_title) {
      shiny::div(
        class = "title-bar",
        shiny::h3(title),
        if (use_collapser) make_collapser_icon(),
        style = if (use_collapser) "justify-content: space-between;"
      )
    },
    shiny::div(contents, style = panel_styles, class = "panel-content")
  )
}



# Build the class list for the panel based on the desired card styles
make_panel_classes <- function(use_card_styles, use_bslib_card_styles) {
  card_styling_class <- if (use_bslib_card_styles) {
    "card"
  } else if (use_card_styles) {
    "gridlayout-card"
  } else {
    ""
  }
  paste("grid_panel", card_styling_class)
}

make_collapser_icon <- function(parent_id = "") {
  requireNamespace("fontawesome", quietly = TRUE)
  # Clicking on the collapsing icon will update classes to initiate collapsing
  # or expanding and also trigger a resize event so Shiny will know to update
  # plots that may have gotten more space after collapsing etc.
  shiny::span(
    fontawesome::fa("chevron-up"),
    "onclick" = '
    var card = this.parentElement.parentElement;
    var card_classes = card.classList;
    if (card_classes.contains("collapsed")) {
      card_classes.remove("collapsed");
    } else {
      card_classes.add("collapsed");
    }
    window.dispatchEvent(new Event("resize"));
    ',
    class = "collapser-icon"
  )
}


validate_alignment <- function(arg_val) {
  # These are just the options available to the css properties justify-self
  # (horizontal alignment) and align-self (vertical alignment)
  align_options <- c("start", "end", "center", "stretch")

  if (!arg_val %in% align_options) {
    stop("Alignment argument must be one of ", paste(align_options, collapse = ", "))
  }

  if (arg_val == "spread") {
    return ("space-evenly")
  }

  arg_val
}

el_has_class <- function(el, class_name) {
  # It's possible to have multiple "class" attributes if they were set at
  # different times. Here we just collapse all of them into one big character
  # string we can seach through

  if (!inherits(el, "shiny.tag")) return(FALSE)

  all_classes <- paste(el$attribs[names(el$attribs) == "class"], collapse = " ")

  # Look for the class name isolated from other classes. E.g if searching for
  # class of  "card"  this wont get incorectly triggered by "panel-card"
  str_detect(all_classes, paste0("(\\s|^)", class_name, "(\\s|$)"))
}

el_add_class <- function(el, class_name) {
  if (!el_has_class(el, class_name)) {
    el$attribs$class <- paste(el$attribs$class, class_name)
  }
  el
}


update_default_sized_plots <- function(el, i = "ignored") {

  using_default_settings <- identical(
    htmltools::tagGetAttribute(el, "style"),
    htmltools::tagGetAttribute(shiny::plotOutput("test"), "style")
  )
  if (using_default_settings) {
    # We give ourselves permission to modify plot styles
    el$attribs$style <- "height:100%;width:100%;min-height:150px"
  }

  el
}

