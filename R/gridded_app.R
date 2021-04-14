
grided_ui_wrapper <- function(grid_container, update_btn_text = NULL, dev_mode = FALSE) {
  shiny::tags$body(
    shiny::tags$head(
      shiny::tags$title("GridEd"),
      if (dev_mode) tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
      if (dev_mode) tags$script(src = "dist/index.js"),
    ),
    if (!dev_mode) {
      shiny::includeScript(
        system.file("grided/www/dist/index.js", package = "gridlayout")
      )
    },
    if (!dev_mode) {
      shiny::includeCSS(
        system.file("grided/www/main.css", package = "gridlayout")
      )
    },
    shiny::div(
      id = "grided__holder",
      shiny::div(
        id = "grided__header",
        shiny::h2(shiny::HTML("GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app")),
        shiny::div(
          class = "code_btns",
          if (!is.null(update_btn_text)) shiny::actionButton("updated_code", update_btn_text),
          shiny::actionButton("get_code", "Get layout code")
        )
      ),
      shiny::div(
        id = "grided__settings",
        shiny::h3(settings_icon, "Settings"),
        shiny::div(
          class = "card-body",
        )
      ),
      shiny::div(
        id = "grided__instructions",
        shiny::h3(instructions_icon, "Instructions"),
        shiny::div(
          class = "card-body",
          shiny::strong("Add an element:"),
          shiny::tags$ul(
            shiny::tags$li("Click and drag over the grid to define a region"),
            shiny::tags$li("Enter id of element in popup")
          ),
          shiny::strong("Edit an element:"),
          shiny::tags$ul(
            shiny::tags$li("Drag the upper left, middle, or bottom right corners of the element to reposition")
          ),
          shiny::strong("Remove an element:"),
          shiny::tags$ul(
            shiny::tags$li("Find element entry in \"Added elements\" panel and click the", trashcan_icon, " icon")
          ),
        )
      ),
      shiny::div(
        id = "grided__elements",
        shiny::h3(elements_icon, "Added elements"),
        shiny::div(
          class = "card-body",
          shiny::div(id = "added_elements")
        )
      ),
      shiny::div(
        id = "grided__editor",
        shiny::div(
          id = "editor-wrapper",
          shiny::HTML(browser_header_html),
          shiny::div(
            id = "editor-app-window",
            grid_container
          )
        )
      )
    )
  )
}


# Slightly easier way to build a layout from the elements and grid_sizing inputs
# provided by grided UI
layout_from_grided <- function(elements, grid_sizing) {
  new_gridlayout(
    element_list = elements,
    col_sizes = as.character(grid_sizing$cols),
    row_sizes = as.character(grid_sizing$rows),
    gap = grid_sizing$gap
  )
}




find_grid_tags <- function(x) {
  is_shinytag <- inherits(x, "shiny.tag")
  has_class <- is_shinytag && !is.null(x$attribs$class)

  if (has_class && x$attribs$class == "container-fluid") {
    x$children
  } else if (is_shinytag | inherits(x, "list")) {
    children <- if (is_shinytag) x[["children"]] else x
    for (child in children) {
      ret <- Recall(child)
      if (!is.null(ret)) {
        return(ret)
      }
    }
  } else {
    NULL
  }
}
