# test_that("Works with just named list types", {
#   custom_styles <- c(
#     "background" = "blue",
#     "border" = "1px solid red"
#   )
#   expect_equal(
#     build_css_rule("div", custom_styles),
# "div {
#   background: blue;
#   border: 1px solid red;
# }")
# })
#
# test_that("Works with just whole value types", {
#   custom_styles <- c(
#     "background: blue;",
#     "border: 1px solid red;"
#   )
#   expect_equal(
#     build_css_rule("div", custom_styles),
# "div {
#   background: blue;
#   border: 1px solid red;
# }")
# })
#
# test_that("Works with mixed list types", {
#   custom_styles <- c(
#     "background" = "blue",
#     "border" = "1px solid red",
#     "cursor: none"
#   )
#   expect_equal(
#     build_css_rule("div", custom_styles),
# "div {
#   background: blue;
#   border: 1px solid red;
#   cursor: none;
# }")
# })
#
#
# test_that("Doesn't care about semi-colons usage", {
#   styles_w_semicolon <- c(
#     "border: 1px solid red;",
#     "cursor: none;"
#   )
#   styles_wo_semicolon <- c(
#     "border: 1px solid red",
#     "cursor: none"
#   )
#   expect_equal(
#     build_css_rule("div", styles_w_semicolon),
#     build_css_rule("div", styles_wo_semicolon)
#   )
# })
#
#
# test_that("Attempts to detect bad properties", {
#   styles_w_bad_name <- c(
#     "border width: 1px solid red;",
#     "cursor: none;"
#   )
#   styles_w_extra_semicolon <- c(
#     "border: 1px solid; red",
#     "cursor: none"
#   )
#
#   expect_warning(
#     {bad_name_res <- build_css_rule("div", styles_w_bad_name)},
#     "The passed css property \"border width: 1px solid red\" doesn't appear to be valid. Ignoring it."
#   )
#
#   expect_equal(
#     bad_name_res,
# "div {
#   cursor: none;
# }"
#   )
#
#   expect_warning(
#     {bad_semicolon_res <- build_css_rule("div", styles_w_extra_semicolon)},
#     "The passed css property \"border: 1px solid; red\" doesn't appear to be valid. Ignoring it."
#   )
#
#   expect_equal(
#     bad_semicolon_res,
# "div {
#   cursor: none;
# }"
#   )
# })
#
