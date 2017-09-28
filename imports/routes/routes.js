import React from 'react';
import {Meteor} from 'meteor/meteor';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Dashboard from '../ui/Dashboard';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';

const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={props => (
          Meteor.userId() ? (
            <Redirect to="/dashboard"/>
          ) : (
            <Login {...props} />
          )
        )}/>
      <Route exact path="/signup" render={props => (
          Meteor.userId() ? (
            <Redirect to="/dashboard"/>
          ) : (
            <Signup {...props} />
          )
        )}/>
      <Route exact path="/dashboard" render={props => (
          !Meteor.userId() ? (
            <Redirect to="/"/>
          ) : (
            <Dashboard {...props} />
          )
        )}/>
      <Route component={NotFound}/>
    </Switch>
</Router>
);
