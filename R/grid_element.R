#' Simple grid panel
#'
#' The minimal adornment of a tag to be grid-aware and always able to be classed
#'
#' @param area Area of grid corresponding to the wrapping grid containers grid
#'   definition
#' @param ... Arguments passed onto the `tag` used. See `tag` argument
#' @param tag Tag used to build card. Defaults to `htmltools::div()` but can be
#'   any function that generates a html tag as output. E.g. `shiny::plotOutput`.
#' @param class Any additional classes you may want to add to your panel
#'
#' @return
#' @export
#'
grid_element <-  function(area, ..., tag = tags$div, class = ""){
  p <- tag(...)
  p$attribs$style <- paste0(p$attribs$style, "grid-area:", area, ";")
  tagAppendAttributes(p, class = paste(class, "my-panel"))
}
