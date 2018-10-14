import React, { Component } from 'react';
import ExternalRedirect from './ExternalRedirect.js'

const URL = require('url-parse');

const queryString = require('query-string');

const cryptoRandomString = require('crypto-random-string');

const base64 = require('base-64');
const utf8 = require('utf8')

class OkRedirect extends Component {

  constructor(props) {
    super(props);
    const currentUrl = new URL(window.location.href);

    const state = JSON.stringify({
        salt: cryptoRandomString(10),
        next: this.props.nextUrl
    })

    this.urlParams = queryString.stringify({
      response_type: 'code',
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${currentUrl.origin}/googleAuthorized`,
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
      state: base64.encode(utf8.encode(state))
    })
  }

  render() {
    return <ExternalRedirect url={`${process.env.REACT_APP_GOOGLE_AUTHORIZE_URL}?${this.urlParams}`}/>
  }

}

export default OkRedirect;
