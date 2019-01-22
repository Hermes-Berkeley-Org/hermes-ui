import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout.js';

import './Forbidden.css';

export default class Forbidden extends Component {
  render() {
    return (
      <Layout>
        <div className='container container-forbidden'>
          <h1>🔒 You don't seem to have access to this page</h1>
          <Link to='/'><span className='fa fa-arrow-left' /> Follow here to go back to home page</Link>
        </div>
      </Layout>
    );
  }
}
