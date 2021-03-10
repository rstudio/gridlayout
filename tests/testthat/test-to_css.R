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
  height: calc(100vh - 2*1rem);
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

#header {
  grid-area: header;
}
#sidebar {
  grid-area: sidebar;
}
#plot_a {
  grid-area: plot_a;
}
#plot_b {
  grid-area: plot_b;
}
#plot_c {
  grid-area: plot_c;
}")
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
  height: calc(100vh - 2*1rem);
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

#header {
  grid-area: header;
}
#sidebar {
  grid-area: sidebar;
}
#plot_a {
  grid-area: plot_a;
}
#plot_b {
  grid-area: plot_b;
}
#plot_c {
  grid-area: plot_c;
}")
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
    str_detect(
      to_css(grid_obj, use_card_style = FALSE),
      "box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);", fixed = TRUE
    )
  )
  expect_false(
    str_detect(
      to_css(grid_obj, use_card_style = FALSE),
      "border-radius: 0.5rem;",
      fixed = TRUE
    )
  )

  expect_true(
    str_detect(
      to_css(grid_obj, use_card_style = TRUE),
      "box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);",
      fixed = TRUE
    )
  )
  expect_true(
    str_detect(
      to_css(grid_obj, use_card_style = TRUE),
      "border-radius: 0.5rem;",
      fixed = TRUE
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
    str_detect(
      to_css(grid_obj, debug_mode = TRUE),
      "outline: 1px solid black;"
    )
  )
  expect_false(
    str_detect(
      to_css(grid_obj, debug_mode = FALSE),
      "outline: 1px solid black;"
    )
  )
})

test_that("Custom styles can be added by the user for further customization of card style", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )

  custom_styles <- c(
    "background" = "blue",
    "border" = "1px solid red"
  )

  expect_true(
    str_detect(
      to_css(grid_obj, element_styles = custom_styles),
      "background: blue;"
    )
  )

  expect_true(
    str_detect(
      to_css(grid_obj, element_styles = custom_styles),
      "border: 1px solid red;"
    )
  )
})


test_that("Height setting can be un-set", {
  grid_obj <- md_to_gridlayout(
    layout_table = "
    |      |120px   |1fr    |1fr    |
    |:-----|:-------|:------|:------|
    |100px |header  |header |header |
    |1fr   |sidebar |plot_a |plot_c |
    |1fr   |sidebar |plot_b |plot_b |"
  )


  expect_true(
    str_detect(
      to_css(grid_obj),
      "height: calc(",
      fixed = TRUE
    )
  )

  expect_false(
    str_detect(
      to_css(grid_obj, full_height = FALSE),
      "height: calc(",
      fixed = TRUE
    )
  )

})
