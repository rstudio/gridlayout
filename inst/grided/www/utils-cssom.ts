// Assumes that only one stylesheet has rules for the given selector and
// that only one rule targeting that selector alone is defined
// If targetProperty is provided the function will chose the sheet that defines

export function getStylesForSelectorWithTargets(
  selectorText: string,
  targetProperties: string[]
) {
  // Find the stylesheet which contains the containers styles
  const definesRuleset = (selectorText: string) => (rule: CSSRule) =>
    (rule as CSSStyleRule).selectorText === selectorText;

  const allRulesForSelector = [...document.styleSheets]
    .filter((styleSheet: CSSStyleSheet) =>
      [...styleSheet.rules].find(definesRuleset(selectorText))
    )
    .map(
      (x) =>
        ([...x.cssRules].find(definesRuleset(selectorText)) as CSSStyleRule)
          .style
    );

  return allRulesForSelector.find((rule) =>
    targetProperties.every((x) => rule[x])
  );
}
