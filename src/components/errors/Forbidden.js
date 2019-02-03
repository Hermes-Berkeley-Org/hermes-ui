import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout.js';

import './Forbidden.css';

export default class Forbidden extends Component {
  render() {
    return (
      <Layout>
        <div className='container container-forbidden'>
          <div>
            <h1><span role="img" aria-label="">🔒</span> You don't seem to have access to this page</h1>
            <p><Link to='/'><span className='fa fa-arrow-left' /> Follow here to go back to home page</Link></p>
          </div>
        </div>
      </Layout>
    );
  }
}
