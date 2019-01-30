import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class CreateCourseForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.course['display_name'],
      piazzaCourseId: ''
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
      piazzaCourseId: this.state.piazzaCourseId,
      ...this.props.course
    });
    this.props.closeCreateCourseModal()
  }

  render() {
    return (
      <div>
        <div onClick={this.props.closeCreateCourseModal} className="fas fa-times"></div>
        <h3>Create {this.state.displayName || 'course'}</h3>
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
              Piazza Course ID &nbsp;
            <div data-tip data-for='piazza-help' className="fas fa-question-circle" />
              <ReactTooltip id='piazza-help'>
                <p>Navigate to the course on Piazza and paste the alphanumeric ID (piazza.com/class/&lt;course_id&gt;) here.</p>
              </ReactTooltip>
            </label>
            <input
              type='text'
              className="form-control"
              id='piazza-course-id'
              name='piazzaCourseId'
              value={this.state.piazzaCourseId}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <input type='submit' className='btn btn-default' value='Create' />
        </form>
      </div>
    );
  }

}

export default CreateCourseForm;
