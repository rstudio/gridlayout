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
#' @examples
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
          "    div(",
          paste0("      id = \"", el$id, "\","),
          paste0("      h3(\"", el$id, "\"),"),
          "    )")
      }
    ), collapse = ",\n")

  paste_nl(
    "library(shiny)",
    "library(gridlayout)",
    "",
    "app_layout <- md_to_gridlayout(\"",
    to_md(layout),
    "\")",
    "",
    "ui <- fluidPage(",
    "  use_gridlayout(app_layout, \"app-container\", use_card_style = TRUE),",
    "  div(id = \"app-container\",",
    element_divs,
    "  )",
    ")",
    "server <- function(input, output) {",
    "  # Place server code here",
    "}",
    "",
    "shinyApp(ui, server)"
  )
}



