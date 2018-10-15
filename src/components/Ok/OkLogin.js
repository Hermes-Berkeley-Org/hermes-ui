import React, { Component } from 'react';
import OkRedirect from './OkRedirect'

class OkLogin extends Component {
  render() {
    return (
      <OkRedirect nextUrl={this.props.nextUrl || "/home"}/>
    );
  }
}

export default OkLogin;
