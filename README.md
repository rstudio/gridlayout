
<!-- README.md is generated from README.Rmd. Please edit that file -->

# gridlayout

<!-- badges: start -->

[![R-CMD-check](https://github.com/rstudio/gridlayout/workflows/R-CMD-check/badge.svg)](https://github.com/rstudio/gridlayout/actions)
<!-- badges: end -->

A package to making building dashboard-style layouts in Shiny and
RMarkdown easy using CSS-Grid.

## Installation

You can install the development version from
[GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github("rstudio/gridlayout")
```

## Setting up your `gridlayout`

The easiest and most common way to specify a grid layout is using a
markdown table syntax. This allows you to use any markdown table editor
of your choice to configure your layout.

``` r
library(gridlayout)

my_layout <- new_gridlayout("
  |      |120px   |1fr    |1fr    |
  |------|--------|-------|-------|
  |100px |header  |header |header |
  |1fr   |sidebar |plot_a |plot_c |
  |1fr   |sidebar |plot_b |plot_b |"
)

my_layout
#> gridlayout of 5 elements: 
#>         120px   1fr    1fr   
#>   100px header  header header
#>   1fr   sidebar plot_a plot_c
#>   1fr   sidebar plot_b plot_b
#> Gap of 1rem. Total height of viewport.
#> 
#> Alternate layouts:  
#>   
#>   - Width < 500px 
#>            1fr    
#>     85px  header 
#>     350px sidebar
#>     350px plot_a 
#>     350px plot_b 
#>     350px plot_c 
#>   Gap of 1rem. Total height of auto.
```

You can also use the top left cell of your table to specify the gap
size.

``` r
my_layout <- new_gridlayout("
  | 25px |120px   |1fr    |1fr    |
  |------|--------|-------|-------|
  |100px |header  |header |header |
  |1fr   |sidebar |plot_a |plot_c |
  |1fr   |sidebar |plot_b |plot_b |"
)

my_layout
#> gridlayout of 5 elements: 
#>         120px   1fr    1fr   
#>   100px header  header header
#>   1fr   sidebar plot_a plot_c
#>   1fr   sidebar plot_b plot_b
#> Gap of 25px. Total height of viewport.
#> 
#> Alternate layouts:  
#>   
#>   - Width < 500px 
#>            1fr    
#>     85px  header 
#>     350px sidebar
#>     350px plot_a 
#>     350px plot_b 
#>     350px plot_c 
#>   Gap of 1rem. Total height of auto.
```

You can also programatically build your layout using `new_gridlayout`.
Here you simply pass a list of the elements that make up your layout
along with column and row sizes.

``` r
library(gridlayout)

# Assemble list of elements along with their positions
elements_list <- list(
  list(id = "header", start_row = 1, end_row = 1,
       start_col = 1, end_col = 2),
  list(id = "plot",   start_row = 2, end_row = 2,
       start_col = 1, end_col = 1),
  list(id = "table",  start_row = 2, end_row = 2,
       start_col = 2, end_col = 2),
  list(id = "footer", start_row = 3, end_row = 3,
       start_col = 1, end_col = 2)
)

new_gridlayout(
  elements_list,
  col_sizes = c("1fr", "2fr"),
  row_sizes = c("100px", "1fr", "1fr")
)
#> gridlayout of 4 elements: 
#>         1fr    2fr   
#>   100px header header
#>   1fr   plot   table 
#>   1fr   footer footer
#> Gap of 1rem. Total height of viewport.
#> 
#> Alternate layouts:  
#>   
#>   - Width < 500px 
#>            1fr   
#>     85px  header
#>     350px plot  
#>     350px table 
#>     350px footer
#>   Gap of 1rem. Total height of auto.
```

## Using in a shiny app

Once you’ve setup your layout you can use it in a Shiny app with the
`grid_page()` ui function:

``` r
library(shiny)

# The classic Geyser app with grid layout
shinyApp(
  ui = grid_page(
    layout = "
      |2rem  |200px   |1fr    |
      |85px  |header  |header |
      |1fr   |sidebar |plot   |",
    grid_panel_text("header", "Geysers!", is_title = TRUE),
    grid_panel(
      "sidebar",
      title = "Settings",
      sliderInput("bins","Number of bins:", 
                  min = 1, max = 50, value = 30, width = "100%")
    ),
    grid_panel(
      "plot",
      plotOutput("distPlot", height="100%")
    )
  ),
  server = function(input, output) {
    output$distPlot <- renderPlot({
      x    <- faithful[, 2]
      bins <- seq(min(x), max(x), length.out = input$bins + 1)
      hist(x, breaks = bins, col = 'darkgray', border = 'white')
    })
  }
)
```

<img src="man/figures/geyser_demo.png" width="100%" /> *Screenshot of
grided geyser app running*

`grid_page()` will automatically make your gridlayout fill the entire
page. If you are interested in having a finer-grain control over the
size and position of your grid layout you can use the `grid_container()`
function to place your grid layout wherever you want. The equivalent app
to above can be created by replacing the UI definition with a
`fluidPage` containing a `grid_container()`:

``` r
...
shinyApp(
  ui = fluidPage(
    grid_container(
      layout = "
        |2rem  |200px   |1fr    |
        |85px  |header  |header |
        |1fr   |sidebar |plot   |",
      grid_panel_text("header", "Geysers!"),
      grid_panel(
        "sidebar",
        title = "Settings",
        sliderInput("bins", "Number of bins:", 
                    min = 1, max = 50, value = 30, width = "100%")
      ),
      grid_panel(
        "plot",
        plotOutput("distPlot", height="100%")
      )
    )
  ),
  server = ...
)
```

This time, however the grid is constrained to `800px` tall, no-matter
how large or small the window viewing it is.

## Using in RMarkdown

The function `use_gridlayout_rmd()` called in the `setup` chunk of an
RMarkdown file will enable you to use gridlayout to layout your
document. Just match the section headers to the layout element names and
place layout md table in a `gridlayout` chunk…

**`my_app.rmd`**

    ---
    title: "`gridlayout` in Rmarkdown"
    author: "Nick Strayer"
    date: "3/9/2021"
    output: html_document
    ---



    ## Main


    ```gridlayout
    |      |        |         |
    |------|--------|---------|
    |2rem  |200px   |1fr      |
    |150px |header  |header   |
    |1fr   |sidebar |main     |
    |120px |footer  |footer   |
    ```


    ## Sidebar

    Here is some content for the sidebar

    ## Footer

    Anything you want could go in the footer.

<img src="man/figures/basic_markdown.png" width="100%" />

*Output of `my_app.rmd`*

## Working with layout object

Once you have your `gridlayout` object, you can convert it to a markdown
table spec or to the CSS that generates the given grid.

``` r
cat(to_md(my_layout))
#> | 25px  | 120px   | 1fr    | 1fr    |
#> |-------|---------|--------|--------|
#> | 100px | header  | header | header |
#> | 1fr   | sidebar | plot_a | plot_c |
#> | 1fr   | sidebar | plot_b | plot_b |
```

``` r
cat(to_css(my_layout))
#> 
#> body {
#>   display:grid;
#>   grid-template-rows:100px 1fr 1fr;
#>   grid-template-columns:120px 1fr 1fr;
#>   grid-template-areas:
#>     "header  header header"
#>     "sidebar plot_a plot_c"
#>     "sidebar plot_b plot_b";
#>   grid-gap:25px;
#>   padding:25px;
#>   height:100vh;
#> }
#> 
#> 
#> 
#> @media (max-width:500px) {
#>   body {
#>     display:grid;
#>     grid-template-rows:85px 350px 350px 350px 350px;
#>     grid-template-columns:1fr;
#>     grid-template-areas:
#>       "header "
#>       "sidebar"
#>       "plot_a "
#>       "plot_b "
#>       "plot_c ";
#>     grid-gap:1rem;
#>     padding:1rem;
#>     height:auto;
#>   }
#> }
```

If you want to get at the individual components or “elements” stored in
your grid you can use `get_elements()`.

``` r
head(get_elements(my_layout), 2)
#> [[1]]
#> [[1]]$id
#> [1] "header"
#> 
#> [[1]]$start_row
#> [1] 1
#> 
#> [[1]]$end_row
#> [1] 1
#> 
#> [[1]]$start_col
#> [1] 1
#> 
#> [[1]]$end_col
#> [1] 3
#> 
#> [[1]]$collapsible
#> [1] FALSE
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "sidebar"
#> 
#> [[2]]$start_row
#> [1] 2
#> 
#> [[2]]$end_row
#> [1] 3
#> 
#> [[2]]$start_col
#> [1] 1
#> 
#> [[2]]$end_col
#> [1] 1
#> 
#> [[2]]$collapsible
#> [1] FALSE
```
