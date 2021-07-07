# This script parses the live app template functions and builds a list that has
# the function body along with any app-scope code that accompany it so the
# template apps can be constructed with full code when requested.

template_functions_loc <- system.file("layout-templates/live-app-template-functions.R", package = "gridlayout")

template_app_funcs <- local({
  # Dump all the functions to the current (local) environment
  source(template_functions_loc, local = TRUE, keep.source = TRUE)
  # Wrap local env into a list so we can parse and dump function source to character vector
  lapply(
    as.list.environment(rlang::current_env()),
    function(f) {
      lines <- as.character(attr(f, "srcref"))

      app_scope_lines <- NULL

      app_scope_start <- which(gridlayout:::str_detect(lines, "#' start-app-scope"))
      if (!identical(app_scope_start, integer())) {
        # If we have an app scope chunk, pull out from body
        app_scope_end <- which(str_detect(lines, "#' end-app-scope"))
        app_scope_range <- app_scope_start:app_scope_end
        app_scope_lines <- indent_text(collapse_by_newline(trim_vec(lines[app_scope_range], 1)), -2) # trim gets rid of comment line
        lines <- lines[-app_scope_range]
      }

      list(
        body = str_trim(collapse_by_newline(trim_vec(lines, 1))),
        app_scope_code = app_scope_lines
      )
    }
  )
})

usethis::use_data(template_app_funcs, overwrite = TRUE)
