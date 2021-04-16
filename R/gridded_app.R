grided_server_code <- function(
  input, output, session,
  starting_layout = NULL,
  on_finish = NULL
){

  # Lets grided know it should send over initial app state
  session$sendCustomMessage("shiny-loaded", 1)

  if(!is.null(starting_layout)){
    session$sendCustomMessage(
      "update-grid",
      list(
        rows =  attr(starting_layout, "row_sizes"),
        cols = attr(starting_layout, "col_sizes"),
        gap = attr(starting_layout, "gap")
      )
    )

    session$sendCustomMessage(
      "add-elements",
      get_elements(starting_layout)
    )
  }

  current_layout <- shiny::reactive({
    shiny::req(input$elements)
    layout_from_grided(input$elements, input$grid_sizing)
  })

  initial_layout <- NULL
  shiny::observe({
    shiny::req(input$elements, input$grid_sizing)
    if (is.null(initial_layout)) {
      initial_layout <<- layout_from_grided(input$elements, input$grid_sizing)
    }
  })

  # Get code button will send a popup with the code needed to define currently viewed layout
  shiny::bindEvent(
    shiny::observe({
      send_layoutcall_popup(session, current_layout)
    }),
    input$get_code
  )

  # Get update code button will try and find the layout being edited in the currently open editor and update the code
  # This can be overridden by setting the on_finish argument to a function that takes the current layout as input
  shiny::bindEvent(shiny::observe({
    shiny::req(input$elements)

    if(!is.null(on_finish)){
      on_finish(current_layout())
      return()
    }

    if (in_rstudio()) {
      editor_selection <- rstudioapi::getSourceEditorContext()

      layout_table <- Find(
        x = find_layouts_in_file(editor_selection$contents),
        f = function(x) layouts_are_equal(x$layout, initial_layout)
      )
    }

    if (is.null(layout_table) || !in_rstudio()) {
      warning("Could not find layout table to edit. Make sure your app script with layout definition is open in RStudio. Otherwise use the copy-layout button and manually change layout table.")
      send_layoutcall_popup(session, current_layout, error_mode = TRUE)
    } else {
      update_layout_in_file(editor_selection, layout_table, current_layout())
      shiny::stopApp()
    }
  }), input$update_code)
}

# This is all the UI related code that needs to be included for grided to wrap app
grided_resources <- function(){
  shiny::tags$head(
    shiny::includeScript(
      system.file("grided/www/dist/index.js", package = "gridlayout")
    ),
    shiny::includeCSS(
      system.file("grided/www/main.css", package = "gridlayout")
    )
  )
}


# Slightly easier way to build a layout from the elements and grid_sizing inputs
# provided by grided UI
layout_from_grided <- function(elements, grid_sizing) {
  new_gridlayout(
    element_list = elements,
    col_sizes = as.character(grid_sizing$cols),
    row_sizes = as.character(grid_sizing$rows),
    gap = grid_sizing$gap
  )
}


send_layoutcall_popup <- function(session, current_layout, error_mode = FALSE){
  layout_call <- paste(
    "layout <- grid_layout_from_md(layout_table = \"",
    "    ", to_md(current_layout()), "\")",
    sep = "\n")

  if (error_mode) {
    session$sendCustomMessage("code_update_problem", layout_call)
  } else {
    session$sendCustomMessage("code_modal", layout_call)
  }
}

