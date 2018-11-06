import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import WixComponent from '../BaseComponents/WixComponent';

import styles from './GenericLayout.scss';


export class GenericLayout extends WixComponent {
  render() {
    const {
      fullscreen,
            header,
            content,
            footer
          } = this.props;

    const containerClassNames = classNames(
      styles.container,
      {
        [styles.fullscreenContainer]: fullscreen
      }
    );

    return (
      <div className={containerClassNames}>
        <div>{header}</div>

        <div className={styles.content} data-hook="content">{content}</div>

        <div>{footer}</div>
      </div>
    );
  }
}

GenericLayout.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  fullscreen: PropTypes.bool
};
