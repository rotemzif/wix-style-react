import React from 'react';
import WixComponent from '../../../BaseComponents/WixComponent';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

import {dragCoordinates} from './../DragUtils';
import {ItemTypes} from './../types';

/* eslint-disable new-cap */

const target = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      return {
        containerId: props.containerId,
        index: props.index
      };
    }
  },
  canDrop() {
    return false;
  },
  hover(props, monitor, component) {
    // if (props.containerId === monitor.getItem().containerId) {
    //   return;
    // }
    if (monitor.isOver()) {
      return false;
    }
    const {hoverClientY, hoverMiddleY} = dragCoordinates({monitor, component});
    const monitorItem = monitor.getItem();
    const dragIndex = monitorItem.index;
    const hoverIndex = hoverMiddleY < hoverClientY ? props.total : 0;

    const isSameGroup = props.groupName && monitorItem.groupName && props.groupName === monitorItem.groupName;
    const isSameContainer = props.containerId === monitor.getItem().containerId;

    if (!isSameGroup) {
      return;
    }

    if (!component) {
      return;
    }
    console.log(isSameGroup, isSameContainer);
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
class Container extends WixComponent {
  render() {
    const {connectDropTarget} = this.props;
    return connectDropTarget ?
      connectDropTarget(
        <div className={this.props.className}>
          {this.props.children}
        </div>
      ) :
      null;
  }
}

Container.propTypes = {
  className: PropTypes.string,
  containerId: PropTypes.string,
  groupName: PropTypes.string,
  index: PropTypes.number,
  onMoveOut: PropTypes.func,
  onHover: PropTypes.func
};

export default Container;
