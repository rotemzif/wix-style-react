import React from 'react'
import {HeaderLayout} from './HeaderLayout';
import {mount} from 'enzyme';


export const HeaderLayoutDriver = {
  when: {
    mount: props => this.component = mount(<HeaderLayout {...props}/>),
    unmount: () => this.component.unmount()
  }
}
;
