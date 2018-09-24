import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';

import {isTestkitExists, isEnzymeTestkitExists} from '../../test/utils/testkit-sanity';
import {sortableListTestkitFactory} from '../../testkit';
import {sortableListTestkitFactory as enzymeSortableListTestkitFactory} from '../../testkit/enzyme';

import SortableList from './SortableList';

describe('SortableList', () => {
  it('should exists', () => {
    const dataHook = 'sortable-list';
    const items = [{id: '1', text: 'item 1'}, {id: '2', text: 'item 2'}];
    const onDrop = jest.fn();
    const renderItem = ({item}) => <div>{item.text}</div>; // eslint-disable-line react/prop-types

    const wrapper = ReactTestUtils.renderIntoDocument(
      <div>
        <SortableList
          dataHook={dataHook}
          containerId="sortable-list"
          items={items}
          renderItem={renderItem}
          onDrop={onDrop}
          />
      </div>
    );

    const driver = sortableListTestkitFactory({wrapper, dataHook});

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
