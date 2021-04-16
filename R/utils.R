str_replace <- function(text, pattern, replacement){
  sub(pattern = pattern, replacement = replacement, x = text, perl = TRUE)
}

str_replace_all <- function(text, pattern, replacement){
  gsub(pattern = pattern, replacement = replacement, x = text, perl = TRUE)
}

str_remove_all <- function(text, pattern){
  str_replace_all(text, pattern = pattern, replacement = "")
}

trim_leading <- function(text){
  str_remove_all(text, pattern = "^\\s+")
}

trim_trailing <- function(text){
  str_remove_all(text, pattern = "\\s+$")
}

str_trim <- function(text, side = c("both", "left", "right")){
  side <- match.arg(side, choices = c("both", "left", "right"))
  if(side == "both" | side == "left"){
    text <- trim_leading(text)
  }
  if(side == "both" | side == "right"){
    text <- trim_trailing(text)
  }
  text
}

str_detect <- function(text, pattern, fixed = FALSE){
  grepl(pattern = pattern, x = text, perl = !fixed, fixed = fixed)
}

str_extract <- function(text, pattern){
  regmatches(
    x = text,
    m = regexpr(
      pattern = pattern,
      text = text,
      perl = TRUE
    )
  )
}

# String concatenation
`%+%` <- function (lhs, rhs) paste0(lhs, rhs)


# extract from a list of lists to whatever level is desired
extract <- function(x, ...) {
  for (key in list(...)) {
    x <- lapply(x, `[[`, key)
  }
  x
}


extract_dbl <- function(x, ...){
  as.numeric(extract(x, ...))
}

extract_chr <- function(x, ...){
  as.character(extract(x, ...))
}

map_w_names <- function(x, fn){
  Map(names(x), x, f = fn)
}

list_in_quotes <- function(name_ids){
  paste0("\"", name_ids, "\"", collapse = ", ")
}

arg_list_exprs <- function(...){
  as.list(substitute(...()))
}


# Uses a default value if supplied argument is missing. Also checks to make sure
# that the supplied argument fits some desired check
validate_argument <- function(x, default = NULL, check_fn, check_fail_msg, using_default_msg){
  if(missing(x)){
    # If argument is missing, give if the default value with an optional message
    # alerting the user the default value was used
    if(!missing(using_default_msg)) message(using_default_msg)
    default
  } else {
    # If argument is supplied, run the checking function on it to make sure it's
    # valid before letting it through
    if(!missing(check_fn) && !check_fn(x)) stop(check_fail_msg)
    x
  }
}

is_atomic_val <- function(x){
  is.atomic(x) & (length(x) == 1)
}

# Taken from the shiny source
validCssUnit <- function(x)
{
  if (is.null(x) || is.na(x))
    return(x)
  if (length(x) > 1 || (!is.character(x) && !is.numeric(x)))
    stop("CSS units must be a single-element numeric or character vector")
  if (is.character(x) && nchar(x) > 0 && gsub("\\d*", "", x) ==
      "")
    x <- as.numeric(x)
  pattern <- "^(auto|inherit|fit-content|calc\\(.*\\)|((\\.\\d+)|(\\d+(\\.\\d+)?))(%|in|cm|mm|ch|em|ex|rem|fr|ch|pt|pc|px|vh|vw|vmin|vmax))$"
  if (is.character(x) && !grepl(pattern, x)) {
    stop("\"", x, "\" is not a valid CSS unit (e.g., \"100%\", \"400px\", \"auto\")")
  }
  else if (is.numeric(x)) {
    x <- paste(x, "px", sep = "")
  }
  x
}

is_installed <- function(package, version = NULL) {
  installed <- nzchar(system.file(package = package))
  if (is.null(version)) {
    return(installed)
  }
  installed && isTRUE(utils::packageVersion(package) >= version)
}

in_rstudio <- function(){
  # If we have access to the rstudio api we can enable editor manipulation.
  # Otherwise we should hide the update button to not confuse the user.
  requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::isAvailable()
}
