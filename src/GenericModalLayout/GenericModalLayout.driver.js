import {isClassExists} from '../../test/utils';


export default ({element}) => {
  return {
    getElement: () => element,
    exists: () => !!element,
    isFullscreen: () => isClassExists(element, 'fullscreenContainer')
  };
};
