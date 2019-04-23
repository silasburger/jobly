import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Jobs from './Jobs';
import Profile from './Profile';
import Login from './Login';
import Company from './Company';

//Creates routes for for all crucial jobly pages
class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => <Home currUser={this.props.currUser} />} />
          <Route
            exact
            path="/companies"
            render={() => <Companies currUser={this.props.currUser} />}
          />
          <Route
            exact
            path="/companies/:handle"
            render={props => (
              <Company currUser={this.props.currUser} {...props} />
            )}
          />
          <Route
            exact
            path="/jobs"
            render={() => <Jobs currUser={this.props.currUser} />}
          />
          <Route
            exact
            path="/profile"
            render={() => <Profile currUser={this.props.currUser} />}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                currUser={this.props.currUser}
                handleLogin={this.props.handleLogin}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
    );
  }
}

export default Routes;
