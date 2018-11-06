import React, {PropTypes} from 'react';
import {Row} from './Row';
import Button from '../Backoffice/Button';
import TextLink from '../TextLink';


const FooterLayout = props => {

  const rightAlignedItems = (<div>
    {props.showCancelButton &&
    <div
      style={{display: 'inline'}}
      onClick={props.isCancelButtonEnabled && props.onCancelButtonClick}
      >
      <TextLink
        data-hook="cancel-button"
        disabled={props.isCancelButtonEnabled}
        >
        {props.cancelButtonContent}
      </TextLink>
    </div>
    }

    {props.showConfirmButton &&
      <Button
        dataHook="confirm-button"
        disabled={!props.isConfirmButtonEnabled}
        onClick={props.onConfirmButtonClick}
        children={props.confirmButtonContent}
        />
    }
  </div>);
  return (
    <Row
      rightAlignedItems={rightAlignedItems}
      leftAlignedItems={props.sideActions}
      />
  );
}
;


FooterLayout.propTypes = {
  confirmButtonContent: PropTypes.node,
  cancelButtonContent: PropTypes.node,
  onConfirmButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  isConfirmButtonEnabled: PropTypes.bool,
  isCancelButtonEnabled: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  sideActions: PropTypes.node
};

FooterLayout.defaultProps = {
  showConfirmButton: true,
  showCancelButton: true,
  isConfirmButtonEnabled: true,
  isCancelButtonEnabled: true,
  confirmButtonContent: 'Save',
  Button: 'Cancel'
}
;


export default FooterLayout;
