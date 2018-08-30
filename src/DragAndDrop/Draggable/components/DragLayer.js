import * as React from 'react';
import PropTypes from 'prop-types';
import {DragLayer} from 'react-dnd';

/* eslint-disable new-cap */

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

const dragLayerStyle = ({initialOffset, currentOffset}) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  return {
    ...layerStyles,
    transform,
    WebkitTransform: transform
  };
};

const CustomDragLayer = ({
  className,
  item,
  itemType,
  draggedType,
  isDragging,
  renderPreview,
  id,
  initialOffset,
  currentOffset
}) => {
  const shouldRenderLayer = isDragging && id === item.id && itemType === draggedType;
  const styles = dragLayerStyle({initialOffset, currentOffset});
  if (!shouldRenderLayer) {
    return null;
  }

  return <div className={className} style={styles}>{renderPreview()}</div>;
};

CustomDragLayer.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  itemType: PropTypes.string,
  draggedType: PropTypes.string,
  isDragging: PropTypes.bool,
  renderPreview: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialOffset: PropTypes.number,
  currentOffset: PropTypes.number
};

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
