build_live_template_app <- function(app_loc) {

  app_lines <- readLines(con = app_loc)
  # Remove the sourcing call that loads the functions
  app_lines <- trim_vec(app_lines, n_start = 1, n_end = 0)
  app_script <- collapse_by_newline(app_lines)

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





