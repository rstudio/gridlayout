str_replace <- function(text, pattern, replacement){
  sub(pattern = pattern, replacement = replacement, x = text, perl = TRUE)
}

str_replace_all <- function(text, pattern, replacement){
  gsub(pattern = pattern, replacement = replacement, x = text, perl = TRUE)
}

str_remove_all <- function(text, pattern){
  str_replace_all(text, pattern = pattern, replacement = "")
}

trim_leading <- function(text){
  str_remove_all(text, pattern = "^\\s+")
}

trim_trailing <- function(text){
  str_remove_all(text, pattern = "\\s+$")
}

str_trim <- function(text, side = c("both", "left", "right")){
  side <- match.arg(side, choices = c("both", "left", "right"))
  if(side == "both" | side == "left"){
    text <- trim_leading(text)
  }
  if(side == "both" | side == "right"){
    text <- trim_trailing(text)
  }
  text
}

str_detect <- function(text, pattern, fixed = FALSE){
  grepl(pattern = pattern, x = text, perl = !fixed, fixed = fixed)
}

str_extract <- function(text, pattern){
  regmatches(
    x = text,
    m = regexpr(
      pattern = pattern,
      text = text,
      perl = TRUE
    )
  )
}

# String concatenation
`%+%` <- function (lhs, rhs) paste0(lhs, rhs)


matrix_to_md_table <- function(mat){
  empty_row <- rep_len("", ncol(mat))

  mat_w_header_rows <- rbind(empty_row,
                             empty_row,
                             mat)

  even_width_cols <- apply(mat_w_header_rows,
                           FUN = format,
                           MARGIN = 2)

  w_bars <- apply(even_width_cols,
                  FUN = function(x) paste0("|", paste(x, collapse=" |"), " |"),
                  MARGIN = 1)

  # Add header delimiting dashes to second row
  w_bars[2] <- gsub(" ", "-", w_bars[2])

  # Collapse with new-lines to
  paste(w_bars, collapse = "\n")
}

# extract from a list of lists to whatever level is desired
extract <- function(x, ...){
  all_keys <- list(...)

  next_key <- all_keys[[1]]

  extracted <- lapply(x, `[[`, next_key)

  if(length(all_keys) == 1){
    return(extracted)
  } else {
    all_keys[[1]] <- NULL
    return(do.call(extract, c(list(x = extracted), all_keys)))
  }
}

# my_list <- list(
#   list(id = "hi", attribs = list(class = "a")),
#   list(id = "there", attribs = list(class = "b"))
# )
# extract(my_list, "id")
# extract(my_list, "attribs", "class")


extract_dbl <- function(x, ...){
  as.numeric(extract(x, ...))
}

extract_chr <- function(x, ...){
  as.character(extract(x, ...))
}

list_in_quotes <- function(name_ids){
  paste0("\"", name_ids, "\"", collapse = ", ")
}

arg_list_exprs <- function(...){
  as.list(substitute(...()))
}
