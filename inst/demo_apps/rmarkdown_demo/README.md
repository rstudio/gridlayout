## Gridlayout in RMarkdown

### Purpose

A simple RMarkdown document that uses the function `gridlayout::use_gridlayout_rmd()` to allow the user to define a gridlayout using a chunk of type `gridlayout`.

The main article of interest here is `grid_markdown.Rmd` which is self-contained and should knit as normal.

`grid_markdown_options.Rmd` is a parameterized version of `grid_markdown.Rmd` that is used to generate the vignette `vignettes/using_with_rmd.Rmd`.

`rmd_layout_editing.Rmd` is a test file for developing the `grided` layout editor. It can be ignored.

### Screenshots

- For `grid_markdown.Rmd`
  - `tests/screenshot-tests/_snaps/demo-apps/rmarkdown-doc.png`
- For `grid_markdown_options.Rmd`
  - `vignettes/use_gridlayout_rmd_base.png`
  - `vignettes/use_gridlayout_rmd_extra_child_styles.png`
  - `vignettes/use_gridlayout_rmd_only_grid_card.png`
