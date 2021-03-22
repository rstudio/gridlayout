grid_panel <- function(..., v_align, h_align){

  panel_styles <- c(
    display = "grid",
    if(!missing(h_align)){
      validate_alignment(h_align)
      c("justify-content" = h_align)
    },
    if(!missing(v_align)){
      validate_alignment(v_align)
      c("align-content" = v_align)
    }
  )
  shiny::div(
    style = build_css_rule("inline", panel_styles),
    class = "grid_panel",
    ...
  )
}

validate_alignment <- function(arg_val){
  # These are just the options available to the css properties justify-self
  # (horizontal alignment) and align-self (vertical alignment)
  align_options <- c("start", "end", "center", "stretch")

  if(!arg_val %in% align_options){
    stop("Alignment argument must be one of ", paste(align_options, collapse = ", "))
  }
}
