import React, { Component } from 'react';
import { connect } from 'react-redux';

import CryptoAES from 'crypto-js/aes'

// import { saveAccessToken } from './actions/accessToken.js'

const queryString = require('query-string');
const axios = require('axios');

const base64 = require('base-64');
const utf8 = require('utf8');


// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

class OkAuthorized extends Component {

  render() {
    return <div/>
  }

  componentDidMount() {

    const urlParams = queryString.parse(this.props.location.search);
    const code = urlParams.code;
    const state = JSON.parse(utf8.decode(base64.decode(urlParams.state)))

    const currentUrl = new URL(window.location.href);

    axios({
      method: 'post',
      url: process.env.REACT_APP_TOKEN_URL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: queryString.stringify({
        code,
        'client_secret': process.env.REACT_APP_CLIENT_SECRET,
        'client_id': process.env.REACT_APP_CLIENT_ID,
        'grant_type': 'authorization_code',
        'redirect_uri': `${currentUrl.origin}/authorized`
      })
    }).then(function (response) {
      const accessToken = response.data['access_token']
      const refreshToken = response.data['refresh_token']
      localStorage.setItem('token', CryptoAES.encrypt(
        JSON.stringify({ accessToken, refreshToken }),
        process.env.REACT_APP_SECRET_KEY
      ))
      window.location = state.next;
    }).catch(function (error) {
      window.location = `${currentUrl.origin}/error` // TODO: error route
    });
  }

}

export default OkAuthorized;
