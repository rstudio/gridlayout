library(shinytest2)

test_that("{shinytest2} recording: alternate_layouts", {
  app <- AppDriver$new(variant = platform_variant(), name = "alternate_layouts",
      height = 2024, width = 1619)
  app$expect_screenshot()
  app$set_window_size(width = 1348, height = 2024)
  app$expect_screenshot()
  app$set_window_size(width = 575, height = 2024)
  app$expect_screenshot()
})
