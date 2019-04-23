import React, { Component } from 'react';
import Routes from '../Routes';
import jwt from 'jsonwebtoken';
import NavigationBar from '../NavigationBar';
import JoblyApi from '../../JoblyApi';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUser: null,
      isLoading: true
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    let token = localStorage.getItem('token');
    if (token) {
      let payload = jwt.decode(token);
      let currUser = await JoblyApi.getUser(payload.username);
      this.setState({ currUser });
    }
    this.setState({ isLoading: false });
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ currUser: null });
  }

  async handleLogin() {
    let token = localStorage.getItem('token');
    console.log('token',token);
    let payload = jwt.decode(token);
    let currUser = await JoblyApi.getUser(payload.username);
    this.setState({ currUser });
  }

  render() {
    if (this.state.isLoading) {
      //show the loading indicator
      return <h1> Loading..</h1>;
    }
    return (
      <>
        <NavigationBar
          currUser={this.state.currUser}
          navlinks={this.props.navlinks}
          handleLogout={this.handleLogout}
        />
        <Routes currUser={this.state.currUser} handleLogin={this.handleLogin} />
      </>
    );
  }
}

export default App;
