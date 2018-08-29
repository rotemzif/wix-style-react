import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import {Draggable} from '../DragAndDrop/Draggable';
import PropTypes from 'prop-types';

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

  handleHover = (removedIndex, addedIndex) => {
    const nextItems = [...this.state.items];
    nextItems.splice(addedIndex, 0, ...nextItems.splice(removedIndex, 1));
    this.setState({
      items: nextItems
    });
  };

  handleDrop = ({payload, removedIndex}) => this.props.onDrop({
    payload,
    removedIndex,
    addedIndex: this.state.items.findIndex(it => it.id === payload.id)
  });

  render() {
    const {items} = this.state;
    const {render, withHandle} = this.props;

    return (
      <div>
        {items.map((item, index) => (
          <Draggable
            key={`${item.id}-${index}`}
            id={item.id}
            index={index}
            item={item}
            listId={this.props.listId}
            groupName={this.props.groupName}
            render={render}
            withHandle={withHandle}
            onHover={this.handleHover}
            onDrop={this.handleDrop}
            />
        ))}
      </div>
    );
  }
}

SortableList.displayName = 'SortableList';

SortableList.propTypes = {
  ...Draggable.propTypes,
  /** list of items with {id: any} */
  items: PropTypes.array,
  listId: PropTypes.string,
  groupName: PropTypes.string,
  onDrop: PropTypes.func
};
