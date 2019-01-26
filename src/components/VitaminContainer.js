import React, { Component } from 'react';
import Modal from 'react-modal'
import YouTube from 'react-youtube';

import Vitamin from './Vitamin'

class VitaminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Vitamin vitamin={this.props.vitamins[0]} />
      </Modal>
    );
  }

  componentDidMount() {
    const vitamins = this.props.vitamins;
    const player = this.props.player;
    if (vitamins) {
      setInterval(() => {
        if (player.getPlayerState() === YouTube.PlayerState.PLAYING &&
              vitamins.length > 0 && vitamins[0].seconds === Math.round(player.getCurrentTime())
          ) {
          this.openVitaminModal();
          vitamins.shift();
        }
      }, 1000)
    }
  }

  openVitaminModal() {
    this.props.player.pauseVideo();
    this.setState({
      vitaminModalIsOpen: true
    })
  }

  closeVitaminModal() {
    this.setState({
      vitaminModalIsOpen: false
    })
    this.props.player.playVideo();
  }
}

export default VitaminContainer;
