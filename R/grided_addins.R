#' Edit a grid layout as selected
#'
#' @return NULL
#' @export
grided_edit_existing_layout <- function() {
  requireNamespace("rstudioapi", quietly = TRUE)
  editor_selection <- rstudioapi::getSourceEditorContext()

  layout_tables <- find_layouts_in_file(editor_selection$contents)

  if (length(layout_tables) == 0) {
    stop(
      "No layouts found in currently active editor. ",
      "Make sure you've clicked on correct editor pane before running addin."
    )
  } else if (length(layout_tables) > 1) {
    message(
      "More than one layout table found in open editor, using one closest to cursor."
    )
  }

  cursor_row <- editor_selection$selection[[1]]$range$end[1]
  distance_to_tables <- vapply(
    layout_tables,
    function(t){
      from_start <- cursor_row - t$start_row
      from_end <- cursor_row - t$end_row
      if (from_start >= 0 && from_end <= 0) {
        # Cursor is inside the table
        0
      } else {
        # Give the shortest absolute distance to the table
        min(abs(from_start), abs(from_end))
      }
    },
    FUN.VALUE = numeric(1)
  )

  chosen_layout_index <- which.min(distance_to_tables)

  layout <- layout_tables[[chosen_layout_index]]

  grided_app(
    starting_layout = layout$layout,
    finish_button_text = "Update selected layout"
  )
}


#' Create gridlayout and build new app
#'
#' @return NULL
#' @export
grided_create_new_app <- function() {
  requireNamespace("rstudioapi", quietly = TRUE)

  grided_app(
    finish_button_text = "Generate app code",
    on_finish = function(new_layout){
      rstudioapi::documentNew(
        text = to_app_template(new_layout)
      )
      shiny::stopApp()
    })
}
