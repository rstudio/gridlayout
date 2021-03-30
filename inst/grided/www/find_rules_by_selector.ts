// Assumes that only one stylesheet has rules for the given selector and
// that only one rule targeting that selector alone is defined
// If target_property is provided the function will chose the sheet that defines
// that given property (if multiple exist)
export function find_rules_by_selector(
  selector_text: string,
  target_property?: string
) {
  // Find the stylesheet which contains the containers styles
  const defines_ruleset = (selector_text: string) => (rule: CSSRule) =>
    (rule as CSSStyleRule).selectorText === selector_text;

    const all_sheets = [...document.styleSheets];
  const rules_for_selector = all_sheets
    .filter((style_sheet: CSSStyleSheet) =>
      [...style_sheet.rules].find(defines_ruleset(selector_text))
    )
    .map(
      (x) =>
        ([...x.cssRules].find(defines_ruleset(selector_text)) as CSSStyleRule)
          .style
    )
    .filter((x) => (target_property ? x[target_property] : true));

  const n_sheets: number = rules_for_selector.length;
  if (n_sheets === 0) {
    
    // No rules declared so make a new rule and append to last style sheet
    const last_sheet = all_sheets[all_sheets.length - 1];
    last_sheet.insertRule(`${selector_text} { }`, 0);
    
    return ([...last_sheet.cssRules].find(defines_ruleset(selector_text)) as CSSStyleRule).style;
  } else {
    // Take the latest style sheet and (hope) that's the correct one
    return rules_for_selector[n_sheets - 1];
  }
}
