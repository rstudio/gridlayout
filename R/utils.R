str_replace <- function(text, pattern, replacement, fixed = FALSE){
  sub(pattern = pattern, replacement = replacement, x = text, perl = !fixed, fixed = fixed)
}

str_replace_all <- function(text, pattern, replacement, fixed = FALSE){
  gsub(pattern = pattern, replacement = replacement, x = text, perl = !fixed, fixed = fixed)
}

str_remove_all <- function(text, pattern){
  str_replace_all(text, pattern = pattern, replacement = "")
}

str_trim <- function(text, side = c("both", "left", "right")){
  side <- match.arg(side, choices = c("both", "left", "right"))
  if(side == "both" | side == "left"){
    text <-  str_remove_all(text, pattern = "^\\s+")
  }
  if(side == "both" | side == "right"){
    text <- str_remove_all(text, pattern = "\\s+$")
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


collapse_w_space <- function(vec) { paste(vec, collapse = " ") }

# Make text bold
emph <- function(...) if(is_installed("crayon")) crayon::bold(...) else as.character(...)
italicize <- function(...) if(is_installed("crayon")) crayon::italic(...) else as.character(...)
invert_text <- function(...) if(is_installed("crayon")) crayon::inverse(...) else as.character(...)

indent_text <- function(text, num_spaces = 2) {

  # If we have a single length vector, assume it needs to be split on new-lines
  if (length(text) == 1) {
    text <- strsplit(
      text,
      split = "\n"
    )[[1]]
  }

  text <- if (num_spaces > 0) {
    paste0(
      paste(rep(" ", times = num_spaces), collapse = ""),
      text
    )
  } else {
    str_replace_all(
      text,
      pattern = paste0("^(\\s{1,", abs(num_spaces), "})"),
      replacement = ""
    )
  }

  paste(text, collapse = "\n")
}

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

map_name_val <- function(x, fn){
  # callback is function(name, val)
  Map(names(x), x, f = fn)
}


list_in_quotes <- function(name_ids){
  paste0("\"", name_ids, "\"", collapse = ", ")
}


lag <- function(x, n = 1L, default = NA){
  new_vec <- c(rep(default, times = n), x)
  new_vec[seq(from = 1, to = length(x))]
}

lead <- function(x, n = 1L, default = NA){
  new_vec <- c(x, rep(default, times = n))
  new_vec[seq(from = n + 1, to = length(x) + n)]
}

notNull <- function(x) {
  !is.null(x)
}

doesExist <- function(x) {
  notNull(x) && !is.na(x)
}

hasName <- function(x, name) {
  name %in% names(x)
}

`%||%` <- function(val, alt) {
  if (all(is.null(val)) || all(is.na(val))) alt else val
}

# Taken from the shiny source
valid_css_unit_regex <- "^(auto|calc\\(.*\\)|((\\.\\d+)|(\\d+(\\.\\d+)?))(%|in|cm|mm|ch|em|ex|rem|fr|ch|pt|pc|px|vh|vw|vmin|vmax))$"
validCssUnit <- function(x) {
  # We use this alias for 100vh to make things a bit less confusing for users
  # who may not get that "vh" stands for viewheight etc.
  if (identical(x, "viewport")) {
    x <- "100vh"
  }
  if (is.null(x) || is.na(x))
    return(x)
  if (length(x) > 1 || (!is.character(x) && !is.numeric(x)))
    stop("CSS units must be a single-element numeric or character vector")
  if (is.character(x) && nchar(x) > 0 && gsub("\\d*", "", x) ==
      "")
    x <- as.numeric(x)
  if (is.character(x) && !grepl(pattern = valid_css_unit_regex, x)) {
    stop("\"", x, "\" is not a valid CSS unit (e.g., \"100%\", \"400px\", \"auto\")")
  }
  else if (is.numeric(x)) {
    x <- paste(x, "px", sep = "")
  }
  x
}

as_pixel_value <- function(val) {

  if (is.numeric(val) || str_detect(val, "^\\d+$")) {
    return(paste0(val, "px"))
  }

  val <- str_trim(as.character(val), side = "both")

  if (!str_detect(val, "^\\d+px$")) {
    stop('Pixel value needed (number or "<num>px"), but "', val, '" provided')
  }

  val
}

unpixelify <- function(px_val) {
  if (is.numeric(px_val)) return(px_val)

  as.numeric(str_remove_all(px_val, "px"))
}


is_installed <- function(package, version = NULL) {
  installed <- nzchar(system.file(package = package))
  if (is.null(version)) {
    return(installed)
  }
  installed && isTRUE(utils::packageVersion(package) >= version)
}
