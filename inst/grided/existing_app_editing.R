library(shiny)
library(here)
library(purrr)
library(gridlayout)


# setwd(here("inst/grided/"))

options(shiny.autoreload = TRUE)
shiny::devmode(TRUE)


my_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|150px |header  |header |
|1fr   |sidebar |plot   |"


update_btn_text <- "Update button"

ui <- shiny::tags$body(
  shiny::tags$head(
    shiny::tags$title("GridEd"),
    tags$link(rel = "stylesheet", type = "text/css", href = "main.css"),
    tags$script(src = "dist/index.js")
  ),
  # shiny::includeScript(
  #   system.file("grided/www/dist/index.js", package = "gridlayout")
  # ),
  # shiny::includeCSS(
  #   system.file("grided/www/main.css", package = "gridlayout")
  # ),
  shiny::div(
    id = "grided-holder",
    shiny::div(
      id = "header",
      shiny::h2(shiny::HTML("GridEd<sub>(itor)</sub>: Build a grid layout for your Shiny app")),
      shiny::div(
        class = "code_btns",
        shiny::actionButton("updated_code", update_btn_text),
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
          grid_container(
            id = "grid_page",
            layout = my_layout,
            elements = list(
              header = h2("Geysers!"),
              sidebar = sliderInput("bins", "Number of bins:", min = 1, max = 50, value = 30, width = "100%"),
              plot = plotOutput("distPlot", height = "100%")
            )
          )
        )
      )
    )
  )
)


# Define server logic required to draw a histogram
server <- function(input, output, session) {
  session$sendCustomMessage("shiny-loaded", 1)


  output$distPlot <- renderPlot({
    x <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    hist(x, breaks = bins, col = "darkgray", border = "white")
  })
}

# setwd(here("inst/grided/"))

app <- shinyApp(ui, server)
