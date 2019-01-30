import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import { createVitamin, editVitamin } from '../actions/editVideo.js'
import toast from '../utils/toast.js'

class CreateVitaminForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionTitle: !this.props.vitamin ? '' : this.props.vitamin['question'],
      choices: !this.props.vitamin ? ['', '', '', ''] : this.props.vitamin['choices'].concat(Array(4 - this.props.vitamin['choices'].length).fill('')),
      answerIndex: !this.props.vitamin ? '' : this.props.vitamin['choices'].indexOf(this.props.vitamin['answer']),
      skippable: !this.props.vitamin ? false : this.props.vitamin['skippable']
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

  handleAnswerChange(index, event) {
    this.setState({
      answerIndex: index
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.questionTitle) {
      toast.error('Please enter a question title');
      return;
    }
    if (this.state.answerIndex === '') {
      toast.error('Please select the correct answer');
      return;
    }
    const choices = this.state.choices.filter((choice) => choice !== '');
    const numOptions = choices.length;
    if (numOptions <= 1) {
      toast.error('Please enter more than one option');
      return;
    }
    for (let i = 0; i < numOptions; i++) {
      if (!this.state.choices[i]) {
        toast.error('Please enter all options consecutively.')
        return;
      }
    }
    if (this.props.vitamin) {
      this.props.editVitamin(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        this.props.vitamin['vitamin_index'],
        {
          ...this.props.vitamin,
          question: this.state.questionTitle,
          skippable: this.state.skippable,
          answer: this.state.choices[Number.parseInt(this.state.answerIndex, 10)],
          choices: choices
        }
      )
    } else {
      this.props.createVitamin(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        {
            seconds: Math.ceil(this.props.player.getCurrentTime()),
            question: this.state.questionTitle,
            skippable: this.state.skippable,
            answer: this.state.choices[Number.parseInt(this.state.answerIndex, 10)],
            choices: choices
        }
      );
    }
    this.props.closeVitaminModal()

  }

  render() {
    return (
      <div>
        <div onClick={this.props.closeVitaminModal} className="fas fa-times"></div>
        <h3>Create {this.state.questionTitle || 'vitamin'}</h3>
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
                  name="answerIndex"
                  className="form-control"
                  checked={this.state.answerIndex === index}
                  onChange={this.handleAnswerChange.bind(this, index)}
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
          <input type='submit' className='btn btn-default' value={this.props.vitamin ? 'Edit' : 'Create'} />
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
