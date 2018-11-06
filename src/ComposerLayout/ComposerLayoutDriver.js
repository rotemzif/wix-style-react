import React from 'react';
import ReactDOM from 'react-dom';
import {isClassExists} from '../../test/utils';

const composerLayoutDriverFactory = ({element, wrapper, component}) => {
  const getAttribute = (element, attribute) => element.getAttribute(attribute);

  return {
    exists: () => !!element,
    getContent: () => element.querySelector('[data-hook="content"]'),

    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default composerLayoutDriverFactory;