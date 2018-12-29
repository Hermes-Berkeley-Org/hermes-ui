import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

import { ROLE_STUDENT, ROLE_INSTRUCTOR } from '../constants.js';
import { getData } from '../actions/home.js';
import Layout from './Layout';
import CourseCard from './CourseCard.js';

import DocumentTitle from 'react-document-title'

class Home extends Component {
  render() {
    if (this.props.homeResponse) {
      const validStudentActiveClasses = this.props.homeResponse.courses.filter((course) => course.role === ROLE_STUDENT);
      const validStaffActiveClasses = this.props.homeResponse.courses.filter((course) => course.role === ROLE_INSTRUCTOR);

      return (
        <Layout>
          <DocumentTitle title="Home">
            <div className='container'>
              <h2>Classes</h2>
              <div>
                <h3>Student</h3>
                <h4>Active courses</h4>
                <div className='row'>
                  {validStudentActiveClasses.map((participation) =>
                    <div className='col-xs-6 col-md-4' key={participation.course.id}>
                      <CourseCard course={participation.course}></CourseCard>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3>Staff</h3>
                <h4>Active courses</h4>
                <div className='row'>
                  {validStaffActiveClasses.map((participation) =>
                    <div className='col-xs-6 col-md-4' key={participation.course.id}>
                      <CourseCard course={participation.course}></CourseCard>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DocumentTitle>
        </Layout>
      );
    }
    return (<ReactLoading height={'20%'} width={'20%'} />);
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
