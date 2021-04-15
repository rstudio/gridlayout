#' Run existing app in grided layout editing mode
#'
#'
#' @param app Shiny app object as produced by [shiny::shinyApp()].
#'
#' @return Shiny app object with original app encapuslated by grided editor
#' @export
#'
run_with_grided <- function(app) {

  # Start by modifying the server code to respond to messages from the grided
  # javascript
  origServerFuncSource <- app[["serverFuncSource"]]

  # If we have access to the rstudio api we can enable editor manipulation.
  # Otherwise we should hide the update button to not confuse the user.
  in_rstudio <- requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::isAvailable()

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

      shiny::bindEvent(
        shiny::observe({
          send_layoutcall_popup(session, current_layout)
        }),
        input$get_code
      )

      shiny::bindEvent(shiny::observe({
        shiny::req(input$elements)

        if (in_rstudio) {
          editor_selection <- rstudioapi::getSourceEditorContext()

          layout_table <- Find(
            x = find_layouts_in_file(editor_selection$contents),
            f = function(x) layouts_are_equal(x$layout, initial_layout)
          )
        }

        if (is.null(layout_table) || !in_rstudio) {
          warning("Could not find layout table to edit. Make sure your app script with layout definition is open in RStudio. Otherwise use the copy-layout button and manually change layout table.")
          send_layoutcall_popup(session, current_layout)
        } else {
          update_layout_in_file(editor_selection, layout_table, current_layout())
          shiny::stopApp()
        }
      }), input$update_code)
    }
  }

  # Grab existing UI function out of app and inject the grided js and css into page
  n_tags <- length(environment(app[["httpHandler"]])$ui)
  environment(app[["httpHandler"]])$ui[[n_tags + 1]] <- grided_resources()

  app
}

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


find_grid_tags <- function(x) {
  is_shinytag <- inherits(x, "shiny.tag")
  has_class <- is_shinytag && !is.null(x$attribs$class)

  if (has_class && x$attribs$class == "container-fluid") {
    x$children
  } else if (is_shinytag | inherits(x, "list")) {
    children <- if (is_shinytag) x[["children"]] else x
    for (child in children) {
      ret <- Recall(child)
      if (!is.null(ret)) {
        return(ret)
      }
    }
  } else {
    NULL
  }
}
