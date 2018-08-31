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
    const topPositionOfItems = component.childrenNode.getBoundingClientRect().top - component.rootNode.getBoundingClientRect().top;
    const bottomPositionOfItems = topPositionOfItems + component.childrenNode.getBoundingClientRect().height;
    const {hoverClientY} = dragCoordinates({monitor, component});

    const isInCorrectArea = hoverClientY > topPositionOfItems && hoverClientY < bottomPositionOfItems;
    const isAlreadyOver = monitor.isOver();
    if (isInCorrectArea || !isAlreadyOver) {
      return;
    }

    const monitorItem = monitor.getItem();
    const dragIndex = monitorItem.index;
    const hoverIndex = hoverClientY < topPositionOfItems ? 0 : props.total;

    const isSameGroup = props.groupName && monitorItem.groupName && props.groupName === monitorItem.groupName;
    const isSameContainer = props.containerId === monitor.getItem().containerId;
    if (!isSameGroup || !component || monitorItem.alreadyMoved) {
      return;
    }
    if (isSameGroup && !isSameContainer) {
      monitorItem.alreadyMovedTo = monitorItem.movedOutContainerId === monitorItem.currentContainerId;
      monitorItem.onMoveOut(monitorItem.id);
      monitorItem.movedOutContainerId = props.containerId;
    } else if (isSameGroup && monitorItem.movedOutContainerId && monitorItem.movedOutContainerId !== monitorItem.containerId) {
      monitorItem.moveOutForCurrentContainer(monitorItem.id);
      monitorItem.alreadyMovedTo = monitorItem.movedOutContainerId === monitorItem.currentContainerId;
    }
    monitorItem.moveOutForCurrentContainer = props.onMoveOut;
    monitorItem.currentContainerId = props.containerId;
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
        <div className={this.props.className} ref={node => this.rootNode = node}>
          <div ref={node => this.childrenNode = node}>
            {this.props.children}
          </div>
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
