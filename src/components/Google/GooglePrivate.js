import PropTypes from 'prop-types'
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';

import { authenticate } from '../../actions/googleAccessToken.js';
import GoogleLogin from './GoogleLogin';

class GooglePrivate extends Component {
  render() {
    if (this.props.googleLoading) {
      return (<ReactLoading height={'20%'} width={'20%'} />);
    } else if (this.props.isGoogleAuthenticated) {
      return (
        <div>
            {this.props.children}
        </div>
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
