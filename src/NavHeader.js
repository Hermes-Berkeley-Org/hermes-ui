import React, { Component } from 'react';
import Img from 'react-image';

import hermesLogo from './img/hermes.png';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class NavHeader extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home"><Img src={hermesLogo} height="20"></Img></Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="/login">
            Login
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavHeader;
