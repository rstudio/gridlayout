#' Build Shiny app template based on a grid layout
#'
#' Returns the string of an entire shiny app built around a desired layout.
#' Designed to be used with the `gridlayout` app-starter addin.
#'
#' @inheritParams to_css
#'
#' @return Character string of Shiny app that uses desired layout
#' @export
#'
to_app_template <- function(x) {
  UseMethod("to_app_template")
}

#' @export
to_app_template.default <- function(x){
  cat("to_app_template generic")
}
paste_nl <- function(...){
  paste(..., sep = "\n")
}
#' @export
to_app_template.gridlayout <- function(x){
  element_divs <- paste(
    lapply(
      get_elements(x),
      function(el){
        paste_nl(
          paste0("  ", el$id, " = grid_panel("),
          paste0("    title = \"", el$id, "\","),
          paste0("    p(\"content for ", el$id, "\")"),
          "  )")
      }
    ), collapse = ",\n")

  paste_nl(
    "library(shiny)\nlibrary(gridlayout)",
    "",
    "app_layout <- \"",
    to_md(x),
    "\"",
    "",
    "ui <- grid_page(",
    "  layout = app_layout,",
    element_divs,
    ")",
    "server <- function(input, output, session) {",
    "  # Place server code here",
    "}",
    "",
    "shinyApp(ui, server)"
  )
}

gallery_app_to_app_template <- function(layout_app){
  if(!is.function(layout_app)){
    stop("Layout app needs to be a function that returns a list of `ui` and `server`.")
  }
  # The first and last lines open and close the function and list bodies, so
  # drop those. Drop an additional line at the end because the calling
  # environment is printed as well
  app_code <- vec_trim(capture.output({layout_app}), n_start = 2, n_end = 3)

  # Figure out how many spaces indentation is so we can un-indent code. This
  # looks for the first "u" because the first line (should) start "ui = ..."
  n_spaces <- which(strsplit(app_code[1], split = "", fixed = TRUE)[[1]] == "u")[1] - 1

  # Make sure we're indented two spaces in
  app_code <- indent_text(app_code, -(n_spaces - 2))

  # Wrap in a shiny app call with appropriate library calls and we're good!
  paste_nl(
    "library(shiny)\nlibrary(gridlayout)\n",
    "shinyApp(",
    paste(app_code, collapse = "\n"),
    ")"
  )
}



