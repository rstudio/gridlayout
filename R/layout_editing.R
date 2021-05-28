
# file_text is a character vector with each line of a file being represented as
# an element in the vector. For example this is the way the rstudioapi gives you
# back the open-files context.
find_layouts_in_file <- function(file_text) {
  # This is a semi-complicated regex that looks for lines that appear to be
  # markdown table lines. This means they start with pipes and end with pipes.
  # Exceptions are made for the start and end which may contain a quote and
  # leading/trailing content respectively
  n_lines <- length(file_text)

  is_table_line <- str_detect(file_text, '(^|\\")\\s*\\|.+\\|\\s*\\"*')
  prev_was_table_line <- lag(is_table_line, default = FALSE)
  next_is_table_line <- lead(is_table_line, default = FALSE)
  is_table_start_line <- str_detect(file_text, '(\'|\\")\\s*\\|.+\\|\\s*')
  next_is_table_start_line <- lead(is_table_start_line)

  all_tables <- list()
  curr_table <- list()
  for (i in seq_len(n_lines)) {
    is_table <- is_table_line[i]
    prev_was_table <- prev_was_table_line[i]
    next_is_table <- next_is_table_line[i]
    is_table_start <- is_table_start_line[i]
    next_is_table_start <- next_is_table_start_line[i]

    curr_table_finished <- is_table & (!next_is_table | next_is_table_start)
    if (curr_table_finished) {
      curr_table$end_row <- min(i, n_lines) # Don't go beyond end of file for tables at bottom of file
      curr_table$end_col <- pos_of_char(file_text[curr_table$end_row], "|", max)
      all_tables[[length(all_tables) + 1]] <- curr_table
      curr_table <- list()
    }

    starting_new_table <- is_table && (is_table_start || !prev_was_table)
    if (starting_new_table) {
      curr_table$start_row <- i
      curr_table$start_col <- pos_of_char(file_text[i], "|", min)
    }
  }

  all_layouts <- lapply(
    all_tables,
    function(t) {
      # Get the position of the start of the table and end of the table
      # so we can perfectly extract it without any extraneous text like
      # quotes or assignment operators
      table_text <- file_text[t$start_row:t$end_row]
      table_text[1] <- substring(table_text[1], first = t$start_col)
      n_row <- length(table_text)
      table_text[n_row] <- substring(table_text[n_row], first = 1, last = t$end_col)

      contents <- paste(table_text, collapse = "\n")

      c(
        t,
        list(
          contents = contents,
          layout = md_to_gridlayout(contents, null_instead_of_error = TRUE)
        )
      )
    }
  )

  Filter(
    x = all_layouts,
    f = function(x) !is.null(x$layout)
  )
}


pos_of_char <- function(string, char, collapse_fn = min) {
  all_chars <- strsplit(string, split = "")[[1]]
  collapse_fn(which(all_chars == char))
}


update_layout_in_file <- function(editor_selection, layout_loc, new_layout) {
  requireNamespace("rstudioapi", quietly = TRUE)

  selected_range <- rstudioapi::document_range(
    start = rstudioapi::document_position(
      row = layout_loc$start_row,
      column = layout_loc$start_col
    ),
    end = rstudioapi::document_position(
      row = layout_loc$end_row,
      column = layout_loc$end_col + 1
    )
  )

  rstudioapi::setSelectionRanges(selected_range, id = editor_selection$id)
  rstudioapi::modifyRange(selected_range, to_md(new_layout), id = NULL)
}
