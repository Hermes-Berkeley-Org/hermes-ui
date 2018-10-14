import React, { Component } from 'react';
import './App.css'
import PublicHome from './PublicHome.js'
import Home from './Home.js'
import OkLogin from './OkLogin.js'
import OkAuthorized from './OkAuthorized.js'
import GoogleAuthorized from './GoogleAuthorized.js'
import Course from './Course.js'
import OkPrivate from './OkPrivate.js'
import GooglePrivate from './GooglePrivate.js'

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
            <GooglePrivate nextUrl={location.pathname}>
              <Course courseId={Number.parseInt(match.params.courseId, 10)}/>
            </GooglePrivate>
          </OkPrivate>
        )}/>
      </Switch>
    );
  }

}

export default App;
