#' Build grid layout obj from markdown table
#'
#' @param layout_table Character string with a markdown table. First row and
#'   column are reserved for sizing (any valid css sizing works). An optional
#'   grid-gap can be provided using the very first cell.
#' @param null_instead_of_error When the input fails to be parsed as a layout,
#'   should the function return `NULL` instead of throwing an error? Useful for
#'   situations where you're parsing multiple tables simply want to check if a
#'   table can be parsed instead of relying on it being parsable.
#'
#' @return An object of class "grid_layout", which stores the layout as a
#'   matrix. This can be passed to other functions such as `layout_to_css()`.
#' @export
#'
#' @examples
#' md_to_gridlayout(
#'   layout_table = "
#'     |      |120px   |1fr    |1fr    |
#'     |:-----|:-------|:------|:------|
#'     |100px |header  |header |header |
#'     |1fr   |sidebar |plot_a |plot_c |
#'     |1fr   |sidebar |plot_b |plot_b |"
#' )
#'
#'
#' # Can specify gap size in upper left cell
#' md_to_gridlayout(
#'   layout_table = "
#'     |25px  |120px  |1fr    |
#'     |:-----|:------|:------|
#'     |100px |header |header |
#'     |1fr   |plot   |table  |
#'     |1fr   |footer |footer |"
#' )
#'
#' # Don't need to follow full md table with
#' # header row if not desired
#' md_to_gridlayout(
#'   layout_table = "
#'     |25px  |120px  |1fr    |
#'     |100px |header |header |
#'     |1fr   |plot   |table  |
#'     |1fr   |footer |footer |"
#' )
#'
#' # Can omit sizing as well if desired
#' md_to_gridlayout(
#'   layout_table = "
#'     |header |header |
#'     |plot   |table  |
#'     |footer |footer |"
#' )
#'
md_to_gridlayout <- function(layout_table, null_instead_of_error = FALSE){
  by_row <- strsplit(layout_table, "\n")[[1]]
  is_header_divider <- grepl("^[\\| \\- :]+$", by_row, perl = TRUE)
  is_empty_row <- by_row == ""
  clean_rows <- by_row[!(is_header_divider | is_empty_row)]

  # Is the table just raw? In that case assume sizing of 1fr for everything
  has_sizes <- grepl("[\\s|\\|][0-9]", clean_rows[1])

  # Get rid of empty first el caused by table boundaries
  raw_mat <- t(sapply(
    strsplit(clean_rows, "\\s*\\|\\s*", perl = TRUE),
    function(row){row[-1]}
  ))

  if(!is.character(raw_mat[1,1])){
    if(null_instead_of_error) return(NULL)
    stop("The provided text does not appear to be a markdown table.")
  }

  if(has_sizes){
    new_gridlayout(
      col_sizes = raw_mat[1,-1],
      row_sizes = raw_mat[-1,1],
      # Stop single column or row layouts from getting collapsed to vectors
      element_list = elements_from_mat(raw_mat[-1,-1, drop = FALSE]),
      gap = if(raw_mat[1,1] != "") raw_mat[1,1] else "1rem"
    )
  } else {
    new_gridlayout(element_list = elements_from_mat(raw_mat))
  }
}


# Function to allow layout being defined with markdown or with standard object
coerce_to_layout <- function(layout_def){
  if(inherits(layout_def, "character")){
    # If we were passed a string directly then convert to a grid layout before
    # proceeding
    layout_def <- md_to_gridlayout(layout_def)
  } else if(!inherits(layout_def, "gridlayout")){
    stop("Passed layout must either be a markdown table or a gridlayout object.")
  }
  layout_def
}

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

  lapply(
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
}



