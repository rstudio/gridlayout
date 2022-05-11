# Experiment with how little we can do but still get layout

# Make sure you have latest dev version of gridlayout
# pak::pkg_install('rstudio/gridlayout')
library(gridlayout)
library(shiny)
library(bslib)

# The minimal adornment of a tag to be grid-aware and always able to be classed
panel <-  function(area, ..., tag = tags$div, class = "my-card"){
  p <- tag(...)
  p$attribs$style <- paste0(p$attribs$style, "grid-area:", area, ";")
  tagAppendAttributes(p, class = paste(class, "my-panel"))
}

theme <- bs_theme() |>
  bs_add_rules(
    rules = list(
      ".grid-container {
         --undo-gap: calc(-1* var(--grid-gap));
         background-color: $gray-200;
      }",
      ".my-panel { margin: 0; }",
      ".padded { padding: 8px; }",
      ".my-card { background-color: $white; }",
      ".left-sidebar {
         background-color: $secondary;
         color: $gray-100;
         margin: var(--undo-gap);
         margin-right: 0;
      }",
      ".header {
         background-color: $primary;
         color: $gray-100;
         margin: var(--undo-gap);
         margin-bottom: 0;
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
    gap_size = "15px",
    flag_mismatches = FALSE, # Needed to avoid validation errors
    theme = theme,
    panel("header", "This is my header!", tag = h1, class = "header padded"),
    panel(
      "sidebar",
      sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
      class = "left-sidebar padded"
    ),
    panel(
      "A",
      outputId = "distPlot",
      height = "100%",
      tag = plotOutput
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




