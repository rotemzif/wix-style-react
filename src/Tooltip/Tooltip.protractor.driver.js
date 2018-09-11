const tooltipDriverFactory = component => ({
  clickButton: () => component.click(),
  clickOn: datahook => component.$(`[data-hook="${datahook}"]`).click(),
  togglePopover: () => component.$('[data-hook="popover-button"]').click(),
  getTooltipContentElement: datahook => component.$(`[data-hook="${datahook}"]`),
  getTooltipTextContent: datahook => component.$(`[data-hook="${datahook}"]`).getText(),
  element: () => component
});

export default tooltipDriverFactory;
