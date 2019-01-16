import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'

import { ROLE_STUDENT, ROLE_INSTRUCTOR } from '../constants.js';
import { getData } from '../actions/home.js';
import Layout from './Layout.js';
import Loading from './Loading.js';
import CourseCard from './CourseCard.js';
import InternalError from './InternalError'

import './HomePage.css';

class HomePage extends Component {
  renderCourses(title, filter) {
    if (this.props.homeLoading) {
      return (
        <DocumentTitle title="Home">
          <div>
            <h3>{title}</h3>
            <Loading />
          </div>
        </DocumentTitle>
      );
    }
    if (this.props.homeData) {
      const validStudentActiveClasses = this.props.homeData.courses.filter(filter);
      if (validStudentActiveClasses.length > 0) {
        return (
          <DocumentTitle title="Home">
            <div>
              <h3>{title}</h3>
              <div className='card-list'>
                {validStudentActiveClasses.map((participation) =>
                  <CourseCard key={participation.course.id} course={participation.course}></CourseCard>
                )}
              </div>
            </div>
          </DocumentTitle>
        );
      }
    }
  }

  render() {
    if (this.props.homeDataError) {
      return <InternalError/>
    }
    return (
      <Layout>
        <div className='container'>
          <h2>Courses</h2>
          {this.renderCourses('Student', (course) => course.role === ROLE_STUDENT)}
          {this.renderCourses('Staff', (course) => course.role === ROLE_INSTRUCTOR)}
        </div>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getHomeData(localStorage.getItem('okToken'))
  }

}

const mapStateToProps = state => ({
  ...state.homeReducer
})

const mapDispatchToProps = dispatch => ({
  getHomeData: (accessToken) => dispatch(getData(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
