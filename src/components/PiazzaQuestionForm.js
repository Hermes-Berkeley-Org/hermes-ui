import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class PiazzaQuestionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      anonymous: false
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
    // this.props.askPiazzaQuestion(
    //   this.props.course.info['course_ok_id']
    // );
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      <label htmlFor="piazza-course-id">
        <div class="ai ai-piazza"/>&nbsp; Ask a question &nbsp;
        <div data-tip data-for='piazza-help' className="fas fa-question-circle"/>
        <ReactTooltip id='piazza-help'>
          <p>Enter your question here, and we'll post it to Piazza tagged at the timestamp in the video!</p>
        </ReactTooltip>
      </label>
      <input
        type='text'
        className="form-control"
        id='question'
        name='question'
        value={this.state.question}
        onChange={this.handleInputChange.bind(this)}
      />
      <label htmlFor="anonymous">
      Post anonymously
      <input
            name="anonymous"
            id="anonymous"
            type="checkbox"
            checked={this.state.anonymous}
            onChange={this.handleInputChange.bind(this)}
      />
      </label>
      <input type='submit' className='btn btn-default' value='Ask' />
      </form>
    );
  }

}

export default PiazzaQuestionForm;
