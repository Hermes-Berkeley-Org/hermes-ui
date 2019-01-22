import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout.js';

import './NotFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <Layout>
        <div className='container container-not-found'>
          <h1>🤔 Feeling like at the wrong place?</h1>
          <Link to='/'><span className='fa fa-arrow-left' /> Follow here to go back to home page</Link>
        </div>
      </Layout>
    );
  }
}
