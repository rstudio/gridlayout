#' Convert layout to markdown table
#'
#' @param layout Object of class `"gridlayout"`.
#' @param include_gap_size Should the gap size for the layout be added in
#'   upper-left of table?
#'
#' @return Markdown table that defines the grid layout. This can be used with
#'   the function `grid_layout_from_md()` to build grid layouts.
#' @export
#'
#' @examples
#'
#' start_table <- "
#' |      |        |       |       |
#' |:-----|:-------|:------|:------|
#' |10px  |120px   |1fr    |1fr    |
#' |100px |header  |header |header |
#' |1fr   |sidebar |plot_a |plot_c |
#' |1fr   |sidebar |plot_b |plot_b |"
#'
#' my_layout <- md_to_gridlayout(layout_table = start_table)
#' table_text <- to_md(my_layout)
#'
to_md <- function(layout, include_gap_size = TRUE, sep_char = "|") {
  UseMethod("to_md")
}

#' @export
to_md.default <- function(layout, include_gap_size = TRUE, sep_char = "|"){
  cat("to_md generic")
}

#' @export
to_md.gridlayout <- function(layout, include_gap_size = TRUE, sep_char = "|"){
  to_table(layout, include_gap_size = include_gap_size, md_mode = TRUE)
}


to_table <- function(layout, md_mode = FALSE, include_gap_size = FALSE, sizes_decorator = I){
  # We need to take the row and column names and turn them into prefixing rows
  # and columns so knitr can render to markdown properly with the grid gap in
  # the upper left cell
  col_sizes <- attr(layout, "col_sizes")
  num_cols <- length(col_sizes)
  row_sizes <- attr(layout, "row_sizes")
  num_rows <- length(row_sizes)

  # Now we can start checking for overlaps in element ranges. We will do this by
  # building a matrix and then filling it with each element If we try and fill a
  # cell that already has something in it, we have an overlap
  layout_mat <- matrix("", nrow = num_rows, ncol = num_cols)
  for(el in layout){
    row_span <- el$start_row:el$end_row
    col_span <- el$start_col:el$end_col
    current_cells <- layout_mat[row_span, col_span, drop = FALSE]
    already_filled_cells <- current_cells != ""

    # Add a visual separation for overlaps
    current_cells[already_filled_cells] <- paste0(current_cells[already_filled_cells], ",")
    layout_mat[row_span, col_span] <- paste0(current_cells, el$id)
  }

  first_row <- c(if(include_gap_size) attr(layout, "gap") else "", col_sizes)

  layout_mat <- rbind(
    first_row,
    cbind(row_sizes, layout_mat)
  )

  # Build table string
  if(md_mode){
    # Need empty rows for the header
    empty_row <- rep_len("", num_cols+1)
    layout_mat <- rbind(empty_row,
                        empty_row,
                        layout_mat)
  }

  # Make all cells in a column equal width
  layout_mat <- apply(layout_mat, FUN = format, MARGIN = 2)

  # decorate row sizes
  layout_mat[,1] <- sizes_decorator(layout_mat[,1])

  # and column sizes
  col_sizes_i <- if(md_mode) 3 else 1
  layout_mat[col_sizes_i ,] <- sizes_decorator(layout_mat[col_sizes_i, ])

  if(md_mode){
    # Add border bars
    layout_mat <- apply(layout_mat,
                        FUN = function(x) paste0("|", paste(x, collapse=" |"), " |"),
                        MARGIN = 1)
    # Add header delimiting dashes to second row
    layout_mat[2] <- gsub(" ", "-", layout_mat[2])
  } else {
    layout_mat <- apply(layout_mat, FUN = paste, collapse=" ", MARGIN = 1)
  }

  # Collapse with new-lines
  paste(layout_mat, collapse = "\n")
}
