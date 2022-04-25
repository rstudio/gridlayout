// Watch for cards being hidden or shown and alert shiny of this
function watch_cards() {
  const panel_visibility_map = new Map();
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {

      const el = entry.target;

      console.log("Running resize observer", el);

      const content_height = getComputedStyle(el)
        .getPropertyValue("grid-template-rows")
        .split(" ")[1];

      // An item is visible if the grid-row for the panel content is not set to 0px
      const is_visible = content_height != "0px";

      if (panel_visibility_map.get(el) !== is_visible) {
        // Trigger shown or hidden events on all the bound ouputs so
        // Shiny knows to update them or not
        el.querySelectorAll(".shiny-bound-output").forEach((el) => {
          const $el = $(el);
          if (is_visible) {
            $el.trigger("show");
            $el.show();
            $el.trigger("shown");
          } else {
            $el.trigger("hide");
            $el.hide();
            $el.trigger("hidden");
          }
        });
        panel_visibility_map.set(el, 'seen');
      }
    }
  });

  document
    .querySelectorAll(".grid_panel")
    .forEach((el) => resizeObserver.observe(el));
}

window.onload = function () {
  watch_cards();
};
