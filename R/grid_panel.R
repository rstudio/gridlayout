#' Panel for grid page element
#'
#' Allows you to customize the appearance of an element within your gridlayout.
#' When using [grid_page] or [grid_container] all items will be automatically
#' wrapped in this function with default values. However, if further
#' customization is needed you can do this wrapping yourself. Some examples of
#' things you can customize are settings a specific element to use a given card
#' style, or to align the content of the card vertically or horizontally.
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
#'
#' @return Elements from `...` wrapped in a `shiny::div()` with `class =
#'   "grid_panel"` and vertical/horizontal alignment css applied.
#'
#' @seealso [title_panel]
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
  v_align = NULL,
  h_align = NULL,
  title = NULL,
  use_card_styles = TRUE,
  use_bslib_card_styles = FALSE,
  collapsable = FALSE,
  scrollable = FALSE,
  panel_id = NULL,
  panel_class = make_panel_classes(use_card_styles, use_bslib_card_styles)
) {
  contents <- list(...)

  already_grid_panel <- length(contents) == 1 && el_has_class(contents[[1]], "grid_panel")

  if (already_grid_panel) {
    # If element is already wrapped in a grid_panel, we just need to update
    # the id
    el <- contents[[1]]
    el$attribs$id <- panel_id

    # Preference for bootstrap card styling at page-level overwrites the card
    # level This is so if the user just wants bootstrap styles they don't need
    # to manually add them to all their grid_panel() calls because
    # grid_container() auto wraps all elements in grid_panel.
    el$attribs$class <- panel_class
    return(el)
  }

  panel_styles <- htmltools::css(
    display = if (notNull(h_align) || notNull(v_align)) "grid",
    `justify-content` = if (notNull(h_align)) validate_alignment(h_align),
    `align-content` = if (notNull(v_align)) validate_alignment(v_align),
    overflow = if (scrollable) "scroll"
  )

  has_title <- notNull(title)
  no_title <- is.null(title)
  if (collapsable && no_title) stop("Collapsable cards need a title")

  # Go through contents and set plot sizes if necessary
  contents <- lapply(
    contents,
    function(el){
      if (! inherits(el, "shiny.tag") || inherits(el, "shiny.tag.list")) return(el)

      if (el_has_class(el, "shiny-plot-output")) {
        el <- set_plot_sizes(el)
      }
      # else {
      #   # Will only ever happen if the parent isn't a plot output itself because
      #   # plot outputs can't have children
      #   post_tq <- htmltools::tagQuery(el)$
      #     find(".shiny-plot-output")$
      #     each(set_plot_sizes)$
      #     allTags()
      #
      #   el <- post_tq
      # }
      el
    }
  )

  shiny::div(
    id = panel_id,
    class = panel_class,
    if (has_title) {
      shiny::div(
        class = "title-bar",
        shiny::h3(title),
        if (collapsable) make_collapser_icon(),
        style = if (collapsable) "justify-content: space-between;"
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
    }',
    class = "collapser-icon"
  )
}

#' Make header panel
#'
#' This is just a helper function that wraps your content in a vertically
#' centered header (`h2`) tag.
#'
#' @param title_content Whatever you want the title to say. Typically just text
#'   but any tag or tag-list is possible. All will get wrapped in an `h3` tag.
#' @inheritDotParams grid_panel
#' @param logo Optional image source for logo to be placed left of title
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
title_panel <- function(
  title_content,
  ...,
  logo = NULL
) {

  if (notNull(logo)) {
    title_content <- tagList(
      shiny::img(src = logo, height = "60px"),
      title_content
    )
  }

  grid_panel(
    shiny::h2(title_content, class = "title_panel"),
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


set_plot_sizes <- function(el, i = "ignored") {

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

