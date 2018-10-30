import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROLE_STUDENT, ROLE_INSTRUCTOR } from '../constants.js';
import { getData } from '../actions/home.js';
import Layout from './Layout';

class Home extends Component {
  render() {
    if (this.props.homeResponse) {
      const validStudentActiveClasses = this.props.homeResponse.courses.filter((course) => course.role === ROLE_STUDENT);
      const validStaffActiveClasses = this.props.homeResponse.courses.filter((course) => course.role === ROLE_INSTRUCTOR);

      return (
        <Layout>
          <div>
            <h3>Student</h3>
            {validStudentActiveClasses.map((participation, i) => {
                return (
                  <div key={i}>
                    <Link key={i} to={`/course/${participation["course_id"]}`}>
                      {participation.course["display_name"]}
                    </Link>
                  </div>
                )
            })}
          </div>
          <div>
            <h3>Staff</h3>
            {validStaffActiveClasses.map((participation, i) => {
                return (
                  <div key={i}>
                    <Link key={i} to={`/course/${participation["course_id"]}`}>
                      {participation.course["display_name"]}
                    </Link>
                  </div>
                )
            })}
          </div>

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
