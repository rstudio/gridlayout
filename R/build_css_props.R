#' Build css properties named or unnamed list of property values
#'
#' @param list_of_props A list of property-value pairs for additional styles to
#'   be added to each element. Pairs can be given as named elements: e.g.
#'   `element_styles = c("background" = "blue")`, or simple as the whole
#'   character: e.g. `element_styles = c("background: blue")`. (Semicolon usage
#'   doesn't matter for single character declaration.)
#'
#' @return A concatenated string of property values to be used inside a css selector.
#' @export
#'
#' @examples
#'
#' custom_styles <- c(
#'   "background" = "blue",
#'   "border" = "1px solid red",
#'   "cursor: none"
#' )
#' build_css_props(custom_styles)
#'
build_css_props <- function(list_of_props){

  prop_names <- names(list_of_props)
  if(is.null(prop_names)) prop_names <- rep_len("", length(list_of_props))

  css_txt <- ""

  for(i in seq_along(list_of_props)){
    property <- prop_names[i]
    value <- list_of_props[i]

    if(property == ""){
      # Get rid of any whitespace that may be present
      line_txt <- stringr::str_trim(value, side = "both")

      # Strip off ending semi-colon if it exists. (We add it later when combining)
      line_txt <- stringr::str_remove(line_txt, ";$")
    } else {
      # Assemble property from name and value
      line_txt <- paste0(property, ": ", value)
    }

    # Check if this is a valid css property structure
    single_name <- stringr::str_detect(line_txt, "^\\S+:")
    non_terminating_semicolon <- stringr::str_detect(line_txt, ";(?!$)")

    valid_property <- single_name & !non_terminating_semicolon
    if(valid_property){
      css_txt <- paste0(css_txt, if(css_txt != "") "\n" else "", "  ", line_txt, ";")
    } else {
      warning("The passed css property \"", line_txt, "\" doesn't appear to be valid. Ignoring it.")
    }
  }
  # Make sure we dont have any whitespace at the end of our lines
  paste(
    stringr::str_trim(
      stringr::str_split(css_txt, "\n")[[1]],
      side = "right"
    ),
    collapse = "\n"
  )
}


