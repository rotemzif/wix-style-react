import React from 'react';
import {mount} from 'enzyme';
import path from 'path';

import {
  isTestkitExists,
  isEnzymeTestkitExists
} from '../test/utils/testkit-sanity';
import importAllComponents from '../test/utils/import-all-components';

import * as reactTestUtilsTestkitFactories from './index';
import * as enzymeTestkitFactories from './enzyme';

const cwd = path.resolve(__dirname, '..', 'src');
const lowerFirst = a =>
  a
    .charAt(0)
    .toLowerCase()
    .concat(a.slice(1));

const FAILING_COMPONENTS = [
  'AutoCompleteComposite',
  'BadgeSelectItemBuilder',
  'Breadcrumbs',
  'ButtonLayout',
  'ButtonWithOptions',
  'Calendar',
  'CalendarPanel',
  'Card',
  'CloseButton',
  'ColorPicker',
  'Composite',
  'DataTable',
  'DatePicker',
  'DragAndDrop',
  'DragDropContextProvider',
  'DropdownComposite',
  'EndorseContentLayout',
  'FloatingHelper',
  'FullTextView',
  'GoogleAddressInput',
  'GoogleAddressInputWithLabel',
  'Grid',
  'HBox',
  'IconWithOptions',
  'Layout',
  'MessageBox',
  'Modal',
  'ModalSelectorLayout',
  'MultiSelect',
  'MultiSelectCheckbox',
  'MultiSelectComposite',
  'Notification',
  'Page',
  'PageHeader',
  'PopoverMenuItem',
  'Range',
  'RichTextArea',
  'RichTextAreaComposite',
  'Selector',
  'SideMenuDrill',
  'Slider',
  'StatsWidget',
  'Table',
  'TableToolbar',
  'Tabs',
  'TextArea',
  'TextField',
  'Tooltip',
  'VBox'
];

const setupProps = {
  Tag: {
    useOldMargins: false,
    id: 'hello',
    children: 'a'
  },
  ImageViewer: {
    imageUrl: ''
  },
  FormField: {
    children: <div/>
  },
  BadgeSelect: {
    options: [{id: '0', skin: 'general', text: 'general'}],
    selectedId: '0'
  }
};

const AllComponents = importAllComponents({
  cwd,
  ignore: FAILING_COMPONENTS
});

describe('ReactTestUtils testkits', () => {
  Object.entries(AllComponents).map(([name, component]) =>
    it(`${name} should have ReactTestUtils testkit`, () => {
      expect(
        isTestkitExists(
          React.createElement(component, setupProps[name] || {}),
          reactTestUtilsTestkitFactories[`${lowerFirst(name)}TestkitFactory`]
        )
      );
    })
  );
});

describe('Enzyme testkits', () => {
  Object.entries(AllComponents).map(([name, component]) =>
    it(`${name} should have enzyme testkit`, () => {
      expect(
        isEnzymeTestkitExists(
          React.createElement(component, setupProps[name] || {}),
          enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
          mount
        )
      );
    })
  );
});
