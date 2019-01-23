import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import { createVitamin, editVitamin } from '../actions/editVideo.js'

class CreateVitaminForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      answer: '',
      choices: [],
      seconds: this.props.player.getCurrentTime()
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

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.vitamin) {
      this.props.editVitamin(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        this.props.vitamin['vitamin_index'],
        {

        }
      )
    } else {
      this.props.createVitamin(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        {

        }
      );
    }
    this.props.closeVitaminModal()
  }

  render() {
    return (
      <div>
        <div onClick={this.props.closeVitaminModal} className="fas fa-times"></div>
        <h2>Create {this.state.displayName || 'vitamin'}</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Idk what I'm doing as a placeholder
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
