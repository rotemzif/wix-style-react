import React, {PropTypes} from 'react';
import InfoIcon from 'wix-style-react/new-icons/Info';
import XIcon from 'wix-style-react/new-icons/X';

import {Row} from './Row';


export const HeaderLayout = props => {
  const rightAlignedItems = (<div>
    {props.showQuestionMarkButton && <InfoIcon data-hook="info-icon" onClick={props.onInfoButtonClick}/>}
    {props.showCloseButton && <XIcon data-hook="x-icon" onClick={props.onCloseButtonClick}/>}
  </div>);
  return (
    <Row
      data-hook="header-layout"
      rightAlignedItems={rightAlignedItems}
      centerAlignedItems={props.title}
      leftAlignedItems={props.sideActions}
      />
  );
};

HeaderLayout.propTypes = {
  showCloseButton: PropTypes.bool,
  showQuestionMarkButton: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  onInfoButtonClick: PropTypes.func,
  title: PropTypes.string,
  sideActions: PropTypes.node
};

HeaderLayout.defaultProps = {
  showCloseButton: true,
  showQuestionMarkButton: true
};
