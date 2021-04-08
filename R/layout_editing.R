
# file_text is a character vector with each line of a file being represented as
# an element in the vector. For example this is the way the rstudioapi gives you
# back the open-files context.
find_layouts_in_file <- function(file_text){
  # This is a semi-complicated regex that looks for lines that appear to be
  # markdown table lines. This means they start with pipes and end with pipes.
  # Exceptions are made for the start and end which may contain a quote and
  # leading/trailing content respectively

  # The rle() function gives us the sections of continuous table-ness which we
  # can then parse through and try and read each table into a layout
  md_table_lines <- rle(str_detect(file_text, '(^|\\")\\s*\\|.+\\|\\s*\\"*'))

  section_end <- cumsum(md_table_lines$lengths)
  section_start <- section_end - md_table_lines$lengths + 1

  all_layouts <- lapply(
    which(md_table_lines$values),
    function(rle_index) {
      start_row <- section_start[rle_index]
      start_line <- file_text[start_row]
      end_row <- section_end[rle_index]
      end_line <- file_text[end_row]

      # Get the position of the start of the table and end of the table
      # so we can perfectly extract it without any extraneous text like
      # quotes or assignment operators
      start_col <- min(which(strsplit(start_line, split = "")[[1]] == "|"))
      end_col <- max(which(strsplit(end_line, split = "")[[1]] == "|"))
      table_text <- file_text[start_row:end_row]
      table_text[1] <- substring(table_text[1], first = start_col)
      n_row <- md_table_lines$lengths[rle_index]
      table_text[n_row] <- substring(table_text[n_row], first = 1, last = end_col)

      contents <- paste(table_text, collapse = "\n")

      list(
        start_row = start_row,
        start_col = start_col,
        end_row  = end_row,
        end_col = end_col,
        contents = contents,
        layout = md_to_gridlayout(contents, null_instead_of_error = TRUE)
      )
    }
  )

  Filter(
    x = all_layouts,
    f = function(x) !is.null(x$layout)
  )
}


update_layout_in_file <- function(editor_selection, layout_loc, new_layout){
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
