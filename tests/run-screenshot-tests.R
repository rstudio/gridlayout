# Runs screenshot tests that are not run with the normal testing workflow due to
# being slow

tests_path <- here::here("tests/screenshot-tests")
testthat::test_dir(tests_path)

testthat::snapshot_review(path = tests_path)
