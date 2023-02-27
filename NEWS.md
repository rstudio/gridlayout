# gridlayout 0.1.1

### Major new features and improvements

- `grid_card()` now wraps `bslib::card()` directly. This means that there are some api changes such as depreciated the `title` argument for using `bslib::card_header(title)` instead. Old `grid_card()` arguments that are present in code will get flagged with a warning to allow users to know when/how to update their code with the new version.

# gridlayout 0.1.0

### Major new features and improvements

- `grid_card()` is now the main method of placing items onto the grid
- Added ability to add full-bleed header and sidebar with special child functions. These sit outside the main grid and can simplify layouts to not require them to constantly be added.
- General interface for cards is a lighter in favor of outputting most non-layout logic to the coming `bslib::card()` and friends.

### Minor new features and improvements

- Website has been updated with better resources

### Bug fixes

### Known bugs
