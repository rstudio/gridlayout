#' Extract gridlayout from rmd file
#'
#' @param path_to_rmd Path to a markdown file with a `.layout .grid` chunk in it
#'   defining a grid layout
#' @param chunk_tag The identifying labels for the chunk that contains layout.
#'   Aka what goes inbetween the curly braces after backticks. This is used as a
#'   regular expression so make sure to escape characters properly. For more
#'   guidance see \code{\link[base]{regex}}.
#'
#' @return Object of class `"gridlayout"`
#' @export
#'
#' @examples
#'
#' my_app_loc <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
#' my_layout <- rmd_to_gridlayout(my_app_loc)
#' my_layout
#'
rmd_to_gridlayout <- function(path_to_rmd, chunk_tag = "\\.layout \\.grid"){
  rmd_txt <- paste(readLines(path_to_rmd), collapse = "\n")

  layout_table <- str_extract(
    rmd_txt,
    make_layout_regex(chunk_tag)
  )

  md_to_gridlayout(layout_table)
}

#' Update a layout chunk in a rmd document
#'
#' @inheritParams rmd_to_gridlayout
#' @param new_layout An updated `gridlayout` object to replace the current one
#' @param updated_rmd_path Where the rmd with the new layout should be
#'   placed. Default is overwriting the previous file
#'
#' @return NULL
#' @export
#'
#' @examples
#'
#' loc_of_rmd <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
#' first_layout <- rmd_to_gridlayout(loc_of_rmd)
#' first_layout
#'
#' new_layout <- md_to_gridlayout(
#'   layout_table = "
#'     |      |120px   |1fr    |1fr    |
#'     |:-----|:-------|:------|:------|
#'     |100px |header  |header |header |
#'     |1fr   |sidebar |plot_a |plot_c |
#'     |1fr   |sidebar |plot_b |plot_b |"
#' )
#'
#' loc_of_new_rmd <- tempfile(fileext = ".rmd")
#' update_rmd(loc_of_rmd, new_layout, loc_of_new_rmd)
#' rmd_to_gridlayout(loc_of_new_rmd)
#'
update_rmd <- function(path_to_rmd, new_layout, updated_rmd_path = path_to_rmd, chunk_tag = "\\.layout \\.grid"){
  rmd_txt <- paste(readLines(path_to_rmd), collapse = "\n")

  new_rmd <- str_replace_all(
    text = rmd_txt,
    pattern = make_layout_regex(chunk_tag),
    replacement = paste0("\n", to_md(new_layout), "\n")
  )

  message("Saving rmd with updated layout to ", updated_rmd_path)
  writeLines(
    new_rmd,
    updated_rmd_path
  )
}


make_layout_regex <- function(chunk_tag){
  paste0("(?sm)(?<=\\`\\`\\` \\{", chunk_tag, "\\}).+?(?=\\`\\`\\`)")
}

