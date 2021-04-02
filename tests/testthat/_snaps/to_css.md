# Works with default body target

    Code
      to_css(grid_obj)
    Output
      [1] "body {\n  display: grid;\n  grid-template-rows: 100px 1fr 1fr;\n  grid-template-columns: 120px 1fr 1fr;\n  grid-gap: 1rem;\n  padding: 1rem;\n  height: 100vh;\n}\n\nbody > * {\n\n}\n\nbody .grid_panel {\n  box-sizing: border-box;\n  padding: 0.8rem;\n  overflow: hidden;\n  box-shadow: 0 0 0.5rem rgb(0 0 0 / 35%);\n  border-radius: 0.5rem;\n}\n\n#header {\n  grid-column-start: 1;\n  grid-column-end: 4;\n  grid-row-start: 1;\n  grid-row-end: 2;\n}\n#sidebar {\n  grid-column-start: 1;\n  grid-column-end: 2;\n  grid-row-start: 2;\n  grid-row-end: 4;\n}\n#plot_a {\n  grid-column-start: 2;\n  grid-column-end: 3;\n  grid-row-start: 2;\n  grid-row-end: 3;\n}\n#plot_b {\n  grid-column-start: 2;\n  grid-column-end: 4;\n  grid-row-start: 3;\n  grid-row-end: 4;\n}\n#plot_c {\n  grid-column-start: 3;\n  grid-column-end: 4;\n  grid-row-start: 2;\n  grid-row-end: 3;\n}"

