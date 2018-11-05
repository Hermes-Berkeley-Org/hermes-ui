import React, { Component } from 'react';

import '../css/freelancer.css';
import '../css/styles.css';
import './App.css';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
