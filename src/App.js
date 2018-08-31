import React, { Component } from 'react';
import './App.css'
import PublicHome from './PublicHome.js'
import Home from './Home.js'
import Login from './Login.js'
import OkAuthorized from './OkAuthorized.js'

import Private from './Private.js'

import { Switch, Route } from 'react-router-dom'

class App extends Component {

  render() {

    return (
      <Switch>
        <Route exact path="/" component={PublicHome}/>
        <Route exact path="/home" render={() => (
            <Private>
              <Home/>
            </Private>
        )}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/authorized" component={OkAuthorized}/>
      </Switch>
    );
  }

}

export default App;
