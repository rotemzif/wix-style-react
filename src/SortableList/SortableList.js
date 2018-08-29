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

  _onHover = (dragIndex, hoverIndex) => {
    this.setState(
      ({items: [..._items]}) =>
        _items.splice(hoverIndex, 0, ..._items.splice(dragIndex, 1)) && {
          items: _items
        }
    );
  };

  _onMove = ({id, from}) => {
    const to = this.state.items.findIndex(({id: _}) => _ === id);

    return this.props.onMove({id, from, to});
  };

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
            onHover={this._onHover}
            onMove={this._onMove}
            render={render}
            withHandle={withHandle}
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
  groupName: PropTypes.string
};
