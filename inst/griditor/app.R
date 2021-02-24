library(shiny)
library(here)
library(purrr)
library(gridlayout)

path_to_shinymd <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
my_layout <- gridlayout::shinymd_to_gridlayout(path_to_shinymd)
starting_elements <- gridlayout::get_elements(my_layout)


setwd(here("inst/griditor/"))
options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

ui <- tags$body(
  rmarkdown::html_dependency_font_awesome(),
  tags$head(
    tags$link(rel="preconnect", href="https://fonts.gstatic.com"),
    tags$link(href="https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap", rel="stylesheet"),
    tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
    tags$script(src = "dist/bundle.js")
  ),
  div(id = "header",
      h2("Griditor: Build a grid layout for your Shiny app"),
      actionButton("get_code", "Get layout code")
  ),
  div(
    id = "settings",
    h3(icon("cog"), "Settings"),
    div(
      class = "card-body",
    )
  ),
  div(
    id = "instructions",
    h3(icon("question"), "Instructions"),
    div(
      class = "card-body",
      shiny::markdown("
           **To add an element:**
           - Click and drag over the grid to define a region
           - Enter id of element in popup

           **To remove an element:**
           - Find element entry in “Added elements” panel and click the <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> button.
         ")
    )
  ),
  div(
    id = "elements",
    h3(icon("layer-group"), "Added elements"),
    div(
      class = "card-body",
      div(id = "added_elements")
    )
  ),
  div(
    id = "editor",
    div(
      id = "editor-wrapper",
      tags$svg(id = "editor-browser-header"),
      uiOutput("grid_holder")
    )
  )
)

# Define server logic required to draw a histogram
server <- function(input, output, session) {

  session$sendCustomMessage(
    "add-elements",
    starting_elements
  )
  session$sendCustomMessage(
    "update-grid",
    list(
      rows =  attr(my_layout, "row_sizes"),
      cols = attr(my_layout, "col_sizes"),
      gap = attr(my_layout, "gap")
    )
  )

  observe({
    req(input$elements)

    grid_mat <- matrix(".",
                       nrow = length(input$grid_sizing$rows),
                       ncol = length(input$grid_sizing$cols) )
    for(el in input$elements){
      grid_mat[el$start_row:el$end_row, el$start_col:el$end_col] <- el$id
    }

    layout_table <- to_md(
      new_gridlayout(layout_mat = grid_mat,
                     col_sizes = input$grid_sizing$cols,
                     row_sizes = input$grid_sizing$rows,
                     gap = input$grid_sizing$gap
      )
    )

    layout_call <- glue::glue(
      "layout <- grid_layout_from_md(layout_table = \"",
      "    {layout_table}\")")

    session$sendCustomMessage("code_modal", layout_call)
  }) %>% bindEvent(input$get_code)
}

shinyApp(ui, server)


