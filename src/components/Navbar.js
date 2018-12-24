import React, { Component } from 'react';
import Img from 'react-image';
import { Link } from 'react-router-dom';

import hermesLogo from '../img/hermes.png';
import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <Link to='/home'><Img src={hermesLogo}></Img></Link>
          </div>
          <div className='flex-space'></div>
          <div className='navbar-actions'>
            <ul>
              <li><Link to='/home'>Login</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
