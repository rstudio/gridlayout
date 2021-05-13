## ---- include = FALSE---------------------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>",
  out.width = "100%"
)

## ---- eval = FALSE, echo = FALSE----------------------------------------------
#  # Generate screenshots for this vignette
#  source(here::here("tests/screenshot-tests/setupScreenshots.R"))
#  
#  
#  lapply(
#    c("base",
#      "only_grid_panel",
#      "extra_child_styles"),
#    function(mode){
#      screenshot_demo_app(
#        app_path = here::here('inst/demo_apps/rmarkdown_demo/grid_markdown_options.Rmd'),
#        screenshot_name = paste0("use_gridlayout_rmd_", mode, ".png"),
#        screenshot_root = "vignettes",
#        rmd_params = list(mode = mode),
#        vwidth = 1100
#      )
#    }
#  )
#  

## -----------------------------------------------------------------------------
library(gridlayout)

## ---- eval = FALSE------------------------------------------------------------
#  use_gridlayout_rmd()

## ---- echo = FALSE, message=FALSE---------------------------------------------
knitr::include_graphics("use_gridlayout_rmd_base.png")

## ---- eval = FALSE------------------------------------------------------------
#  use_gridlayout_rmd(is_card_styled = "grid_panel")

## ---- echo = FALSE, message=FALSE---------------------------------------------
knitr::include_graphics("use_gridlayout_rmd_only_grid_panel.png")

## ---- eval = FALSE------------------------------------------------------------
#  use_gridlayout_rmd(
#    is_card_styled = "grid_panel",
#    element_styles = c("background" = "honeydew")
#  )

## ---- echo = FALSE, message=FALSE---------------------------------------------
knitr::include_graphics("use_gridlayout_rmd_extra_child_styles.png")

