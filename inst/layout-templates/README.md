# Layout Templates

This folder stores the live-apps for the layout templates chooser. These apps aim to illustrate good Shiny code and are built for a given layout.

## Guidelines

The code within a template app is parsed by R for wrapping into the layout editor so there's a few formatting guidlines that need to be met. Here's an example template app...


```
library(shiny)
library(gridlayout)

#' start-layout
app_layout <- "|2rem  |200px   |1fr    |
               |150px |header  |header |
               |1fr   |sidebar |plot   |"
#' end-layout

#' start-ui
ui <- grid_page(
  layout = app_layout,
  header = title_panel("This is my header"),
  sidebar = grid_panel(
    title = "Settings",
    sliderInput("bins", "Number of bins:", min = 1, max = 50, value = 30, width = "100%")
  ),
  plot = plotOutput("distPlot")
)
#' end-ui

#' start-server
server <- function(input, output) {
  output$distPlot <- renderPlot({
    x <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    hist(x, breaks = bins, col = "darkgray", border = "white")
  })
}
#' end-server

shinyApp(ui, server)
```

There are three sections denoted by roxygen style `#'` comments along with `start/end` prefixes. These sections are `layout`, `ui`, and `server`:

- The `layout` section should always include the layout definition within in it where the layout is given the variable name of `app_layout`.
- The `ui` section is a single `grid_page()` definition assigned to the variable `ui`.
- The `server` section is a single function taking `input` and `output` as its arguments.

## Considerations

When an app is loaded into the grided layout editor all three sections are read in and parsed via `rlang::parse_expr()` in the order `layout -> ui -> server`. This means that these sections need to stand on their own and any variables defined or packages included outside will not be seen. 
