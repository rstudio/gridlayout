test_that("Updating of ids works for nested panels", {
  expect_snapshot({
    my_layout <- "
|     |        |        |
|-----|--------|--------|
|1rem |1fr     |1fr     |
|auto |header  |header  |
|1fr  |nestedA |nestedB |"

    content_layout <- "
|    |         |            |
|----|---------|------------|
|    |1fr      |4fr         |
|1fr |icon     |bin_chooser |
|4fr |settings |plot        |"

    grid_page(
      layout = my_layout,
      header = title_panel("Nested grids"),
      nestedA = nested_grid_panel(
        layout = content_layout,
        elements = list(
          icon = text_panel("R"),
          bin_chooser = "choose your bins",
          settings = "Settings panel",
          plot = "Plot output"
        )
      ),
      nestedB = nested_grid_panel(
        title = "Nested within a titled panel",
        layout = content_layout,
        elements = list(
          icon = text_panel("R"),
          bin_chooser = text_panel("Bin Slider"),
          settings = "Bin numbers",
          plot = text_panel("Another Plot")
        )
      )
    )
  })
})

test_that("Can double nest", {
  expect_snapshot({
    my_layout <- "
  |     |1fr     |4fr    |
  |auto |header  |header |
  |4fr  |sidebar |nested |"

    grid_page(
      layout = my_layout,
      header = title_panel("Level 1"),
      sidebar = "I am a sidebar",
      nested = nested_grid_panel(
        layout = my_layout,
        elements = list(
          header = text_panel("level 2"),
          sidebar = "I am a sidebar",
          nested = nested_grid_panel(
            layout = my_layout,
            elements = list(
              header = text_panel("level 3"),
              sidebar = "I am a sidebar",
              nested = "I am nested"
            )
          )
        )
      )
    )
  })
})
