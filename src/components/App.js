import React, { Component } from 'react';

import Debug from './Debug'
import PublicHome from './PublicHome'
import Home from './Home'
import OkLogin from './Ok/OkLogin'
import OkAuthorized from './Ok/OkAuthorized'
import GoogleAuthorized from './Google/GoogleAuthorized'
import Course from './Course'
import OkPrivate from './Ok/OkPrivate'
import GooglePrivate from './Google/GooglePrivate'
import InstructorAuthenticated from './InstructorAuthenticated'

import { Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {

    return (
      <Switch>
        <Route exact path="/" component={PublicHome}/>
        <Route exact path="/home" render={({ location, match }) => (
            <OkPrivate nextUrl={location.pathname}>
              <Home/>
            </OkPrivate>
        )}/>
        <Route exact path="/login" component={OkLogin}/>
        <Route exact path="/authorized" component={OkAuthorized}/>
        <Route exact path="/googleAuthorized" component={GoogleAuthorized}/>
        <Route exact path="/course/:courseId" render={({ location, match }) => (
          <OkPrivate nextUrl={location.pathname}>
            <InstructorAuthenticated nextUrl={location.pathname}>
              <Course courseId={Number.parseInt(match.params.courseId, 10)}/>
            </InstructorAuthenticated>
          </OkPrivate>
        )}/>
        <Route exact path="/debug" component={Debug}/>
      </Switch>
    );
  }

}

export default App;
