## ---- include = FALSE---------------------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  echo = FALSE,
  out.width = "100%"
)

screen_sizes <- list(
  list(width = 2000, height = 1000),
  list(width = 1000, height = 1000),
  list(width = 500, height = 1000)
)


## ---- eval = FALSE------------------------------------------------------------
#  # Run this code manually to build screenshots
#  for (sizes in screen_sizes) {
#    width <- sizes$width
#    height <- sizes$height
#    webshot2::appshot(
#      here::here("inst/demo_apps/alternate_layouts/app.R"),
#      file = here::here(glue::glue("vignettes/alternate-layouts_w{width}_h{height}.png")),
#      cliprect = "viewport",
#      delay = 1.5,
#      vwidth = width,
#      vheight = height
#    )
#  }

## ----setup--------------------------------------------------------------------
library(gridlayout)

## ---- echo = TRUE-------------------------------------------------------------
main_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header  |header |
|1fr   |sidebar |plot   |"

mobile_layout <- "
|----- |--------|
|2rem  |1fr     |
|100px |header  |
|250px |sidebar |
|400px |plot    |"

big_screen_layout <- "
|-----|-------|--------|-----|
|2rem |250px  | 250px  |1fr  |
|1fr  |header |sidebar |plot |
"

new_gridlayout(
  main_layout,
  alternate_layouts = list(
    list(
      layout = mobile_layout,
      width_bounds = c(max = 600)
    ),
    list(
      layout = big_screen_layout,
      width_bounds = c(min = 1600)
    )
  )
)

## -----------------------------------------------------------------------------
knitr::include_graphics("alternate-layouts_w2000_h1000.png")

## -----------------------------------------------------------------------------
knitr::include_graphics("alternate-layouts_w1000_h1000.png")

## ---- out.width = "500px"-----------------------------------------------------
knitr::include_graphics("alternate-layouts_w500_h1000.png")

## -----------------------------------------------------------------------------
main_layout <- "
|      |        |       |
|------|--------|-------|
|2rem  |200px   |1fr    |
|100px |header  |header |
|1fr   |sidebar |plot   |"

new_gridlayout(main_layout)

## -----------------------------------------------------------------------------
new_gridlayout(main_layout, alternate_layouts = NULL)

