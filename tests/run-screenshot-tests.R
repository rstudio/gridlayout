# Runs screenshot tests that are not run with the normal testing workflow due to
# being slow

testthat::test_dir( here::here("tests/screenshot-tests"))
testthat::test_dir( here::here("tests/testthat"))
testthat::snapshot_review(path = here::here("tests/screenshot-tests"))
