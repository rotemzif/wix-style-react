import React from 'react';
import WixComponent from '../../BaseComponents/WixComponent';
import DragLayer from './DragLayer';
import PropTypes from 'prop-types';
import {DragSource as _DragSource, DropTarget as _DropTarget} from 'react-dnd';
import {dragCoordinates} from './DragUtils';
import {getEmptyImage} from 'react-dnd-html5-backend';
import noop from 'lodash/noop';

const ItemTypes = {
  DRAGGABLE: 'Draggable'
};

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
  endDrag: ({item, index, onDrop}, monitor) => {
    if (monitor.getDropResult()) {
      onDrop({
        payload: item,
        removedIndex: index,
        addedIndex: monitor.getDropResult().index,
        addedToContainerId: monitor.getDropResult().containerId
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

@_DragSource(ItemTypes.DRAGGABLE, source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export class DraggableSource extends React.Component {
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
    const {renderItem, id, item} = this.props;
    return (
      <DragLayer
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
    const {connectDragSource} = this.props;
    return connectDragSource ? (
      <div>
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

  groupName: PropTypes.string,
  containerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderItem: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  item: PropTypes.object,
  withHandle: PropTypes.bool,
  onDrop: PropTypes.func,
  onHover: PropTypes.func,
  onMoveOut: PropTypes.func
};

const target = {
  drop(props) {
    return {
      containerId: props.containerId,
      index: props.index
    };
  },
  hover(props, monitor, component) {
    const monitorItem = monitor.getItem();
    const dragIndex = monitorItem.index;
    const hoverIndex = props.index;

    const isSameGroup = props.groupName && monitorItem.groupName && props.groupName === monitorItem.groupName;
    const isSameContainer = props.containerId === monitor.getItem().containerId;

    if (!isSameContainer && !isSameGroup) {
      return;
    }

    if (!component || hoverIndex === dragIndex) {
      return;
    }

    const {hoverClientY, hoverMiddleY} = dragCoordinates({monitor, component});

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (isSameGroup && !isSameContainer) {
      monitorItem.onMoveOut(monitorItem.id);
    }

    props.onHover(dragIndex, hoverIndex, {
      id: monitorItem.id,
      item: monitorItem.originalItem,
      type: isSameGroup && !isSameContainer ? 'group' : 'container'
    });
    monitor.getItem().index = hoverIndex;
  }
};

@_DropTarget(ItemTypes.DRAGGABLE, target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export class Draggable extends WixComponent {
  render() {
    const {connectDropTarget, ...props} = this.props;
    return connectDropTarget ?
      connectDropTarget(
        <div>
          <DraggableSource {...props}/>
        </div>
      ) :
      null;
  }
}

Draggable.defaultPropTypes = {
  containerId: 'DraggableList'
};

Draggable.propTypes = {
  /** callback when item was dropped in a new location */
  onDrop: PropTypes.func,
  /** callback when item is hovered*/
  onHover: PropTypes.func,
  /** a function to render each item in the list */
  render: PropTypes.func.isRequired,
  /** decide whether to render a handle using `connectHandle` (see below) */
  withHandle: PropTypes.bool,
  /** uniq id of list that contain current draggable item */
  containerId: PropTypes.string,
  groupName: PropTypes.string,
  renderItem: PropTypes.func,
  index: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  item: PropTypes.object,
  onMoveOut: PropTypes.func
};

export default Draggable;
