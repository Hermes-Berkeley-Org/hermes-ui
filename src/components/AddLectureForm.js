import React, { Component } from 'react';

class AddLectureForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlistTitle: '',
      playlistDate: '',
      playlistLink: ''
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
    this.props.createLecture(this.props.courseId, {
      title: this.state.playlistTitle,
      date: this.state.playlistDate,
      link: this.state.playlistLink,
      course: this.props.course
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label htmlFor="playlist-title">Lecture title</label>
          <input
            type='text'
            className="form-control"
            id='playlist-title'
            name='playlistTitle'
            value={this.state.playlistTitle}
            onChange={this.handleInputChange.bind(this)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="playlist-date">Lecture date</label>
          <input
            type='date'
            className="form-control"
            id='playlist-date'
            name='playlistDate'
            value={this.state.playlistDate}
            onChange={this.handleInputChange.bind(this)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="playlist-link">YouTube lecture/playlist link</label>
          <input
            type='text'
            className="form-control"
            id='playlist-link'
            name='playlistLink'
            value={this.state.playlistLink}
            onChange={this.handleInputChange.bind(this)}
          />
        </div>
        <input type='submit' className='btn btn-default' value='Create' />
      </form>
    );
  }

}

export default AddLectureForm;
