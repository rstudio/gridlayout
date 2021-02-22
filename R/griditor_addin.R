#' Edit a grid layout as selected
#'
#' @return NULL
#' @export
griditor_addin <- function() {
  requireNamespace("miniUI", quietly = TRUE)
  requireNamespace("shiny", quietly = TRUE)

  editor_selection <- rstudioapi::getSourceEditorContext()

  app_editor_id <- editor_selection$id
  selected_text <- editor_selection$selection[[1]]$text
  selected_range <- editor_selection$selection[[1]]$range

  # Try and find layout chunk in document
  start_of_layout_chunk_index <- which(grepl("\\`\\`\\` \\{\\.layout \\.grid\\}", editor_selection$contents))[1] + 1
  has_layout_chunk <- length(start_of_layout_chunk_index) != 0

  user_has_selected_text <- selected_text != ""

  if((!user_has_selected_text) & has_layout_chunk){
    print("Selecting chunk for user")
    chunk_deliniators <- which(grepl("\\`\\`\\`", editor_selection$contents))
    end_of_layout_chunk_index <- chunk_deliniators[chunk_deliniators > start_of_layout_chunk_index][1]
    selected_range <- rstudioapi::document_range(
      start = rstudioapi::document_position(row = start_of_layout_chunk_index, column = 1),
      end = rstudioapi::document_position(row = end_of_layout_chunk_index - 1, column = Inf)
    )

    selected_text <- paste(
      editor_selection$contents[(start_of_layout_chunk_index): (end_of_layout_chunk_index-1)],
      collapse = "\n"
    )

    rstudioapi::setSelectionRanges(selected_range, id = app_editor_id)
  }

  my_layout <- if(user_has_selected_text | has_layout_chunk) gridlayout::md_to_gridlayout(selected_text) else gridlayout::new_gridlayout()

  starting_elements <- gridlayout::get_elements(my_layout)

  ui <- shiny::tags$body(
    rmarkdown::html_dependency_font_awesome(),
    shiny::tags$head(
      shiny::tags$link(rel="preconnect", href="https://fonts.gstatic.com"),
      shiny::tags$link(href="https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap", rel="stylesheet"),
    ),
    shiny::includeScript(
      system.file("griditor/griditor.js", package = "gridlayout")
    ),
    shiny::includeCSS(
      system.file("griditor/styles.css", package = "gridlayout")
    ),
    shiny::div(id = "header",
               shiny::h2("Griditor: Build a grid layout for your Shiny app"),
               shiny::actionButton("get_code", "Update selected layout")
    ),
    shiny::div(
      id = "settings",
      shiny::h3(shiny::icon("cog"), "Settings"),
      shiny::div(
        class = "card-body",
      )
    ),
    shiny::div(
      id = "instructions",
      shiny::h3(shiny::icon("question"), "Instructions"),
      shiny::div(
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
    shiny::div(
      id = "elements",
      shiny::h3(shiny::icon("layer-group"), "Added elements"),
      shiny::div(
        class = "card-body",
        shiny::div(id = "added_elements")
      )
    ),
    shiny::div(
      id = "editor",
      shiny::div(
        id = "editor-wrapper",
        shiny::tags$svg(id = "editor-browser-header"),
        shiny::uiOutput("grid_holder")
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

    bindEvent(observe({
      req(input$elements)

      grid_mat <- matrix(".",
                         nrow = length(input$grid_sizing$rows),
                         ncol = length(input$grid_sizing$cols) )
      for(el in input$elements){
        grid_mat[el$start_row:el$end_row, el$start_col:el$end_col] <- el$id
      }

      layout_table <- gridlayout::to_md(
        gridlayout::new_gridlayout(layout_mat = grid_mat,
                                   col_sizes = input$grid_sizing$cols,
                                   row_sizes = input$grid_sizing$rows,
                                   gap = input$grid_sizing$gap
        )
      )
      rstudioapi::modifyRange(selected_range, layout_table, id = NULL)
      shiny::stopApp()
    }), input$get_code)
  }

  # We'll use a pane viwer, and set the minimum height at
  # 300px to ensure we get enough screen space to display the clock.
  viewer <- shiny::paneViewer(500)
  shiny::runGadget(ui, server, viewer = viewer)
}
