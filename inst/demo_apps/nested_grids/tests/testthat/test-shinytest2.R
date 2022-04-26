library(shinytest2)

test_that("{shinytest2} recording: nested_grids", {
  app <- AppDriver$new(variant = platform_variant(), name = "nested_grids", height = 1470,
      width = 1684)
  app$expect_screenshot()
})
