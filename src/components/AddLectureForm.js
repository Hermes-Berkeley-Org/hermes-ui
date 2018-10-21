import React, { Component } from 'react';

class AddLectureForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        playlistTitle: '',
        playlistDate: '',
        playlistLink: ''
      };

      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      this.props.createLecture(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
        Lecture Title
        <input type="text" name="playlistTitle" value={this.state.playlistTitle} />
        </label>

        <label>
        Lecture Date
        <input type="date" name="playlistDate" value={this.state.playlistDate} />
        </label>

        <label>
        Youtube Lecture/Playlist Link
        <input type="text" name="playlistLink" value={this.state.playlistLink} />
        </label>

        <input type="submit" value="Create" />
      </form>
    );
  }

}

export default AddLectureForm;
