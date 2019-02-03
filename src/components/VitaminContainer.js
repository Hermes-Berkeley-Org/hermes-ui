import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

import Vitamin from './Vitamin'
import Modal from './Modal.js';

class VitaminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeVitamin: null,
      nextVitaminIndex: 0
    }

    this.openVitaminModal = this.openVitaminModal.bind(this);
    this.closeVitaminModal = this.closeVitaminModal.bind(this);
  }

  render() {
    return (
      <Modal isOpen={!!this.state.activeVitamin}>
        {!this.state.activeVitamin ? null :
            <Vitamin
              vitamin={this.state.activeVitamin}
              closeVitaminModal={this.closeVitaminModal}
            />
        }
      </Modal>
    );
  }

  componentDidMount() {
    this.setState({
      vitamins: this.props.vitamins.filter(vitamin => !vitamin.answered)
    })
  }

  componentDidUpdate() {
    const videoPlaying = this.props.player && this.props.player.getPlayerState() !== YouTube.PlayerState.PAUSED;
    const hasNextVitamin = this.state.nextVitaminIndex < this.state.vitamins.length;

    if (videoPlaying && hasNextVitamin) {
      if (this.props.videoCurrentTime >= this.state.vitamins[this.state.nextVitaminIndex].seconds) {
        this.openVitaminModal();
      }
    }
  }

  openVitaminModal() {
    // Pausing the video should prevent `openVitaminModal()` from running again when the modal's open
    this.props.player.pauseVideo();
    this.props.player.seekTo(this.state.vitamins[this.state.nextVitaminIndex].seconds);

    this.setState({
      activeVitamin: this.state.vitamins[this.state.nextVitaminIndex],
      nextVitaminIndex: this.state.nextVitaminIndex + 1
    })
  }

  closeVitaminModal() {
    this.setState({
      activeVitamin: null
    })
    this.props.player.playVideo();
  }
}

const mapStateToProps = state => ({
  ...state.youtubeReducer
});

export default connect(mapStateToProps)(VitaminContainer);
