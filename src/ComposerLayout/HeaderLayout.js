import React, {PropTypes} from 'react';
import {Row} from './Row';
import XIcon from 'wix-style-react/new-icons/X';
import InfoIcon from 'wix-style-react/new-icons/Info';

export const HeaderLayout = props => {
  const rightAlignedItems = (<div>
    {props.showQuestionMarkButton && <InfoIcon data-hook="info-icon" onClick={props.onQuestionMarkButtonClick}/>}
    {props.showCloseButton && <XIcon data-hook="x-icon" onClick={props.onCloseButtonClick}/>}
  </div>);
  return (
    <Row
      rightAlignedItems={rightAlignedItems}
      centerAlignedItems={props.title}
      leftAlignedItems={props.secondaryItems}
      />
  );
}
;


HeaderLayout.propTypes = {
  showCloseButton: PropTypes.bool,
  showQuestionMarkButton: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  onQuestionMarkButtonClick: PropTypes.func,
  title: PropTypes.string,
  secondaryItems: PropTypes.node
};

HeaderLayout.defaultProps = {
  showCloseButton: true,
  showQuestionMarkButton: true
}
;
