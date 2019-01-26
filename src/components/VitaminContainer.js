import React, { Component } from 'react';
import Modal from 'react-modal'

import Vitamin from './Vitamin'

class VitaminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeVitamin: null,
      vitaminModalIsOpen: false
    }

    this.openVitaminModal = this.openVitaminModal.bind(this);
    this.closeVitaminModal = this.closeVitaminModal.bind(this);
  }

  render() {
    return (
      <Modal
        isOpen={this.state.vitaminModalIsOpen}
        onRequestClose={this.closeVitaminModal}
        style={
          {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }
        }
      >
        <Vitamin vitamin={this.state.activeVitamin} />
      </Modal>
    );
  }

  componentDidMount() {
  }

  openVitaminModal() {
    this.state.player.pauseVideo();
    this.setState({
      vitaminModalIsOpen: true
    })
  }

  closeVitaminModal() {
    this.setState({
      vitaminModalIsOpen: false,
      activeVitamin: null
    })
  }
}

export default VitaminContainer;
