import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar.js';
import Footer from './Footer.js';

import 'react-toastify/dist/ReactToastify.css';

import '../utils/toast.css';

class ToastCloseButton extends Component {
  render() {
    return <span className='fa fa-times' />;
  }
}

class Layout extends Component {
  render() {
    return (
      <div className={this.props.wide ? 'layout-width-wide' : 'layout-width-normal'}>
        <Navbar />
        <div className='layout-contents'>
          {this.props.children}
        </div>
        <ToastContainer
          closeButton={<ToastCloseButton />}
          toastClassName='toast'
          bodyClassName='toast-body'
          progressClassName='toast-progress' />
        <Footer />
      </div>
    );
  }
}

export default Layout;
