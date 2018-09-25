import ReactTestUtils from 'react-dom/test-utils';
import DragDropContextProvider from '../DragDropContextProvider';
import DraggableSource from '../DragAndDrop/Draggable/components/DraggableSource';
import DraggableTarget from '../DragAndDrop/Draggable/components/DraggableTarget';

const getInstanceOfDraggableProvider = wrapper => ReactTestUtils.findAllInRenderedTree(wrapper, ins => {
  return ins instanceof DragDropContextProvider;
})[0];

const getInstanceOfDraggableSource = (wrapper, itemId) => ReactTestUtils.findAllInRenderedTree(wrapper, ins => {
  return ins instanceof DraggableSource && ins.props.id === itemId;
})[0];

const getInstanceOfDraggableTarget = (wrapper, itemId) => ReactTestUtils.findAllInRenderedTree(wrapper, ins => {
  return ins instanceof DraggableTarget && ins.props.id === itemId;
})[0];

const sortableListFactory = ({element, wrapper}) => {
  // in case if wrapper is coming from enzyme, we want to get it instance
  const vanillaWrapper = wrapper.instance ? wrapper.instance() : wrapper;
  const isCompositeComponent = ReactTestUtils.isCompositeComponent(vanillaWrapper);

  if (!isCompositeComponent) {
    console.warn('SortableList factory expect to receive wrapper as composite component(react instance, and not a dom instance)');
  }
  const backend = isCompositeComponent ? getInstanceOfDraggableProvider(vanillaWrapper).getManager().getBackend() : null;

  return {
    exists: () => !!element,
    beginDrag: itemId => backend && backend.simulateBeginDrag([getInstanceOfDraggableSource(vanillaWrapper, itemId).getHandlerId()]),
    endDrag: () => backend && backend.simulateEndDrag(),
    drop: () => backend && backend.simulateDrop(),
    hover: itemId => backend && backend.simulateHover([getInstanceOfDraggableTarget(vanillaWrapper, itemId).getHandlerId()])
  };
};

export default sortableListFactory;
