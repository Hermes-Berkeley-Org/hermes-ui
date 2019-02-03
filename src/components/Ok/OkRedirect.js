
import React, { Component } from 'react';
import ExternalRedirect from '../ExternalRedirect.js'

const URL = require('url-parse');

const queryString = require('query-string');

const crypto = require("crypto");

const base64 = require('base-64');
const utf8 = require('utf8')

class OkRedirect extends Component {

  constructor(props) {
    super(props);
    const currentUrl = new URL(window.location.href);

    const state = JSON.stringify({
        salt: crypto.randomBytes(20).toString('hex'),
        next: this.props.nextUrl
    })

    this.urlParams = queryString.stringify({
      response_type: 'code', // 'token' not supported: !!!!!
      client_id: process.env.REACT_APP_OK_CLIENT_ID,
      redirect_uri: `${currentUrl.origin}/authorized`,
      scope: 'email',
      state: base64.encode(utf8.encode(state))
    })
  }

  render() {
    return <ExternalRedirect url={`${process.env.REACT_APP_OK_AUTHORIZE_URL}?${this.urlParams}`}/>
  }

}

export default OkRedirect;
