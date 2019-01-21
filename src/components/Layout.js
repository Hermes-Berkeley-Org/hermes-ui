import React, { Component } from 'react';

import Navbar from './Navbar.js';
import Footer from './Footer.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Layout extends Component {
  render() {
    return (
      <div className={this.props.wide ? 'layout-width-wide' : 'layout-width-normal'}>
        <Navbar />
        <div className='layout-contents'>
          {this.props.children}
        </div>
        <ToastContainer/>
        <Footer />
      </div>
    );
  }
}

export default Layout;
