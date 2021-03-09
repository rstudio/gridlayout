#' Create gridlayout and build new app
#'
#' @return NULL
#' @export
grided_new_app <- function() {

  gridded_app(
    update_btn_text = "Generate app code",
    on_update = function(new_layout){
    rstudioapi::documentNew(
      text = to_app_template(new_layout)
    )
  })
}
