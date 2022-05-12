# The minimal adornment of a tag to be grid-aware and always able to be classed
panel <-  function(area, ..., tag = tags$div, class = ""){
  p <- tag(...)
  p$attribs$style <- paste0(p$attribs$style, "grid-area:", area, ";")
  tagAppendAttributes(p, class = paste(class, "my-panel"))
}


