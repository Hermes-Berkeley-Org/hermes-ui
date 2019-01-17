import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class EnablePiazzaForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.props.createPiazzaBot(this.props.course.info['course_ok_id'], this.state.piazzaCourseUrl);
    this.props.closePiazzaModal()
  }

  render() {
    console.log(this.props)
    return (
      <div>
      <div onClick={this.props.closePiazzaModal} className="fas fa-times"></div>
      <h2>Enable Piazza</h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
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

export default EnablePiazzaForm;
