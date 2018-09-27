# Styles
SortableList accept such style props:
 * `className` - will be applied to the root div of `<SortableList/>` component
 * `contentClassName` - will be applied to the first parent of items, that `<SortableList/>` received

Also, with renderItem callback you are able to do render and style `<SortableList/>` items as you want

##### Example
```js
  <SortableList
    className="my-class-for-sortable-list"
    contentClassName="my-class-for-sortable-list-content"
    renderItem={({isPlaceholder, isPreview, id, previewStyles, item}) => (
      const classes = classNames(
        'my-class-for-item',
        {
          'my-class-for-item-in-placeholder-state': isPlaceholder,
          'my-class-for-item-in-preview-state': isPreview
        }
      );
      return (
        <div className={classes} style={previewStyles}>
          {item.text}
        </div>
      )
    )}
    {...otherProps}
  />
```

# Default styles
We propose always to use default styles which you can import in such way
```js
  import dndStyles from 'wix-style-react/dnd-styles';
```
dndStyles has:
 - `dndStyles.list` - class that should be send to `<SortableList/>` root
 - `dndStyles.item` - class that should be applied to the root of your item
 - `dndStyles.itemPlaceholder` - class that should be applied to the root of your item in placeholder mode
 - `dndStyles.itemPreview` - class that should be applied to the root of your item in preview mode

 ##### Example
```js
  ...
  import dndStyles from 'wix-style-react/dnd-styles';
  ...

  <SortableList
    className={`my-class-for-sortable-list ${dndStyles.list}`}
    contentClassName="my-class-for-sortable-list-content"
    renderItem={({isPlaceholder, isPreview, id, previewStyles, item}) => (
      const classes = classNames(
        `my-class-for-item ${dndStyles.item}`,
        {
          [`my-class-for-item-in-placeholder-state ${dndStyles.itemPlaceholder}`]: isPlaceholder,
          [`my-class-for-item-in-preview-state ${dndStyles.itemPreview}`]: isPreview
        }
      );
      return (
        <div className={classes} style={previewStyles}>
          {item.text}
        </div>
      )
    )}
    {...otherProps}
  />
```

# Inline styles for item
```js
renderItem={({isPlaceholder, isPreview, id, previewStyles, item}) => (
  const classes = classNames(
    `my-class-for-item ${dndStyles.item}`,
    {
      [`my-class-for-item-in-placeholder-state ${dndStyles.itemPlaceholder}`]: isPlaceholder,
      [`my-class-for-item-in-preview-state ${dndStyles.itemPreview}`]: isPreview
    }
  );
  return (
    <div className={classes} style={previewStyles}>
      {item.text}
    </div>
  )
)}
```

renderItem accept `previewStyles` as one of the parameters, `previewStyles`
need to be applied to the root of your item, it required to allow d&d engine to set correct position for item that you drag.

We do not recommend to modify this object or to merge it with another inline styles.
