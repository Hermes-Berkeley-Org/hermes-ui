import React, { Component } from 'react';
import OkRedirect from './OkRedirect.js'

class Login extends Component {
  render() {
    return (
      <OkRedirect nextUrl="/home"/>
    );
  }
}

export default Login;
