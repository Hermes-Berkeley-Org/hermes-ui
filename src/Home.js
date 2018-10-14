import React, { Component } from 'react';
import Layout from './Layout.js'
import { connect } from 'react-redux'
import { getData } from './actions/home.js'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    if (this.props.homeResponse) {
      return (
        <Layout>
          {this.props.homeResponse.data.participations.map((participation, i) => {
              return (
                <div key={i}>
                  <Link key={i} to={`/course/${participation["course_id"]}`}>
                    {participation.course["display_name"]}
                  </Link>
                </div>
              )
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
  ...state.homeReducer
})

const mapDispatchToProps = dispatch => ({
  getData: (accessToken) => dispatch(getData(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
