import React, { Component } from 'react';
import Layout from './Layout'
import { connect } from 'react-redux';
import { getPlaylists, createLecture } from '../actions/course.js'
import PlaylistTable from './PlaylistTable'
import AddLectureForm from './AddLectureForm'

class Course extends Component {
  render() {
    if (this.props.playlists) {
      return (
        <Layout>
          <PlaylistTable playlists={this.props.playlists}/>
          <AddLectureForm createLecture={this.props.createLecture}/>
        </Layout>
      );
    }
    return null; // TODO: Loading
  }

  componentDidMount() {
    this.props.getPlaylists(localStorage.getItem('okToken'), this.props.courseId)
  }
}

const mapStateToProps = state => ({
  ...state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  getPlaylists: (accessToken) => dispatch(getPlaylists(accessToken)),
  createLecture: (accessToken, lecture) => dispatch(createLecture(accessToken, lecture))
})

export default connect(mapStateToProps, mapDispatchToProps)(Course);
