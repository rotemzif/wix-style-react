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

  return (
    <GenericLayout
      header={header}
      content={props.content}
      footer={<FooterLayout
        confirmText="text"
        cancelText="{cancelText}"
        />}
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
  fullscreen: PropTypes.bool
};

ComposerLayout.defaultProps = {
  showCloseButton: true,
  showQuestionMarkButton: true,
  fullscreen: false
};
