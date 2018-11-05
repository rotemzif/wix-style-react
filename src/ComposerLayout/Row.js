import React from 'react';
import PropTypes from 'prop-types';
import styles from './Row.scss';

export const Row = ({leftAlignedItems, rightAlignedItems, centerAlignedItems}) =>
  <div className={styles.rowContainer}>
    <div data-hook="left-aligned-items" className={styles.leftAlignedItems}>
      {leftAlignedItems}
    </div>
    <div data-hook="center-aligned-items" className={styles.centerAlignedItems}>
      {centerAlignedItems}
    </div>
    <div data-hook="right-aligned-items" className={styles.rightAlignedItems}>
      {rightAlignedItems}
    </div>
  </div>;

Row.propTypes = {
  leftAlignedItems: PropTypes.node,
  rightAlignedItems: PropTypes.node,
  centerAlignedItems: PropTypes.node
};

