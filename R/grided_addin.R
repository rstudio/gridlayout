trashcan_icon <- shiny::HTML(r"(<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                             <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                             </svg>)");

settings_icon <- shiny::HTML(r"(<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                             <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                             </svg>)")

instructions_icon <- shiny::HTML(r"(<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                 <path fill="currentColor" d="M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z" />
                                 </svg>)")

elements_icon <- shiny::HTML(r"(<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                             <path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z" />
                             </svg>)")


#' Edit a grid layout as selected
#'
#' @return NULL
#' @export
grided_addin <- function() {
  requireNamespace("miniUI", quietly = TRUE)
  requireNamespace("shiny", quietly = TRUE)

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

  my_layout <- if(user_has_selected_text | has_layout_chunk) gridlayout::md_to_gridlayout(selected_text) else gridlayout::new_gridlayout()

  starting_elements <- gridlayout::get_elements(my_layout)


  ui <- shiny::tags$body(
    shiny::tags$head(
      shiny::tags$title("GridEd")
    ),
    shiny::includeScript(
      system.file("grided/www/dist/index.js", package = "gridlayout")
    ),
    shiny::includeCSS(
      system.file("grided/www/main.css", package = "gridlayout")
    ),
    shiny::div(id = "header",
               shiny::h2(shiny::HTML("GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app")),
               shiny::div(
                 class = "code_btns",
                 shiny::actionButton("updated_code", "Update selected layout"),
                 shiny::actionButton("get_code", "Get layout code")
               )
    ),
    shiny::div(
      id = "settings",
      shiny::h3(settings_icon, "Settings"),
      shiny::div(
        class = "card-body",
      )
    ),
    shiny::div(
      id = "instructions",
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
          shiny::tags$li("Find element entry in “Added elements” panel and click the", trashcan_icon, " icon")
        ),
      )
    ),
    shiny::div(
      id = "elements",
      shiny::h3(elements_icon, "Added elements"),
      shiny::div(
        class = "card-body",
        shiny::div(id = "added_elements")
      )
    ),
    shiny::div(
      id = "editor",
      shiny::div(
        id = "editor-wrapper",
        shiny::tags$svg(id = "editor-browser-header"),
        shiny::uiOutput("grid_holder")
      )
    )
  )

  server <- function(input, output, session) {

    session$sendCustomMessage(
      "add-elements",
      starting_elements
    )
    session$sendCustomMessage(
      "update-grid",
      list(
        rows =  attr(my_layout, "row_sizes"),
        cols = attr(my_layout, "col_sizes"),
        gap = attr(my_layout, "gap")
      )
    )

    layout_table <- reactive({
      shiny::req(input$elements)

      grid_mat <- matrix(".",
                         nrow = length(input$grid_sizing$rows),
                         ncol = length(input$grid_sizing$cols) )
      for(el in input$elements){
        grid_mat[el$start_row:el$end_row, el$start_col:el$end_col] <- el$id
      }

      to_md(
        new_gridlayout(layout_mat = grid_mat,
                       col_sizes = input$grid_sizing$cols,
                       row_sizes = input$grid_sizing$rows,
                       gap = input$grid_sizing$gap
        )
      )
    })

    shiny::bindEvent(
      shiny::observe({
       layout_call <- glue::glue(
          "layout <- grid_layout_from_md(layout_table = \"",
          "    {layout_table()}\")", .sep = "\n")

        session$sendCustomMessage("code_modal", layout_call)
      }),
      input$get_code)

    shiny::bindEvent(shiny::observe({
      req(input$elements)

      rstudioapi::modifyRange(selected_range, layout_table(), id = NULL)
      shiny::stopApp()
    }), input$updated_code)
  }

  # We'll use a pane viwer, and set the minimum height at
  # 300px to ensure we get enough screen space to display the clock.
  viewer <- shiny::paneViewer(500)
  shiny::runGadget(ui, server, viewer = viewer)
}
