parse_layout <- function(layout_def, default_gap_size, default_row_size, default_col_size){
  layout_clean <- layout_def

  no_sizes <- Filter(
    x = lapply(
      layout_clean,
      function(line) line[!(has_css_value(line) | line == "")]
    ),
    f = function(line) length(line) > 0
  )

  # ----- Get the dimensions ---------------------------------------------------
  n_rows <- length(no_sizes)
  n_cols <- unique(vapply(no_sizes, FUN = length, FUN.VALUE = numeric(1L)))
  if (length(n_cols) > 1) {
    stop("Different amount of columns in rows. Check format of layout.")
  }


  # ----- Figure out column sizes ---------------------------------------------
  first_row <- layout_clean[[1]]

  has_gap_size_cell <- length(first_row) == n_cols + 1

  column_size_cells <- if (has_gap_size_cell) {
    first_row[-1]
  } else {
    first_row
  }

  column_sizes <- if (all(has_css_value(column_size_cells))) {
    column_size_cells
  } else {
    rep_len(default_col_size, n_cols)
  }

  # If not enough column sizes were given here, then the layout is malformed
  if (length(column_sizes) != n_cols) {
    stop("If supplying column sizes in layout, every column must be given a size.")
  }

  gap_size_cell <- first_row[1]

  first_row_is_sizes <- all(has_css_value(first_row) | first_row == "")

  gap_size <- if (has_gap_size_cell & first_row_is_sizes &  has_css_value(gap_size_cell)) {
    gap_size_cell
  } else {
    default_gap_size
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
    rep_len(default_gap_size, n_rows)
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
