grided_app <- function(starting_layout = new_gridlayout(),
                       on_finish = NULL,
                       finish_button_text = NULL,
                       return_app_obj = FALSE) {
  requireNamespace("miniUI", quietly = TRUE)
  requireNamespace("shiny", quietly = TRUE)

  app <- shiny::shinyApp(
    ui = shiny::fluidPage(
      grided_resources(),
      shiny::uiOutput('app_dump')
    ),
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
    viewer <- shiny::browserViewer(.rs.invokeShinyWindowExternal)
    shiny::runGadget(app, viewer = viewer)
  }
}

utils::globalVariables(c(".rs.invokeShinyWindowViewer"))


grided_server_code <- function(input, output, session,
                               starting_layout = NULL,
                               on_finish = NULL,
                               finish_button_text = NULL,
                               show_messages = FALSE) {

  # Lets grided know it should send over initial app state
  session$sendCustomMessage("shiny-loaded", 1)

  grided_mode <- if (identical(class(starting_layout), "list")) {
    # Multiple layouts means we want template gallery interface
    "layoutGallery"
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
    layoutGallery = session$sendCustomMessage(
      "layout-gallery",
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

  #---- See code for layout ----
  # Get code button will send a popup with the code needed to define currently viewed layout
  shiny::bindEvent(
    shiny::observe({
      session$sendCustomMessage("show-code-popup", list(
        title = "Code for layout",
        code = make_layout_call(layout_info_to_gridlayout(input$see_layout_code)),
        description = "Paste the following declaration into your app to use this layout"
      ))
    }),
    input$see_layout_code
  )

  #---- Build app template ----
  shiny::bindEvent(shiny::observe({
    layout_info <- input$build_app_template

    desired_layout <- layout_info_to_gridlayout(layout_info)

    app_template <- if (notNull(layout_info$name)) {
      # If layout editor is in live app mode, then we will also receive the name
      # of the layout we're currently editing. We use this to get the live-app's
      # code.
      layout_app <- find_layout_by_name(starting_layout, input$live_app_request)$live_app
      gallery_app_to_app_template(layout_app, desired_layout)
    } else {
      to_app_template(desired_layout)
    }

    if (!in_rstudio()) {
      session$sendCustomMessage("show-code-popup", list(
        title = "Code for app",
        code = app_template,
        description = "Paste the following code into an R script to build your app. (If in RStudio this will be done automatically for you)."
      ))
    } else {
      rstudioapi::documentNew(text = app_template)
      shiny::stopApp()
    }
  }), input$build_app_template)

  shiny::bindEvent(shiny::observe({
    chosen_layout <- find_layout_by_name(starting_layout, input$live_app_request)

    if (is.null(chosen_layout)){
      stop("Something horrible has happened, that layout does not exist")
    }

    live_app_code <- chosen_layout$live_app()

    # Inject the ui code
    # Ui is a function so we can preserve code formatting easily for template dumping
    output$app_dump <- renderUI({ live_app_code$ui })

    # Run server code
    live_app_code$server(input, output)

  }), input$live_app_request)


  #---- Update existing layout ----
  # Get update code button will try and find the layout being edited in the currently open editor and update the code
  # This can be overridden by setting the on_finish argument to a function that takes the current layout as input
  shiny::bindEvent(shiny::observe({
    updated_layout <- layout_info_to_gridlayout(input$update_layout)
    # If we have a custom on_finish() callback just do that
    if (notNull(on_finish)) {
      on_finish(updated_layout)
      return()
    }

    # If we're in RStudio and we have a starting layout recorded (we really
    # should if we're in this observe) then we can go about attempting to find
    # the starting layout in the script and editing it to match the updated
    # layout
    if (in_rstudio() && notNull(input$starting_layout)) {
      editor_selection <- rstudioapi::getSourceEditorContext()

      starting_layout <- layout_info_to_gridlayout(input$starting_layout)

      is_starting_layout <- function(x) {
        identical(to_md(x$layout), to_md(starting_layout))
      }
      layout_table <- Find(
        x = find_layouts_in_file(editor_selection$contents),
        f = is_starting_layout
      )
      # If we didnt find the layout table, the user most likely navigated away
      # from the apps script in their RStudio tabs
      if (notNull(layout_table)) {
        update_layout_in_file(editor_selection, layout_table, updated_layout)
        shiny::stopApp()
        return()
      }
    }
    # If we failed to update the layout in the app script, send a popup so the
    # user can copy and paste the new layout
    session$sendCustomMessage("show-code-popup", list(
      title = "Code for layout",
      code = make_layout_call(updated_layout),
      description = "Sorry, Couldn't find your layout to update. Make sure it's in active editor tab of RStudio. Here's the code to paste in case all else fails."
    ))
  }), input$update_layout)
}

find_layout_by_name <- function(layouts, name) {
  Filter(function(layout) layout$name == name, layouts)[[1]]
}

layout_info_to_gridlayout <- function(layout_info) {
  new_gridlayout(
    layout_def = layout_info$elements,
    col_sizes = simplify2array(layout_info$grid$cols),
    row_sizes = simplify2array(layout_info$grid$rows),
    gap = layout_info$grid$gap
  )
}


# This is all the UI related code that needs to be included for grided to wrap app
grided_resources <- function() {
  shiny::tags$head(
    shiny::includeScript(
      system.file("grided/www/dist/index.js", package = "gridlayout")
    ),
    shiny::includeCSS(
      system.file("grided/www/main.css", package = "gridlayout")
    )
  )
}


make_layout_call <- function(current_layout) {
  paste(
    "layout <- new_gridlayout(\"",
    "    ", to_md(current_layout), "\")",
    sep = "\n"
  )
}
