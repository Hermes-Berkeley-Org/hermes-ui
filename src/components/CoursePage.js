import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'

import { getCourseData, createLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm.js';
import Layout from './Layout.js';
import LectureList from './LectureList.js';
import Loading from './Loading.js';

import './CoursePage.css';

import { ROLE_INSTRUCTOR } from '../constants.js'

class CoursePage extends Component {
  render() {
    if (!this.props.courseLoading && !this.props.courseData) {
      return <div>Failed to load lectures</div>;
    }
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData ? 'Course' : this.props.courseData.info['display_name']}>
        <div className='container container-course'>
          <h2>{this.props.courseLoading ? 'Course' : this.props.courseData.info['display_name']}</h2>
          <div className='container-course-sections'>
            <div className='course-lectures'>
              {this.props.courseLoading
                ? <Loading />
                : <LectureList courseId={this.props.courseId} lectures={!this.props.courseData ? [] : this.props.courseData.lectures} />
              }
            </div>
            {this.props.role !== ROLE_INSTRUCTOR ? null :
              <div className='course-lecture-creation'>
                <h3>Create a lecture</h3>
                <AddLectureForm courseId={this.props.courseId} createLecture={this.props.createLecture} />
              </div>
            }
          </div>
        </div>
        </DocumentTitle>
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
