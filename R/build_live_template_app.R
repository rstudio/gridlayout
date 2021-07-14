build_live_template_app <- function(layout_def, final_layout) {

  # First generate the layout to ui panels code

  # These are lines that will get added to the top of the app script
  # They get built up from any "app-scope" code in the used functions
  app_scope_calls <- c(
    "library(shiny)",
    "library(gridlayout)\n"
  )
  panel_calls <- c()
  for (panel_id in names(layout_def$ui_functions)) {
    func_id <- layout_def$ui_functions[[panel_id]]
    template_func <- template_app_funcs[[func_id]]
    panel_calls <- c(panel_calls, paste0("  ", panel_id, " = ", template_func$body))

    if (notNull(template_func$app_scope_code)) {
      app_scope_calls <- c(app_scope_calls, template_func$app_scope_code)
    }
  }

  # Next splice that code into a grid_page call that uses layout
  ui_code <- paste(
    "ui <- grid_page(",
    "  layout = app_layout,",
    paste(panel_calls, collapse = ",\n"),
    ")",
    sep = "\n"
  )

  # Generate the server code
  server_calls <- c()
  for (func_id in layout_def$server_functions) {
    server_calls <- c(server_calls, template_app_funcs[[func_id]]$body)
  }

  server_code <- paste(
    "server <- function(input, output, session) {",
    paste0("  ", server_calls, collapse = "\n\n"),
    "}",
    sep = "\n"
  )

  paste(
    collapse_by_newline(app_scope_calls),
    make_layout_call(final_layout),
    ui_code,
    server_code,
    "shinyApp(ui, server)",
    sep = "\n\n"
  )
}





