library(shinytest2)


test_that("{shinytest2} recording: scrolling_panels", {

  expect_scrollable <- function(el_var_name){
    offset_height <- app$get_js(paste0(el_var_name,".offsetHeight"))
    scroll_height <- app$get_js(paste0(el_var_name,".scrollHeight"))
    expect_gt(offset_height, 0)
    expect_gt(scroll_height, 0)
    expect_lt(offset_height, scroll_height)
  }

  app <- AppDriver$new(variant = platform_variant(), name = "scrolling_panels", height = 2024,
      width = 771)

  # Make sure the plot panel is scrollable
  app$run_js("var plot_el = document.querySelector(\"#chickPlot\").parentElement;")
  expect_scrollable("plot_el")

  # Repeat for table
  app$run_js("var table_el = document.querySelector(\"#stockTable\").parentElement;")
  expect_scrollable("table_el")
})

