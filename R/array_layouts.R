

layout_from_array <- function(layout_def, gap_size = '10px'){

  no_sizes <- str_remove_all(
    layout_def,
    pattern = CSS_VALUE_REGEX
  ) %>%
    cells_from_line() %>%
    Filter(f = function(line){length(line) > 0})

  # ----- Get the dimensions ---------------------------------------------------
  n_rows <- length(no_sizes)
  n_cols <- unique(vapply(no_sizes, FUN = length, FUN.VALUE = numeric(1L)))
  if (length(n_cols) > 1) {
    stop("Different amount of columns in rows. Check format of layout.")
  }

  layout_clean <- cells_from_line(layout_def)

  first_row <- layout_clean[[1]]


  # ----- Figure out column sizes ---------------------------------------------
  has_column_sizes <- all(has_css_value(first_row))

  column_sizes <- if (has_column_sizes) first_row else rep_len("1fr", n_cols)

  has_gap_size <- length(column_sizes) > n_cols

  if (has_gap_size) {
    gap_size <- column_sizes[1]
    column_sizes <- column_sizes[-1]
  }

  # If not enough column sizes were given here, then the layout is malformed
  if (length(column_sizes) != n_cols) {
    stop("If supplying column sizes in layout, every column must be given a size.")
  }


  # ----- Figure out row sizes -------------------------------------------------
  first_cell_for_rows <- tail(layout_clean, n_rows) %>%
    vapply(
      FUN = function(row) { row[1] },
      FUN.VALUE = character(1L)
    )

  row_has_size <- has_css_value(first_cell_for_rows)

  row_sizes <- if (all(row_has_size)) {
    first_cell_for_rows
  } else if (all(!row_has_size)) {
    # No sizes are present so use default
    rep_len("1fr", n_rows)
  } else {
    stop("If supplying row sizes in layout, every row must be given a size.")
  }

  # ----- Get element positions ------------------------------------------------

  areas_flat <- do.call(c, no_sizes)
  element_ids <- unique(areas_flat)
  areas_matrix <- matrix(
    areas_flat,
    nrow = n_rows,
    ncol = n_cols,
    byrow = TRUE
  )

  elements <- lapply(
    element_ids,
    function(id){
      all_pos <- which( areas_matrix == id, arr.ind = TRUE )
      list(
        id = id,
        start_row = min(all_pos[,"row"]),
        end_row = max(all_pos[,"row"]),
        start_col = min(all_pos[,"col"]),
        end_col = max(all_pos[,"col"])
      )
    }
  )


  list(
    areas = no_sizes,
    elements = elements,
    column_sizes = column_sizes,
    row_sizes = row_sizes,
    gap_size = gap_size
  )
}

md_table_to_array <- function(md_layout) {
  md_layout %>%
    str_replace_all("\\||\\-", " ") %>%
    # str_remove_all("\\||\\-") %>%
    strsplit("\\n") %>%
    .[[1]] %>%
    Filter(f = function(x) {!grepl(x, pattern = "^\\s*$")})
}

CSS_VALUE_REGEX <- "([1-9]\\d*)(\\.\\d+)?(px|rem|fr)|auto"

has_css_value <- function(x) grepl(x, pattern = CSS_VALUE_REGEX, perl = TRUE)

cells_from_line <- function(line){
  strsplit(str_trim(line), split = "\\s+")
}

remove_empty <- function(line){
  Filter(f = function(line){line != ""}, x = line)
}
