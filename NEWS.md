# gridlayout 0.2.1

### Minor new features and improvements

- Replace internal usage of `bslib::card_body_fill()` with unsufixed `bslib::card_body()` to reflect updates in API. Will fix confusing warning messages about `card_body_fill` being depreciated even though it isn't used in user code.

# gridlayout 0.2.0

### Major changes

- `grid_card()` now wraps `bslib::card()` directly. This means that there are some api changes such as depreciated the `title` argument for using `bslib::card_header(title)` instead. Old `grid_card()` arguments that are present in code will get flagged with a warning to allow users to know when/how to update their code with the new version.
- `card_plot_output()` is now depreciated in favor of the new `bslib` cards smart fill behavior. Simple plots can still be done with `grid_card_plot()`.
- The function `grid_card_old()` has been added to ease transition to the new card api and to keep some features such as collapsibility are not available on the new api.

# gridlayout 0.1.0

### Major new features and improvements

- `grid_card()` is now the main method of placing items onto the grid
- Added ability to add full-bleed header and sidebar with special child functions. These sit outside the main grid and can simplify layouts to not require them to constantly be added.
- General interface for cards is a lighter in favor of outputting most non-layout logic to the coming `bslib::card()` and friends.

### Minor new features and improvements

- Website has been updated with better resources

### Bug fixes

### Known bugs
