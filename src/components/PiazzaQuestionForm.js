import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import Loading from './Loading.js';

import { askPiazzaQuestion } from '../actions/piazza.js'

class PiazzaQuestionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      anonymous: false
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const seconds = Math.floor(this.props.player.getCurrentTime());
    this.props.askPiazzaQuestion(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex,
      {
        question: this.state.question,
        videoTitle: this.props.video.title,
        videoUrl: `${window.location.href.split('?')[0]}?seconds=${seconds}`,
        seconds: seconds,
        piazzaCourseId: this.props.course.info['piazza_course_id'],
        piazzaLecturePostId: this.props.lecture['lecture_piazza_id'],
        anonymous: this.state.anonymous
      }
    );
    this.props.player.playVideo();
  }

  render() {
    return (this.props.piazzaQuestionLoading ?
      <Loading /> :
      <div className='form-container form-video-piazza'>
        <h3>Ask a question <span data-tip data-for='piazza-help' className='video-piazza-help fas fa-question-circle' /></h3>
        <label>
          <ReactTooltip id='piazza-help'>
            <p>Enter your question here, and we'll post it to Piazza tagged at the timestamp in the video!</p>
          </ReactTooltip>
        </label>
        <form className onSubmit={this.handleSubmit.bind(this)}>
          <input
            type='text'
            className='form-control'
            id='question'
            name='question'
            placeholder={`e.g. What's a BST?`}
            value={this.state.question}
            onChange={this.handleInputChange.bind(this)}
            onClick={() => this.props.player.pauseVideo()}
          />
          <label htmlFor='anonymous' className='light'>
            <input
              name='anonymous'
              id='anonymous'
              type='checkbox'
              checked={this.state.anonymous}
              onChange={this.handleInputChange.bind(this)}
            />
            Post anonymously
          </label>
          <input type='submit' className='btn btn-default' value='Ask' />
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state.piazzaReducer
});

const mapDispatchToProps = dispatch => ({
  askPiazzaQuestion: (...args) => dispatch(askPiazzaQuestion(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PiazzaQuestionForm);
