import React, {Component} from 'react';
import {Button} from 'wix-style-react/Backoffice';
import GenericLayout from 'wix-style-react/GenericLayout/GenericLayout';
import Modal from 'wix-style-react/Modal';
import {ComposerLayout} from '../../../src/ComposerLayout/ComposerLayout';


class GenericModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpenGenericModal: false
    };
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
          isOpen={this.state.isOpenGenericModal}
          onRequestClose={closeGenericModal}
          contentLabel="Generic modal example"
          >
          <ComposerLayout
            content={<div >Hello</div>}
            title="title"
            fullscreen
            />
        </Modal>
      </div>
    );
  }
}

export default () => <GenericModal/>;
