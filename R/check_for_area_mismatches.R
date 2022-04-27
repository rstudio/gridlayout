
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

  error_msg <- c()

  not_in_provided <- layout_areas[!layout_areas %in% provided_areas]
  if (length(not_in_provided) > 0) {

    missing_areas <- paste0("\"", not_in_provided,"\"", collapse = ', ')
    error_msg <- c(
      error_msg,
      paste(
        "Grid areas", missing_areas, "are specified in the layout but not present in the children:\n",
        "If the grid-area css property for these areas is being provided in a custom",
        " way, set `check_for_mismatches = FALSE` to avoid this error message."
      )
    )
  }


  not_in_layout <- provided_areas[!provided_areas %in% layout_areas]
  if (length(not_in_layout) > 0) {
    missing_areas <- paste0("\"", not_in_layout,"\"", collapse = ', ')
    error_msg <- c(
      error_msg,
      paste(
        "Grid areas", missing_areas,
        "are present in the children of grid container but not specified in the layout:\n"
      )
    )
  }

  if (length(error_msg) == 0) { return(NULL) }


  stop(paste(error_msg, collapse = "\n"), call. = FALSE)
}
