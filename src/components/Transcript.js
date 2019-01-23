import React, { Component } from 'react';
import YouTube from 'react-youtube';

import { connect } from 'react-redux';
import { resumeVideo } from '../actions/youtube.js'

class Transcript extends Component {

  constructor(props) {
    super(props);
    this.transcriptTimes = this.props.transcript.map((transcriptElement) => (
      transcriptElement.begin
        .substring(0, transcriptElement.begin.length - 4)
        .split(':').reduce((acc,time) => (60 * acc) + +time)
    ))
    this.state = {
      currentTranscriptIndex: 0
    }

    this.transcriptTable = null;
    this.transcriptRows = this.props.transcript.map((transcriptElement) => null);

    this.setTranscriptTableRef = element => {
      this.transcriptTable = element;
    };

    this.setTranscriptRowRef = (element, index) => {
      this.transcriptRows[index] = element;
    }

    this.findClosestTranscriptRow = this.findClosestTranscriptRow.bind(this);
  }

  render() {
    return (
      <div className='video-transcript'>
        <table ref={this.setTranscriptTableRef}>
          <tbody>
            {this.props.transcript.map((transcriptElement, index) => (
              <tr key={index} ref={(element) => this.setTranscriptRowRef(element, index)}>
                <td className='video-transcript-timestamp' key={`timestamp-${index}`} onClick={
                  () => this.props.player.seekTo(this.transcriptTimes[index])
                }>
                  {transcriptElement.begin.substring(0, transcriptElement.begin.length - 4)}
                </td>
                <td className='video-transcript-text' key={`text-${index}`}>{transcriptElement.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    setInterval(() => {
      this.findClosestTranscriptRow(this.state.currentTranscriptIndex);
    }, 15000) // 15 seconds, the typical size of the transcript box
  }

  findClosestTranscriptRow(startIndex) {
    for (let i = startIndex; i < this.transcriptTimes.length; i++) {
      if (this.transcriptTimes[i] > this.props.player.getCurrentTime()) {
        this.setState({
          currentTranscriptIndex: i - 1 // Offset for scroll timing delay
        })
        break;
      }
    }
  }

  componentDidUpdate() {
    if (this.props.jumpedTo) {
      this.findClosestTranscriptRow(0);
      this.props.resumeVideo();
    }
    if (this.props.player && this.props.player.getPlayerState() !== YouTube.PlayerState.PAUSED) {
      this.transcriptRows[this.state.currentTranscriptIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

const mapStateToProps = state => ({
  ...state.youtubeReducer
});

const mapDispatchToProps = dispatch => ({
  resumeVideo: (...args) => dispatch(resumeVideo(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transcript);
