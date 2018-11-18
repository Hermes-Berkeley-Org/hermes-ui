import React, { Component } from 'react';

import { encrypt } from '../../utils/security.js'

const queryString = require('query-string');

const base64 = require('base-64');
const utf8 = require('utf8');

class GoogleAuthorized extends Component {

  render() {
    return <div/>
  }

  componentDidMount() {

    const urlParams = queryString.parse(this.props.location.hash)
    const state = JSON.parse(utf8.decode(base64.decode(urlParams.state)))

    const accessToken = urlParams['access_token']
    const refreshToken = urlParams['refresh_token']
    localStorage.setItem('googleToken', encrypt({ accessToken, refreshToken }))

    window.location = state.next;
  }

}

export default GoogleAuthorized;
