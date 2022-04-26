# Warns about mismatches between layout and passed elements

    Code
      err_msg$message
    Output
      [1] "$ operator is invalid for atomic vectors"

# Warns about both at the same time to help people debug easier

    Code
      err_msg$message
    Output
      [1] "The following areas are in the layout but not provided in the markdown:\n\"header\", \"plot\", \"footer\"\nIf the grid-area css property for these areas is being provided in a custom way, set `check_for_mismatches = FALSE` to avoid this error message."

