import React from 'react';
import classNames from 'classnames';
import SortableList from 'wix-style-react/SortableList';
import styles from './MultiAreaList.scss';

const generateStateForContainer = (length, startIndex) => {
  const res = [];
  for (let i = 0; i < length; i++) {
    res.push({
      id: 'item' + startIndex + i,
      text: `Drag object ${startIndex + i}`
    });
  }
  return res;
};

/**
 * An example for a simple drag and drop list component.
 */
export default class MultiAreaList extends React.Component {
  state = {
    multiArea1: generateStateForContainer(4, 1),
    multiArea2: generateStateForContainer(4, 5)
  }

  handleDrop = ({removedIndex, addedIndex, removedFromContainerId, addedToContainerId, payload}) => {
    console.log(addedIndex, removedIndex, addedToContainerId, removedFromContainerId, payload);
    const nextItems1 = [...this.state.multiArea1];
    const nextItems2 = [...this.state.multiArea2];
    if (removedFromContainerId === 'multiArea1') {
      nextItems1.splice(removedIndex, 1);
    }
    if (addedToContainerId === 'multiArea2') {
      nextItems2.splice(addedIndex, 0, payload);
    }
    if (removedFromContainerId === 'multiArea2') {
      nextItems2.splice(removedIndex, 1);
    }
    if (addedToContainerId === 'multiArea1') {
      nextItems1.splice(addedIndex, 0, payload);
    }
    this.setState({
      multiArea1: nextItems1,
      multiArea2: nextItems2
    });
  };


  renderItem = ({isPlaceholder, isPreview, id, item}) => {
    const classes = classNames(
      styles.item,
      {
        [styles.itemPlaceholder]: isPlaceholder,
        [styles.itemPreview]: isPreview
      });

    return (
      <div className={classes} data-hook={`item-${id}`}>
        {item.text}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.root}>
        <SortableList
          dataHook="list-multi-area"
          containerId="multiArea1"
          groupName="multi-area"
          items={this.state.multiArea1}
          renderItem={this.renderItem}
          onDrop={this.handleDrop}
          />
        <SortableList
          dataHook="list-multi-area"
          containerId="multiArea2"
          groupName="multi-area"
          items={this.state.multiArea2}
          renderItem={this.renderItem}
          onDrop={this.handleDrop}
          />
      </div>
    );
  }
}

