import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class EnablePiazzaForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      piazzaCourseId: '',
      setUpNewPiazza: this.props.course.info['piazza_master_post_id']
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

  render() {
    console.log(this.props)
    return (
      <div>
        <div onClick={this.props.closePiazzaModal} className="fas fa-times"></div>
        <h2>Enable Piazza</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {!this.props.course.info['piazza_master_post_id'] ? null :
            <label htmlFor="set-up-new-piazza">
              Set up a new course Piazza
              <input
                name="setUpNewPiazza"
                id="set-up-new-piazza"
                type="checkbox"
                checked={this.state.setUpNewPiazza}
                onChange={this.handleInputChange.bind(this)}
              />
            </label>
          }
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
