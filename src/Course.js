import React, { Component } from 'react';

import Layout from './Layout.js'

import { connect } from 'react-redux';

import { getData } from './actions/course.js'

class Course extends Component {
  render() {
    if (this.props.courseResponse) {
      return (
        <Layout>
          {this.props.courseResponse.data.participations.map((participation, i) => {
              if (participation["course_id"] === this.props.courseId) {
                return (
                  <div key={i}>
                    {JSON.stringify(participation)}
                  </div>
                )
              } else {
                return null;
              }
          })}
        </Layout>
      );
    }
    return null; // TODO: Loading
  }

  componentDidMount() {
    this.props.getData(localStorage.getItem('token'))
  }
}

const mapStateToProps = state => ({
  ...state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  getData: (accessToken) => dispatch(getData(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Course);
