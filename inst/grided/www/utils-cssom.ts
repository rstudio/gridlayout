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

// that given property (if multiple exist)
export function get_css_props_by_selector(
  selector_text: string,
  target_properties: string[],
) {

  const all_rules_for_selector = get_all_rules_for_selector(selector_text);

  return target_properties.reduce((prop_values, prop) => {
    const prop_val = all_rules_for_selector.find((rule) => rule[prop])?.[prop];

    if (prop_val) {
      prop_values[prop] = prop_val;
    }
    return prop_values;
  }, {});

}


export function find_selector_by_property(
  property_id: string,
  property_value: string
): {rule_exists: boolean, selector: string} {
  const all_styles = get_all_style_rules();

  const first_rule_w_prop = all_styles
    .filter((rule) => rule.style && rule.style[property_id] == property_value)
    .find((rule) => document.querySelector(rule.selectorText));

  const rule_exists = Boolean(first_rule_w_prop);
  return {
    rule_exists,
    selector: rule_exists ? first_rule_w_prop.selectorText: ""
  };
}
