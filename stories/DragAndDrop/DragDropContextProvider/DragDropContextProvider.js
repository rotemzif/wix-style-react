import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import Heading from 'wix-style-react/Heading';
import Badge from 'wix-style-react/Badge';

import DragDropContextProvider from './DragDropContextProvider.md';

export default () => (
  <div>
    <Heading>
      DragDropContextProvider <Badge skin="danger">Under development</Badge>
    </Heading>
    <Markdown source={DragDropContextProvider}/>
  </div>
);
