import TextButton from 'wix-style-react/TextButton';
import {storySettings} from './storySettings';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: TextButton,
  componentPath: '../../src/TextButton',

  componentProps: {
    onClick: () => alert('Alert'),
    children: 'Text button',
    skin: 'standard',
    underlined: 'none',
    weight: 'thin',
    disabled: false
  }
};
