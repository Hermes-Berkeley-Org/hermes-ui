import React, { Component } from 'react';

class DisablePiazzaForm extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.props.disablePiazzaBot(
      this.props.course.info['course_ok_id'],
      this.props.course.info['piazza_master_post_id'],
      this.props.course.info['piazza_course_id']
    );
    this.props.closePiazzaModal()
  }

  render() {
    return (
      <div>
      <div onClick={this.props.closePiazzaModal} className="fas fa-times"></div>
      <h2>Disable Piazza</h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>Are you sure you want to disable Piazza integration for your course?</p>
        <div class="row">
          <input type='submit' className='btn btn-default' value='Disable' />
        </div>
      </form>
      </div>
    );
  }

}

export default DisablePiazzaForm;
