import React, { Component } from 'react';
import Img from 'react-image';
import { Link } from 'react-router-dom';

import hermesLogo from '../img/hermes-white.png';
import './Navbar.css';

import { logout } from '../actions/okAccessToken.js'
import { connect } from 'react-redux';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

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
              <li>
              {
                !this.props.isAuthenticated ?
                <Link to="/login">Login</Link> :
                <Link to="/" onClick={this.handleLogout}>Logout</Link>
              }
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  handleLogout() {
    this.props.logout()
  }
}

const mapStateToProps = state => ({
  ...state.okAuthReducer
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
