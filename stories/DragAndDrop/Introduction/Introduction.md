# FAQ
- How i can create trello like board?
- `Please take a look to such example: Sortable List - Draggable Multi Area`
- Does d&d works on mobile?
- `No, it does not. If you want to have d&d on mobile, you need to override our HTML5Backend which we use for d&d`
- How i can override HTML5Backend with MyBackend?
- `example:`
```js
<DragDropContextProvider backend={MyBackend}>
  <div className={styles.root}>
    <SortableList
      className={classNames(defaultDndStyles.list, styles.list)}
      dataHook="list-multi-area"
      groupName="multi-area"
      containerId="multiArea1"
      items={this.state.multiArea1}
      renderItem={this.renderItem}
      onDrop={this.handleDrop}
      />
    <SortableList
      className={classNames(defaultDndStyles.list, styles.list)}
      dataHook="list-multi-area"
      groupName="multi-area"
      containerId="multiArea2"
      items={this.state.multiArea2}
      renderItem={this.renderItem}
      onDrop={this.handleDrop}
      />
  </div>
</DragDropContextProvider>
```
- Do you provide some default styles?
- `Yes, we do. But you able to override everything.`
