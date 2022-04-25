
# elements <- htmltools::tagList(
#   htmltools::div("hi", style="grid-area:test; background-color:green;"),
#   htmltools::div("there", style="background-color: red;"),
#   htmltools::div("world")
# )
get_provided_grid_areas <- function(elements){
  areas <- lapply(elements, FUN=get_grid_area)
  simplify2array(
    Filter(function(x) !is.null(x), x = areas)
  )
}

get_grid_area <- function(el){
  inline_styles <- el$attribs$style
  if(is.null(inline_styles)) {
    return(NULL)
  }

  grid_area <- str_extract(
    inline_styles,
    pattern = "(?<=grid-area:)\\s*\\w+(?=;)"
  )

  # Account for potential spaces in the grid area definition
  grid_area <- str_trim(grid_area)

  if(length(grid_area) == 0) {
    return(NULL)
  }

  grid_area
}


check_for_area_mismatches <- function(provided_areas, layout_areas){

  not_in_provided <- layout_areas[!layout_areas %in% provided_areas]

  if (length(not_in_provided) == 0) { return(NULL) }

  stop(
    "The following areas are in the layout but not provided in the markdown:\n",
    paste0("\"", not_in_provided,"\"", collapse = ', '), "\n",
    "If the grid-area css property for these areas is being provided in a custom",
    " way, set `check_for_mismatches = FALSE` to avoid this error message."
  )
}
