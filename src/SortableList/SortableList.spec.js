import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {mount} from 'enzyme';

import {isTestkitExists, isEnzymeTestkitExists} from '../../test/utils/testkit-sanity';
import {sortableListTestkitFactory} from '../../testkit';
import {sortableListTestkitFactory as enzymeSortableListTestkitFactory} from '../../testkit/enzyme';

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
        dataHook="sortable-list"
        containerId="sortable-list"
        items={items}
        renderItem={renderItem}
        onDrop={onDrop}
        />
    );

    expect(driver.exists()).toBeTruthy();
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const items = [{id: '1', text: 'item 1'}, {id: '2', text: 'item 2'}];
    const onDrop = jest.fn();
    const renderItem = ({item}) => <div>{item.text}</div>; // eslint-disable-line react/prop-types
    expect(
      isTestkitExists(
        <SortableList
          dataHook="sortable-list"
          containerId="sortable-list"
          items={items}
          renderItem={renderItem}
          onDrop={onDrop}
          />,
        sortableListTestkitFactory
      )
    ).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const items = [{id: '1', text: 'item 1'}, {id: '2', text: 'item 2'}];
    const onDrop = jest.fn();
    const renderItem = ({item}) => <div>{item.text}</div>; // eslint-disable-line react/prop-types
    expect(
      isEnzymeTestkitExists(
        <SortableList
          dataHook="sortable-list"
          containerId="sortable-list"
          items={items}
          renderItem={renderItem}
          onDrop={onDrop}
          />,
        enzymeSortableListTestkitFactory,
        mount
      )
    ).toBe(true);
  });
});
