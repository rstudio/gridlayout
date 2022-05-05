# Don't run these tests on the CRAN build servers
skip_on_cran()

library(shinytest2)
library(shiny)

for (demo_app in demo_apps) {
  path_to_app <- system.file(package = "gridlayout", paste0("demo_apps/", demo_app))
  test_app(path_to_app)
}
