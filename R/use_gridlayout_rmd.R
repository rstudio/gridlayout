#' Enable `gridlayout` usage in RMarkdown documents
#'
#' Adds required hooks to RMarkdown to process `gridlayout` chunks and style
#' document accordingly. Layout will be generated from a chunk identified with
#' the syntax ```` ```{gridlayout} <insert layout table here> ``` ````
#'
#' See `vignette("using_with_rmd", package = "gridlayout")` for a more in-depth
#' overview.
#'
#' @param container_query The CSS selector used to access the main grid
#'   container. This is typically left at the default of `'.main-container'` as
#'   that's the parent of each section in the standard rmd template.
#' @param selector_prefix CSS prefix used to target grid elements. This will
#'   change if you're integrating grid with a system that you don't want to use
#'   ids (the `"#"` prefix) with because they are not available or are used for
#'   other reasons.
#'
#' @return NULL
#' @export
#'
use_gridlayout_rmd <- function(container_query = ".main-container",
                               selector_prefix = "#") {
  requireNamespace("knitr", quietly = TRUE)

  accessory_css <- get_accessory_css("gridlayout.css")


  knitr::knit_engines$set(gridlayout = function(options) {
    code <- paste(options$code, collapse = "\n")
    if (options$eval) {
      layout <- md_to_gridlayout(code)
      areas <- get_element_ids(layout)

      css_for_layout <- paste(
        "<style>",
        to_css(layout, container_key = container_query),
        # Use ids to assign each section to proper area in layout
        paste0(
          selector_prefix, areas, " { ",
          "grid-area: ", areas,
          " }",
          collapse = "\n"
        ),
        accessory_css,
        # Makes tab panels work properly and gives utility classes for alignment
        get_accessory_css("gridlayout_rmd_styles.css"),
        "</style>",
        sep = "\n"
      )
    }
    options$results <- "asis"
    options$echo <- FALSE
    knitr::engine_output(
      options,
      code = options$code,
      out = css_for_layout
    )
  })
}

# Dump css file to string for inlining while still keeping in a .css file for
# easier editing
get_accessory_css <- function(file) {
  paste(
    readLines(system.file(paste0("resources/", file), package = "gridlayout")),
    collapse = "\n"
  )
}
