array_table_to_matrix <- function(array_table) {


  no_sizes <- array_table %>%
    lapply(function(line) str_trim(str_remove_all(line, CSS_VALUE_REGEX))) %>%
    Filter(f = function(line) line != "") %>%
    flatten() %>%
    strsplit(split = "\\s+")

  if (length(unique(get_num_cols_by_row(no_sizes))) > 1) {
    stop("Layout appears to be malformed. Make sure each row has the same number of columns")
  }

  layout_matrix <- flatten(no_sizes) %>%
    matrix(
      nrow = length(no_sizes),
      ncol = length(no_sizes[[1]]),
      byrow = TRUE
    )

  n_rows <- nrow(layout_matrix)
  n_cols <- ncol(layout_matrix)

  has_col_sizes <- length(array_table) > n_rows && any(
    has_css_value(
      vapply(
        split_on_space(array_table),
        FUN = function(line) line[1] ,
        FUN.VALUE = character(1L)
      )
    )
  )

  first_column_of_rows <- vapply(
    split_on_space(if (has_col_sizes) array_table[-1] else array_table),
    FUN = function(line) line[1] ,
    FUN.VALUE = character(1L)
  )
  has_row_sizes <- any(
    has_css_value(first_column_of_rows)
  )

  if (has_col_sizes){
    layout_matrix <- rbind("", layout_matrix)
  }

  if (has_row_sizes){
    layout_matrix <- cbind("", layout_matrix)
  }


  if (has_col_sizes){
    col_sizes <- strsplit(str_trim(array_table[[1]]), split = "\\s+")[[1]]

    if (length(col_sizes) < n_cols) {
      stop("If supplying column sizes in layout array, every column must be given a size.")
    }

    if (length(col_sizes) == n_cols && has_row_sizes) {
      # No gap size given so pad col_sizes with empty gap size space
      col_sizes <- c("", col_sizes)
    }

    layout_matrix[1,] <- col_sizes
  }

  if (has_row_sizes){

    # We can fill in empty values for row sizes, however, so do that here
    first_column_of_rows[!has_css_value(first_column_of_rows)] = ""

    if (has_col_sizes) {
      layout_matrix[-1,1] <- first_column_of_rows
    } else {
      layout_matrix[,1] <- first_column_of_rows
    }
  }


  layout_matrix

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
