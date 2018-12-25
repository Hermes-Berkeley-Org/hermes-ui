import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCourseData, createLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm';
import Layout from './Layout';
import LecturesTable from './LecturesTable';

import { ROLE_INSTRUCTOR } from '../constants.js'

class Course extends Component {
  render() {
    if (!this.props.loading && !this.props.courseData) {
      return <div>Failed to load lectures</div>;
    }
    return (
      <Layout>
        <div className='container'>
          <h2>{!this.props.courseData ? 'Course' : this.props.courseData.info['display_name']}</h2>
          <div className='row'>
            {this.props.role !== ROLE_INSTRUCTOR ? null :
              <div className='col-md-4 col-md-push-8'>
                <h3>Create a lecture</h3>
                <AddLectureForm courseId={this.props.courseId} createLecture={this.props.createLecture} />
              </div>
            }
            <div className='col-md-8 col-md-pull-4'>
              <h3>Lectures</h3>
              <LecturesTable courseId={this.props.courseId} lectures={!this.props.courseData ? [] : this.props.courseData.lectures} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Course);
