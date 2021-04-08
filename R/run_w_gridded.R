


grided_ui_wrapper <- function(grid_container, update_btn_text){
  shiny::tags$body(
    shiny::tags$head( shiny::tags$title("GridEd")),
    shiny::includeScript(
      system.file("grided/www/dist/index.js", package = "gridlayout")
    ),
    shiny::includeCSS(
      system.file("grided/www/main.css", package = "gridlayout")
    ),
    shiny::div(id = "header",
               shiny::h2(shiny::HTML("GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app")),
               shiny::div(
                 class = "code_btns",
                 shiny::actionButton("updated_code", update_btn_text),
                 shiny::actionButton("get_code", "Get layout code")
               )
    ),
    shiny::div(
      id = "settings",
      shiny::h3(settings_icon, "Settings"),
      shiny::div(
        class = "card-body",
      )
    ),
    shiny::div(
      id = "instructions",
      shiny::h3(instructions_icon, "Instructions"),
      shiny::div(
        class = "card-body",
        shiny::strong("Add an element:"),
        shiny::tags$ul(
          shiny::tags$li("Click and drag over the grid to define a region"),
          shiny::tags$li("Enter id of element in popup")
        ),
        shiny::strong("Edit an element:"),
        shiny::tags$ul(
          shiny::tags$li("Drag the upper left, middle, or bottom right corners of the element to reposition")
        ),
        shiny::strong("Remove an element:"),
        shiny::tags$ul(
          shiny::tags$li("Find element entry in “Added elements” panel and click the", trashcan_icon, " icon")
        ),
      )
    ),
    shiny::div(
      id = "elements",
      shiny::h3(elements_icon, "Added elements"),
      shiny::div(
        class = "card-body",
        shiny::div(id = "added_elements")
      )
    ),
    shiny::div(
      id = "editor",
      shiny::div(
        id = "editor-wrapper",
        shiny::HTML(browser_header_html),
        shiny::div(
          id = "editor-app-window",
          grid_container
        )
      )
    )
  )
}




# Slightly easier way to build a layout from the elements and grid_sizing inputs
# provided by grided UI
layout_from_grided <- function(elements, grid_sizing){
  new_gridlayout(element_list = elements,
                 col_sizes = as.character(grid_sizing$cols),
                 row_sizes = as.character(grid_sizing$rows),
                 gap = grid_sizing$gap)
}



#' Run existing app in grided layout editing mode
#'
#'
#' @param app Shiny app object as produced by \code{\link[shiny]{shinyApp()}}
#'
#' @return Shiny app object with original app encapuslated by grided editor
#' @export
#'
run_with_grided <- function(app){

  # Start by modifying the server code to respond to messages from the grided
  # javascript
  origServerFuncSource <- app[["serverFuncSource"]]

  app[["serverFuncSource"]] <- function() {

    origServerFunc <- origServerFuncSource()
    function(input, output, session, ...) {

      if (!"session" %in% names(formals(origServerFunc))) {
        origServerFunc(input, output, ...)
      } else {
        origServerFunc(input, output, session, ...)
      }

      # Lets grided know it should send over initial app state
      session$sendCustomMessage("shiny-loaded", 1)

      current_layout <- reactive({
        shiny::req(input$elements)
        layout_from_grided(input$elements, input$grid_sizing)
      })

      initial_layout <- NULL
      observe({
        shiny::req(input$elements, input$grid_sizing)
        if(is.null(initial_layout)){
          initial_layout <<- layout_from_grided(input$elements, input$grid_sizing)
        }
      })

      shiny::bindEvent(
        shiny::observe({
          layout_call <- paste(
            "layout <- grid_layout_from_md(layout_table = \"",
            "    ", to_md(current_layout()), "\")",
            sep = "\n")

          session$sendCustomMessage("code_modal", layout_call)
        }),
        input$get_code)

      shiny::bindEvent(shiny::observe({
        req(input$elements)
        editor_selection <- rstudioapi::getSourceEditorContext()

        layout_table <- Find(
          x = find_layouts_in_file(editor_selection$contents),
          f = function(x) layouts_are_equal(x$layout, initial_layout)
        )

        if(is.null(layout_table)){
          warning("Could not find layout table to edit. Make sure your app script with layout definition is open in RStudio. Otherwise use the copy-layout button and manually change layout table.")
        }

        update_layout_in_file(editor_selection, layout_table, current_layout())

        shiny::stopApp()
      }), input$updated_code)
    }
  }

  # Next we go into the UI and extract the body and place it within the grided
  # UI

  # Grab existing UI function out of app
  existing_ui <- environment(app[["httpHandler"]])$ui

  grid_page_tags <- find_grid_tags(existing_ui)

  couldnt_find_tags <- is.null(grid_page_tags)
  # This should be "grid_page" if we're looking at output of grid_page function
  no_grid_page_div <- grid_page_tags[[1]][[2]]$attribs$id != "grid_page"
  if(couldnt_find_tags || no_grid_page_div){
    stop("run_with_grided needs to be used with an app that uses grid_page as its UI.")
  }

  # Replace the old ui with the new wrapped one
  environment(app[["httpHandler"]])$ui <- grided_ui_wrapper(grid_page_tags, update_btn_text = "Finish editing")

  app
}



find_grid_tags <- function(x) {
  is_shinytag <- inherits(x, "shiny.tag")
  has_class <- is_shinytag && !is.null(x$attribs$class)

  if (has_class && x$attribs$class == "container-fluid") {
    x$children
  } else if (is_shinytag | inherits(x, "list")) {
    children <- if (is_shinytag) x[["children"]] else x
    for (child in children) {
      ret <- Recall(child)
      if (!is.null(ret)) return(ret)
    }
  } else {
    NULL
  }
}




