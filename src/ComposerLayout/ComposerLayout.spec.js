import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import composerLayoutDriverFactory from './ComposerLayoutDriver';
import {ComposerLayout} from './ComposerLayout';


describe('ComposerLayout', () => {
  const createDriver = createDriverFactory(composerLayoutDriverFactory);

  it('should render content', () => {
    const driver = createDriver(<ComposerLayout content={<div>Some content</div>}/>);
   console.log('yahooooo', driver.getContent());

    // console.log(Object.keys(driver.getContent()))
  });
});
