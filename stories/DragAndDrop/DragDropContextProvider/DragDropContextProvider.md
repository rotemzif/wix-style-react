##### DragDropContextProvider
> component that provide all required context for application to support d&d

With `<DragDropContextProvider/>` component you are able to define which parts of your application will support d&d.
By default all wix-style-react d&d components has `<DragDropContextProvider/>` as parent(root element).

So for most use cases, you should not use `DragDropContextProvider`, just use wix-style-react d&d components directly.

# When to use DragDropContextProvider
Use case: product has several columns and user able two do a d&d between them.

For such use case, developer of product need to define same context for both columns too allow d&d between them.

Example
```js
  <DragDropContextProvider>
    <Column1/>
    <Column2/>
  </DragDropContextProvider>
```

now you have same context for `<Column1/>` and `<Column2/>` and it possible to implement d&d between them

Anti-Example
```js
  <div>
    <DragDropContextProvider>
      <Column1/>
    </DragDropContextProvider>
    <Column2/>
  </div>
```

In such way, you will not be able to d&d from `<Column1/>` to `<Column2/>`
