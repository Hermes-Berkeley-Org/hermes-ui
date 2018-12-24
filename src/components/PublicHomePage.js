import React, { Component } from 'react';

import Layout from './Layout.js';

import './PublicHomePage.css';

export default class PublicHomePage extends Component {
  render() {
    return (
      <Layout>
        <div className='container container-public'>
          <h1>Hermes</h1>
          <hr className="fas fa-star" />
          <h2>The Lecture Enhancer</h2>
        </div>
      </Layout>
    );
  }
}
