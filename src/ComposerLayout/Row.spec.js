import React from 'react';
import {mount} from 'enzyme';
import {Row} from './Row';

describe('Row', () => {
  it('should render leftAlignedItems in the left side', () => {
    const leftAlignedItems = <div/>;
    const component = mount(<Row leftAlignedItems={leftAlignedItems}/>);
    expect(component.find('[data-hook="left-aligned-items"]').length).toBe(1);
    expect(component.find('[data-hook="left-aligned-items"]').hasClass('leftAlignedItems')).toBeTruthy();
  });

  it('should render rightAlignedItems in the right side', () => {
    const rightAlignedItems = <div/>;
    const component = mount(<Row rightAlignedItems={rightAlignedItems}/>);
    expect(component.find('[data-hook="right-aligned-items"]').length).toBe(1);
    expect(component.find('[data-hook="right-aligned-items"]').hasClass('rightAlignedItems')).toBeTruthy();
  });

  it('should render centerAlignedItems in the left side', () => {
    const centerAlignedItems = <div/>;
    const component = mount(<Row centerAlignedItems={centerAlignedItems}/>);
    expect(component.find('[data-hook="center-aligned-items"]').length).toBe(1);
    expect(component.find('[data-hook="center-aligned-items"]').hasClass('centerAlignedItems')).toBeTruthy();
  });
});

