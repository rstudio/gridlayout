window.onload = function () {
  // This will get the highest level grid container.
  // If there are nested containers they will be left untouched
  const grid_container = document.querySelector(".grid-container");
  const container_id = grid_container.id;

  // Find the stylesheet which contains the containers styles
  const is_container_ruleset = (rule) => rule.selectorText === `#${container_id}`;

  // Assumes that only one stylesheet has rules for the grid container by id
  const container_stylesheet = [...document.styleSheets].find((style_sheet) =>
    [...style_sheet.rules].find(is_container_ruleset)
  );

  // Container styles are in this object
  const styles_for_container = [...container_stylesheet.cssRules].find(
    is_container_ruleset
  ).style;
  
  debugger;
  styles_for_container.gridTemplateColumns = "500px 1fr";

};
