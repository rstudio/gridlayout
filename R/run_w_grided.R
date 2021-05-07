#' Run existing app in grided layout editing mode
#'
#'
#' @param app Shiny app object as produced by [shiny::shinyApp()].
#'
#' @return Shiny app object with original app encapuslated by grided editor
#' @export
#'
run_with_grided <- function(app) {

  # Start by modifying the server code to respond to messages from the grided
  # javascript
  origServerFuncSource <- app[["serverFuncSource"]]

  app[["serverFuncSource"]] <- function() {
    origServerFunc <- origServerFuncSource()
    function(input, output, session, ...) {
      if (!"session" %in% names(formals(origServerFunc))) {
        origServerFunc(input, output, ...)
      } else {
        origServerFunc(input, output, session, ...)
      }

      grided_server_code(input, output, session)
    }
  }

  # Grab existing UI function out of app and inject the grided js and css into page
  n_tags <- length(environment(app[["httpHandler"]])$ui)
  environment(app[["httpHandler"]])$ui[[n_tags + 1]] <- grided_resources()

  app
}




