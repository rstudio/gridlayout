test_that("Works with default body target", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_equal(
    to_css(grid_obj),
    "body {
  display: grid;
  grid-template-rows: 100px 1fr 1fr;
  grid-template-columns: 120px 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  grid-template-areas:
    \"header header header\"
    \"sidebar plot_a plot_c\"
    \"sidebar plot_b plot_b\";
}

body > * {
  box-sizing: border-box;
  padding: 0.8rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);
  border-radius: 0.5rem;
}

#header { grid-area: header; }
#sidebar { grid-area: sidebar; }
#plot_a { grid-area: plot_a; }
#plot_b { grid-area: plot_b; }
#plot_c { grid-area: plot_c; }")
})


test_that("Can change body target", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
      |      |120px   |1fr    |1fr    |
      |:-----|:-------|:------|:------|
      |100px |header  |header |header |
      |1fr   |sidebar |plot_a |plot_c |
      |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_equal(
    to_css(grid_obj, "app_container"),
    "#app_container {
  display: grid;
  grid-template-rows: 100px 1fr 1fr;
  grid-template-columns: 120px 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  grid-template-areas:
    \"header header header\"
    \"sidebar plot_a plot_c\"
    \"sidebar plot_b plot_b\";
}

#app_container > * {
  box-sizing: border-box;
  padding: 0.8rem;
  box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);
  border-radius: 0.5rem;
}

#header { grid-area: header; }
#sidebar { grid-area: sidebar; }
#plot_a { grid-area: plot_a; }
#plot_b { grid-area: plot_b; }
#plot_c { grid-area: plot_c; }")
})

test_that("Card styling can be disabled", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_false(
    stringr::str_detect(
      to_css(grid_obj, use_card_style = FALSE),
      stringr::fixed("box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);")
    )
  )
  expect_false(
    stringr::str_detect(
      to_css(grid_obj, use_card_style = FALSE),
      stringr::fixed("border-radius: 0.5rem;")
    )
  )

  expect_true(
    stringr::str_detect(
      to_css(grid_obj, use_card_style = TRUE),
      stringr::fixed("box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);")
    )
  )
  expect_true(
    stringr::str_detect(
      to_css(grid_obj, use_card_style = TRUE),
      stringr::fixed("border-radius: 0.5rem;")
    )
  )
})

test_that("Debug mode adds outline to all elements", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )

  expect_true(
    stringr::str_detect(
      to_css(grid_obj, debug_mode = TRUE),
      "outline:1px solid black;"
    )
  )
  expect_false(
    stringr::str_detect(
      to_css(grid_obj, debug_mode = FALSE),
      "outline:1px solid black;"
    )
  )
})
