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

  handleSubmit() {
    // TODO: Refactor as redux dispatch
    this.props.createLecture(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label htmlFor="playlist-title">Lecture title</label>
          <input type='email' className="form-control" id='playlist-title' value={this.state.playlistTitle} />
        </div>
        <div className='form-group'>
          <label htmlFor="playlist-date">Lecture date</label>
          <input type='date' className="form-control" id='playlist-date' value={this.state.playlistDate} />
        </div>
        <div className='form-group'>
          <label htmlFor="playlist-link">YouTube lecture/playlist link</label>
          <input type='text' className="form-control" id='playlist-link' value={this.state.playlistLink} />
        </div>
        <input type='submit' className='btn btn-default' value='Create' />
      </form>
    );
  }

}

export default AddLectureForm;
