import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

class CreateCourseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.course['display_name'],
      piazzaCourseUrl: ''
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
    this.props.createCourse(this.props.course.id, {
      displayName: this.state.displayName,
      piazzaCourseUrl: this.state.piazzaCourseUrl,
      ...this.props.course
    });
    this.props.closeCreateCourseModal()
  }

  render() {
    return (
      <div>
      <div onClick={this.props.closeCreateCourseModal} className="fas fa-times"></div>
      <h2>Create {this.state.displayName || 'course'}</h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label htmlFor="display-name">Choose a name for the class:</label>
          <input
            type='text'
            className="form-control"
            id='display-name'
            name='displayName'
            value={this.state.displayName}
            onChange={this.handleInputChange.bind(this)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="piazza-course-id">
            Piazza Course URL &nbsp;
            <div data-tip data-for='piazza-help' className="fas fa-question-circle"/>
            <ReactTooltip id='piazza-help'>
              <p>Navigate to the course on Piazza and paste the link here.</p>
              <p>If you do not wish to enable Piazza for the course, leave this field blank.</p>
            </ReactTooltip>
          </label>
          <input
            type='text'
            className="form-control"
            id='piazza-course-id'
            name='piazzaCourseUrl'
            value={this.state.piazzaCourseUrl}
            onChange={this.handleInputChange.bind(this)}
          />
        </div>
        <input type='submit' className='btn btn-default' value='Create' />
      </form>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state.homeReducer
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseForm);
