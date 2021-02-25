import { Shiny } from "./index";

export function draw_browser_header() {
  const header_svg = document.getElementById("editor-browser-header");
  const {
    width: width_of_bar,
    height: height_of_bar,
  } = header_svg.getBoundingClientRect();

  // Clear out anything that may be in the svg already
  header_svg.innerHTML = "";
  // First make the buttons for closing, minimizing and maximizing window
  const button_r = height_of_bar / 4.5;
  for (let i = 1; i <= 3; i++) {
    header_svg.innerHTML += `
    <circle cx=${i * button_r * 3}px
            cy = 50%
            r = ${button_r}px
    > </circle>`;
  }

  // Next make the browser url bar
  const url_bar_start = 4 * button_r * 3;
  // Bar is takes up middle 65% of header area
  const url_bar_rel_height = 0.65;
  const url_bar_height = height_of_bar * url_bar_rel_height;
  const url_bar_margin = (height_of_bar - url_bar_height) / 2;
  header_svg.innerHTML += `
  <rect x = ${url_bar_start}px
        y = ${url_bar_margin}px
        width = ${width_of_bar - url_bar_start - 10}px
        height = ${height_of_bar * url_bar_rel_height}px
        stroke = "black"
        stroke-width: 3px
        fill = "none"
        rx = ${url_bar_height / 2}px
        ry = ${url_bar_height / 2}px
  ></rect>`;

  const url_address = Shiny ? "www.myShinyApp.com" : "www.myGridApp.com";
  header_svg.innerHTML += `
  <text x = ${url_bar_start + 13}px
        y = ${height_of_bar / 2}px
        alignment-baseline = "central"
  >
    ${url_address}
  </text>
`;
}
