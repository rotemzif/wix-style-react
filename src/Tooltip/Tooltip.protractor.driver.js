const tooltipDriverFactory = component => ({
  clickButton: () => component.click(),
  clickOnTooltipAnchor: (datahook = 'tooltip-anchor') => component.$(`[data-hook="${datahook}"]`).click(),
  click: () => component.$('[data-hook="popover-button"]').click(),
  getTooltipContentElement: datahook => component.$(`[data-hook="${datahook}"]`),
  getTooltipTextContent: datahook => component.$(`[data-hook="${datahook}"]`).getText(),
  element: () => component
});

export default tooltipDriverFactory;
