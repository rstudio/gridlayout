#' Extract gridlayout from shinymd file
#'
#' @param path_to_shinymd Path to a markdown file with a `.layout .grid` chunk
#'   in it defining a grid layout
#'
#' @return Object of class `"gridlayout"`
#' @export
#'
#' @examples
shinymd_to_gridlayout <- function(path_to_shinymd){

  shinymd_txt <- paste(readLines(path_to_shinymd), collapse = "\n")

  layout_table <- stringr::str_extract(
    shinymd_txt,
    stringr::regex(
      "(?<=\\`\\`\\` \\{\\.layout \\.grid\\}).+?(?=\\`\\`\\`)",
      multiline = TRUE,
      dotall = TRUE
    )
  )

  md_to_gridlayout(layout_table)
}

