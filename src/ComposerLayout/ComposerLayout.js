import React, {PropTypes} from 'react';
import GenericLayout from '../GenericLayout/GenericLayout';
import {HeaderLayout} from './HeaderLayout';
import FooterLayout from '../MessageBox/FooterLayout';


export const ComposerLayout = props => {

  const header = (<HeaderLayout
    title={props.title}
    showCloseButton={props.showCloseButton}
    showQuestionMarkButton={props.showQuestionMarkButton}
    onCloseButtonClick={props.onCloseButtonClick}
    onQuestionMarkButtonClick={props.onQuestionMarkButtonClick}
    secondaryItems={props.secondaryItems}
    />);

  const footer = (<FooterLayout
    confirmText={props.confirmButtonContent}
    cancelText={props.cancelButtonContent}
    enableOk={props.showConfirmButton}
    enableCancel={props.showCancelButton}
    onOk={props.onConfirmButtonClick}
    onCancel={props.onCancelButtonClick}
    sideActions={props.sideActions}
    />);

  return (
    <GenericLayout
      header={props.showHeader && header}
      content={props.content}
      footer={props.showFooter && footer}
      fullscreen={props.fullscreen}
      />
  );
};

ComposerLayout.propTypes = {
  content: PropTypes.node,
  title: PropTypes.node,
  showCloseButton: PropTypes.bool,
  showQuestionMarkButton: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  onQuestionMarkButtonClick: PropTypes.func,
  secondaryItems: PropTypes.node,
  fullscreen: PropTypes.bool,
  confirmButtonContent: PropTypes.node,
  cancelButtonContent: PropTypes.node,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  onConfirmButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  sideActions: PropTypes.node,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool
};

ComposerLayout.defaultProps = {
  showCloseButton: true,
  showQuestionMarkButton: true,
  showConfirmButton: true,
  showCancelButton: true,
  fullscreen: false,
  confirmButtonContent: 'Save',
  cancelButtonContent: 'Cancel',
  showHeader: true,
  showFooter: true
};
