import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

import SortableList from './SortableList';
import SortableListFactory from './SortableList.driver';

describe('SortableList', () => {
  const createDriver = createDriverFactory(SortableListFactory);
  let driver;

  it('should exists', () => {
    const items = [{id: '1', text: 'item 1'}, {id: '2', text: 'item 2'}];
    const onDrop = jest.fn();
    const renderItem = ({item}) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    driver = createDriver(
      <SortableList
        containerId="sortable-list"
        items={items}
        renderItem={renderItem}
        onDrop={onDrop}
        />
    );

    expect(driver.exists()).toBeTruthy();
  });
});
