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
to_app_template <- function(layout) {
  UseMethod("to_app_template")
}

#' @export
to_app_template.default <- function(layout){
  cat("to_app_template generic")
}

#' @export
to_app_template.gridlayout <- function(layout){
  paste_nl <- function(...){
    paste(..., sep = "\n")
  }
  element_divs <- paste(
    lapply(
      get_elements(layout),
      function(el){
        paste_nl(
          paste0("  ", el$id, " = grid_panel("),
          paste0("    title = \"", el$id, "\","),
          paste0("    p(\"content for ", el$id, "\")"),
          "  )")
      }
    ), collapse = ",\n")

  paste_nl(
    "library(shiny)",
    "library(gridlayout)",
    "",
    "app_layout <- \"",
    to_md(layout),
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



