import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { connect } from 'react-redux';

import { loadQuestions } from '../actions/piazza.js';

class PiazzaQuestions extends Component {

  constructor(props) {
    super(props);
    this.loadQuestions = this.loadQuestions.bind(this);
  }

  render() {
    return (
      <div>
      {!this.props.piazzaData ? 'No questions to display' :
        JSON.stringify(this.props.piazzaData)
      }
      </div>
    );
  }

  loadQuestions(seconds) {
    this.props.loadQuestions(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex,
      seconds,
      this.props.lecturePiazzaId,
      this.props.piazzaCourseId
    );
  }

  componentDidUpdate(prevProps) {
    // Only consider reloading questions when the video time has changed
    if (this.props.videoCurrentTime != prevProps.videoCurrentTime) {
      const videoPlaying = this.props.player && this.props.player.getPlayerState() !== YouTube.PlayerState.PAUSED;
      const videoJumped = this.props.videoCurrentTime == this.props.videoStartTime;
      const questionsShouldUpdate = videoJumped || (Math.round(this.props.videoCurrentTime) % 30 === 0);

      if (videoPlaying && questionsShouldUpdate) {
        this.loadQuestions(this.props.videoCurrentTime);
      }
    }
  }
}

const mapStateToProps = state => ({
  ...state.piazzaQuestionReducer,
  ...state.youtubeReducer
});

const mapDispatchToProps = dispatch => ({
  loadQuestions: (...args) => dispatch(loadQuestions(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PiazzaQuestions);
