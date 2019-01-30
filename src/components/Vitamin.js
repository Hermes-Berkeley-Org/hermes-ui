import React, { Component } from 'react';
import { connect } from 'react-redux';

import { answerVitamin } from '../actions/editVideo.js'
import toast from '../utils/toast.js'

class Vitamin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: ''
    }
  }

  handleChoiceChange(answerIndex, event) {
    this.setState(
      { answerIndex }
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.answerIndex === '') {
      toast.error('Please select an option')
    } else {
      this.props.answerVitamin(
        this.props.vitamin['course_ok_id'],
        this.props.vitamin['lecture_url_name'],
        this.props.vitamin['video_index'],
        this.props.vitamin['vitamin_index'],
        this.props.vitamin.choices[this.state.answerIndex]
      );
      this.props.closeVitaminModal();
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.vitamin.question}</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.props.vitamin.choices.map((choice, index) =>
              <div key={index} className="row">
                <input
                  type="radio"
                  key={`choice-${index}-radio`}
                  id={`choice-${index}-radio`}
                  name="answerIndex"
                  className="form-control"
                  checked={this.state.answerIndex === index}
                  onChange={this.handleChoiceChange.bind(this, index)}
                />
                {choice}
              </div>
            )
          }
          {this.props.vitamin.skippable ?
              <button className='btn' onClick={this.props.closeVitaminModal}>Skip</button> :
              null
          }
          <input type='submit' className='btn btn-default' value='Submit' />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  answerVitamin: (...args) => dispatch(answerVitamin(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Vitamin);
