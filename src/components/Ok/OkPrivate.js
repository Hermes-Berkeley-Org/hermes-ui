import React, { Component } from 'react';
import { authenticate, sendFailure } from '../../actions/okAccessToken.js'
import { connect } from 'react-redux';
import OkLogin from './OkLogin'
import PropTypes from 'prop-types'

import Loading from '../Loading'


class OkPrivate extends Component {

  render() {
    if (this.props.okLoading) {
      return (<Loading />);
    } else if (this.props.isAuthenticated) {
      return (
        <div>
            {this.props.children}
        </div>
      );
    } else {
      return <OkLogin nextUrl={this.props.nextUrl}/>
    }
  }

  componentWillMount() {
    const encryptedToken = localStorage.getItem('okToken')
    if (encryptedToken) {
        this.props.okAuthenticate(encryptedToken)
    } else {
        this.props.okSendFailure()
    }
  }
}

OkPrivate.defaultProps = {
    okLoading: true
}

OkPrivate.propTypes = {
    okLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    okAuthenticate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ...state.okAuthReducer
})

const mapDispatchToProps = dispatch => ({
  okAuthenticate: (token) => dispatch(authenticate(token)),
  okSendFailure: () => dispatch(sendFailure())
})

export default connect(mapStateToProps, mapDispatchToProps)(OkPrivate);
