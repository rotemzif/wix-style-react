import React from 'react';
import {storiesOf} from '@storybook/react';

import Heading from 'wix-style-react/Heading';
import Text from 'wix-style-react/Text';
import Badge from 'wix-style-react/Badge';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import SingleAreaList from './SortableList/SingleAreaList';
import SingleAreaListRaw from '!raw-loader!./SortableList/SingleAreaList';
import SingleAreaListReadme from './SortableList/README.md';

import MultiAreaList from './SortableList/MultiAreaList';
import MultiAreaListRaw from '!raw-loader!./SortableList/MultiAreaList';

import DraggableMultiAreaList from './SortableList/DraggableMultiAreaList';
import DraggableMultiAreaListRaw from '!raw-loader!./SortableList/DraggableMultiAreaList';

import SingleAreaListScssRaw from '!raw-loader!./SortableList/SingleAreaList.scss';

import MultiAreaListScssRaw from '!raw-loader!./SortableList/MultiAreaList.scss';

import DraggableMultiAreaListScssRaw from '!raw-loader!./SortableList/DraggableMultiAreaList.scss';

const SingleAreaListRawCombined = `
//SingleAreaList.js
${SingleAreaListRaw}

//SingleAreaList.scss
${SingleAreaListScssRaw}
`;

const MultiAreaListRawCombined = `
//MultiAreaList.js
${MultiAreaListRaw}

//MultiAreaList.scss
${MultiAreaListScssRaw}
`;

const DraggableMultiAreaListRawCombined = `
//DraggableMultiAreaList.js
${DraggableMultiAreaListRaw}

//DraggableMultiAreaList.scss
${DraggableMultiAreaListScssRaw}
`;

const TODO = `
----
## TODO

### missing concepts
- explain how to use the provider (can't be part of the component). might want to have a generic provider in the lib.
- all common styles that are part of the library should be exposed as css classes

### examples
- list multiple area
- grid single area
- grid multiple area
- all examples with/out knobs
`;

storiesOf('WIP', module)
  .add('Drag and Drop', () => (
    <div>
      <Heading>
        Drag and Drop <Badge skin="danger">Under development</Badge>
      </Heading>
      <Text>
        This section will explain about D&D guidelines in the library, how it should be used and how to extend it
      </Text>

      <Markdown source={SingleAreaListReadme}/>
      <CodeExample title="Sortable List - Single Area" code={SingleAreaListRawCombined}>
        <SingleAreaList/>
      </CodeExample>
      <CodeExample title="Sortable List - Multi Area" code={MultiAreaListRawCombined}>
        <MultiAreaList/>
      </CodeExample>
      <CodeExample title="Sortable List - Draggable Multi Area" code={DraggableMultiAreaListRawCombined}>
        <DraggableMultiAreaList/>
      </CodeExample>
      <Markdown source={TODO}/>
    </div>
  ));
