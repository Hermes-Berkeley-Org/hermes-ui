import React, { Component } from 'react';
import Layout from './Layout'
import { connect } from 'react-redux'
import { getData } from '../actions/home.js'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    if (this.props.homeResponse) {
      return (
        <Layout>
          <div>
            <h3>Student</h3>
            {this.props.homeResponse['valid_student_active_classes'].map((participation, i) => {
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
            {this.props.homeResponse['valid_staff_active_classes'].map((participation, i) => {
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
    return null; // TODO: Loading
  }

  componentDidMount() {
    this.props.getData(localStorage.getItem('okToken'))
  }

}

const mapStateToProps = state => ({
  ...state.homeReducer
})

const mapDispatchToProps = dispatch => ({
  getData: (accessToken) => dispatch(getData(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
