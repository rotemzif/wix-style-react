import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import noop from 'lodash/noop';

import DragLayer from './DragLayer';
import {ItemTypes} from './../types';

/* eslint-disable new-cap */

const source = {
  beginDrag: ({id, index, containerId, groupName, item, onMoveOut}) => {
    return {
      id,
      index,
      containerId,
      groupName,
      originalItem: item,
      onMoveOut
    };
  },
  endDrag: ({item, index, containerId, onDrop}, monitor) => {
    if (monitor.didDrop()) {
      onDrop({
        payload: item,
        removedIndex: index,
        addedIndex: monitor.getDropResult().index,
        addedToContainerId: monitor.getDropResult().containerId,
        removedFromContainerId: containerId
      });
    }
  },
  isDragging: ({id, containerId, groupName}, monitor) => {
    const item = monitor.getItem();
    const isSameGroup = groupName && item.groupName && groupName === item.groupName;
    const isSameContainer = containerId === item.containerId;
    return (isSameGroup || isSameContainer) && item.id === id;
  }
};

@DragSource(ItemTypes.DRAGGABLE, source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class DraggableSource extends React.Component {
  componentDidMount() {
    if (this.props.connectDragPreview) {
      this.props.connectDragPreview(getEmptyImage());
    }
  }

  _renderDraggableItem() {
    const {isDragging, connectDragSource, withHandle, renderItem, id, item} = this.props;
    if (withHandle) {
      return renderItem({
        id,
        item,
        isPlaceholder: isDragging,
        connectHandle: handle => connectDragSource(handle)
      });
    }

    return connectDragSource(
      renderItem({
        id,
        item,
        isPlaceholder: isDragging,
        connectHandle: noop
      })
    );
  }

  _renderPreviewItem() {
    const {renderItem, id, item, classes} = this.props;
    return (
      <DragLayer
        className={classes.dragLayer}
        renderPreview={() => renderItem({
          id,
          item,
          isPreview: true,
          connectHandle: noop
        })}
        id={id}
        draggedType={ItemTypes.DRAGGABLE}
        />
    );
  }

  render() {
    const {connectDragSource, classes} = this.props;
    return connectDragSource ? (
      <div className={classes.root}>
        {this._renderDraggableItem()}
        {this._renderPreviewItem()}
      </div>
    ) : null;
  }
}

DraggableSource.propTypes = {
  isDragging: PropTypes.bool, // from react-dnd
  connectDragSource: PropTypes.func, // from react-dnd
  connectDragPreview: PropTypes.func, // from react-dnd

  classes: PropTypes.shape({
    dragLayer: PropTypes.string,
    root: PropTypes.string
  }),
  groupName: PropTypes.string,
  containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderItem: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  item: PropTypes.object,
  withHandle: PropTypes.bool,
  onDrop: PropTypes.func,
  onMoveOut: PropTypes.func
};
