
layout_array_to_mat <- function(layout_array, default_gap_size = '10px'){
  layout_mat <- cells_from_line(layout_array)

  if (length(layout_mat) > 1) {
    n_cols_first_row <- length(layout_mat[[1]])
    n_cols_second_row <- length(layout_mat[[2]])
    if (n_cols_first_row == n_cols_second_row - 1) {
      # Column sizes but no gap
      layout_mat[[1]] <- c(default_gap_size, layout_mat[[1]])
    } else if (n_cols_first_row < n_cols_second_row - 1) {
      stop("If supplying column sizes in layout, every column must be given a size.")
    }
  }

  layout_mat
}


layout_from_array <- function(layout_array, gap_size = "10px"){
  layout_clean <- layout_array_to_mat(layout_array, default_gap_size = gap_size)
  parse_layout(layout_clean, gap_size = gap_size)
}



md_table_to_array <- function(md_layout) {

    # Split into rows
  by_rows <- strsplit(md_layout, "\\n")[[1]] %>% str_trim()
  by_rows <- by_rows[by_rows != ""]

  is_valid_md_table <- all(
    grepl(
      x = by_rows,
      pattern = "^\\s*\\|.*\\|\\s*$",
      perl = TRUE
    )
  )
  if (!is_valid_md_table){
    stop("Layout table is malformed. Check syntax.")
  }

  by_rows %>%
    # Remove any decorative header lines: e.g. "|---:|"
    Filter(f = function(x) !grepl(x, pattern = "^[\\s\\|\\-|:]+$", perl = TRUE)) %>%
    # Remove leading pipes
    str_remove_all("^\\|\\s*") %>%
    # Split into cells on internal pipes
    strsplit("\\s*\\|\\s*") %>%
    Filter(f = function(x) {length(x) > 0})
}

CSS_VALUE_REGEX <- "([1-9]\\d*)(\\.\\d+)?(px|rem|fr)|auto"
has_css_value <- function(x) grepl(x, pattern = CSS_VALUE_REGEX, perl = TRUE)

cells_from_line <- function(line){
  strsplit(str_trim(line), split = "\\s+")
}

remove_empty <- function(line){
  Filter(f = function(line){line != ""}, x = line)
}
