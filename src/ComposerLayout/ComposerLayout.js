import React from 'react';
import PropTypes from 'prop-types';
import {GenericLayout} from '../GenericLayout';
import {HeaderLayout} from './HeaderLayout';
import FooterLayout from './FooterLayout';

export const ComposerLayout = props => {

  const header = (<HeaderLayout
    title={props.title}
    showCloseButton={props.showCloseButton}
    showQuestionMarkButton={props.showQuestionMarkButton}
    onCloseButtonClick={props.onCloseButtonClick}
    onInfoButtonClick={props.onInfoButtonClick}
    secondaryItems={props.secondaryItems}
    />);

  const footer = (<FooterLayout
    confirmButtonContent={props.confirmButtonContent}
    cancelButtonContent={props.cancelButtonContent}
    showConfirmButton={props.showConfirmButton}
    showCancelButton={props.showCancelButton}
    isConfirmButtonEnabled={props.isConfirmButtonEnabled}
    isCancelButtonEnabled={props.isCancelButtonEnabled}
    onConfirmButtonClick={props.onConfirmButtonClick}
    onCancelButtonClick={props.onCancelButtonClick}
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
  onInfoButtonClick: PropTypes.func,
  secondaryItems: PropTypes.node,
  fullscreen: PropTypes.bool,
  confirmButtonContent: PropTypes.node,
  cancelButtonContent: PropTypes.node,
  showConfirmButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  isConfirmButtonEnabled: PropTypes.bool,
  isCancelButtonEnabled: PropTypes.bool,
  onConfirmButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  sideActions: PropTypes.node,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool
};

ComposerLayout.defaultProps = {
  fullscreen: false,
  showHeader: true,
  showFooter: true
};
