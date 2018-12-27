import React, { Component } from 'react';
import Img from 'react-image';

import hermesLogo from '../img/hermes.png';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'

import { logout } from '../actions/okAccessToken.js'
import { connect } from 'react-redux';

class NavHeader extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home">
              <Img src={hermesLogo} height="20"></Img>
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {
            !this.props.isAuthenticated ?
            <LinkContainer to="/login">
              <NavItem eventKey={1}>
                Login
              </NavItem>
            </LinkContainer> :
            <NavItem eventKey={1}>
              <Link to="/" onClick={this.handleLogout}>
                Logout
              </Link>
            </NavItem>
          }
        </Nav>
      </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
