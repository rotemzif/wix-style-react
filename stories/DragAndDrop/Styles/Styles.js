import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import Heading from 'wix-style-react/Heading';
import Badge from 'wix-style-react/Badge';

import Styles from './Styles.md';

export default () => (
  <div>
    <Heading>
      Styles <Badge skin="danger">Under development</Badge>
    </Heading>
    <Markdown source={Styles}/>
  </div>
);
