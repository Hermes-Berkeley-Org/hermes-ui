import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class EnablePiazzaForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      piazzaCourseId: '',
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

  handleEnableSubmit(event) {
    event.preventDefault();
    this.props.createPiazzaBot(
      this.props.course.info['course_ok_id'],
      this.state.piazzaCourseId,
      ''
    );
    this.props.closePiazzaModal();
  }

  handleReenableSubmit(event) {
    event.preventDefault();
    this.props.createPiazzaBot(
      this.props.course.info['course_ok_id'],
      this.props.course.info['piazza_course_id'],
      this.props.course.info['piazza_master_post_id']
    );
    this.props.closePiazzaModal();
  }

  render() {
    return (
      <div className='form-enable-piazza'>
        <div onClick={this.props.closePiazzaModal} className="modal-close fas fa-times"></div>
        <h3>Link Piazza</h3>
        {!this.props.course.info['piazza_master_post_id'] ? null :
          <React.Fragment>
            <div>Reenable previously used Piazza</div>
            <form onSubmit={this.handleReenableSubmit.bind(this)}>
              <input type='submit' className='btn btn-default' value='Reenable' />
            </form>
            <hr />
            <div>Link to new Piazza</div>
          </React.Fragment>
        }
        <form onSubmit={this.handleEnableSubmit.bind(this)}>
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
          <input type='submit' className='btn btn-default' value='Enable' />
        </form>
      </div>
    );
  }

}

export default EnablePiazzaForm;
