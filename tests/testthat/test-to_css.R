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
  grid-template-rows: 100px 1fr 1fr;
  grid-template-columns: 120px 1fr 1fr;
  grid-template-gap: 1rem;
  padding: 1rem;
  grid-template-areas:
    \"header header header\"
    \"sidebar plot_a plot_c\"
    \"sidebar plot_b plot_b\";
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
    to_css(grid_obj, "#app_container"),
    "#app_container {
  grid-template-rows: 100px 1fr 1fr;
  grid-template-columns: 120px 1fr 1fr;
  grid-template-gap: 1rem;
  padding: 1rem;
  grid-template-areas:
    \"header header header\"
    \"sidebar plot_a plot_c\"
    \"sidebar plot_b plot_b\";
}

#header { grid-area: header; }
#sidebar { grid-area: sidebar; }
#plot_a { grid-area: plot_a; }
#plot_b { grid-area: plot_b; }
#plot_c { grid-area: plot_c; }")
})
