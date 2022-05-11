# The minimal adornment of a tag to be grid-aware and always able to be classed
panel <-  function(area, ..., tag = tags$div, class = "my-card"){
  p <- tag(...)
  p$attribs$style <- paste0(p$attribs$style, "grid-area:", area, ";")
  tagAppendAttributes(p, class = paste(class, "my-panel"))
}

panel_card <- function(area, ..., card_fn = card){
  panel(
    area = area,
    ...,
    class = "panel-card",
    tag = card_fn
  )
}

card <- function(..., width = NULL, height = NULL) {
  width <- htmltools::validateCssUnit(width)
  height <- htmltools::validateCssUnit(height)

  htmltools::tags$div(
    class = "card",
    style = htmltools::css(width = width, height = height),
    ...
  )
}

card_body <- function(..., padding = c("x", "y")) {
  htmltools::tags$div(class = "card-body",
                      ...,
                      class = if (!"x" %in% padding) "px-0",
                      class = if (!"y" %in% padding) "py-0"
  )
}

card_header <- function(...) {
  htmltools::tags$div(class = "card-header",
                      ...
  )
}

card_heading <- function(..., container = htmltools::tags$h6) {
  container(class = "card-header mt-0",
            ...
  )
}

card_title <- function(...) {
  htmltools::tags$h5(class = "card-title",
                     ...
  )
}

card_footer <- function(...) {
  htmltools::tags$div(class = "card-footer", ...)
}

card_list <- function(...) {
  htmltools::tags$ul(class = "list-group list-group-flush", ...)
}

card_list_item <- function(...) {
  htmltools::tags$li(class = "list-group-item", ...)
}

card_plot <- function(outputId,
                      click = NULL,
                      dblclick = NULL,
                      hover = NULL,
                      brush = NULL,
                      inline = FALSE,
                      card_header = NULL,
                      card_footer = NULL
) {
  is_top <- is.null(card_header)
  is_bottom <- is.null(card_footer)

  plot_div <- plotOutput(outputId, click = click, dblclick = dblclick, hover = hover,
                         brush = brush, inline = inline)

  # TODO: card-img-* needs to go on the <img> itself, not the containing <div>
  plot_div <-
    tagAppendAttributes(plot_div,
                        class = if (is_top) "card-img-top",
                        class = if (is_bottom) "card-img-bottom"
    )

  card(
    card_header,
    plot_div,
    card_footer
  )
}
