#' Build css properties named or unnamed list of property values
#'
#' @param selector valid css selector to target. E.g. `body` or
#'   `div.blue_boxes`... For inline styles where no selector is desired use
#'   `"inline"`.
#' @param prop_list A list of property-value pairs for additional styles to be
#'   added to each element. Pairs can be given as named elements: e.g.
#'   `element_styles = c("background" = "blue")`, or simple as the whole
#'   character: e.g. `element_styles = c("background: blue")`. (Semicolon usage
#'   doesn't matter for single character declaration.)
#'
#' @return A concatenated string of property values to be used inside a css
#'   selector. If the `prop_list` is empty, an empty string (`""`) is returned
#'   to avoid placing empty css rules on the webpage.
#'
#' @export
#' @examples
#'
#' custom_styles <- c(
#'   "background" = "blue",
#'   "border" = "1px solid red",
#'   "cursor: none"
#' )
#' cat(build_css_rule("#myDiv", custom_styles))
#'
build_css_rule <- function(selector, prop_list){
  # Empty css rules are best avoided
  if (length(prop_list) == 0) return("")

  # Inline mode means we just give all the css on one line with no sector
  # needed.
  inline_mode <- selector == "inline"

  css_text <- indent_text(
    do.call(
      htmltools::css,
      as.list(c(
        prop_list,
        collapse_ = if (inline_mode) " " else "\n")
      ))
  )

  if(inline_mode){
    css_text
  } else {
    paste0(
      selector, " {\n",
      css_text,
      "\n}"
    )
  }
}


