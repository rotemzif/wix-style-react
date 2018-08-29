import React from 'react';
import classNames from 'classnames';
import SortableList from 'wix-style-react/SortableList';
import DragAndDropLarge from 'wix-style-react/new-icons/system/DragAndDropLarge';
import styles from './MultiAreaList.scss';

/**
 * An example for a simple drag and drop list component.
 */
export default class MultiAreaList extends React.Component {
  constructor() {
    super();
    this.state = {items: [
      {
        id: 'a',
        text: 'Item 1'
      },
      {
        id: 'b',
        text: 'Item 2'
      },
      {
        id: 'c',
        text: 'Item 3'
      },
      {
        id: 'd',
        text: 'Item 4'
      }
    ]};
  }

  _onMove = ({id, from, to}) => {
    this.setState(
      ({items: [..._items]}) =>
        _items.splice(to, 0, ..._items.splice(from, 1)) && {
          items: _items
        }, () => {
      console.log(`onMove(id: ${id} from: ${from} to: ${to})`);
    });
  };


  _renderItem = ({isPlaceholder, isPreview, id, connectHandle, item}) => {
    const classes = classNames(
      styles.card,
      {
        [styles.placeholder]: isPlaceholder,
        [styles.preview]: isPreview
      });

    return (
      <div className={classes} data-hook={`item-${id}`}>
        {connectHandle(
          <div className={styles.handle} data-hook={`card-${id}-handle`}>
            <DragAndDropLarge/>
          </div>
        )}
        {item.text}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.root}>
        <SortableList
          listId="multi-area-1"
          dataHook="list-multi-area"
          withHandle
          items={this.state.items}
          render={this._renderItem}
          onMove={this._onMove}
          />
        <SortableList
          listId="multi-area-2"
          dataHook="list-multi-area"
          withHandle
          items={this.state.items}
          render={this._renderItem}
          onMove={this._onMove}
          />
      </div>
    );
  }
}

