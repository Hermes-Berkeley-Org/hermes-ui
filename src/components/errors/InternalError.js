import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout.js';

import './InternalError.css';

export default class InternalError extends Component {
  render() {
    return (
      <Layout>
        <div className='container container-not-found'>
          <div>
            <h1>🛸 We're out of service</h1>
            <p>Please retry your request in a few minutes</p>
            <p><Link to='/'><span className='fa fa-arrow-left' /> Follow here to go back to home page</Link></p>
          </div>
        </div>
      </Layout>
    );
  }
}
