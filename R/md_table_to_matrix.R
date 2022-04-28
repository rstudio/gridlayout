
md_table_to_matrix <- function(md_layout){
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

  nested_arrays <- by_rows %>%
    # Remove any decorative header lines: e.g. "|---:|"
    Filter(f = function(x) !grepl(x, pattern = "^[\\s\\|\\-|:]+$", perl = TRUE)) %>%
    # Remove leading pipes
    str_remove_all("^\\|\\s*") %>%
    # Split into cells on internal pipes
    strsplit("\\s*\\|\\s*") %>%
    Filter(f = function(x) {length(x) > 0})


  layout_matrix <- matrix(
    do.call(c, nested_arrays),
    nrow = length(nested_arrays),
    byrow = TRUE
  )


  layout_matrix
}
