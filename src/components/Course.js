import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlaylists, createLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm';
import Layout from './Layout';
import PlaylistTable from './PlaylistTable';

class Course extends Component {
  render() {
    if (this.props.playlists) {
      return (
        <Layout>
          <div className='container'>
            <div className='col-md-4 col-md-push-8'>
              <AddLectureForm createLecture={this.props.createLecture} />
            </div>
            <div className='col-md-8 col-md-pull-4'>
              <PlaylistTable playlists={this.props.playlists} />
            </div>
          </div>
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
