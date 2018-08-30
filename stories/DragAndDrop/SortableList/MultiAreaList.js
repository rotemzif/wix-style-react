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
 * An example multi list dnd.
 */
export default class MultiAreaList extends React.Component {
  state = {
    multiArea1: generateStateForContainer(4, 1),
    multiArea2: generateStateForContainer(4, 5)
  }

  handleDrop = ({removedIndex, addedIndex, removedFromContainerId, addedToContainerId, payload}) => {
    this.state[removedFromContainerId].splice(removedIndex, 1);
    this.state[addedToContainerId].splice(addedIndex, 0, payload);

    this.setState({
      ...JSON.parse(JSON.stringify(this.state))
    });
  };

  renderItem = ({isPlaceholder, isPreview, id, item, previewStyles}) => {
    const classes = classNames(
      styles.item,
      {
        [styles.itemPlaceholder]: isPlaceholder,
        [styles.itemPreview]: isPreview
      });

    return (
      <div className={classes} style={previewStyles} data-hook={`item-${id}`}>
        {item.text}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.root}>
        <div style={{marginTop: 150}}>
          <SortableList
            className={styles.listRoot}
            dataHook="list-multi-area"
            groupName="multi-area"
            containerId="multiArea1"
            items={this.state.multiArea1}
            renderItem={this.renderItem}
            onDrop={this.handleDrop}
            />
        </div>
        <SortableList
          className={styles.listRoot}
          dataHook="list-multi-area"
          groupName="multi-area"
          containerId="multiArea2"
          items={this.state.multiArea2}
          renderItem={this.renderItem}
          onDrop={this.handleDrop}
          />
      </div>
    );
  }
}

