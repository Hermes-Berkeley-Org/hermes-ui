import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCourseData, createLecture } from '../actions/course.js';
import AddLectureForm from './AddLectureForm';
import Layout from './Layout';
import LecturesTable from './LecturesTable';

class Course extends Component {
  render() {
    if (this.props.loading) {
      return null;
    } else if (this.props.courseData) {
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
                <h3>Lectures</h3>
                <LecturesTable courseId={this.props.courseId} lectures={this.props.courseData.lectures} />
              </div>
            </div>
          </div>
        </Layout>
      );
    } else {
      return <div>Failed to load lectures</div>;
    }
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
