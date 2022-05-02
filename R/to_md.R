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
#' my_layout <- md_to_gridlayout("
#'   |      |        |       |       |
#'   |:-----|:-------|:------|:------|
#'   |10px  |120px   |1fr    |1fr    |
#'   |100px |header  |header |header |
#'   |1fr   |sidebar |plot_a |plot_c |
#'   |1fr   |sidebar |plot_b |plot_b |")
#' cat(to_md(my_layout))
#'
to_md <- function(layout, include_gap_size = TRUE) {
  UseMethod("to_md")
}

#' @export
to_md.default <- function(layout, include_gap_size = TRUE){
  cat("to_md generic")
}

#' @export
to_md.gridlayout <- function(layout, include_gap_size = TRUE){
  to_table(layout, include_gap_size = include_gap_size, md_mode = TRUE)
}

#' Convert gridlayout to matrix format
#' @param layout A gridlayout object (as created by `new_gridlayout()`)
#'
#' @returns A matrix of the layout with each grid cell and its item membership
#'   corresponding to a cell in the matrix
#'
#' @export
#'
#' @examples
#'
#' layout <- md_to_gridlayout("
#' |10px  |120px   |1fr    |1fr    |
#'   |100px |header  |header |header |
#'   |1fr   |sidebar |plot_a |plot_c |
#'   |1fr   |sidebar |plot_b |plot_b |")
#'
#' to_matrix(layout)
#'
to_matrix <- function(layout){

  # We need to take the row and column names and turn them into prefixing rows
  # and columns so knitr can render to markdown properly with the grid gap in
  # the upper left cell
  col_sizes <- get_info(layout, "col_sizes")
  num_cols <- length(col_sizes)
  row_sizes <- get_info(layout, "row_sizes")
  num_rows <- length(row_sizes)
  elements <- get_info(layout, "elements")

  # Now we can start checking for overlaps in element ranges. We will do this by
  # building a matrix and then filling it with each element If we try and fill a
  # cell that already has something in it, we have an overlap
  layout_mat <- matrix("", nrow = num_rows, ncol = num_cols)
  for(el in elements){
    row_span <- el$start_row:el$end_row
    col_span <- el$start_col:el$end_col
    current_cells <- layout_mat[row_span, col_span, drop = FALSE]
    already_filled_cells <- current_cells != ""

    # Add a visual separation for overlaps
    current_cells[already_filled_cells] <- paste0(current_cells[already_filled_cells], ",")
    layout_mat[row_span, col_span] <- paste0(current_cells, el$id)
  }
  # Empty cells get a dot
  layout_mat[layout_mat == ""] <- "."

  layout_mat
}


to_table <- function(
  layout,
  md_mode = FALSE,
  include_gap_size = FALSE,
  sizes_decorator = I,
  elements_dectorator = I
){
  # We need to take the row and column names and turn them into prefixing rows
  # and columns so knitr can render to markdown properly with the grid gap in
  # the upper left cell
  col_sizes <- get_info(layout, "col_sizes")
  num_cols <- length(col_sizes)
  row_sizes <- get_info(layout, "row_sizes")
  num_rows <- length(row_sizes)

  layout_mat <- to_matrix(layout)

  # Format the cell ids to be right aligned so they are visually distinct from
  # the (soon to be left-aligned) sizes
  size_align <- function(x) format(x, justify = "left")
  cell_align <- function(x) format(x, justify = if (md_mode) "centre" else "left")
  layout_mat <- apply(layout_mat, FUN = cell_align, MARGIN = 2)
  # Single row/col matrices get reverted to vectors here so force back to a matrix
  layout_mat <- matrix(layout_mat, nrow = num_rows, ncol = num_cols)
  first_row <- c(if(include_gap_size) get_info(layout, "gap_size") else "", col_sizes)

  layout_mat <- rbind(
    first_row,
    cbind(row_sizes, layout_mat)
  )

  # Build table string
  if(md_mode){
    # Need empty rows for the header division
    empty_row <- rep_len("", num_cols+1)
    layout_mat <- rbind(layout_mat[1,],
                        empty_row,
                        layout_mat[-1,])
  }

  # Make all cells in a column equal width
  layout_mat <- apply(layout_mat, FUN = size_align, MARGIN = 2)
  colnames(layout_mat) <- NULL
  rownames(layout_mat) <- NULL

  # decorate row sizes
  layout_mat[,1] <- sizes_decorator(layout_mat[,1])

  # and column sizes
  layout_mat[1,] <- sizes_decorator(layout_mat[1,])

  # and elements
  layout_mat[-1,-1] <- apply(
    layout_mat[-1,-1, drop = FALSE],
    FUN = elements_dectorator,
    MARGIN = 2
  )

  if(md_mode){
    # Add border bars
    layout_mat <- apply(layout_mat,
                        FUN = function(x) paste0("| ", paste(x, collapse=" | "), " |"),
                        MARGIN = 1)
    # Add header delimiting dashes to second row
    layout_mat[2] <- gsub(" ", "-", layout_mat[2])
  } else {
    layout_mat <- apply(layout_mat, FUN = paste, collapse=" ", MARGIN = 1)
  }

  # Collapse with new-lines
  paste(layout_mat, collapse = "\n")
}
