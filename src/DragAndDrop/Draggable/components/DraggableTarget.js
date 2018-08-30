import React from 'react';
import WixComponent from '../../../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

import {dragCoordinates} from './../DragUtils';
import {ItemTypes} from './../types';

/* eslint-disable new-cap */

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
    // console.log(component.props.containerId, monitorItem.containerId);
    const isSameGroup = props.groupName && monitorItem.groupName && props.groupName === monitorItem.groupName;
    const isSameContainer = props.containerId === monitor.getItem().containerId;

    if (!isSameContainer && !isSameGroup) {
      return;
    }

    if (!component || (hoverIndex === dragIndex && isSameContainer)) {
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

@DropTarget(ItemTypes.DRAGGABLE, target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
class DraggableTarget extends WixComponent {
  render() {
    const {connectDropTarget, children} = this.props;
    if (!this.props.connectDropTarget) {
      return null;
    }
    return connectDropTarget(<div>{children}</div>);
  }
}

DraggableTarget.propTypes = {
  children: PropTypes.any,
  connectDropTarget: PropTypes.func, // from react-dnd
  containerId: PropTypes.string,
  groupName: PropTypes.string,
  index: PropTypes.number,
  onMoveOut: PropTypes.func,
  onHover: PropTypes.func
};

export default DraggableTarget;
