import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ROLE_STUDENT, ROLE_INSTRUCTOR } from '../constants.js';
import { getData } from '../actions/home.js';
import Layout from './Layout.js';
import Loading from './Loading.js';
import CourseCard from './CourseCard.js';

import './HomePage.css';

class HomePage extends Component {
  renderCourses(title, filter) {
    if (this.props.loading) {
      return (
        <div>
          <h4>{title}</h4>
          <Loading />
        </div>
      );
    }
    if (this.props.homeResponse) {
      const validStudentActiveClasses = this.props.homeResponse.courses.filter(filter);
      if (validStudentActiveClasses.length > 0) {
        return (
          <div>
            <h4>{title}</h4>
            <div className='card-list'>
              {validStudentActiveClasses.map((participation) =>
                <CourseCard key={participation.course.id} course={participation.course}></CourseCard>
              )}
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <Layout>
        <div className='container'>
          <h2>Classes</h2>
          <h3>Active Courses</h3>
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
