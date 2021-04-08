#' Edit a grid layout as selected
#'
#' @return NULL
#' @export
grided_addin <- function() {
  editor_selection <- rstudioapi::getSourceEditorContext()

  app_editor_id <- editor_selection$id
  selected_text <- editor_selection$selection[[1]]$text
  selected_range <- editor_selection$selection[[1]]$range

  # Try and find layout chunk in document
  start_of_layout_chunk_index <- which(grepl("\\`\\`\\` \\{\\.layout \\.grid\\}", editor_selection$contents))[1] + 1
  has_layout_chunk <- length(start_of_layout_chunk_index) != 0

  user_has_selected_text <- selected_text != ""

  if((!user_has_selected_text) & has_layout_chunk){
    print("Selecting chunk for user")
    chunk_deliniators <- which(grepl("\\`\\`\\`", editor_selection$contents))
    end_of_layout_chunk_index <- chunk_deliniators[chunk_deliniators > start_of_layout_chunk_index][1]
    selected_range <- rstudioapi::document_range(
      start = rstudioapi::document_position(row = start_of_layout_chunk_index, column = 1),
      end = rstudioapi::document_position(row = end_of_layout_chunk_index - 1, column = Inf)
    )

    selected_text <- paste(
      editor_selection$contents[(start_of_layout_chunk_index): (end_of_layout_chunk_index-1)],
      collapse = "\n"
    )

    rstudioapi::setSelectionRanges(selected_range, id = app_editor_id)
  }

  my_layout <- if(user_has_selected_text | has_layout_chunk) md_to_gridlayout(selected_text) else gridlayout::new_gridlayout()
  gridded_app(
    starting_layout = my_layout,
    update_btn_text = "Update selected layout",
    on_update = function(new_layout){
      rstudioapi::modifyRange(selected_range, to_md(new_layout), id = NULL)
    })
}
