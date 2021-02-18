
<!-- README.md is generated from README.Rmd. Please edit that file -->

# gridlayout

<!-- badges: start -->
<!-- badges: end -->

A package to making building weblayouts using CSS-Grid easy.

## Installation

You can install the development version from
[GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github("rstudio/gridlayout")
```

## Setting up your `gridlayout`

The most basic way of making a grid layout is with `new_gridlayout`
(This is not how you will typically make a layout.)

``` r
library(gridlayout)

my_layout <- new_gridlayout(
  layout_mat = matrix(c(
    "header", "header",
    "plota",  "plotb"
  ), ncol = 2, byrow = TRUE),
  col_sizes = c("1fr", "2fr"),
  row_sizes = c("100px", "1fr"),
  gap = "2rem"
)
my_layout
#> gridlayout object with 2 rows, 2 columns, and gap size: 2rem 
#>        1fr    2fr    
#> 100px header header 
#> 1fr   plota  plotb
```

More typically you will be specifying your layouts using a table syntax.
This allows you to use any markdown table editor of your choice to
configure your layout.

``` r
my_layout <- md_to_gridlayout(
  layout_table = "
    |      |120px   |1fr    |1fr    |
    |------|--------|-------|-------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
)

my_layout
#> gridlayout object with 3 rows, 3 columns, and gap size: 1rem 
#>        120px   1fr    1fr    
#> 100px header  header header 
#> 1fr   sidebar plot_a plot_c 
#> 1fr   sidebar plot_b plot_b
```

You can also use the top left cell of your table to specify the gap
size.

``` r
my_layout <- md_to_gridlayout(
  layout_table = "
    | 25px |120px   |1fr    |1fr    |
    |------|--------|-------|-------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
)

my_layout
#> gridlayout object with 3 rows, 3 columns, and gap size: 25px 
#>        120px   1fr    1fr    
#> 100px header  header header 
#> 1fr   sidebar plot_a plot_c 
#> 1fr   sidebar plot_b plot_b
```

You can also build a layout from a markdown document that contains a
code-chunk with the labels `.layout .grid`. This is useful for updating
existing applications layouts without copying and pasting your layout
table.

**`my_app.rmd`**

    ``` {.layout .grid}
    | sidebar | main |
    |---------|------|
    | sidebar | main |
    ```

    ## Sidebar title here {#sidebar}

    Here's a sentence at the top of the sidebar.

    ``` {.r .ui}
    tagList(
      sliderInput('x', 'X:', 1, 10, 5),
      textInput('txt', 'Input text')
    )
    ```

    ------------------------------------------------------------------------

    More text in the sidebar.
    ...

``` r
my_app_loc <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
my_layout <- shinymd_to_gridlayout(my_app_loc)
my_layout
#> gridlayout object with 2 rows, 2 columns, and gap size: 1rem 
#>      1fr     1fr  
#> 1fr sidebar main 
#> 1fr sidebar main
```

## Working with layout object

Once you have your `gridlayout` object, you can convert it to a markdown
table spec or to the CSS that generates the given grid.

``` r
cat(to_md(my_layout))
#> |     |        |     |
#> |-----|--------|-----|
#> |1rem |1fr     |1fr  |
#> |1fr  |sidebar |main |
#> |1fr  |sidebar |main |
```

``` r
cat(to_css(my_layout))
#> body {
#>   grid-template-rows: 1fr 1fr;
#>   grid-template-columns: 1fr 1fr;
#>   grid-template-gap: 1rem;
#>   padding: 1rem;
#>   grid-template-areas:
#>     "sidebar main"
#>     "sidebar main";
#> }
#> 
#> #sidebar { grid-area: sidebar; }
#> #main { grid-area: main; }
```

If you want to get at the individual components or “elements” stored in
your grid you can use `get_elements()`.

``` r
head(get_elements(my_layout), 2)
#> [[1]]
#> [[1]]$id
#> [1] "sidebar"
#> 
#> [[1]]$start_row
#> [1] 1
#> 
#> [[1]]$end_row
#> [1] 2
#> 
#> [[1]]$start_col
#> [1] 1
#> 
#> [[1]]$end_col
#> [1] 1
#> 
#> 
#> [[2]]
#> [[2]]$id
#> [1] "main"
#> 
#> [[2]]$start_row
#> [1] 1
#> 
#> [[2]]$end_row
#> [1] 2
#> 
#> [[2]]$start_col
#> [1] 2
#> 
#> [[2]]$end_col
#> [1] 2
```
