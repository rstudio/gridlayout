// Assumes that only one stylesheet has rules for the given selector and
// that only one rule targeting that selector alone is defined
export function find_rules_by_selector(selector_text: string) {
  // Find the stylesheet which contains the containers styles
  const defines_ruleset = (selector_text: string) => (rule: CSSRule) =>
    (rule as CSSStyleRule).selectorText === selector_text;
  

  const stylesheets_w_selector = [
    ...document.styleSheets,
  ].filter((style_sheet: CSSStyleSheet) =>
    [...style_sheet.rules].find(defines_ruleset(selector_text))
  );

  const n_sheets: number = stylesheets_w_selector.length;
  if(n_sheets === 0){
    // No rules declared so make a new rule and append to last style sheet
  } else {
    // Take the latest style sheet and (hope) that's the correct one
    return ([...stylesheets_w_selector[n_sheets-1].cssRules].find(
      defines_ruleset(selector_text)
    ) as CSSStyleRule).style;

  } 
}
