import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCourseData, createLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm';
import Layout from './Layout';
import LecturesTable from './LecturesTable';

class Course extends Component {
  render() {
    if (this.props.courseData) {
      return (
        <Layout>
          <div className='container'>
            <h2>{this.props.courseData.info['display_name']}</h2>
            <div className='row'>
              <div className='col-md-4 col-md-push-8'>
                <h3>Create a lecture</h3>
                <AddLectureForm createLecture={this.props.createLecture} />
              </div>
              <div className='col-md-8 col-md-pull-4'>
                <h3>Playlist</h3>
                <LecturesTable lectures={this.props.courseData.lectures} />
              </div>
            </div>
          </div>
        </Layout>
      );
    }
    return null; // TODO: Loading
  }

  componentDidMount() {
    this.props.getCourseData(localStorage.getItem('okToken'), this.props.courseId)
  }
}

const mapStateToProps = state => ({
  ...state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  getCourseData: (accessToken, courseId) => dispatch(getCourseData(accessToken, courseId)),
  createLecture: (accessToken, lecture) => dispatch(createLecture(accessToken, lecture))
})

export default connect(mapStateToProps, mapDispatchToProps)(Course);
