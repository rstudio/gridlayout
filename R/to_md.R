#' Convert layout to markdown table
#'
#' Uses the `knitr::kable()` function to convert a layout object to a markdown
#' table
#'
#' @param layout Object of class `"gridlayout"`.
#' @param include_gap_size Should the gap size for the layout be added in
#'   upper-left of table?
#'
#' @return Markdown table as constructed by `knitr::kable()` that defines the
#'   grid layout. This can be used with the function `grid_layout_from_md()` to
#'   build grid layouts.
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
to_md <- function(layout, include_gap_size = TRUE) {
  UseMethod("to_md")
}

#' @export
to_md.default <- function(layout, include_gap_size = TRUE){
  cat("to_md generic")
}

#' @export
to_md.gridlayout <- function(layout, include_gap_size = TRUE){

  # We need to take the row and column names and turn them into prefixing rows
  # and columns so knitr can render to markdown properly with the grid gap in
  # the upper left cell
  first_row <- c(if(include_gap_size) attr(layout, "gap") else "", attr(layout, "col_sizes"))
  layout_w_size_row <- rbind(
    first_row,
    cbind(
      attr(layout, "row_sizes"),
      layout
    )
  )

  rownames(layout_w_size_row) <- NULL
  colnames(layout_w_size_row) <- NULL

  md_table <- knitr::kable(layout_w_size_row, col.names = rep("", length(first_row)))

  # knitr::kable() likes to insert alignment colons but let's remove them so the
  # table looks cleaner
  gsub(
    pattern = ":", replacement = "-",
    paste(as.character(md_table), collapse = "\n")
  )
}
