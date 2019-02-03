import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout.js';

import './NotFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <Layout>
        <div className='container container-not-found'>
          <div>
            <h1><span role="img" aria-label="">🤔</span> Feeling like at the wrong place?</h1>
            <p><Link to='/'><span className='fa fa-arrow-left' /> Follow here to go back to home page</Link></p>
          </div>
        </div>
      </Layout>
    );
  }
}
