import React, { Component } from 'react';
import GoogleRedirect from './GoogleRedirect'

class GoogleLogin extends Component {
  render() {
    return (
      <GoogleRedirect nextUrl={this.props.nextUrl}/>
    );
  }
}

export default GoogleLogin;
