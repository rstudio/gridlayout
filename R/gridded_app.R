grided_app <- function(
  starting_layout = new_gridlayout(),
  on_finish = NULL,
  finish_button_text = NULL,
  return_app_obj = FALSE
) {
  requireNamespace("miniUI", quietly = TRUE)
  requireNamespace("shiny", quietly = TRUE)

  app <- shiny::shinyApp(
    ui = shiny::fluidPage(grided_resources()),
    server = function(input, output, session) {
      grided_server_code(
        input, output, session,
        starting_layout,
        on_finish = on_finish,
        finish_button_text = finish_button_text
      )
    }
  )

  if (return_app_obj) {
    app
  } else {
    # Open gadget in the external viewer
    viewer <- shiny::browserViewer(.rs.invokeShinyWindowViewer)
    shiny::runGadget(app, viewer = viewer)
  }
}

utils::globalVariables(c(".rs.invokeShinyWindowViewer"))


grided_server_code <- function(
  input, output, session,
  starting_layout = NULL,
  on_finish = NULL,
  finish_button_text = NULL,
  show_messages = FALSE
){

  # Lets grided know it should send over initial app state
  session$sendCustomMessage("shiny-loaded", 1)

  grided_mode <- if (identical(class(starting_layout), "list")) {
    # Multiple layouts means we want template chooser interface
    "layoutChooser"
  } else if (identical(class(starting_layout), "gridlayout")) {
    # Single layout means jump straight to editing UI
    "editLayout"
  } else if (is.null(starting_layout)) {
    # No layout means we have been injected into an existing app
    "liveApp"
  } else {
    # Uh-oh
    stop("Dont know how to deal with this value of `starting_layout`")
  }

  switch(grided_mode,
    layoutChooser = session$sendCustomMessage(
      "layout-chooser",
      starting_layout
    ),
    editLayout = session$sendCustomMessage(
      "edit-layout",
      dump_all_info(starting_layout)
    ),
    liveApp = session$sendCustomMessage(
      "edit-existing-app",
      function() {}
    )
  )


  shiny::observe({
    if (show_messages) {
      cat("==============================================\nElements Msg:")
      # lobstr::tree(input$elements)
      input$elements
    }
  })

  shiny::observe({
    if (show_messages) {
      cat("==============================================\nSizing Msg:")
      # lobstr::tree(input$grid_sizing)
      input$grid_sizing
    }
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
      send_layoutcall_popup(session, layout_info_to_gridlayout(input$see_layout_code))
    }),
    input$see_layout_code
  )

  shiny::bindEvent(shiny::observe({
    print("User has requested the following app layout be generated")
    chosen_layout <- layout_info_to_gridlayout(input$build_app_template)
    rstudioapi::documentNew(text = to_app_template(chosen_layout))
    shiny::stopApp()
  }), input$build_app_template)

  # Get update code button will try and find the layout being edited in the currently open editor and update the code
  # This can be overridden by setting the on_finish argument to a function that takes the current layout as input
  shiny::bindEvent(shiny::observe({

    updated_layout <- layout_info_to_gridlayout(input$update_layout)
    shiny::req(input$elements)

    if(notNull(on_finish)){
      on_finish(updated_layout)
      return()
    }

    if (in_rstudio()) {
      editor_selection <- rstudioapi::getSourceEditorContext()

      is_initial_layout <- function(x) {
        identical(to_md(x$layout), to_md(initial_layout))
      }
      layout_table <- Find(
        x = find_layouts_in_file(editor_selection$contents),
        f = is_initial_layout
      )
    }

    if (is.null(layout_table) || !in_rstudio()) {
      warning("Could not find layout table to edit. Make sure your app script with layout definition is open in RStudio. Otherwise use the copy-layout button and manually change layout table.")
      # send_layoutcall_popup(session, current_layout, error_mode = TRUE)
    } else {
      update_layout_in_file(editor_selection, layout_table, updated_layout)
      shiny::stopApp()
    }
  }), input$update_layout)
}

layout_info_to_gridlayout <- function(layout_info){
  new_gridlayout(
    layout_def = layout_info$elements,
    col_sizes = simplify2array(layout_info$grid$cols),
    row_sizes = simplify2array(layout_info$grid$rows),
    gap = layout_info$grid$gap
  )
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

# Takes a layout definition and turns it into the info ingested by grided
gen_template_info <- function(layout_table, name, flipped_els = c()){
  layout_info <-  dump_all_info(new_gridlayout(layout_table))
  layout_info$name <- name

  # If any elements need to have their id flipped (aka their panel is tall and
  # skinny), then mark that here
  for (i in seq_along(layout_info$elements)) {
    if (layout_info$elements[[i]]$id %in% flipped_els) {
      layout_info$elements[[i]]$flip_id <- TRUE
    }
  }

  layout_info
}


# Slightly easier way to build a layout from the elements and grid_sizing inputs
# provided by grided UI
layout_from_grided <- function(elements, grid_sizing) {
  new_gridlayout(
    elements,
    col_sizes = as.character(grid_sizing$cols),
    row_sizes = as.character(grid_sizing$rows),
    gap = grid_sizing$gap
  )
}


send_layoutcall_popup <- function(session, current_layout, error_mode = FALSE){
  layout_call <- paste(
    "layout <- grid_layout_from_md(layout_table = \"",
    "    ", to_md(current_layout), "\")",
    sep = "\n")

  if (error_mode) {
    session$sendCustomMessage("code_update_problem", layout_call)
  } else {
    session$sendCustomMessage("code_modal", layout_call)
  }
}

