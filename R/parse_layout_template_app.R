read_template_app <- function(app_script){
  app_loc <- system.file(paste0("layout-templates/", app_script), package = "gridlayout")
  readLines(con = app_loc)
}
line_of <- function(app_lines, text){
  which(str_detect(app_lines, paste("#'", text)))
}
parse_layout_template_app <- function(app_script) {
  app_lines <- read_template_app(app_script)

  get_chunk <- function(id) {
    # Shift by one to avoid comment itself
    chunk_start <- line_of(app_lines, paste0("start-", id)) + 1
    chunk_end <-   line_of(app_lines, paste0("end-", id)) - 1

    collapse_by_newline(app_lines[seq.int(from = chunk_start, to = chunk_end)])
  }
  layout_text <- get_chunk("layout")
  ui_text <- get_chunk("ui")
  server_text <- get_chunk("server")
  local({
    eval(parse(text = layout_text))
    eval(parse(text = ui_text))
    eval(parse(text = server_text))
    list(layout = app_layout, ui = ui, server = server)
  })
}

prepare_template_for_saving <- function(app_script, updated_layout = NULL) {
  app_lines <- read_template_app(app_script)

  if (notNull(updated_layout)) {
    layout_pos <- find_layouts_in_file(app_lines)[[1]]

    # Some frustratingly complicated manipulation to put an updated table into
    # an indented position prefixed by "layout = " so it can be swapped into the
    # original template where the layout was. This relies on the template always
    # being defined as a string inline with the UI function.
    new_layout_table <- split_by_line(to_md(updated_layout))
    new_layout_table <- paste0(
      c("app_layout <- \"", rep_len("               ", length(new_layout_table) - 1)),
      new_layout_table,
      collapse = "\n"
    )

    # Now break the app code into pre layout, and post layout, and sandwich the
    # new layout between them
    app_lines <- c(
      app_lines[seq.int(from = 1, to = line_of(app_lines,"start-layout") - 1)],
      split_by_line(paste0(new_layout_table, "\"")),
      app_lines[seq.int(from = line_of(app_lines,"end-layout") + 1, to = length(app_lines))]
    )

  }

  # Remove the guiding comment lines
  app_lines[!str_detect(app_lines, "#'", fixed = TRUE)]
}
