import React, { Component } from 'react';
import './App.css';
import './css/freelancer.css'
import './css/styles.css'

import Header from './Header.js'
import Footer from './Footer.js'

class Layout extends Component {
  render() {
    return (
      <div>
        <Header/>
          { this.props.children }
        <Footer/>
      </div>
    );
  }
}

export default Layout;
