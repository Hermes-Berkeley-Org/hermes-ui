import React, { Component } from 'react';
import { encrypt } from '../../utils/security.js'

const queryString = require('query-string');
const axios = require('axios');
const base64 = require('base-64');
const utf8 = require('utf8');

class OkAuthorized extends Component {

  render() {
    return <div/>
  }

  componentDidMount() {

    const urlParams = queryString.parse(this.props.location.search);
    const code = urlParams.code;
    const state = JSON.parse(utf8.decode(base64.decode(urlParams.state)))

    const currentUrl = new URL(window.location.href);

    axios(process.env.REACT_APP_OK_TOKEN_URL, {
      method: 'POST',
      data: queryString.stringify({
        code,
        'client_secret': process.env.REACT_APP_OK_CLIENT_SECRET,
        'client_id': process.env.REACT_APP_OK_CLIENT_ID,
        'grant_type': 'authorization_code',
        'redirect_uri': `${currentUrl.origin}/authorized`
      })
    }).then(function (response) {
      const accessToken = response.data['access_token']
      const refreshToken = response.data['refresh_token']
      localStorage.setItem('okToken', encrypt({ accessToken, refreshToken }))
      window.location = state.next;
    }).catch(function (error) {
      console.log(error);
      // window.location = `${currentUrl.origin}/error` // TODO: error route
    });
  }

}

export default OkAuthorized;
