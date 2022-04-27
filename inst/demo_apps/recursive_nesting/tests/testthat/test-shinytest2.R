library(shinytest2)

test_that("{shinytest2} recording: recursive_nesting", {
  app <- AppDriver$new(variant = platform_variant(), name = "recursive_nesting", 
      height = 1121, width = 1126)
  app$expect_screenshot()
})
