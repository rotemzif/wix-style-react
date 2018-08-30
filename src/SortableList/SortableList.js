import React from 'react';
import PropTypes from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import {Draggable} from '../DragAndDrop/Draggable';
import Container from '../DragAndDrop/Draggable/components/Container';

/**
 * Attaches Drag and Drop behavior to a list of items
 */
export default class SortableList extends WixComponent {
  state = {
    items: this.props.items || []
  }

  componentWillReceiveProps({items}) {
    if (items) {
      this.setState({items});
    }
  }

  handleMoveOut = id => this.setState({items: this.state.items.filter(it => it.id !== id)})

  handleHover = (removedIndex, addedIndex, options = {}) => {
    const nextItems = [...this.state.items];
    if (options.type === 'group' && !nextItems.find(it => it.id === options.id)) {
      nextItems.splice(addedIndex, 0, options.item);
    } else {
      nextItems.splice(addedIndex, 0, ...nextItems.splice(removedIndex, 1));
    }
    this.setState({
      items: nextItems
    });
  };

  handleDrop = ({payload, addedIndex, removedIndex, addedToContainerId, removedFromContainerId}) => {
    this.props.onDrop({
      payload,
      addedIndex,
      removedIndex,
      addedToContainerId,
      removedFromContainerId
    });
  };

  render() {
    const {classes, containerId, groupName} = this.props;
    const common = {
      containerId,
      groupName,
      onHover: this.handleHover,
      onMoveOut: this.handleMoveOut
    };
    return (
      <Container
        className={classes.root}
        total={this.state.items.length}
        {...common}
        >
        <div className={classes.content}>
          {this.state.items.map((item, index) => (
            <Draggable
              {...common}
              classes={{
                dragSource: this.props.classes.dragSource,
                dragTarget: this.props.classes.dragTarget,
                dragLayer: this.props.classes.dragLayer
              }}
              key={`${item.id}-${index}`}
              id={item.id}
              index={index}
              item={item}
              renderItem={this.props.renderItem}
              withHandle={this.props.withHandle}
              onDrop={this.handleDrop}
              />
          ))}
        </div>
      </Container>
    );
  }
}

SortableList.displayName = 'SortableList';

SortableList.defaultProps = {
  classes: {}
};

SortableList.propTypes = {
  ...Draggable.propTypes,
  /** list of items with {id: any} */
  items: PropTypes.array,
  /** css classnames to customize board */
  classes: PropTypes.shape({
    root: PropTypes.string,
    content: PropTypes.string,
    dragSource: PropTypes.string,
    dragTarget: PropTypes.string,
    dragLayer: PropTypes.string
  })
};
