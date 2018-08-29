import React from 'react';
import classNames from 'classnames';
import SortableList from 'wix-style-react/SortableList';
import DragAndDropLarge from 'wix-style-react/new-icons/system/DragAndDropLarge';
import styles from './MultiAreaList.scss';

/**
 * An example for a simple drag and drop list component.
 */
export default class MultiAreaList extends React.Component {
  state = {
    items: [
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
    ],
    items2: [
      {
        id: 'a1',
        text: 'Item 5'
      },
      {
        id: 'b1',
        text: 'Item 6'
      },
      {
        id: 'c1',
        text: 'Item 7'
      },
      {
        id: 'd1',
        text: 'Item 8'
      }
    ]
  }

  handleDrop = ({removedIndex, addedIndex}) => {
    const nextItems = [...this.state.items];
    nextItems.splice(addedIndex, 0, ...nextItems.splice(removedIndex, 1));
    this.setState({
      items: nextItems
    });
  };

  handleDrop2 = ({removedIndex, addedIndex}) => {
    const nextItems = [...this.state.items2];
    nextItems.splice(addedIndex, 0, ...nextItems.splice(removedIndex, 1));
    this.setState({
      items2: nextItems
    });
  };


  renderItem = ({isPlaceholder, isPreview, id, connectHandle, item}) => {
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
          containerId="multi-area-1"
          groupName="multi-area"
          dataHook="list-multi-area"
          withHandle
          items={this.state.items}
          renderItem={this.renderItem}
          onDrop={this.handleDrop}
          />
        <SortableList
          containerId="multi-area-2"
          groupName="multi-area"
          dataHook="list-multi-area"
          withHandle
          items={this.state.items2}
          renderItem={this.renderItem}
          onDrop={this.handleDrop2}
          />
      </div>
    );
  }
}

