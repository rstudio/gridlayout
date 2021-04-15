#' Edit a grid layout as selected
#'
#' @return NULL
#' @export
grided_addin <- function() {
  requireNamespace("rstudioapi", quietly = TRUE)
  editor_selection <- rstudioapi::getSourceEditorContext()

  layout_tables <- find_layouts_in_file(editor_selection$contents)

  if (length(layout_tables) == 0) {
    stop(
      "No layouts found in currently active editor. ",
      "Make sure you've clicked on correct editor pane before running addin."
    )
  } else if (length(layout_tables) > 1) {
    message(
      "More than one layout table found in open editor, using one closest to cursor."
    )
  }

  cursor_row <- editor_selection$selection[[1]]$range$end[1]
  distance_to_tables <- vapply(
    layout_tables,
    function(t){
      from_start <- cursor_row - t$start_row
      from_end <- cursor_row - t$end_row
      if (from_start >= 0 && from_end <= 0) {
        # Cursor is inside the table
        0
      } else {
        # Give the shortest absolute distance to the table
        min(abs(from_start), abs(from_end))
      }
    },
    FUN.VALUE = numeric(1)
  )

  chosen_layout_index <- which.min(distance_to_tables)


  layout <- layout_tables[[chosen_layout_index]]

  gridded_app(
    starting_layout = layout$layout,
    update_btn_text = "Update selected layout",
    on_update = function(new_layout){
      update_layout_in_file(editor_selection, layout, new_layout)
    })
}


#' Create gridlayout and build new app
#'
#' @return NULL
#' @export
grided_new_app <- function() {
  requireNamespace("rstudioapi", quietly = TRUE)

  gridded_app(
    update_btn_text = "Generate app code",
    on_update = function(new_layout){
      rstudioapi::documentNew(
        text = to_app_template(new_layout)
      )
    })
}

gridded_app <- function(starting_layout = new_gridlayout(),
                        update_btn_text = "update button",
                        on_update = function(new_layout) print(new_layout),
                        return_app_obj = FALSE){

  requireNamespace("miniUI", quietly = TRUE)
  requireNamespace("shiny", quietly = TRUE)

  starting_elements <- get_elements(starting_layout)


  ui <- grid_page(
    layout = starting_layout
  )

  server <- function(input, output, session) {

    session$sendCustomMessage(
      "add-elements",
      starting_elements
    )
    session$sendCustomMessage(
      "update-grid",
      list(
        rows =  attr(starting_layout, "row_sizes"),
        cols = attr(starting_layout, "col_sizes"),
        gap = attr(starting_layout, "gap")
      )
    )

    current_layout <- shiny::reactive({
      shiny::req(input$elements)
      layout_from_grided(input$elements, input$grid_sizing)
    })

    shiny::bindEvent(
      shiny::observe({
        send_layoutcall_popup(session, current_layout)
      }),
      input$get_code)

    shiny::bindEvent(shiny::observe({
      shiny::req(input$elements)
      on_update(current_layout())
      shiny::stopApp()
    }), input$updated_code)
  }

  app <- run_with_grided(shiny::shinyApp(ui, server))

  if(return_app_obj){
    app
  } else {
    # Open gadget in the external viewer
    viewer <- shiny::browserViewer(.rs.invokeShinyWindowViewer)
    shiny::runGadget(app, viewer = viewer)
  }

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


utils::globalVariables(c(".rs.invokeShinyWindowViewer"))

