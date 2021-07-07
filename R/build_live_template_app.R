build_live_template_app <- function(app_loc, updated_layout) {

  app_lines <- readLines(con = app_loc)
  if (notNull(updated_layout)) {
    layout_pos <- find_layouts_in_file(app_lines)[[1]]

    # Now break the app code into pre layout, and post layout, and sandwich the
    # new layout between them

    # Indices are squeezed by one to not include comments themselves
    layout_start <- which(str_detect(app_lines, "#' start-layout")) - 1
    layout_end <- which(str_detect(app_lines, "#' end-layout")) + 1

    app_lines <- c(
      app_lines[1:layout_start],
      make_layout_call(updated_layout),
      app_lines[layout_end:length(app_lines)]
    )
  }

  # Remove the guiding comment lines and sourcing function
  app_lines <- app_lines[!str_detect(app_lines, "^#\\'|^source|^library")]

  # Make a single string so multiline regexes are easier to work with
  app_script <- collapse_by_newline(app_lines)

  # These are lines that will get added to the top of the app script
  # They get built up from any "app-scope" code in the used functions
  app_scope_code <- c(
    "library(shiny)",
    "library(gridlayout)\n"
  )

  for (function_name in names(template_app_funcs)) {

    is_server_func <- str_detect(function_name, pattern = "_server", fixed = TRUE)
    func_call_regex <- paste0(function_name, if (is_server_func) "(input, output)" else "()")

    if (!str_detect(app_script, pattern = func_call_regex, fixed = TRUE)) {
      next
    }

    app_script <- str_replace(
      app_script,
      pattern = func_call_regex,
      replacement = template_app_funcs[[function_name]]$body,
      fixed = TRUE
    )

    if (notNull(template_app_funcs[[function_name]]$app_scope_code)) {
      app_scope_code <- c(app_scope_code, template_app_funcs[[function_name]]$app_scope_code)
    }
  }

  # Add library calls and and any app-scoped-code contained within the used functions
  split_by_line(
    paste0(
    collapse_by_newline(app_scope_code),
    "\n",
    app_script
  )
  )
}





