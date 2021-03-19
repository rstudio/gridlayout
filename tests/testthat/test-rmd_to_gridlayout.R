test_that("extractions works", {

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
  my_layout <- rmd_to_gridlayout(temp_rmd)
  expect_equal(
    to_md(my_layout),
"|     |        |     |
|-----|--------|-----|
|1rem |1fr     |1fr  |
|1fr  |sidebar |main |
|1fr  |sidebar |main |"
  )
})


test_that("updating layout chunk works", {

  loc_of_rmd <- system.file("sample_apps/my_app.Rmd", package = "gridlayout")
  first_layout <- rmd_to_gridlayout(loc_of_rmd)

  new_layout <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  loc_of_new_rmd <- tempfile(fileext = ".rmd")
  update_rmd(loc_of_rmd, new_layout, loc_of_new_rmd)
  updated_layout <- rmd_to_gridlayout(loc_of_new_rmd)

  # Updated layout should be the same as the one we passed in
  expect_equal(new_layout, updated_layout)

  # Which should, of course, not be the same as the original layout
  expect_false(to_md(first_layout) == to_md(updated_layout))
})
