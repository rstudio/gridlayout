test_that("multiplication works", {

  temp_rmd <- tempfile(fileext = ".rmd")

  rmd_txt <- "``` {.layout .grid}
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

More text in the sidebar."

  writeLines(rmd_txt, temp_rmd)
  my_layout <- shinymd_to_gridlayout(temp_rmd)
  expect_equal(
    to_md(my_layout),
"|     |        |     |
|-----|--------|-----|
|1rem |1fr     |1fr  |
|1fr  |sidebar |main |
|1fr  |sidebar |main |"
  )
})
