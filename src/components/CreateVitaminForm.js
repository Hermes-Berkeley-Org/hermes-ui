import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import { createVitamin, editVitamin } from '../actions/editVideo.js'

class CreateVitaminForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      choices: ['', '', '', ''],
      answerIndex: '',
      skippable: false
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChoiceChange(index, event) {
    const choices = this.state.choices.slice();
    choices[index] = event.target.value
    this.setState({ choices })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.vitamin) {
      // this.props.editVitamin(
      //   this.props.courseId,
      //   this.props.lectureUrlName,
      //   this.props.videoIndex,
      //   this.props.vitamin['vitamin_index'],
      //   {
      //
      //   }
      // )
      alert('Not implemented')
    } else {
      this.props.createVitamin(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        {
            seconds: Math.round(this.props.player.getCurrentTime()),
            question: this.state.questionTitle,
            skippable: this.state.skippable,
            answer: this.state.choices[Number.parseInt(this.state.answerIndex, 10)],
            choices: this.state.choices
        }
      );
    }
    this.props.closeVitaminModal()
  }

  render() {
    return (
      <div>
        <div onClick={this.props.closeVitaminModal} className="fas fa-times"></div>
        <h2>Create {this.state.questionTitle || 'vitamin'}</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="question-title">Title
          <input
            type='text'
            className="form-control"
            id='question-title'
            name='questionTitle'
            value={this.state.questionTitle}
            onChange={this.handleInputChange.bind(this)}
          />
          </label>
          {this.state.choices.map((choice, index) =>
              <div key={index} className="row">
                <input
                  type="radio"
                  key={`choice-${index}-radio`}
                  id={`choice-${index}-radio`}
                  value={index}
                  name="answerIndex"
                  className="form-control"
                  onChange={this.handleInputChange.bind(this)}
                />
                <input
                  type="text"
                  key={`choice-${index}`}
                  id={`choice-${index}`}
                  className="form-control"
                  placeholder={`Choice ${index}`}
                  value={this.state.choices[index]}
                  onChange={this.handleChoiceChange.bind(this, index)}
                />
              </div>
            )
          }
          <label htmlFor="skippable">
            Skippable?
            <input
              name="skippable"
              id="skippable"
              type="checkbox"
              checked={this.state.skippable}
              onChange={this.handleInputChange.bind(this)}
            />
          </label>
          <input type='submit' className='btn btn-default' value='Create' />
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  createVitamin: (...args) => dispatch(createVitamin(...args)),
  editVitamin: (...args) => dispatch(editVitamin(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateVitaminForm);
