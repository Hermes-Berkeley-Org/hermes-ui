import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'

import { getCourseData, createLecture, deleteLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm.js';
import Layout from './Layout.js';
import LectureList from './LectureList.js';
import Loading from './Loading.js';
import NotFound from './NotFound.js'
import InternalError from './InternalError.js'

import './CoursePage.css';

import { ROLE_INSTRUCTOR } from '../constants.js'

class CoursePage extends Component {
  render() {
    if (this.props.courseDataError) {
      return <div>{
        this.props.courseDataError.response.status === 404 ?
        <NotFound/> : <InternalError/>
      }</div>
    }
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData ? 'Course' : this.props.courseData.info['display_name']}>
        <div className='container container-course'>
          <h2>{this.props.courseLoading ? '' : this.props.courseData.info['display_name']}</h2>
          <div className='container-course-sections'>
            <div className='course-lectures'>
              {this.props.courseLoading
                ? <Loading />
                : <LectureList
                      courseId={this.props.courseId}
                      lectures={!this.props.courseData ? [] : this.props.courseData.lectures}
                      deleteLecture={(lectureUrlName) => this.props.deleteLecture(this.props.courseId, lectureUrlName)}
                  />
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

CoursePage.defaultProps = {
    courseLoading: true
}

const mapStateToProps = state => ({
  ...state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  getCourseData: (...args) => dispatch(getCourseData(...args)),
  createLecture: (...args) => dispatch(createLecture(...args)),
  deleteLecture: (...args) => dispatch(deleteLecture(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
