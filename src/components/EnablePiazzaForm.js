import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class EnablePiazzaForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      piazzaCourseId: '',
      setUpNewPiazza: !this.props.course.info['piazza_master_post_id']
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
    this.props.createPiazzaBot(
      this.props.course.info['course_ok_id'],
      this.state.piazzaCourseId || this.props.course.info['piazza_course_id'],
      this.state.setUpNewPiazza ? '' : this.props.course.info['piazza_master_post_id']
    );
    this.props.closePiazzaModal()
  }

  togglePiazzaInput(event) {
    this.setState({
      setUpNewPiazza: !this.state.setUpNewPiazza
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div onClick={this.props.closePiazzaModal} className="modal-close fas fa-times"></div>
        <h3>Enable Piazza</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
          {!this.props.course.info['piazza_master_post_id'] ? null :
            <a className='btn btn-link btn-small' onClick={this.togglePiazzaInput.bind(this)}><i className="ai ai-piazza"></i>
             {!this.state.setUpNewPiazza ? "Set up a new course Piazza" : "Reenable existing Piazza"}
            </a>
          }
          </div>
          {!this.props.course.info['piazza_master_post_id'] || this.state.setUpNewPiazza ?
            <div>
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
            </div> :
            <input type='submit' className='btn btn-default' value='Reenable' />
          }
        </form>
      </div>
    );
  }

}

export default EnablePiazzaForm;
