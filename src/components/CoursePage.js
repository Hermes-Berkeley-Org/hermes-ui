import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCourseData, createLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm.js';
import Layout from './Layout.js';
import LecturesTable from './LecturesTable.js';
import Loading from './Loading.js';

import './CoursePage.css';

class CoursePage extends Component {
  render() {
    if (!this.props.loading && !this.props.courseData) {
      return <div>Failed to load lectures</div>;
    }
    return (
      <Layout>
        <div className='container container-course'>
          <h2>{this.props.loading ? 'Course' : this.props.courseData.info['display_name']}</h2>
          <div className='container-course-sections'>
            <div className='course-lecture-creation'>
              <h3>Create a lecture</h3>
              <AddLectureForm courseId={this.props.courseId} createLecture={this.props.createLecture} />
            </div>
            <div className='course-lectures'>
              {this.props.loading 
                ? <Loading /> 
                : <LecturesTable courseId={this.props.courseId} lectures={!this.props.courseData ? [] : this.props.courseData.lectures} />}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getCourseData(localStorage.getItem('okToken'), this.props.courseId)
  }
}

const mapStateToProps = state => ({
  ...state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  getCourseData: (...args) => dispatch(getCourseData(...args)),
  createLecture: (...args) => dispatch(createLecture(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
