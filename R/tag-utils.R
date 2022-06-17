
add_styles <- function(el, ...) {
  el$attribs$style <- paste0(
    el$attribs$style,
    htmltools::css(...)
  )

  el
}

add_class <- function(el, class) {
  tagAppendAttributes(el, class = paste(class, collapse = " "))
}

update_el <- function(el, classes, styles) {
  # browser()
  el <- tagAppendAttributes(el, class = paste(classes, collapse = " "))

  el$attribs$style <- paste0(
    el$attribs$style,
    do.call(htmltools::css, styles)
  )

  el
}


has_class <- function(el, class) {
  if (!inherits(el, "shiny.tag")) {
    return(FALSE)
  }

  any(
    grepl(
      x = htmltools::tagGetAttribute(el, "class"),
      pattern = class,
      fixed = TRUE
    )
  )
}
