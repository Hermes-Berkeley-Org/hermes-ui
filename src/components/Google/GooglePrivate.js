import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../../actions/googleAccessToken.js';
import GoogleLogin from './GoogleLogin';
import Loading from '../Loading'

class GooglePrivate extends Component {
  render() {
    if (this.props.googleLoading) {
      return (<Loading center />);
    } else if (this.props.isGoogleAuthenticated) {
      return (
        <React.Fragment>
            {this.props.children}
        </React.Fragment>
      );
    } else {
      return <GoogleLogin nextUrl={this.props.nextUrl}/>
    }
  }

  componentWillMount() {
    this.props.googleAuthenticate();
  }
};

GooglePrivate.defaultProps = {
  googleLoading: true
};

GooglePrivate.propTypes = {
  googleLoading: PropTypes.bool.isRequired,
  isGoogleAuthenticated: PropTypes.bool,
  googleAuthenticate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state.googleAuthReducer
});

const mapDispatchToProps = dispatch => ({
  googleAuthenticate: () => dispatch(authenticate())
});

export default connect(mapStateToProps, mapDispatchToProps)(GooglePrivate);
