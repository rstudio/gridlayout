# https://getbootstrap.com/docs/5.0/utilities/background/#background-color
bslib_bg_colors <- c(
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
)


#' Build a bootstrap background class
#'
#' Info on possible colors from the [bootstrap
#' website](https://getbootstrap.com/docs/5.0/utilities/background/#background-color)
#'
#' @param bgColor Color of background in terms of bootstrap variable names:
#'   Options are `"primary"`, `"secondary"`, `"success"`, `"danger"`,
#'   `"warning"`, `"info"`, `"light"`, and `"dark`.
#' @param bgGradient Should a gradient be applied to the background instead of a
#'   solid color?
#'
#' @return A string containing the bootstrap class name to apply the requested
#'   background color
#'
#' @keywords internal
#'
#' @examples
#'
#' make_bg_class("warning")
#' # A gradient can be applied as well
#' make_bg_class("primary", TRUE)
#'
make_bg_class <- function(bgColor = NULL, bgGradient = FALSE) {

  if (is.null(bgColor)) return("")
  if (!bgColor %in% bslib_bg_colors) {
    stop("The requested color of ", bgColor, " is not one of the possible ",
         "options. Possible values are ",
         paste0("\"", bslib_bg_colors, "\"", collapse = ", "), ".")
  }
  paste0("bg-",bgColor, if (bgGradient) " bg-gradient" else "")
}


