% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/grid_page.R
\name{grid_page}
\alias{grid_page}
\title{Use \code{gridlayout} for entire app layout}
\usage{
grid_page(
  layout,
  ...,
  row_sizes = NULL,
  col_sizes = NULL,
  gap_size = NULL,
  container_height = "viewport",
  theme = bslib::bs_theme(version = 5),
  flag_mismatches = FALSE
)
}
\arguments{
\item{layout}{Either a markdown table representation (see
\code{\link{md_to_gridlayout}}) or a \code{gridlayout} object defining the
desired layout for your Shiny app.}

\item{...}{\code{grid_card()} (or similar) arguments that will fill the grid
layout. Note the areas should match the those provided in \code{layout}.}

\item{row_sizes}{A character vector of valid css sizes for the height of each
row in your grid as given by the main layout definition. If a single value
is passed, it will be repeated for all columns. If sizes are provided both
here and in the main layout then these sizes will be the ones used.}

\item{col_sizes}{Same as \code{row_sizes}, but for column widths}

\item{gap_size}{Valid css sizing for gap to be left between each element in your
grid. Like \code{row_sizes} and \code{col_sizes}, this will win-out over a gap size
provided in the main layout table.}

\item{container_height}{Optional parameter to control height of page.
Defaults to \code{"viewport"} so app takes up full vertical space of page.
See argument of same name in \code{new_gridlayout()} for more options.}

\item{theme}{Optional argument to pass to \code{theme} argument of
\code{\link[shiny]{fluidPage}}.}

\item{flag_mismatches}{Should mismatches between the named arguments and
layout elements trigger an error?}
}
\value{
A UI definition that can be passed to the
\code{\link[shiny]{shinyUI}} function.
}
\description{
This is the typical way to use \code{gridlayout} in your \code{Shiny} app. \code{grid_page}
will make up the entire \code{ui} declaration of the app. Under the hood it uses
\code{\link[shiny:fluidPage]{shiny::fluidPage()}} and \link{grid_container}. Elements are placed in the layout
by wrapping in a \code{grid_card()} with the \code{area} set to the area in the layout
the element should be placed in.
}
\examples{
if (FALSE) {
library(gridlayout)
library(shiny)
library(bslib)

shinyApp(
  ui = grid_page(
    layout = c(
      "header  header",
      "sidebar distPlot"
    ),
    row_sizes = c("50px", "1fr"),
    col_sizes = c("200px", "1fr"),
    grid_card_text("header", "This is my header"),
    grid_card(
      area = "sidebar",
      card_header("Settings"),
      card_body(
        sliderInput("bins", "Number of bins:", 1, 50, 30, width = "100\%")
      )
    ),
    grid_card_plot("distPlot")
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
}
}
\seealso{
See \code{vignette("defining-a-layout", package = "gridlayout")} for more info on defining your layout. \code{\link[=grid_container]{grid_container()}} for using gridlayout without also setting up the
root page layout. \code{\link[=grid_nested]{grid_nested()}} for placing a grid container within
another gridlayout. \code{\link[=grid_card]{grid_card()}} for placing content inside your layout.
}
