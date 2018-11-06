import React, {Component} from 'react';
import Button from 'wix-style-react/Button';
import Modal from 'wix-style-react/Modal';

import {ComposerLayout} from '../../../src/ComposerLayout/ComposerLayout';


class GenericModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpenGenericModal: false
    };
  }

  renderComposerLayout() {

    return (<ComposerLayout
      content={<div >Hello</div>}
      title="title"
      fullscreen
      sideActions={<div>Some Side Actions</div>}
      />);
  }

  render() {
    const setState = state => () => this.setState(state);
    const closeGenericModal = setState({isOpenGenericModal: false});
    const openGenericModal = setState({isOpenGenericModal: true});

    return (
      <div>
        <Button
          dataHook="open-fullscreen-generic-modal-button"
          onClick={openGenericModal}
          >Open Generic Modal</Button>

        <Modal
          contentLabel="Generic modal example"
          isOpen={this.state.isOpenGenericModal}
          onRequestClose={closeGenericModal}
          shouldDisplayCloseButton
          >
          {this.renderComposerLayout()}
        </Modal>
      </div>
    );
  }
}

export default () => <GenericModal/>;
