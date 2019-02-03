import React, { Component } from 'react';

import Loading from '../Loading'

import { encrypt } from '../../utils/security.js';

const queryString = require('query-string');

const base64 = require('base-64');
const utf8 = require('utf8');

class GoogleAuthorized extends Component {

  render() {
    return <Loading center />;
  }

  componentDidMount() {
    const urlParams = queryString.parse(this.props.location.hash);
    const state = JSON.parse(utf8.decode(base64.decode(urlParams.state)));

    const accessToken = urlParams['access_token'];
    const expirationTime = new Date().getTime() + parseInt(urlParams['expires_in'], 10) * 1000
    localStorage.setItem('googleToken', encrypt({
      accessToken,
      expirationTime
    }));

    window.location = state.next;
  }

}

export default GoogleAuthorized;
