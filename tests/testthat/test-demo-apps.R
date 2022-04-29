# Don't run these tests on the CRAN build servers
skip_on_cran()

library(shinytest2)

demo_apps <- c(
  "alternate_layouts",
  "nested_grids",
  "recursive_nesting",
  "scrolling_panels"
)

for (demo_app in demo_apps) {
  tryCatch({
    suppressPackageStartupMessages({
      test_app(
        system.file(package = "gridlayout", paste0("demo_apps/", demo_app))
      )
    })
  })
}

