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
    console.log(this.props)
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

  componentDidMount() {
    const player = this.props.player;
    this.loadQuestions(0);
    setInterval(() => {
      if (player.getPlayerState() === YouTube.PlayerState.PLAYING) {
        this.loadQuestions(player.getCurrentTime())
      }
    }, 30 * 1000)
  }
}

const mapStateToProps = state => ({
  ...state.piazzaQuestionReducer
});

const mapDispatchToProps = dispatch => ({
  loadQuestions: (...args) => dispatch(loadQuestions(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PiazzaQuestions);
