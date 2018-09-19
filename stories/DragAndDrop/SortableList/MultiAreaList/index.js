import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import Heading from 'wix-style-react/Heading';
import Badge from 'wix-style-react/Badge';

import MultiAreaListReadme from './MultiAreaListReadme.md';
import MultiAreaList from './MultiAreaList';
import MultiAreaListRaw from '!raw-loader!./MultiAreaList';
import MultiAreaListScssRaw from '!raw-loader!./MultiAreaList.scss';

const MultiAreaListRawCombined = `
//IntroductionExample.js
${MultiAreaListRaw}

//IntroductionExample.scss
${MultiAreaListScssRaw}
`;

export default () => (
  <div>
    <Heading>
      MultiAreaList <Badge skin="danger">Under development</Badge>
    </Heading>
    <Markdown source={MultiAreaListReadme}/>
    <CodeExample title="Sortable List - Single Area" code={MultiAreaListRawCombined}>
      <MultiAreaList/>
    </CodeExample>
  </div>
);
