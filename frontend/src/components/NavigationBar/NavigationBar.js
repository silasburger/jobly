import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid/v4';
import './NavigationBar.css';

//Top navigation used everywhere on app/site
class NavigationBar extends Component {
  render() {
    let navLinks = this.props.currUser
      ? ['companies', 'jobs', 'profile', 'logout']
      : ['login'];

    //This dynamically creates nav links based on props
    let navLinkComponents = navLinks.map(navLink => {
      if (navLink === 'logout') {
        return (
          <NavItem key={uuid()}>
            <NavLink onClick={this.props.handleLogout} to="/login">
              logout
            </NavLink>
          </NavItem>
        );
      }
      return (
        <NavItem className='nav' key={uuid()}>
          <NavLink to={`/${navLink}`}>{navLink}</NavLink>
        </NavItem>
      );
    });

    return (
      <Navbar className="navbar navbar-expand">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        <Nav className='mr-auto'>{navLinkComponents}</Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
