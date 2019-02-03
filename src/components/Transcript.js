import React, { Component } from 'react';
import YouTube from 'react-youtube';

import { connect } from 'react-redux';

class Transcript extends Component {

  constructor(props) {
    super(props);
    this.transcriptWithTimes = this.props.transcript.map((transcriptElement, index) => ({
      ...transcriptElement,
      transcriptRow: index,
      seconds: transcriptElement.begin
        .substring(0, transcriptElement.begin.length - 4)
        .split(':').reduce((acc, time) => (60 * acc) + +time)
    }));

    this.transcriptTable = null;
    this.transcriptRows = this.props.transcript.map(() => null);

    this.setTranscriptTableRef = element => {
      this.transcriptTable = element;
    };

    this.setTranscriptRowRef = (element, index) => {
      this.transcriptRows[index] = element;
    }

    this.findClosestTranscriptRow = this.findClosestTranscriptRow.bind(this);
  }

  render() {
    // TODO: Merge the entries faster
    const entries = [
      ...this.transcriptWithTimes,
      ...this.props.vitamins
    ].sort((a, b) => a.seconds - b.seconds);

    if (entries.length === 0) {
      return 'No transcript is associated with this video';
    }

    return (
      <div className='video-transcript'>
        <table ref={this.setTranscriptTableRef}>
          <tbody>
            {entries.map((entry, index) => {
              const seconds = entry.seconds;
              const entryIsVitamin = entry.vitamin_index !== undefined;

              if (entryIsVitamin) {
                return (
                  <tr key={index}>
                    <td className='video-transcript-timestamp' key={`timestamp-${index}`}>Vitamin</td>
                    <td className='video-transcript-text' key={`text-${index}`}>
                      <div className='video-transcript-vitamin'>
                        <div className='video-transcript-vitamin-question'>{entry.question}</div>
                        <ul className='video-transcript-vitamin-choices'>
                          {entry.choices.map((choice, key) => <li key={key}>{choice}</li>)}
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index} ref={(element) => this.setTranscriptRowRef(element, entry.transcriptRow)}>
                    <td className='video-transcript-timestamp' key={`timestamp-${index}`} onClick={
                      () => this.props.player.seekTo(seconds)
                    }>
                      {entry.begin.substring(0, entry.begin.length - 4)}
                    </td>
                    <td className='video-transcript-text' key={`text-${index}`}>{entry.text}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }

  findClosestTranscriptRow(currentTime, startIndex) {
    for (let i = startIndex; i < this.transcriptWithTimes.length; i++) {
      if (this.transcriptWithTimes[i].seconds > currentTime) {
        return i - 1; // Offset for scroll timing delay
      }
    }
    return 0;
  }

  componentDidUpdate() {
    const videoPlaying = this.props.player && this.props.player.getPlayerState() !== YouTube.PlayerState.PAUSED;
    const videoJumped = this.props.videoCurrentTime === this.props.videoStartTime;
    const transcriptShouldScroll = videoJumped || (Math.round(this.props.videoCurrentTime) % 15 === 0);

    if (videoPlaying && transcriptShouldScroll) {
      const closestTranscriptRowIndex = this.findClosestTranscriptRow(this.props.videoCurrentTime, 0);
      if (this.transcriptRows[closestTranscriptRowIndex]) {
        this.transcriptRows[closestTranscriptRowIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
}

const mapStateToProps = state => ({
  ...state.youtubeReducer
});

export default connect(mapStateToProps)(Transcript);
