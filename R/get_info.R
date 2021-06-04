get_info <- function(x, prop){
  UseMethod("get_info")
}

get_info.default <- function(x, prop){
  cat("get_info generic")
}

#' @export
get_info.gridlayout <- function(x, prop){
  if (is_gridlayout_prop(prop)) {
    return (x[[prop]])
  }
  get_info.gridlayout_template(x$layout, prop)
}

#' @export
get_info.gridlayout_template <- function(x, prop){
  if (is.null(x[[prop]])) {
    if (is_gridlayout_prop(prop)) {
      stop("Try to access property of gridlayout from gridlayout_template object")
    }
    stop("That property doesn't exist")
  }
  x[[prop]]
}

is_gridlayout_prop <- function(prop) prop %in% c("element_ids", "alternates")

dump_all_info <- function(x, name = "layout") {
  list(
    name = name,
    grid = list(
      rows =  get_info(x, "row_sizes"),
      cols = get_info(x, "col_sizes"),
      gap = get_info(x, "gap")
    ),
    elements = get_elements(x)
  )
}

