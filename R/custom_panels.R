
#' Panel just containing text
#'
#' Makes a grid_panel that contains just text that is vertically centered within
#' the panel. Useful for titles (see [title_panel()]) or displaying text-based
#' statistics.
#'
#' @inheritParams grid_panel
#' @inheritDotParams grid_panel -h_align
#' @param content Whatever you want the title to say. Typically just text but
#'   any tag or tag-list is possible. All will get wrapped in an `h3` tag.
#' @param wrapping_tag What tag should the text be wrapped in. Takes either an
#'   `htmltools` tag function or the string of a tag accessible via
#'   `htmltools::tags[[wrapping_tag]]`.
#' @param icon Optional icon/image for left of text. Supports image locations
#'   (those ending in `.png, .jpg, .jpeg` or `.svg`), ids of font-awesome icons
#'   (i.e. that works with `fontawesome::fa(icon)]`, or `fontawesome` icons as
#'   returned by [fontawesome::fa()] (if customization of icon style is
#'   desired.)
#' @param img_height If the passed icon is a path to an image, how tall should
#'   that image be rendered (preserves aspect ratio.)
#' @inheritParams grid_panel
#'
#' @examples
#'
#' # Typically you'll just pass a character string to the function
#' title_panel("This is my header")
#'
#' # Icons from `fontawesome` can be used:
#'
#' # Either with just the id
#' text_panel(area = "header", "Here's my text", icon = "r-project")
#'
#' # Or by directly passing the icon object if you want more customization
#' text_panel("header", "Here's my text", icon = fontawesome::fa("r-project", fill = "steelblue"))
#'
#' # You can also pass arbitrary image locations for the icon
#' text_panel("header", "Here's my text", icon = "https://cran.r-project.org/Rlogo.svg")
#'
#' # These images can have their size controlled
#' text_panel("header", "Here's my text", icon = "https://cran.r-project.org/Rlogo.svg", img_height = "20px")
#'
#' # You can adjust the horizontal alignment of your header with h_align
#' text_panel("I'm in the middle", h_align = "center")
#'
#' @export
text_panel <- function(
  area,
  content = NULL,
  ...,
  h_align = "start",
  img_height = "55px",
  icon = NULL,
  wrapping_tag = 'h2'
) {
  if (notNull(icon)) {
    if (str_detect(icon, "\\.png|\\.jpg|\\.jpeg|\\.svg")) {
      icon <- shiny::img(src = icon, height = htmltools::validateCssUnit(img_height))
    } else {
      requireNamespace("fontawesome", quietly = TRUE)
      # Test against a font awesome tag in case the class changes
      already_fa_obj <- identical(class(icon), class(fontawesome::fa("r-project")))

      if (!already_fa_obj) {
        # Attempt to get icon from font-awesome
        icon <- fontawesome::fa(icon)
      }
    }
  }

  if (is.character(wrapping_tag)) {
    wrapping_tag <- htmltools::tags[[wrapping_tag]]
  }

  grid_panel(
    area = area,
    wrapping_tag(
      htmltools::tagList(
        icon,
        content
      ),
      class = "text_panel"
    ),
    v_align = "center",
    h_align = h_align,
    ...
  )
}

#' Make header panel
#'
#' This is just a helper function that wraps your content in a vertically
#' centered header (`h2`) tag via the [text_panel()] function. Also adds the
#' apps content to the `title` metatag of your webpage so it shows up properly
#' in tabs etc.. Modeled after [shiny::titlePanel()].
#'
#' @param title An application title to display.
#' @param windowTitle The title that should be displayed by the browser window.
#' @inheritParams text_panel
#'
#' @seealso [text_panel]
#'
#' @examples
#'
#' # Simple app title
#' title_panel(area = "header", "My App")
#'
#' # Centered title
#' title_panel("header", "My App (in the center)", h_align = "center")
#'
#' # Can have a logo
#' title_panel("footer", "My App", icon = "https://cran.r-project.org/Rlogo.svg")
#'
#' @export
title_panel <- function(
  area,
  title,
  windowTitle = title,
  h_align = "start",
  img_height = "55px",
  icon = NULL
) {

  if (!is.character(windowTitle)) {
    stop("Title needs to be a plain character")
  }

  text_panel(
    area = area,
    content = title,
    icon = icon,
    wrapping_tag = htmltools::h2,
    h_align = h_align,
    img_height = img_height,
    htmltools::tags$head(htmltools::tags$title(windowTitle))
  )
}
