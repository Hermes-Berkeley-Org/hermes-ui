import React, { Component } from 'react';
import Layout from './Layout'

class PublicHome extends Component {
  render() {
    return (
      <Layout>
        <div>
          <header className="masthead bg-white text-primary text-center full-section">
            <h1 className="text-uppercase mb-0">Hermes</h1>
            <hr className="star-primary mb-5"/>
            <h2 className="font-weight-light mb-0">The Lecture Enhancer</h2>
          </header>
        </div>
      </Layout>
    );
  }
}

export default PublicHome;
