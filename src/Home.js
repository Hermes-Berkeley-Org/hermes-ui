import React, { Component } from 'react';
import Layout from './Layout.js'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getData } from './actions/home.js'

class Home extends Component {
  render() {
    console.log(this.props)
    if (this.props.data) {
      return (
        <Layout>
          {JSON.stringify(this.props.data)}
        </Layout>
      );
    } else {
      return <div>Loading...</div>
    }
  }

  componentDidMount() {
    this.props.getData(this.props.accessToken)
  }

}

const mapStateToProps = state => ({
  ...state.homeReducer,
  ...state.authReducer
})

const mapDispatchToProps = dispatch => ({
  getData: (accessToken) => dispatch(getData(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
