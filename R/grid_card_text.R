
#' Grid-positioned card with only text
#'
#' Makes a grid_card that contains just text that is vertically centered within
#' the panel. Useful for app titles or displaying text-based statistics.
#'
#' @inheritParams grid_card
#' @inheritDotParams grid_card
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
#' @param alignment Horizontal alignment of text. Typical options include
#'   `start", "center", "end"`. For full list of options, see the [css-spec for
#'   `align-items`.](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
#'
#' @param is_title Should the text of this panel be passed on as the title of
#'   the page? This will make the text show up in the browser tab or when you
#'   bookmark the app etc..
#' @param img_height If the passed icon is a path to an image, how tall should
#'   that image be rendered (preserves aspect ratio.)
#' @inheritParams grid_card
#'
#' @examples
#'
#' # Typically you'll just pass a character string to the function
#' grid_card_text(area = "header", "This is my header")
#'
#' # Icons from `fontawesome` can be used:
#'
#' # Either with just the id
#' grid_card_text(area = "header", "Here's my text", icon = "r-project")
#'
#' # Or by directly passing the icon object if you want more customization
#' grid_card_text(
#'   "header",
#'   "Here's my text",
#'   icon = fontawesome::fa("r-project", fill = "steelblue")
#' )
#'
#' # You can also pass arbitrary image locations for the icon
#' grid_card_text(
#'   "header",
#'   "Here's my text",
#'   icon = "https://cran.r-project.org/Rlogo.svg"
#' )
#'
#' # These images can have their size controlled
#' grid_card_text(
#'   "header",
#'   "Here's my text",
#'   icon = "https://cran.r-project.org/Rlogo.svg",
#'   img_height = "20px"
#' )
#'
#'
#' # Commonly you may want to use the text panel text as the title of your app
#' grid_card_text(area = "header", "My App Name", is_title = TRUE)
#'
#' @example man/examples/simple_app.R
#'
#' @export
grid_card_text <- function(area,
                           content = NULL,
                           ...,
                           alignment = "start",
                           img_height = "55px",
                           icon = NULL,
                           wrapping_tag = "h2",
                           is_title = FALSE) {
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

  grid_place(
    area = area,
    htmltools::tags$div(
      class = "card grid_card_text",
      style = htmltools::css(
        `align-items` = alignment
      ),
      wrapping_tag(
        htmltools::tagList(
          icon,
          content
        )
      ),
      if (is_title) htmltools::tags$head(htmltools::tags$title(content))
    )
  )
}
