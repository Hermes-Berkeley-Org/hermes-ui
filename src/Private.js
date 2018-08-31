import React, { Component } from 'react';

import { authenticate } from './actions/accessToken.js'

import { connect } from 'react-redux';

import Login from './Login.js'

import PropTypes from 'prop-types'

import ReactLoading from 'react-loading';

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
      this.props.authenticate()
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
  authenticate: () => dispatch(authenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Private);
