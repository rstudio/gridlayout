// Assumes that only one stylesheet has rules for the given selector and 
// that only one rule targeting that selector alone is defined
export function find_rules_by_selector(selector_text: string) {
  // Find the stylesheet which contains the containers styles
  const defines_ruleset = (selector_text: string) => (rule: CSSRule) => (rule as CSSStyleRule).selectorText === selector_text;
  const stylesheet_w_selector = [...document.styleSheets].find((style_sheet: CSSStyleSheet) => [...style_sheet.rules].find(defines_ruleset(selector_text))
  );
  return ([...stylesheet_w_selector.cssRules].find(
    defines_ruleset(selector_text)
  ) as CSSStyleRule).style;
}
