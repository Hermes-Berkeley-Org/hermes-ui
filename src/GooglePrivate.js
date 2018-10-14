import React, { Component } from 'react';

import { authenticate, sendFailure } from './actions/googleAccessToken.js'

import { connect } from 'react-redux';

import GoogleLogin from './GoogleLogin.js'

import PropTypes from 'prop-types'

import ReactLoading from 'react-loading';


class GooglePrivate extends Component {

  render() {
    if (this.props.googleLoading) {
      return (<ReactLoading height={'20%'} width={'20%'} />);
    } else if (this.props.isGoogleAuthenticated) {
      return (
        <div>
            {React.cloneElement(this.props.children, {...this.props})}
        </div>
      );
    } else {
      return <GoogleLogin nextUrl={this.props.nextUrl}/>
    }
  }

  componentWillMount() {
    const encryptedTokens = localStorage.getItem('googleToken')
    if (encryptedTokens !== null) {
        this.props.googleAuthenticate(encryptedTokens)
    } else {
        this.props.googleSendFailure()
    }
  }
}

GooglePrivate.defaultProps = {
    googleLoading: true
}

GooglePrivate.propTypes = {
    googleLoading: PropTypes.bool.isRequired,
    isGoogleAuthenticated: PropTypes.bool,
    googleAuthenticate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ...state.googleAuthReducer
})

const mapDispatchToProps = dispatch => ({
  googleAuthenticate: (token) => dispatch(authenticate(token)),
  googleSendFailure: () => dispatch(sendFailure())
})

export default connect(mapStateToProps, mapDispatchToProps)(GooglePrivate);
