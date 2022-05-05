
demo_apps <- c(
  "alternate_layouts",
  "nested_grids",
  "recursive_nesting",
  "scrolling_panels"
)

accept_demo_snapshots <- function(){
  for (demo_app in demo_apps) {
    path_to_app <- system.file(package = "gridlayout", paste0("demo_apps/", demo_app))

    testthat::snapshot_accept(path=file.path(path_to_app, "tests/testthat"))
  }
}
