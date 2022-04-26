library(shinytest2)

test_that("{shinytest2} recording: scrolling_panels", {
  app <- AppDriver$new(variant = platform_variant(), name = "scrolling_panels", height = 2024, 
      width = 771)
  app$expect_screenshot()
})
