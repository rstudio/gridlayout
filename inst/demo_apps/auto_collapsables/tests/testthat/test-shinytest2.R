library(shinytest2)

# setwd(here::here("inst/demo_apps/auto_collapsables/"))
test_that("{shinytest2} recording: auto_collapsables", {
  app <- AppDriver$new(variant = platform_variant(), name = "auto_collapsables",
      height = 2024, width = 633)

  # Grab the settings panel
  app$run_js("var settings_panel = document.querySelector(\".grid_panel[data-gridlayout-area='sidebar']\")")

  expect_false("collapsed" %in% app$get_js("settings_panel.classList"))

  app$click(selector=".grid_panel[data-gridlayout-area='sidebar'] .collapser-icon")
  app$wait_for_idle()
  expect_true("collapsed" %in% app$get_js("settings_panel.classList"))
})
