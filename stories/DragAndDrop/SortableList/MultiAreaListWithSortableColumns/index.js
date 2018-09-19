import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import Heading from 'wix-style-react/Heading';
import Badge from 'wix-style-react/Badge';

import MultiAreaListWithSortableColumnsReadme from './MultiAreaListWithSortableColumnsReadme.md';
import MultiAreaListWithSortableColumns from './MultiAreaListWithSortableColumns';
import MultiAreaListWithSortableColumnsRaw from '!raw-loader!./MultiAreaListWithSortableColumns';
import MultiAreaListWithSortableColumnsScssRaw from '!raw-loader!./MultiAreaListWithSortableColumns.scss';

const MultiAreaListWithSortableColumnsRawCombined = `
//IntroductionExample.js
${MultiAreaListWithSortableColumnsRaw}

//IntroductionExample.scss
${MultiAreaListWithSortableColumnsScssRaw}
`;

export default () => (
  <div>
    <Heading>
      MultiAreaListWithSortableColumns <Badge skin="danger">Under development</Badge>
    </Heading>
    <Markdown source={MultiAreaListWithSortableColumnsReadme}/>
    <CodeExample title="Sortable List - Single Area" code={MultiAreaListWithSortableColumnsRawCombined}>
      <MultiAreaListWithSortableColumns/>
    </CodeExample>
  </div>
);
