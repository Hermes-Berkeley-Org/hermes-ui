import React, { Component } from 'react';

import { decrypt } from '../utils/security';

class Debug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      okToken: null,
      googleToken: '',
    };
  }

  render() {
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    return (
      <div>
        <h3>Debug info</h3>
        <div>Ok token: <code>{JSON.stringify(this.state.okToken)}</code></div>
        <div>Google access token: <code>{JSON.stringify(this.state.googleToken)}</code></div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      okToken: decrypt(localStorage.getItem('okToken')),
      googleToken: decrypt(localStorage.getItem('googleToken')),
    });
  }
}

export default Debug;
