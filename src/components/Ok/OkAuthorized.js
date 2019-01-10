import React, { Component } from 'react';
import InternalError from '../InternalError'

import { encrypt } from '../../utils/security.js'

const queryString = require('query-string');
const axios = require('axios');
const base64 = require('base-64');
const utf8 = require('utf8');

class OkAuthorized extends Component {

  constructor(props) {
    super(props);
    this.state = {
      okFailed: false
    };
  }

  render() {
    if (this.state.okFailed) {
      return <InternalError/>
    }
    return <div/>
  }

  componentDidMount() {

    const urlParams = queryString.parse(this.props.location.search);
    if (urlParams.error) {
      // access denied
      window.location = '/'
    } else {
      const code = urlParams.code;
      const state = JSON.parse(utf8.decode(base64.decode(urlParams.state)))

      const serverFailed = () => (
        this.setState({
          okFailed: true
        })
      )

      axios(`${process.env.REACT_APP_HERMES_RESOURCE_SERVER}/ok_code?code=${code}`, {
        method: 'GET'
      }).then(function (response) {
        const accessToken = response.data['access_token']
        const refreshToken = response.data['refresh_token']
        localStorage.setItem('okToken', encrypt({ accessToken, refreshToken }))
        window.location = state.next;
      }).catch(function (error) {
        serverFailed()
      });
    }
  }

}

export default OkAuthorized;
