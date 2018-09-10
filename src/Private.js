import React, { Component } from 'react';

import { authenticate, sendFailure } from './actions/accessToken.js'

import { connect } from 'react-redux';

import Login from './Login.js'

import PropTypes from 'prop-types'

import ReactLoading from 'react-loading';

import CryptoAES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'


class Private extends Component {

  render() {
    if (this.props.loading) {
      return (<ReactLoading height={'20%'} width={'20%'} />);
    } else if (this.props.isAuthenticated) {
      return (
        <div>
            {React.cloneElement(this.props.children, {...this.props})}
        </div>
      );
    } else {
      return <Login/>
    }
  }

  componentWillMount() {
    const encryptedToken = localStorage.getItem('token')
    if (encryptedToken !== undefined) {
        const bytes = CryptoAES.decrypt(
            localStorage.getItem('token').toString(),
            process.env.REACT_APP_SECRET_KEY
        )
        this.props.authenticate(
          JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        )
    } else {
        this.props.sendFailure()
    }
  }
}

Private.defaultProps = {
    loading: true
}

Private.propTypes = {
    loading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    authenticate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ...state.authReducer
})

const mapDispatchToProps = dispatch => ({
  authenticate: (token) => dispatch(authenticate(token)),
  sendFailure: () => dispatch(sendFailure())
})

export default connect(mapStateToProps, mapDispatchToProps)(Private);
