# Experiment with how little we can do but still get layout

# Make sure you have latest dev version of gridlayout
# pak::pkg_install('rstudio/gridlayout')
library(gridlayout)
library(shiny)
library(bslib)

# The minimal adornment of a tag to be grid-aware and always able to be classed
panel <-  function(area, ..., tag = tags$div, additional_class = "my-card"){
  p <- tag(...)
  p$attribs$style <- paste0(p$attribs$style, "grid-area:", area, ";")
  tagAppendAttributes(p, class = paste(additional_class, "my-panel"))
}

theme <- bs_theme() |>
  bs_add_rules(
    rules = list(
      ".my-panel {
        --panel-gap: 12px;
        --pad: 8px;
        margin: var(--panel-gap);
        padding: var(--pad);
      }",
      ".my-card { background-color: white; }",
      ".left-sidebar {
        --panel-gap: 0;
        background-color: $gray-400;
      }",
      ".header {
        --panel-gap: 0;
        background-color: $primary;
        color: $gray-100;
      }",
      "#distPlot {
        --pad: 0;
        max-width: calc(100%  - 2*var(--panel-gap));
        max-height: calc(100% - 2*var(--panel-gap));
      }",
      ".container-fluid {
        padding: 0px;
        background-color: $gray-200;
      }"
    )
  )

shinyApp(
  ui = grid_page(
    layout = c(
      "header  header header",
      "sidebar A      B ",
      "sidebar C      D "
    ),
    row_sizes = c("auto", "1fr", "1fr"),
    col_sizes = c("200px", "1fr", "1fr"),
    gap_size = "0px",
    flag_mismatches = FALSE, # Needed to avoid validation errors
    theme = theme,
    panel("header", "This is my header!", tag = h1, additional_class = "header"),
    panel(
      "sidebar",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
      additional_class = "left-sidebar"
    ),
    panel(
      "A",
      outputId = "distPlot",
      height = "100%",
      tag = shiny::plotOutput
    ),
    panel("B"),
    panel("C"),
    panel("D")
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)




