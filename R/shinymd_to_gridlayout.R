#' Extract gridlayout from shinymd file
#'
#' @param path_to_shinymd Path to a markdown file with a `.layout .grid` chunk
#'   in it defining a grid layout
#'
#' @return Object of class `"gridlayout"`
#' @export
#'
#' @examples
#'
#' my_app_loc <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
#' my_layout <- shinymd_to_gridlayout(my_app_loc)
#' my_layout
#'
shinymd_to_gridlayout <- function(path_to_shinymd){

  shinymd_txt <- paste(readLines(path_to_shinymd), collapse = "\n")

  layout_table <- stringr::str_extract(
    shinymd_txt,
    find_layout_regex
  )

  md_to_gridlayout(layout_table)
}

#' Update a layout chunk in a shinymd document
#'
#' @inheritParams shinymd_to_gridlayout
#' @param new_layout An updated `gridlayout` object to replace the current one
#' @param updated_shinymd_path Where the shinymd with the new layout should be
#'   placed. Default is overwriting the previous file
#'
#' @return NULL
#' @export
#'
#' @examples
#'
#' loc_of_shinymd <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
#' first_layout <- shinymd_to_gridlayout(loc_of_shinymd)
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
#' loc_of_new_shinymd <- tempfile(fileext = ".rmd")
#' update_shinymd(loc_of_shinymd, new_layout, loc_of_new_shinymd)
#' shinymd_to_gridlayout(loc_of_new_shinymd)
#'
update_shinymd <- function(path_to_shinymd, new_layout, updated_shinymd_path = path_to_shinymd){

  shinymd_txt <- paste(readLines(path_to_shinymd), collapse = "\n")

  new_shinymd <- stringr::str_replace(
    shinymd_txt,
    find_layout_regex,
    paste0("\n", to_md(new_layout), "\n")
  )

  message("Saving shinymd with updated layout to ", updated_shinymd_path)
  writeLines(
    new_shinymd,
    updated_shinymd_path
  )
}


find_layout_regex <- stringr::regex(
  "(?<=\\`\\`\\` \\{\\.layout \\.grid\\}).+?(?=\\`\\`\\`)",
  multiline = TRUE,
  dotall = TRUE
)
