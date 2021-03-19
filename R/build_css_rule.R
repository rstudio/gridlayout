#' Build css properties named or unnamed list of property values
#'
#' @param selector valid css selector to target. E.g. `body` or `div.blue_boxes`...
#' @param prop_list A list of property-value pairs for additional styles to
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
#' cat(build_css_rule("#myDiv", custom_styles))
#'
build_css_rule <- function(selector, prop_list){

  prop_names <- names(prop_list)
  if(is.null(prop_names)) prop_names <- rep_len("", length(prop_list))

  prop_lines <- c()

  for(i in seq_along(prop_list)){
    property <- prop_names[i]
    value <- prop_list[i]

    if(property == ""){
      # Get rid of any whitespace that may be present
      line_txt <- str_trim(value)

      # Strip off ending semi-colon if it exists. (We add it later when combining)
      line_txt <- str_remove_all(line_txt, ";$")
    } else {
      # Assemble property from name and value
      line_txt <- paste0(property, ": ", value)
    }

    # Check if this is a valid css property structure
    single_name <- str_detect(line_txt, "^\\S+:")
    non_terminating_semicolon <- str_detect(line_txt, ";(?!$)")

    valid_property <- single_name & !non_terminating_semicolon
    if(valid_property){
      prop_lines <- c(prop_lines, paste0("  ", line_txt, ";"))
    } else {
      warning("The passed css property \"", line_txt, "\" doesn't appear to be valid. Ignoring it.")
    }
  }

  css_txt <- paste(prop_lines, collapse = "\n")
  # Make sure we dont have any whitespace at the end of our lines We need to do
  # this again because the user may have passed some text with spaces etc at the
  # end of the lines...
  css_txt <- paste(
    trim_trailing(
      strsplit(x = css_txt, split = "\n")[[1]]
    ),
    collapse = "\n"
  )

  paste0(
    selector, " {\n",
    css_txt,
    "\n}"
  )
}


