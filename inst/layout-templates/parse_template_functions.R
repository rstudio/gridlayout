# Parse the live app template functions to build a map of function -> source code to build the live app templates

template_functions_loc <- system.file("layout-templates/live-app-template-functions.R", package = "gridlayout")

template_funcs <- local({
  source(template_functions_loc, local = TRUE, keep.source = TRUE)
  # Wrap functions into a list so we can parse and dump function source to character vector
  lapply(
    as.list.environment(rlang::current_env()),
    function(func) {
      as.character(attr(func, "srcref"))
    }
  )
})

ltree(template_funcs)
