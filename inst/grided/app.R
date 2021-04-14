library(shiny)
library(here)
library(purrr)
library(gridlayout)

path_to_rmd <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
starting_layout <- gridlayout::rmd_to_gridlayout(path_to_rmd)
starting_elements <- gridlayout::get_elements(starting_layout)


setwd(here("inst/grided/"))

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)

ui <- tags$body(
  tags$head(
    tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
    tags$script(src = "dist/index.js"),
    tags$title("GridEd")
  ),
  div(id = "header",
      h2(HTML("GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app")),
      actionButton("get_code", "Get layout code")
  ),
  div(
    id = "settings",
    h3(settings_icon, "Settings"),
    div(
      class = "card-body",
    )
  ),
  div(
    id = "instructions",
    h3(instructions_icon, "Instructions"),
    div(
      class = "card-body",
      strong("Add an element:"),
      tags$ul(
        tags$li("Click and drag over the grid to define a region"),
        tags$li("Enter id of element in popup")
      ),
      strong("Edit an element:"),
      tags$ul(
        tags$li("Drag the upper left, middle, or bottom right corners of the element to reposition")
      ),
      strong("Remove an element:"),
      tags$ul(
        tags$li("Find element entry in “Added elements” panel and click the", trashcan_icon, " icon")
      ),
    )
  ),
  div(
    id = "elements",
    h3(elements_icon, "Added elements"),
    div(
      class = "card-body",
      div(id = "added_elements")
    )
  ),
  div(
    id = "editor",
    div(
      id = "editor-wrapper",
      shiny::HTML('<div id="editor-browser-header">
  <div id="buttons-container">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div id="url-box">
    <span> www.myShinyApp.com </span>
  </div>
</div>'),
shiny::div(
  id = "editor-app-window",
      uiOutput("grid_page")
)
    )
  )
)

# Define server logic required to draw a histogra m
server <- function(input, output, session) {

  session$sendCustomMessage(
    "add-elements",
    starting_elements
  )
  session$sendCustomMessage(
    "update-grid",
    list(
      rows =  attr(starting_layout, "row_sizes"),
      cols = attr(starting_layout, "col_sizes"),
      gap = attr(starting_layout, "gap")
    )
  )

  current_layout <- shiny::reactive({
    shiny::req(input$elements)
    layout_from_grided(input$elements, input$grid_sizing)
  })

  shiny::bindEvent(
    shiny::observe({
      layout_call <- paste(
        "layout <- grid_layout_from_md(layout_table = \"",
        "    ", to_md(current_layout()), "\")",
        sep = "\n")

      session$sendCustomMessage("code_modal", layout_call)
    }),
    input$get_code)

  shiny::bindEvent(shiny::observe({
    shiny::req(input$elements)
    on_update(current_layout())
    shiny::stopApp()
  }), input$updated_code)
}


shinyApp(ui, server)


