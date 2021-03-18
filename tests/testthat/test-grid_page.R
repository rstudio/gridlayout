test_that("Works when it should", {

  expect_equal(
    as.character(grid_page(
      layout = "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |myPlot  |
    |1fr   |footer  |",
      shiny::h2(id = "header", "This is my header content"),
      grid_panel(
        id = "footer",
        "Some text",
        shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
      ),
      shiny::plotOutput("myPlot")
    )),
'<div class="container-fluid">
  <h2 id="header">This is my header content</h2>
  <div id="footer">
    Some text
    <div class="form-group shiny-input-container">
      <label class="control-label" id="bins-label" for="bins">Number of bins:</label>
      <input class="js-range-slider" id="bins" data-skin="shiny" data-min="1" data-max="50" data-from="30" data-step="1" data-grid="true" data-grid-num="9.8" data-grid-snap="false" data-prettify-separator="," data-prettify-enabled="true" data-keyboard="true" data-data-type="number"/>
    </div>
  </div>
  <div id="myPlot" class="shiny-plot-output" style="width:100%;height:400px;"></div>
</div>'
  )

})

test_that("Warns about mismatches between layout and passed elements", {

  layout_wo_footer <- "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |myPlot  |"

  err_msg <- expect_error(
    grid_page(
      layout = layout_wo_footer,
      shiny::h2(id = "header", "This is my header content"),
      grid_panel(
        id = "footer",
        "Some text",
        shiny::sliderInput("bins","Number of bins:", min = 1, max = 50, value = 30)
      ),
      shiny::plotOutput("myPlot")
    )
  )

  expect_equal(
    err_msg$message,
    'Malformed call to grid_page():
Mismatch between the provided elements and the defined elements in layout definition.
Passed to `grid_page` but not in layout declaration:
  - "footer"
If this was intentional set `.verify_matches = FALSE` to override this check.'
  )

})


test_that("Warns about un-id'd elements", {

  err_msg <- expect_error(
    grid_page(
      layout = "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |myPlot  |",
      shiny::h2(id = 'header', "This is my header content"),
      shiny::h2("This is a footer"),
      shiny::plotOutput("myPlot")
    )
  )

  expect_equal(
    err_msg$message,
    'Malformed call to grid_page():
The following elements of the page lack an id:
  - shiny::h2("This is a footer")
Consider wrapping in `grid_panel(id = ...)`'
  )

})

test_that("Warns about both at the same time to help people debug easier", {

  err_msg <- expect_error(
    grid_page(
      layout = "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |myPlot  |
    |1fr   |footer  |",
    shiny::h2(id = 'header', "This is my header content"),
    shiny::h2("This is a footer"),
    shiny::plotOutput("myPlot")
    )
  )

  expect_equal(
    err_msg$message,
    'Malformed call to grid_page():
Mismatch between the provided elements and the defined elements in layout definition.
In layout declaration but not passed to `grid_page`:
  - "footer"
If this was intentional set `.verify_matches = FALSE` to override this check.
The following elements of the page lack an id:
  - shiny::h2("This is a footer")
Consider wrapping in `grid_panel(id = ...)`'
  )

})



test_that("Warns about plots not wrapped in grid_panel()", {

  expect_warning(
    grid_page(
      layout = "
    |      |        |
    |------|--------|
    |2rem  |200px   |
    |1fr   |header  |
    |1fr   |myPlot  |
    |1fr   |footer  |",
    shiny::h2(id = 'header', "This is my header content"),
    shiny::h2(id = "footer", "This is a footer"),
    shiny::plotOutput("myPlot")
    )
  )

})

