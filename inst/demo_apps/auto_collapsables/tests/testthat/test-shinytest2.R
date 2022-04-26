library(shinytest2)



# setwd(here::here("inst/demo_apps/auto_collapsables/"))
test_that("{shinytest2} recording: auto_collapsables", {
  app <- AppDriver$new(variant = platform_variant(), name = "auto_collapsables",
      height = 2024, width = 633)

  app$run_js("var get_panel = area => document.querySelector(\".grid_panel[data-gridlayout-area='\" + area + \"']\")")
  app$run_js("var get_panel_contents_height = area => get_panel(area).querySelector('.panel-content').offsetHeight")
  app$run_js("var get_collapser_visibility = area => window.getComputedStyle(get_panel(area).querySelector('.collapser-icon')).display")

  # The sidebar should have the collapser icon visible
  expect_equal(
    app$get_js("get_collapser_visibility('sidebar');"),
    "block"
  )

  # The plot should not
  expect_equal(
    app$get_js("get_collapser_visibility('plot');"),
    "none"
  )

  # The settings panel by default should not be collapsed
  pre_collapse_height <- app$get_js("get_panel_contents_height('sidebar')")

  # Make sure the panel actually has a height, just to be sure
  expect_gt(pre_collapse_height, 0)

  # But after we click the collapser icon...
  app$run_js("get_panel('sidebar').querySelector(\".collapser-icon\").click()")

  # It will be collapsed
  post_collapse_height <- app$get_js("get_panel_contents_height('sidebar')")

  # Aka should be shorter than the panel contents pre-collapsing
  expect_lt(
    post_collapse_height,
    pre_collapse_height
  )

  # If we make the window larger such that we trigger a layout that doesn't
  # allow the sidebar to be collapsed
  app$set_window_size(width = 1000, height = 2024)

  # The collapser icon should no longer be visible
  expect_equal(
    app$get_js("get_collapser_visibility('sidebar');"),
    "none"
  )

  # The content should be automatically expanded again
  expect_gt(
    app$get_js("get_panel_contents_height('sidebar')"),
    post_collapse_height
  )

})
