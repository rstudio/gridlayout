#' Edit a grid layout as selected
#'
#' @return NULL
#' @export
grided_addin <- function() {
  editor_selection <- rstudioapi::getSourceEditorContext()

  layout_tables <- find_layouts_in_file(editor_selection$contents)

  if (length(layout_tables) == 0) {
    stop(
      "No layouts found in currently active editor. ",
      "Make sure you've clicked on correct editor pane before running addin."
    )
  } else if (length(layout_tables) > 1) {
    message(
      "More than one layout table found in open editor, using the first one."
    )
  }

  # If multiple are found we use the first. This will eventually let the user
  # choose which one to use
  layout <- layout_tables[[1]]

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

  ui <- grided_ui_wrapper(shiny::uiOutput("grid_page"),update_btn_text = update_btn_text)

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

    current_layout <- reactive({
      shiny::req(input$elements)
      layout_from_grided(input$elements, input$grid_sizing)
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
      on_update(current_layout())
      shiny::stopApp()
    }), input$updated_code)
  }

  if(return_app_obj){
    shiny::shinyApp(ui, server)
  } else {
    # Open gadget in the external viewer
    viewer <- shiny::browserViewer(.rs.invokeShinyWindowViewer)
    shiny::runGadget(ui, server, viewer = viewer)
  }

}
