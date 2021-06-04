// Assumes that only one stylesheet has rules for the given selector and
// that only one rule targeting that selector alone is defined
// If target_property is provided the function will chose the sheet that defines

import { flatten } from "./utils-misc";

// Combines every style rule contained in all the style sheets on page into
// a big array. Easier than navigating the nested structure of sheets => rules
function get_all_style_rules() {
  return flatten(
    [...document.styleSheets].map((x) => [...x.cssRules]) as CSSStyleRule[][]
  );
}

function get_all_rules_for_selector(selector_text: string) {
  // Find the stylesheet which contains the containers styles
  const defines_ruleset = (selector_text: string) => (rule: CSSRule) =>
    (rule as CSSStyleRule).selectorText === selector_text;

  return [...document.styleSheets]
    .filter((style_sheet: CSSStyleSheet) =>
      [...style_sheet.rules].find(defines_ruleset(selector_text))
    )
    .map(
      (x) =>
        ([...x.cssRules].find(defines_ruleset(selector_text)) as CSSStyleRule)
          .style
    );
}

export function get_styles_for_selector_with_targets(
  selector_text: string,
  target_properties: string[]
) {
  const all_rules_for_selector = get_all_rules_for_selector(selector_text);
  return all_rules_for_selector.find((rule) =>
    target_properties.every((x) => rule[x])
  );
}
