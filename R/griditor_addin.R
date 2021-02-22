library(shiny)
library(miniUI)

#' Edit a grid layout as selected
#'
#' @return
#' @export
#'
#' @examples
griditor_addin <- function() {
  requireNamespace("miniUI", quietly = TRUE)
  requireNamespace("shiny", quietly = TRUE)

  editor_selection <- rstudioapi::getSourceEditorContext()
  selected_text <- editor_selection$selection[[1]]$text
  selected_range <- editor_selection$selection[[1]]$range

  my_layout <- if(selected_text == "") new_gridlayout() else md_to_gridlayout(selected_text)

  starting_elements <- gridlayout::get_elements(my_layout)


  cat("Selected layout!\n\n", my_layout)

  ui <- tags$body(
    rmarkdown::html_dependency_font_awesome(),
    tags$head(
      tags$link(rel="preconnect", href="https://fonts.gstatic.com"),
      tags$link(href="https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap", rel="stylesheet"),
    ),
    includeScript(
      system.file("griditor/griditor.js", package = "gridlayout")
    ),
    includeCSS(
      system.file("griditor/styles.css", package = "gridlayout")
    ),
    div(id = "header",
        h2("Griditor: Build a grid layout for your Shiny app"),
        actionButton("get_code", "Update selected layout")
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
      rstudioapi::modifyRange(selected_range, layout_table, id = NULL)
      shiny::stopApp()
    }) %>% bindEvent(input$get_code)
  }

  # We'll use a pane viwer, and set the minimum height at
  # 300px to ensure we get enough screen space to display the clock.
  viewer <- shiny::paneViewer(500)
  shiny::runGadget(ui, server, viewer = viewer)
}
