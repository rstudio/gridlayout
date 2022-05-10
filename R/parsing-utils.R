CSS_VALUE_REGEX <- "([0-9]\\d*)(\\.\\d+)?(px|rem|fr)|auto"
has_css_value <- function(x) grepl(x, pattern = CSS_VALUE_REGEX, perl = TRUE)



replace_x_with_y<- function(vec, x, y){
  vec[vec == x] <- y
  vec
}


fill_missing_w_default <- function(vec){
  replace_x_with_y(vec, x = "", y = DEFAULT_SIZE_CHAR)
}

replace_default_with_value <- function(vec, val) {
  replace_x_with_y(vec, x = DEFAULT_SIZE_CHAR, y = val)
}


all_css_or_empty <- function(vals) {
  all(has_css_value(vals) | vals == "")
}


flatten <- function(x) { do.call(what = c, args = x)}

get_num_cols_by_row <- function(nested_array){
  vapply(
    nested_array,
    FUN = length,
    FUN.VALUE = numeric(1L)
  )
}

split_on_space <- function(x){
  strsplit(str_trim(x), split = "\\s+")
}
