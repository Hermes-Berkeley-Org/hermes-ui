import React, { Component } from 'react';

import Navbar from './Navbar.js';
import Footer from './Footer.js';

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className='layout-contents'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
